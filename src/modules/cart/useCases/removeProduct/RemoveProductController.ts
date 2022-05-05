import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { RemoveProductUseCase } from './RemoveProductUseCase';

class RemoveProductController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const removeProductUseCase = container.resolve(RemoveProductUseCase);
    const { id } = req.params;
    const { product } = req.body;
    try {
      const user = await removeProductUseCase.execute(id, product);
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}

export { RemoveProductController };
