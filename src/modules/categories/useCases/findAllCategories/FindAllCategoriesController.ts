import { FindAllCategoriesUseCase } from './FindAllCategoriesUseCase';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

class FindAllCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createCategoryUseCase = container.resolve(FindAllCategoriesUseCase);
    try {
      const categories = await createCategoryUseCase.execute();
      return res.status(200).send(categories);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { FindAllCategoriesController };
