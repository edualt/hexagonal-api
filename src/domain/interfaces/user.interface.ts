import { UserEntity } from '../entities/user.entity';

export interface UserInterface {
  create(user: UserEntity): Promise<UserEntity>;
  getOne(id: string): Promise<UserEntity>;
  getOneByEmail(email: string): Promise<UserEntity>;
  updateUserVerifiedtAt(user: UserEntity): Promise<UserEntity>;
}