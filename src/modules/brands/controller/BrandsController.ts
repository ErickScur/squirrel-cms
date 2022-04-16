import { Controller, Post } from '@overnightjs/core';
import { CreateBrandController } from '../useCases/createBrand/CreateBrandController';
import { Request, Response, NextFunction } from 'express';

@Controller('brands')
class BrandsController {
  private _createBrandController = new CreateBrandController();

  @Post()
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._createBrandController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { BrandsController };
