import { Category } from '../../model/Category';
import { CategorySchema } from '../../schema/CategorySchema';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
  IUpdateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findAll(): Promise<Category[]> {
    return this.categories;
  }
  async findById(id: string): Promise<Category> {
    const category = this.categories.find(c => c._id.toString() == id);
    return category;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(c => c.name == name);
    return category;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new CategorySchema();
    Object.assign(category, {
      name,
      description,
    });
    this.categories.push(category);
    return category;
  }
  async update({ name, description, id }: IUpdateCategoryDTO): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }
}

export { CategoriesRepositoryInMemory };
