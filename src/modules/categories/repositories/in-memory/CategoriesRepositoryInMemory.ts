import { Category } from '@modules/categories/model/Category';
import { CategorySchema } from '@modules/categories/schema/CategorySchema';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
  IUpdateCategoryDTO,
} from '../ICategoriesRepository';

// This implementation of repository is only used for testing with JEST

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
    const index = this.categories.findIndex(c => c._id.toString() == id);
    const category = this.categories[index];
    Object.assign(category, {
      name,
      description,
    });
    return category;
  }
  async delete(id: string): Promise<Category> {
    const index = this.categories.findIndex(c => c._id.toString() == id);
    const category = this.categories[index];
    this.categories.splice(index, 1);
    return category;
  }
}

export { CategoriesRepositoryInMemory };
