import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllUsersUseCase } from './FindAllUsersUseCase';

class FindAllUsersController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const findAllUsersUseCase = container.resolve(FindAllUsersUseCase);
    try {
      const users = await findAllUsersUseCase.execute();
      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
}

export { FindAllUsersController };
