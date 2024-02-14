import { UserEntity } from "../../../domain/entities/user.entity";
import { UserInterface } from "../../../domain/interfaces/user.interface";

export class UserUseCase {
  constructor(private readonly repository: UserInterface) {}

  create(user: UserEntity) {
    const newUser = this.repository.create(user);
    return newUser;
  }

  getOne(id: string) {
    const user = this.repository.getOne(id);
    return user;
  }

  getOneByEmail(email: string) {
    const user = this.repository.getOneByEmail(email);
    return user;
  }

  updateUserVerifiedtAt(user: UserEntity) {
    const userUpdated = this.repository.updateUserVerifiedtAt(user);
    return userUpdated;
  }
}