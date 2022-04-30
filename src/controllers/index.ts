import { BrandsController } from '../modules/brands/controller/BrandsController';
import { CategoriesController } from '../modules/categories/controller/CategoriesController';
import { ProductsController } from '../modules/products/controller/ProductsController';
import { AuthController } from '../modules/users/controller/AuthController';
import { UsersController } from '../modules/users/controller/UsersController';

export const controllers = [
  new CategoriesController(),
  new BrandsController(),
  new ProductsController(),
  new UsersController(),
  new AuthController(),
];
