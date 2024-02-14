import { UserEntity } from "../../domain/entities/user.entity";
import { Request, Response } from "express";
import { UserUseCase } from "../../application/usecases/users/user.useCase";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EmailService } from "../services/email.service";
import { AuthService } from "../services/auth.service";

export default class UserController {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly emailService: EmailService,
    private readonly authService: AuthService
  ) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response) {
    const secretKey = '123456';

    try {
      bcrypt.hash(req.body.password, 10, async (err: any, hash: string) => {
        if (err) {
          this.responseRequest(res, 500, null, 'Error hashing password', false);
        }
        req.body.password = hash;

        const user: UserEntity = req.body;
        
        const response = await this.userUseCase.create(user);
        const userId = response._id;

        user.activationToken = jwt.sign({userId}, secretKey, { expiresIn: '1h' })

        await this.emailService.sendEmail(user.email, "Email Activation", `http://localhost:3000/api/v1/users/${user.activationToken}/activate`);

        this.responseRequest(res, 201, response, 'User created', true);
      });
    } catch (error) {
      this.responseRequest(res, 500, null, 'asd', false);
    }
  }

  async activate(req: Request, res: Response) {
    const token = req.params.token;

    interface DecodedToken {
      userId: string;
      iat: number;
      exp: number;
    }

    try {
      const decodedToken = jwt.decode(token);  

      if (!decodedToken) {
        this.responseRequest(res, 400, null, 'Invalid token', false);
      }

      const { userId } = decodedToken as DecodedToken;
      const user = await this.userUseCase.getOne(userId);

      if (!user) {
        this.responseRequest(res, 404, null, 'User not found', false);
      }

      user.verifiedAt = new Date();
      const userUpdated = await this.userUseCase.updateUserVerifiedtAt(user);
      this.responseRequest(res, 200, userUpdated, 'User activated', true);
      
      
    } catch (error) {
      this.responseRequest(res, 500, null, 'Error activating user', false);
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await this.userUseCase.getOneByEmail(email);

      if (!user) {
        this.responseRequest(res, 404, null, 'User not found', false);
        return;
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        this.responseRequest(res, 401, null, 'Invalid password', false);
        return;
      }

      if(!user.verifiedAt) {
        this.responseRequest(res, 401, null, 'User not activated', false);
        return;
      }

      const token = await this.authService.createToken(user);

      this.responseRequest(res, 200, token, 'User logged in', true);
    } catch (error) {
      this.responseRequest(res, 500, null, 'Error logging in', false);
    }
  }

  responseRequest(res: Response, code: number, data: UserEntity | UserEntity[] | string | null, message: string, ok: boolean) {
    res.status(code).json({
      ok,
      data,
      message
    });
  }
}