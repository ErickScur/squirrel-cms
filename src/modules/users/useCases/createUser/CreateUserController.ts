import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';
import { NextFunction, Request, Response } from 'express';

class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const { name, email, cpf, password } = req.body;
    try {
      await createUserUseCase.execute({
        name,
        email,
        cpf,
        password,
      });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}

export { CreateUserController };
