// --- OvernightJS
import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';

// --- Express Types
import { Request, Response, NextFunction } from 'express';

// --- Controllers ---
import { CreateBrandController } from '../useCases/createBrand/CreateBrandController';
import { DeleteBrandController } from '../useCases/deleteBrand/DeleteBrandController';
import { FindAllBrandsController } from '../useCases/findAll/FindAllBrandsController';
import { FindBrandByIdController } from '../useCases/findById/FindBrandByIdController';
import { FindBrandByNameController } from '../useCases/findByName/FindBrandByNameController';
import { UpdateBrandController } from '../useCases/updateBrand/UpdateBrandController';

@Controller('brands')
class BrandsController {
  private _createBrandController = new CreateBrandController();
  private _findAllBrandsController = new FindAllBrandsController();
  private _findBrandByIdController = new FindBrandByIdController();
  private _findBrandByNameController = new FindBrandByNameController();
  private _updateBrandController = new UpdateBrandController();
  private _deleteBrandController = new DeleteBrandController();

  @Get()
  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findAllBrandsController.handle(req, res);
    } catch (error) {
      next(error);
    }
  }
  @Post()
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._createBrandController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Get(':id')
  private async getById(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findBrandByIdController.handle(req, res);
    } catch (error) {
      next(error);
    }
  }
  @Put(':id')
  private async update(req: Request, res: Response, next: NextFunction) {
    try {
      await this._updateBrandController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Delete(':id')
  private async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this._deleteBrandController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  @Get('name/:name')
  private async getByName(req: Request, res: Response, next: NextFunction) {
    try {
      await this._findBrandByNameController.handle(req, res);
    } catch (error) {
      next(error);
    }
  }
}

export { BrandsController };
