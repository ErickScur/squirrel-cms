import { Environment } from '@environment/index';
import mercadopago from 'mercadopago';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateStatusUseCase {
  private access_token: string;

  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {
    this.access_token = Environment.getConfig('MERCADO_PAGO_TOKEN');
  }

  async execute(id: string) {
    try {
      mercadopago.configure({
        sandbox: true,
        access_token: this.access_token,
      });

      const payment = mercadopago.payment.search({
        qs: {
          'order.id': id,
        },
      });
      console.log(payment);
    } catch (e) {
      throw e;
    }
  }
}

export { UpdateStatusUseCase };
