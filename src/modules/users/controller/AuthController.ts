import { Controller, Post } from '@overnightjs/core';
import { AuthenticateUserController } from '../useCases/authenticateUser/AuthenticateUserController';
import { Request, Response, NextFunction } from 'express';

@Controller('auth')
class AuthController {
  private _authenticateUserController = new AuthenticateUserController();
  @Post('login')
  private async login(req: Request, res: Response, next: NextFunction) {
    try {
      await this._authenticateUserController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { AuthController };
