import { NextFunction, Request, Response } from 'express';
import { FindAllBrandsUseCase } from './FindAllBrandsUseCase';
import { container } from 'tsyringe';

class FindAllBrandsController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const findAllBrandsUseCase = container.resolve(FindAllBrandsUseCase);

    try {
      const brands = await findAllBrandsUseCase.execute();
      return res.status(200).send(brands);
    } catch (error) {
      next(error);
    }
  }
}

export { FindAllBrandsController };
