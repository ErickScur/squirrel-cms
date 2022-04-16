import { Brand } from '../model/Brand';
import { Schema, Model, model } from 'mongoose';

const mongooseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

export const BrandSchema: Model<Brand> = model<Brand>('brands', mongooseSchema);
