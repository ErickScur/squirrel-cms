import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindByIdUseCase } from './FindByIdUseCase';

class FindByIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const findByIdUseCase = container.resolve(FindByIdUseCase);
    const { id } = req.params;
    try {
      const product = await findByIdUseCase.execute(id);
      return res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  }
}

export { FindByIdController };
