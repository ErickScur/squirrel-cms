import { HTTPBadRequest, HTTPNotFound } from '@http/HTTPHandler';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import mercadopago from 'mercadopago';
import { Environment } from '@environment/index';
import { v4 as uuid } from 'uuid';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

interface IItemsInterface {
  id: string;
  title: string;
  description: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
}

interface IPaymentInterface {
  items: IItemsInterface[];
  payer: {
    email: string;
  };
  external_reference: string;
}

@injectable()
class CheckoutUseCase {
  private access_token: string;

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {
    this.access_token = Environment.getConfig('MERCADO_PAGO_TOKEN');
  }

  async execute(userId: string) {
    try {
      mercadopago.configure({
        sandbox: true,
        access_token: this.access_token,
      });

      const user = await this.usersRepository.findById(userId);
      if (!user) throw new HTTPNotFound('User was not found!');

      const cart = user.cart;
      if (cart.products.length <= 0) throw new HTTPBadRequest('Cart is empty!');

      const id = uuid();

      let items: IItemsInterface[] = [];

      for (let i = 0; i < cart.products.length; i++) {
        const p = cart.products[i];
        const product = await this.productsRepository.findById(p.product);
        const info = {
          id: product._id.toString(),
          currency_id: 'BRL',
          quantity: p.quantity,
          description: product.description,
          unit_price: product.price,
          title: 'Teste',
        };
        items.push(info);
      }

      const payload: IPaymentInterface = {
        items,
        payer: {
          email: user.email,
        },
        external_reference: id,
      };
      //@ts-ignore
      const payment = await mercadopago.preferences.create(payload);
      return payment;
    } catch (e) {
      throw e;
    }
  }
}

export { CheckoutUseCase };
