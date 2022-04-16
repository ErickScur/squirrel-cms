import { BrandsController } from '../modules/brands/controller/BrandsController';
import { CategoriesController } from '../modules/categories/controller/CategoriesController';
import { ProductsController } from '../modules/products/controller/ProductsController';

export const controllers = [
  new CategoriesController(),
  new BrandsController(),
  new ProductsController(),
];
