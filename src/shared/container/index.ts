import { IBrandsRepository } from '@modules/brands/repositories/IBrandsRepository';
import { BrandsRepository } from '@modules/brands/repositories/implementations/BrandRepository';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/categories/repositories/implementations/CategoriesRepository';
import { ProductsRepository } from '@modules/products/repositories/implementations/ProductsRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<IBrandsRepository>('BrandsRepository', BrandsRepository);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
