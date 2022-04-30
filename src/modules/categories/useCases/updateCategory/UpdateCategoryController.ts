import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

class UpdateCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);

    const { name, description } = req.body;
    const { id } = req.params;

    try {
      const category = await updateCategoryUseCase.execute({ name, description, id });
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { UpdateCategoryController };
