import { Controller, Delete, Get, Middleware, Post, Put } from '@overnightjs/core';
import { CreateCategoryController } from '../useCases/createCategory/CreateCategoryController';
import { Request, Response, NextFunction } from 'express';
import { FindAllCategoriesController } from '../useCases/findAllCategories/FindAllCategoriesController';
import { FindCategoryByIdController } from '../useCases/findById/FindCategoryByIdController';
import { FindCategoryByNameController } from '../useCases/findByName/FindCategoryByNameController';
import { UpdateCategoryController } from '../useCases/updateCategory/UpdateCategoryController';
import { DeleteCategoryController } from '../useCases/deleteCategory/DeleteCategoryController';
import { adminMiddleware } from '../../../middlewares/adminAuthenticated';

@Controller('categories')
class CategoriesController {
  private _createCategoryController = new CreateCategoryController();
  private _findAllCategoriesController = new FindAllCategoriesController();
  private _findCategoryByIdController = new FindCategoryByIdController();
  private _findCategoryByNameController = new FindCategoryByNameController();
  private _updateCategoryController = new UpdateCategoryController();
  private _deleteCategoryController = new DeleteCategoryController();

  @Get()
  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findAllCategoriesController.handle(req, res, next);
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
  @Get(':id')
  private async getById(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findCategoryByIdController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Get('name/:name')
  private async getByName(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findCategoryByNameController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Put(':id')
  private async update(req: Request, res: Response, next: NextFunction) {
    try {
      await this._updateCategoryController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Middleware(adminMiddleware)
  @Delete(':id')
  private async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this._deleteCategoryController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { CategoriesController };
