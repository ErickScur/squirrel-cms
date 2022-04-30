import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllProductsUseCase } from './FindAllProductsUseCase';

class FindAllProductsController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const findAllProductsUseCase = container.resolve(FindAllProductsUseCase);
    try {
      const products = await findAllProductsUseCase.execute();
      return res.status(200).send(products);
    } catch (error) {
      next(error);
    }
  }
}

export { FindAllProductsController };
