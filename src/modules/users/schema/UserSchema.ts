import { User } from '../model/User';
import { Schema, Model, model } from 'mongoose';

const cartSchema = new Schema({
  total: { type: Number, default: 0 },
  products: [
    {
      product: { type: Schema.Types.ObjectId },
      quantity: { type: Number },
    },
  ],
});

const mongooseSchema = new Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  admin: { type: Boolean },
  password: { type: String, required: true, select: false },
  cart: { type: cartSchema, default: {} },
});

export const UserSchema: Model<User> = model<User>('users', mongooseSchema);
