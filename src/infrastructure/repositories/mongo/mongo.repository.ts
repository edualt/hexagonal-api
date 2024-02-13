import { UserEntity } from "../../../domain/entities/user.entity";
import { UserInterface } from "../../../domain/interfaces/user.interface";
import User from "../../models/user.model";

export default class MongoRepository implements UserInterface {

  async create(user: UserEntity): Promise<any> {
    const { name, lastName, cellphone, email, password, activationToken, verifiedAt } = user;
    const newUser = new User({ name, lastName, cellphone, email, password, activationToken, verifiedAt });
    const userSaved = await newUser.save();
    return userSaved;
  }
  
}