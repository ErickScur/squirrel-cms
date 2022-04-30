import { Controller, Post } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import { CreateUserController } from '../useCases/createUser/CreateUserController';

@Controller('users')
class UsersController {
  private _createUserController = new CreateUserController();
  @Post()
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._createUserController.handle(req, res);
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };
