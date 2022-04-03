import { Controller, Post } from '@overnightjs/core';
import { CreateCategoryController } from '../useCases/createCategory/CreateCategoryController';
import { Request, Response, NextFunction } from 'express';

@Controller('categories')
class CategoriesController {
  private _createCategoryController = new CreateCategoryController();
  @Post()
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._createCategoryController.handle(req, res);
    } catch (error) {
      next(error);
    }
  }
}

export { CategoriesController };
