import { storage } from '@configs/MulterStorage';
import { adminMiddleware } from '@middlewares/adminAuthenticated';
import { Controller, Delete, Get, Middleware, Post, Put } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { CreateProductController } from '../useCases/createProduct/CreateProductController';
import { DeleteProductController } from '../useCases/deleteProduct/DeleteProductController';
import { FindAllProductsController } from '../useCases/findAll/FindAllProductsController';
import { FindByIdController } from '../useCases/findById/FindByIdController';
import { UpdateProductController } from '../useCases/updateProduct/UpdateProductController';
import { UploadImageController } from '../useCases/uploadImage/UploadImageController';

const upload = multer(storage.upload('./tmp/products')).array('files', 10);

@Controller('products')
class ProductsController {
  private _createProductController = new CreateProductController();
  private _findAllProductsController = new FindAllProductsController();
  private _findByIdController = new FindByIdController();
  private _updateProductController = new UpdateProductController();
  private _deleteProductController = new DeleteProductController();
  private _uploadImageCOntroller = new UploadImageController();

  @Middleware(adminMiddleware)
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
  @Middleware(adminMiddleware)
  @Delete(':id')
  private async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this._deleteProductController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Middleware(adminMiddleware)
  @Put(':id')
  private async update(req: Request, res: Response, next: NextFunction) {
    try {
      await this._updateProductController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Post(':id/images')
  @Middleware([upload, adminMiddleware])
  private async addImages(req: Request, res: Response, next: NextFunction) {
    try {
      await this._uploadImageCOntroller.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
