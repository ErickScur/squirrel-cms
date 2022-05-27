import { Document } from 'mongoose';

interface Order extends Document {
  number: string;
  user: string;
  products: [
    {
      product: string;
      quantity: string;
    }
  ];
  total: number;
}

export { Order };
