import { Order } from '@modules/orders/model/Order';
import { OrderSchema } from '@modules/orders/schema/OrderSchema';
import { ICreateOrderDTO, IOrdersRepository } from '../IOrdersRepository';

class OrdersRepository implements IOrdersRepository {
  async create(data: ICreateOrderDTO): Promise<Order> {
    try {
      return await OrderSchema.create(data);
    } catch (e) {
      throw e;
    }
  }
}

export { OrdersRepository };
