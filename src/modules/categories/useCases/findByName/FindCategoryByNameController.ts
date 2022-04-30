import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { FindCategoryByNameUseCase } from './FindCategoryByNameUseCase';

class FindCategoryByNameController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const findCategoryByNameUseCase = container.resolve(FindCategoryByNameUseCase);
    const { name } = req.params;
    try {
      const category = await findCategoryByNameUseCase.execute(name);
      return res.status(200).send(category);
    } catch (error) {
      next(error);
    }
  }
}

export { FindCategoryByNameController };
