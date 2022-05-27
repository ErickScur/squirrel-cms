import { HTTPBadRequest } from '@http/HTTPHandler';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { CheckoutUseCase } from './CheckoutUseCase';

class CheckoutController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const checkoutUseCase = container.resolve(CheckoutUseCase);
    const user = req.body._user;
    try {
      if (!user) throw new HTTPBadRequest('No user in request body!');

      const result = await checkoutUseCase.execute(user._id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

export { CheckoutController };
