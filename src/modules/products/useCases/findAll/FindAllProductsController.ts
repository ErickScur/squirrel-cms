import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllProductsUseCase } from './FindAllProductsUseCase';

class FindAllProductsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllProductsUseCase = container.resolve(FindAllProductsUseCase);
    try {
      const products = await findAllProductsUseCase.execute();
      return res.status(200).send(products);
    } catch (error) {
      return res.status(error.statusCode || 400).json({ message: error.message });
    }
  }
}

export { FindAllProductsController };
