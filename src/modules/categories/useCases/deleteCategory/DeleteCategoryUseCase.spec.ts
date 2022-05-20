import { HTTPNotFound } from '@http/HTTPHandler';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

let deleteCategoryUseCase: DeleteCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Delete Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to delete a category', async () => {
    const category1 = await categoriesRepositoryInMemory.create({
      name: 'Category Test',
      description: 'Category description test',
    });

    const category2 = await categoriesRepositoryInMemory.create({
      name: 'Category Test 2',
      description: 'Category description test 2',
    });

    const category3 = await categoriesRepositoryInMemory.create({
      name: 'Category Test 2',
      description: 'Category description test 2',
    });

    await deleteCategoryUseCase.execute(category2._id);

    const categories = await categoriesRepositoryInMemory.findAll();

    expect(categories).toEqual(expect.arrayContaining([category1, category3]));
  });

  it('should not be able to delete a non existing category', async () => {
    expect(async () => {
      await deleteCategoryUseCase.execute('47134731431');
    }).rejects.toBeInstanceOf(HTTPNotFound);
  });
});
