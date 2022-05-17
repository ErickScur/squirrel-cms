import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateBrandUseCase } from './CreateBrandUseCase';

class CreateBrandController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { name, description } = req.body;

    const createBrandUseCase = container.resolve(CreateBrandUseCase);

    try {
      await createBrandUseCase.execute({ name, description });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}

export { CreateBrandController };
