import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { FindAllCategoriesUseCase } from './FindAllCategoriesUseCase';

let findAllCategoriesUseCase: FindAllCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('List all Categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    findAllCategoriesUseCase = new FindAllCategoriesUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to list all categories', async () => {
    const category1 = await categoriesRepositoryInMemory.create({
      name: 'Category Test',
      description: 'Category description test',
    });

    const category2 = await categoriesRepositoryInMemory.create({
      name: 'Category Test 2',
      description: 'Category description test 2',
    });

    const categories = await findAllCategoriesUseCase.execute();

    expect(categories).toEqual(expect.arrayContaining([category1, category2]));
  });
});
