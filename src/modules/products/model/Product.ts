import { Document } from 'mongoose';

interface Product extends Document {
  name: string;
  description?: string;
  mainImage?: string;
  price: number;
  stock: number;
  categoryId: string;
  brandId: string;
}

export { Product };
