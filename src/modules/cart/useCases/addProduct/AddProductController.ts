import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { AddProductUseCase } from './AddProductUseCase';

class AddProductController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const addProductUseCase = container.resolve(AddProductUseCase);
    const { id } = req.params;
    const { product, quantity } = req.body;
    try {
      const user = await addProductUseCase.execute(id, product, quantity);
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}

export { AddProductController };
