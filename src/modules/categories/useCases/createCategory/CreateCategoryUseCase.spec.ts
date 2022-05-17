import { HTTPBadRequest } from '@http/HTTPHandler';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };
    await createCategory.execute(category);
    const created = await categoriesRepositoryInMemory.findByName(category.name);

    expect(created).toHaveProperty('_id');
  });

  it('should not be able to create a category with a name already in use', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category description test',
      };
      await createCategory.execute(category);
      await createCategory.execute(category);
    }).rejects.toBeInstanceOf(HTTPBadRequest);
  });
});
