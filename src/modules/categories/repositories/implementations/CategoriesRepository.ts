import { Category } from '../../model/Category';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
  IUpdateCategoryDTO,
} from '../ICategoriesRepository';

import { CategorySchema } from '../../schema/CategorySchema';

class CategoriesRepository implements ICategoriesRepository {
  async findAll(): Promise<Category[]> {
    try {
      return await CategorySchema.find();
    } catch (error) {
      throw error;
    }
  }
  async findById(id: string): Promise<Category> {
    try {
      return await CategorySchema.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async findByName(name: string): Promise<Category> {
    try {
      return await CategorySchema.findOne({ name });
    } catch (error) {
      throw error;
    }
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    try {
      return await CategorySchema.create({ name, description });
    } catch (error) {
      throw error;
    }
  }
  async update({ name, description, id }: IUpdateCategoryDTO): Promise<Category> {
    try {
      return await CategorySchema.findByIdAndUpdate(id, { description, name });
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<Category> {
    try {
      return await CategorySchema.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

export { CategoriesRepository };
