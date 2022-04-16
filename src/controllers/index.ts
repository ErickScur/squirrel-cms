import { BrandsController } from '../modules/brands/controller/BrandsController';
import { CategoriesController } from '../modules/categories/controller/CategoriesController';

export const controllers = [new CategoriesController(), new BrandsController()];
