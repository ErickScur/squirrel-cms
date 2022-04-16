import { Controller, Post } from '@overnightjs/core';
import { CreateProductController } from '../useCases/createProduct/CreateProductController';
import { Request, Response, NextFunction } from 'express';

@Controller('products')
class ProductsController {
  private _createProductController = new CreateProductController();

  @Post()
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._createProductController.handle(req, res);
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
