import { Router } from "express";
import { UserUseCase } from "../../../application/usecases/users/user.useCase";
import UserController from "../../../infrastructure/controllers/userController";
import MongoRepository from "../../repositories/mongo/mongo.repository";
import { EmailService } from "../../services/email.service";
import { AuthService } from "../../services/auth.service";

export const userRouter = Router();
const emailService = new EmailService();
const authService = new AuthService();

const mongoRepository = new MongoRepository();
const userUserCase = new UserUseCase(mongoRepository);
const userController = new UserController(userUserCase, emailService, authService);

userRouter.post('/api/v1/users', userController.create.bind(userController));
userRouter.get('/api/v1/users/:token/activate', userController.activate.bind(userController));
userRouter.post('/api/v1/users/login', userController.login.bind(userController));