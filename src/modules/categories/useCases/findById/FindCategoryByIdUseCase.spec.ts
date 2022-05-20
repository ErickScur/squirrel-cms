import { HTTPNotFound } from '@http/HTTPHandler';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { FindCategoryByIdUseCase } from './FindCategoryByIdUseCase';

let findCategoryByIdUseCase: FindCategoryByIdUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Find Category By Id', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    findCategoryByIdUseCase = new FindCategoryByIdUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to find a category by id', async () => {
    const category = await categoriesRepositoryInMemory.create({
      name: 'Category Test',
      description: 'Category description test',
    });
    const findCategory = await findCategoryByIdUseCase.execute(category._id);

    expect(findCategory).toEqual(category);
  });

  it('should not be able to find a non existing category', async () => {
    expect(async () => {
      await findCategoryByIdUseCase.execute('41390849301');
    }).rejects.toBeInstanceOf(HTTPNotFound);
  });
});
