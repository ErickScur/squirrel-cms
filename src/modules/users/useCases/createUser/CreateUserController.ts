import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';
import { Request, Response } from 'express';

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
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
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

export { CreateUserController };
