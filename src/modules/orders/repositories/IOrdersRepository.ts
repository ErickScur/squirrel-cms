import { Order } from '../model/Order';

interface ICreateOrderDTO {
  user: string;
  products: [
    {
      product: string;
      quantity: number;
    }
  ];
  total: number;
  address_id: string;
  payment_id: string;
  payment_url: string;
}

interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
}

export { IOrdersRepository, ICreateOrderDTO };
