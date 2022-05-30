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
  address_id: string;
  payment_id: string;
  payment_url: string;
  payment_status: string;
}

export { Order };
