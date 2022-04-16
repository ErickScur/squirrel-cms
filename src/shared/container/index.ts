import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/categories/repositories/implementations/CategoriesRepository';
import { BrandsRepository } from '../../modules/brands/repositories/implementations/BrandRepository';
import { IBrandsRepository } from '../../modules/brands/repositories/IBrandsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<IBrandsRepository>('BrandsRepository', BrandsRepository);
