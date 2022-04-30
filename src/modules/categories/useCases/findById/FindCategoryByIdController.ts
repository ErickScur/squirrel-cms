import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { FindCategoryByIdUseCase } from './FindCategoryByIdUseCase';

class FindCategoryByIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const findCategoryByIdUseCase = container.resolve(FindCategoryByIdUseCase);
    const { id } = req.params;
    try {
      const category = await findCategoryByIdUseCase.execute(id);
      return res.status(200).send(category);
    } catch (error) {
      next(error);
    }
  }
}

export { FindCategoryByIdController };
