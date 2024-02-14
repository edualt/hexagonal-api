export interface UserEntity {
  _id: string;
  name: string;
  lastName: string;
  cellphone: string;
  email: string;
  password: string;
  activationToken: string;
  verifiedAt: Date;
}
