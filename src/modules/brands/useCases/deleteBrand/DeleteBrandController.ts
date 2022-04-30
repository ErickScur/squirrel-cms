import { NextFunction, Request, Response } from 'express';
import { DeleteBrandUseCase } from './DeleteBrandUseCase';
import { container } from 'tsyringe';

class DeleteBrandController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { id } = req.params;

    const deleteBrandUseCase = container.resolve(DeleteBrandUseCase);

    try {
      await deleteBrandUseCase.execute(id);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

export { DeleteBrandController };
