import { NextFunction, Request, Response } from 'express';
import { CreateBrandUseCase } from './CreateBrandUseCase';
import { container } from 'tsyringe';

class CreateBrandController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { name, description } = req.body;

    const createBrandUseCase = container.resolve(CreateBrandUseCase);

    try {
      await createBrandUseCase.execute({ name, description });
      return res.status(201).send();
    } catch (error) {
      return res.status(error.statusCode || 400).json({ message: error.message });
    }
  }
}

export { CreateBrandController };
