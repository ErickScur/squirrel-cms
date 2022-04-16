import { FindAllCategoriesUseCase } from './FindAllCategoriesUseCase';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

class FindAllCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllCategoriesUseCase = container.resolve(FindAllCategoriesUseCase);
    try {
      const categories = await findAllCategoriesUseCase.execute();
      return res.status(200).send(categories);
    } catch (error) {
      return res.status(error.statusCode || 400).json({ message: error.message });
    }
  }
}

export { FindAllCategoriesController };
