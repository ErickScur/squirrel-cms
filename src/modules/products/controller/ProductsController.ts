import { Controller, Get, Post } from '@overnightjs/core';
import { CreateProductController } from '../useCases/createProduct/CreateProductController';
import { Request, Response, NextFunction } from 'express';
import { FindAllProductsController } from '../useCases/findAll/FindAllProductsController';
import { FindByIdController } from '../useCases/findById/FindByIdController';

@Controller('products')
class ProductsController {
  private _createProductController = new CreateProductController();
  private _findAllProductsController = new FindAllProductsController();
  private _findByIdController = new FindByIdController();

  @Post()
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._createProductController.handle(req, res);
    } catch (error) {
      next(error);
    }
  }
  @Get()
  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findAllProductsController.handle(req, res);
    } catch (error) {
      next(error);
    }
  }
  @Get(':id')
  private async findById(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findByIdController.handle(req, res);
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
