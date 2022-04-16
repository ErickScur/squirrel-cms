import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/categories/repositories/implementations/CategoriesRepository';
import { BrandsRepository } from '../../modules/brands/repositories/implementations/BrandRepository';
import { IBrandsRepository } from '../../modules/brands/repositories/IBrandsRepository';
import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository';
import { ProductsRepository } from '../../modules/products/repositories/implementations/ProductsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<IBrandsRepository>('BrandsRepository', BrandsRepository);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);
