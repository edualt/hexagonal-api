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

  async getOne(id: string): Promise<any> {
    let user;
    try {
      user = await User.findById(id);
    } catch (error) {
      throw new Error('User not found');
    }
    return user;
  }

  async getOneByEmail(email: string): Promise<any> {
    let user;
    try {
      user = await User.findOne({ email });
    } catch (error) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUserVerifiedtAt(user: UserEntity): Promise<any> {
    const { _id, verifiedAt } = user;
    const userUpdated = await User.findByIdAndUpdate(_id, { verifiedAt }, { new: true });
    return userUpdated;
  }
}