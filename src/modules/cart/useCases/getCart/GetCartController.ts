import { container } from 'tsyringe';
import { GetCartUseCase } from './GetCartUseCase';
import { NextFunction, Request, Response } from 'express';

class GetCartController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const getCartUseCase = container.resolve(GetCartUseCase);
    const { id } = req.params;
    try {
      const cart = await getCartUseCase.execute(id);
      return res.status(200).send(cart);
    } catch (e) {
      next(e);
    }
  }
}

export { GetCartController };
