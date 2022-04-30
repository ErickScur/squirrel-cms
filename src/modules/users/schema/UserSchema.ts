import { User } from '../model/User';
import { Schema, Model, model } from 'mongoose';

const mongooseSchema = new Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  admin: { type: Boolean },
  password: { type: String, required: true, select: false },
});

export const UserSchema: Model<User> = model<User>('users', mongooseSchema);
