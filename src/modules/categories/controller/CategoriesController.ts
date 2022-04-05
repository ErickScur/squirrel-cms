import { Controller, Get, Post } from '@overnightjs/core';
import { CreateCategoryController } from '../useCases/createCategory/CreateCategoryController';
import { Request, Response, NextFunction } from 'express';
import { FindAllCategoriesController } from '../useCases/findAllCategories/FindAllCategoriesController';

@Controller('categories')
class CategoriesController {
  private _createCategoryController = new CreateCategoryController();
  private _findAllCategoriesController = new FindAllCategoriesController();

  @Get()
  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findAllCategoriesController.handle(req, res);
    } catch (error) {
      next(error);
    }
  }
  @Post()
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._createCategoryController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { CategoriesController };
