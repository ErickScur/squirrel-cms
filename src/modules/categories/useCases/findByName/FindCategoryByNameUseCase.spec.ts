import { HTTPNotFound } from '@http/HTTPHandler';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { FindCategoryByNameUseCase } from './FindCategoryByNameUseCase';

let findCategoryByNameUseCase: FindCategoryByNameUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Find Category By Name', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    findCategoryByNameUseCase = new FindCategoryByNameUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to find a category by name', async () => {
    const category = await categoriesRepositoryInMemory.create({
      name: 'Category Test',
      description: 'Category description test',
    });
    const findCategory = await findCategoryByNameUseCase.execute(category.name);

    expect(findCategory).toEqual(category);
  });

  it('should not be able to find a non existing category', async () => {
    expect(async () => {
      await findCategoryByNameUseCase.execute('41390849301');
    }).rejects.toBeInstanceOf(HTTPNotFound);
  });
});
