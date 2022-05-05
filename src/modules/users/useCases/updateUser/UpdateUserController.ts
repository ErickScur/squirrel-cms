import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    const { id } = req.params;
    const { name, cpf, email } = req.body;

    try {
      const user = await updateUserUseCase.execute(id, { name, cpf, email });
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}

export { UpdateUserController };
