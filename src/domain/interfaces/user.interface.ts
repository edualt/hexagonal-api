import { UserEntity } from '../entities/user.entity';

export interface UserInterface {
  create(user: UserEntity): Promise<UserEntity>;
  
}