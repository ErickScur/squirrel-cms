import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

class DeleteCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

    const { id } = req.params;

    try {
      const category = await deleteCategoryUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { DeleteCategoryController };
