import express, { Application } from 'express';
import { userRouter } from './user/user.routes';

class IndexRouter {
  public router: Application;

  constructor() {
    this.router = express();
    this.routes();
  }

  routes() {
    this.router.use(userRouter);
  }
}

export default new IndexRouter().router;