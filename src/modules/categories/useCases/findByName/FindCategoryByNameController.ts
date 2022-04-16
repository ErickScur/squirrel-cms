import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { FindCategoryByNameUseCase } from './FindCategoryByNameUseCase';

class FindCategoryByNameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findCategoryByNameUseCase = container.resolve(FindCategoryByNameUseCase);
    const { name } = req.params;
    try {
      const category = await findCategoryByNameUseCase.execute(name);
      return res.status(200).send(category);
    } catch (error) {
      return res.status(error.statusCode || 400).json({ message: error.message });
    }
  }
}

export { FindCategoryByNameController };
