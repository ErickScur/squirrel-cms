import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

class DeleteCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

    const { id } = req.params;

    try {
      const category = await deleteCategoryUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(error.statusCode || 400).json({ message: error.message });
    }
  }
}

export { DeleteCategoryController };
