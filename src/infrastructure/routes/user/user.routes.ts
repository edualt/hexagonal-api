import { Router } from "express";
import { UserUseCase } from "../../../application/usecases/users/user.useCase";
import UserController from "../../../infrastructure/controllers/userController";
import MongoRepository from "../../repositories/mongo/mongo.repository";

export const userRouter = Router();

const mongoRepository = new MongoRepository();
const userUserCase = new UserUseCase(mongoRepository);
const userController = new UserController(userUserCase);

userRouter.post('/api/v1/users', userController.create.bind(userController));