import { HTTPBadRequest, HTTPNotFound } from '@http/HTTPHandler';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

let updateCategoryUseCase: UpdateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Update Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    updateCategoryUseCase = new UpdateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to update a category', async () => {
    const category1 = await categoriesRepositoryInMemory.create({
      name: 'Category Test',
      description: 'Category description test',
    });
    await updateCategoryUseCase.execute({
      name: 'New name',
      description: 'New description',
      id: category1._id,
    });
    const updated = await categoriesRepositoryInMemory.findById(category1._id);
    expect(updated).toMatchObject({
      name: 'New name',
      description: 'New description',
      id: category1._id,
    });
  });

  it('should not be able to update an non existing category', async () => {
    expect(async () => {
      await updateCategoryUseCase.execute({
        name: 'New name',
        description: 'New description',
        id: '21312312',
      });
    }).rejects.toBeInstanceOf(HTTPNotFound);
  });

  it('should not be able to update a category using the same name as an already existing category', async () => {
    const category1 = await categoriesRepositoryInMemory.create({
      name: 'Category Test',
      description: 'Category description test',
    });
    const category2 = await categoriesRepositoryInMemory.create({
      name: 'Category Test 2',
      description: 'Category description test',
    });
    expect(async () => {
      await updateCategoryUseCase.execute({
        name: category1.name,
        description: 'New description',
        id: category2._id,
      });
    }).rejects.toBeInstanceOf(HTTPBadRequest);
  });
});
