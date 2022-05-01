import { Document } from 'mongoose';
import { Product } from '../../products/model/Product';

interface Cart {
  total: number;
  products: [
    {
      product: string;
      quantity: number;
    }
  ];
}
interface User extends Document {
  name: string;
  cpf: string;
  email: string;
  password: string;
  admin: boolean;
  cart?: Cart;
}

export { User, Cart };
