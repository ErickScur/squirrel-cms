import { DeleteProductUseCase } from './DeleteProductUseCase';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

class DeleteProductController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const deleteProductUseCase = container.resolve(DeleteProductUseCase);
    const { id } = req.params;
    try {
      await deleteProductUseCase.execute(id);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

export { DeleteProductController };
