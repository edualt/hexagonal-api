import { UserEntity } from "../../../domain/entities/user.entity";
import { UserInterface } from "../../../domain/interfaces/user.interface";

export class UserUseCase {
  constructor(private readonly repository: UserInterface) {}

  create(user: UserEntity) {
    const newUser = this.repository.create(user);
    return newUser;
  }

}