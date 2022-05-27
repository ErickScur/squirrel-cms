import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import { AddAddressController } from '../useCases/addAddress/AddAddressController';
import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { DeleteAddressController } from '../useCases/deleteAddress/DeleteAddressController';
import { FindAllUsersController } from '../useCases/findAll/FindAllUsersController';
import { FindUserByIdController } from '../useCases/findById/FindUserByIdController';
import { UpdateAddressController } from '../useCases/updateAddress/UpdateAddressController';
import { UpdateUserController } from '../useCases/updateUser/UpdateUserController';

@Controller('users')
class UsersController {
  private _createUserController = new CreateUserController();
  private _updateUserController = new UpdateUserController();
  private _findAllUsersController = new FindAllUsersController();
  private _findByIdController = new FindUserByIdController();
  private _addAddressController = new AddAddressController();
  private _deleteAddressController = new DeleteAddressController();
  private _updateAddressController = new UpdateAddressController();

  @Post()
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._createUserController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Get()
  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findAllUsersController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Get(':id')
  private async getById(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findByIdController.handle(req, res, next);
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
  @Post(':id/address')
  private async addAddress(req: Request, res: Response, next: NextFunction) {
    try {
      await this._addAddressController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Put(':id/address/:addressId')
  private async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      await this._updateAddressController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Delete(':id/address/:addressId')
  private async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      await this._deleteAddressController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };
