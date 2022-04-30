import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { CreateProductController } from '../useCases/createProduct/CreateProductController';
import { Request, Response, NextFunction } from 'express';
import { FindAllProductsController } from '../useCases/findAll/FindAllProductsController';
import { FindByIdController } from '../useCases/findById/FindByIdController';
import { UpdateProductController } from '../useCases/updateProduct/UpdateProductController';
import { DeleteProductController } from '../useCases/deleteProduct/DeleteProductController';

@Controller('products')
class ProductsController {
  private _createProductController = new CreateProductController();
  private _findAllProductsController = new FindAllProductsController();
  private _findByIdController = new FindByIdController();
  private _updateProductController = new UpdateProductController();
  private _deleteProductController = new DeleteProductController();

  @Post()
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._createProductController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Get()
  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findAllProductsController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Get(':id')
  private async findById(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findByIdController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  // TODO findByName
  @Get('name/:name')
  private async findByName(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findAllProductsController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Delete(':id')
  private async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this._deleteProductController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Put(':id')
  private async update(req: Request, res: Response, next: NextFunction) {
    try {
      await this._updateProductController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
