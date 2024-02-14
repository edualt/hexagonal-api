import { AuthInterface } from "./interfaces/auth.interface";
import jwt from "jsonwebtoken";

export class AuthService implements AuthInterface {
  async login(email: string, password: string): Promise<any> {
    return { email, password };
  }

  async createToken(user: any): Promise<string> {
    const token = jwt.sign({ user }, '123456', { expiresIn: 60 * 60 });
    return token;
  } 
}