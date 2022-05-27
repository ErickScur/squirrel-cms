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
interface Address {
  zip_code: string;
  street_name: string;
  street_number: string;
  city_name: string;
  state_name: string;
  country_name: string;
  complement: string;
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
