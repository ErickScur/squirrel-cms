import { Controller, Get, Post, Put } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { UpdateUserController } from '../useCases/updateUser/UpdateUserController';

@Controller('users')
class UsersController {
  private _createUserController = new CreateUserController();
  private _updateUserController = new UpdateUserController();

  @Post()
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._createUserController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Put(':id')
  private async update(req: Request, res: Response, next: NextFunction) {
    try {
      await this._updateUserController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };
