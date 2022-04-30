import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { Request, Response } from 'express';

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const { email, password } = req.body;
    try {
      const response = await authenticateUserUseCase.execute(email, password);
      return res.status(200).send(response);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

export { AuthenticateUserController };
