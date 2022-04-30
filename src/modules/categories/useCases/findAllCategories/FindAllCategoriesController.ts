import { FindAllCategoriesUseCase } from './FindAllCategoriesUseCase';
import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';

class FindAllCategoriesController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const findAllCategoriesUseCase = container.resolve(FindAllCategoriesUseCase);
    try {
      const categories = await findAllCategoriesUseCase.execute();
      return res.status(200).send(categories);
    } catch (error) {
      next(error);
    }
  }
}

export { FindAllCategoriesController };
