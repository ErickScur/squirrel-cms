import { Controller, Delete, Get, Put } from '@overnightjs/core';
import { AddProductController } from '../useCases/addProduct/AddProductController';
import { GetCartController } from '../useCases/getCart/GetCartController';

// --- Express Types
import { Request, Response, NextFunction } from 'express';
import { RemoveProductController } from '../useCases/removeProduct/RemoveProductController';

@Controller('cart')
class CartController {
  private _addProductController = new AddProductController();
  private _getCartController = new GetCartController();
  private _removeProductController = new RemoveProductController();

  @Get(':id')
  private async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      await this._getCartController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Put(':id')
  private async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await this._addProductController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Delete(':id')
  private async removeProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await this._removeProductController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { CartController };
