import { NextFunction, Request, Response } from 'express';
import { FindBrandByIdUseCase } from './FindBrandByIdUseCase';
import { container } from 'tsyringe';

class FindBrandByIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const findBrandByIdUseCase = container.resolve(FindBrandByIdUseCase);
    const { id } = req.params;
    try {
      const brands = await findBrandByIdUseCase.execute(id);
      return res.status(200).send(brands);
    } catch (error) {
      next(error);
    }
  }
}

export { FindBrandByIdController };
