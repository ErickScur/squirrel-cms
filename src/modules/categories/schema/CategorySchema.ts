import { Category } from '../model/Category';
import { Schema, Model, model } from 'mongoose';

const mongooseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

export const CategorySchema: Model<Category> = model<Category>(
  'categories',
  mongooseSchema
);
