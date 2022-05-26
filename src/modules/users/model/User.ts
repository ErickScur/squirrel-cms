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
interface Address extends Document {
  zip_code: string;
  street_name: string;
  street_number: string;
  city_name: string;
  state_name: string;
}
interface User extends Document {
  name: string;
  cpf: string;
  email: string;
  password: string;
  admin: boolean;
  cart?: Cart;
  addresses: Address[];
}

export { User, Cart, Address };
