import { Document } from 'mongoose';

interface Image {
  filename: string;
  path: string;
}
interface Product extends Document {
  name: string;
  description?: string;
  mainImage?: string;
  price: number;
  stock: number;
  categoryId: string;
  brandId: string;
  slug: string;
  images?: Image[];
}

export { Product };
