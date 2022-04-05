import { NextFunction, Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { container } from 'tsyringe';

class CreateCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { name, description } = req.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    try {
      await createCategoryUseCase.execute({ name, description });
      return res.status(201).send();
    } catch (error) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export { CreateCategoryController };
