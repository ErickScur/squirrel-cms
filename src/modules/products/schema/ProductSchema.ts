import { Product } from '../model/Product';
import { Schema, Model, model } from 'mongoose';

const imageSchema = new Schema({
  path: { type: String },
  filename: { type: String },
});
const mongooseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  mainImage: { type: String, required: false },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
  brandId: { type: Schema.Types.ObjectId, ref: 'brands', required: true },
  slug: { type: String, required: true },
  images: [{ type: imageSchema }],
});

export const ProductSchema: Model<Product> = model<Product>('products', mongooseSchema);
