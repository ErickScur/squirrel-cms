import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { FindCategoryByIdUseCase } from './FindCategoryByIdUseCase';

class FindCategoryByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findCategoryByIdUseCase = container.resolve(FindCategoryByIdUseCase);
    const { id } = req.params;
    try {
      const category = await findCategoryByIdUseCase.execute(id);
      return res.status(200).send(category);
    } catch (error) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export { FindCategoryByIdController };
