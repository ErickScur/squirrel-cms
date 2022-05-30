import {
  HTTPBadRequest,
  HTTPForbidden,
  HTTPInternalServer,
  HTTPNotFound,
} from '@http/HTTPHandler';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { injectable, inject, container } from 'tsyringe';

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import {
  CreatePaymentUseCase,
  IItemsInterface,
} from '../createPayment/CreatePaymentUseCase';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';

@injectable()
class CheckoutUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute(userId: string, address_id: string) {
    try {
      const createPaymentUseCase = container.resolve(CreatePaymentUseCase);

      const user = await this.usersRepository.findById(userId);
      if (!user) throw new HTTPNotFound('User was not found!');

      const cart = user.cart;
      if (cart.products.length <= 0) throw new HTTPBadRequest('Cart is empty!');

      let items: IItemsInterface[] = [];

      const products = user.cart.products;

      for (let i = 0; i < cart.products.length; i++) {
        const p = cart.products[i];

        const product = await this.productsRepository.findById(p.product);
        if (product.stock < p.quantity)
          throw new HTTPForbidden(`Insufficient stock on item ${product.name}`);

        await this.productsRepository.updateStock(
          p.product,
          (product.stock -= p.quantity)
        );

        const info = {
          id: product._id.toString(),
          currency_id: 'BRL',
          quantity: p.quantity,
          description: product.description,
          unit_price: product.price,
          title: product.name,
        };
        items.push(info);
      }

      const payment = await createPaymentUseCase.execute(items, user.email);
      if (!payment) throw new HTTPInternalServer('Error trying to generate payment!');

      const order = await this.ordersRepository.create({
        address_id,
        payment_id: payment.body.external_reference,
        payment_url: payment.body.init_point,
        products,
        total: cart.total,
        user: userId,
      });

      user.cart.total = 0;
      user.cart.products.splice(0, user.cart.products.length);
      await this.usersRepository.updateAll(userId, user);

      return order;
    } catch (e) {
      throw e;
    }
  }
}

export { CheckoutUseCase };
