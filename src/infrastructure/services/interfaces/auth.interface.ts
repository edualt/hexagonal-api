export interface AuthInterface {
  login(email: string, password: string): Promise<any>;
  createToken(user: any): Promise<string>;
}