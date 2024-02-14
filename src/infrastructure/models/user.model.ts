import { randomUUID } from "crypto";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
  _id: { type: String, default: randomUUID()},
  name: String,
  lastName: String,
  cellphone: String,
  email: String,
  password: String,
  activationToken: String,
  verifiedAt: Date
},{
  timestamps: true,
  versionKey: false
});

export default model('User', userSchema);