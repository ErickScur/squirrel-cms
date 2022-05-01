import { Controller, Put } from '@overnightjs/core';
import { AddProductController } from '../useCases/addProduct/AddProductController';

// --- Express Types
import { Request, Response, NextFunction } from 'express';

@Controller('cart')
class CartController {
  private _addProductController = new AddProductController();

  @Put(':id')
  private async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await this._addProductController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { CartController };
