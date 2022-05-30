import { Order } from '../model/Order';
import { Schema, Model, model, connection } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(connection);

export const mongooseOrderSchema = new Schema({
  number: { type: String, required: true, unique: true },
  user: { type: String, ref: 'users' },
  products: [
    {
      product: { type: String },
      quantity: { type: Number },
    },
  ],
  total: { type: Number },
  address_id: { type: String },
  payment_id: { type: String },
  payment_url: { type: String },
  payment_status: { type: String },
});

mongooseOrderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'number',
  startAt: 1058,
});

export const OrderSchema: Model<Order> = model<Order>('orders', mongooseOrderSchema);
