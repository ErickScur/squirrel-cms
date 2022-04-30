import { NextFunction, Request, Response } from 'express';
import { FindBrandByNameUseCase } from './FindBrandByNameUseCase';
import { container } from 'tsyringe';

class FindBrandByNameController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const findBrandByNameUseCase = container.resolve(FindBrandByNameUseCase);
    const { name } = req.params;
    try {
      const brands = await findBrandByNameUseCase.execute(name);
      return res.status(200).send(brands);
    } catch (error) {
      next(error);
    }
  }
}

export { FindBrandByNameController };
