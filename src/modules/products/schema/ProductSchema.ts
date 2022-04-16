import { Product } from '../model/Product';
import { Schema, Model, model } from 'mongoose';

const mongooseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  mainImage: { type: String, required: false },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoryId: { type: String, required: true },
  brandId: { type: String, required: true },
  slug: { type: String, required: true },
});

export const ProductSchema: Model<Product> = model<Product>('products', mongooseSchema);
