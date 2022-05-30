import { Environment } from '@environment/index';
import mercadopago from 'mercadopago';
import { injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

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
class CreatePaymentUseCase {
  private access_token: string;

  constructor() {
    this.access_token = Environment.getConfig('MERCADO_PAGO_TOKEN');
  }
  async execute(items: IItemsInterface[], email: string) {
    try {
      mercadopago.configure({
        sandbox: true,
        access_token: this.access_token,
      });

      const id = uuid();

      const payload: IPaymentInterface = {
        items,
        payer: {
          email,
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

export { IItemsInterface, IPaymentInterface, CreatePaymentUseCase };
