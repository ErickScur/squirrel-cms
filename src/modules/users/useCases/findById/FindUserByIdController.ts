import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { FindUserByIdUseCase } from './FindUserByIdUseCase';

class FindUserByIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const findUserByIdUseCase = container.resolve(FindUserByIdUseCase);
    const { id } = req.params;
    try {
      const user = await findUserByIdUseCase.execute(id);
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}

export { FindUserByIdController };
