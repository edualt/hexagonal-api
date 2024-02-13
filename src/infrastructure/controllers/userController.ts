import { UserEntity } from "../../domain/entities/user.entity";
import { Request, Response } from "express";
import { UserUseCase } from "../../application/usecases/users/user.useCase";
import bcrypt from 'bcrypt';

export default class UserController {
  constructor(private readonly userUseCase: UserUseCase) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      bcrypt.hash(req.body.password, 10, async (err: any, hash: string) => {
        if (err) {
          this.responseRequest(res, 500, null, 'Error hashing password', false);
        }
        console.log(hash);
        req.body.password = hash;
        const user: UserEntity = req.body;
        const response = await this.userUseCase.create(user);
        this.responseRequest(res, 201, response, 'User created', true);
      });
    } catch (error) {
      this.responseRequest(res, 500, null, 'asd', false);
    }
  }

  responseRequest(res: Response, code: number, data: UserEntity | UserEntity[] | null, message: string, ok: boolean) {
    res.status(code).json({
      ok,
      data,
      message
    });
  }
}