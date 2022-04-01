import { Category } from '../models/Category';
import { Schema, Model, model, Document } from 'mongoose';

const mongooseSchema = new Schema({
  nome: { type: String, required: true },
  description: { type: String, required: false },
});

export const CategorySchema: Model<Category> = model<Category>(
  'categories',
  mongooseSchema
);
