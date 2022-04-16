import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

class UpdateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);

    const { name, description } = req.body;
    const { id } = req.params;

    try {
      const category = await updateCategoryUseCase.execute({ name, description, id });
      return res.status(204).send();
    } catch (error) {
      return res.status(error.statusCode || 400).json({ message: error.message });
    }
  }
}

export { UpdateCategoryController };
