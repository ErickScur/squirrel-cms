import { NextFunction, Request, Response } from 'express';
import { UpdateBrandUseCase } from './UpdateBrandUseCase';
import { container } from 'tsyringe';

class UpdateBrandController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { name, description } = req.body;
    const { id } = req.params;

    const updateBrandUseCase = container.resolve(UpdateBrandUseCase);

    try {
      await updateBrandUseCase.execute({ name, description, id });
      return res.status(200).send();
    } catch (error) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export { UpdateBrandController };
