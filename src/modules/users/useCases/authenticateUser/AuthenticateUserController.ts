import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { NextFunction, Request, Response } from 'express';

class AuthenticateUserController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const { email, password } = req.body;
    try {
      const response = await authenticateUserUseCase.execute(email, password);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}

export { AuthenticateUserController };
