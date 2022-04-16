import { Brand } from '../../model/Brand';
import { BrandSchema } from '../../schema/BrandSchema';
import {
  IBrandsRepository,
  ICreateBrandDTO,
  IUpdateBrandDTO,
} from '../IBrandsRepository';

class BrandsRepository implements IBrandsRepository {
  async findAll(): Promise<Brand[]> {
    try {
      return await BrandSchema.find();
    } catch (error) {
      throw error;
    }
  }
  async findById(id: string): Promise<Brand> {
    try {
      return await BrandSchema.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async findByName(name: string): Promise<Brand> {
    try {
      return await BrandSchema.findOne({ name });
    } catch (error) {
      throw error;
    }
  }
  async create({ name, description }: ICreateBrandDTO): Promise<Brand> {
    try {
      return await BrandSchema.create({ name, description });
    } catch (error) {
      throw error;
    }
  }
  async update({ name, description, id }: IUpdateBrandDTO): Promise<Brand> {
    try {
      return await BrandSchema.findByIdAndUpdate(id, { name, description });
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<Brand> {
    try {
      return await BrandSchema.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

export { BrandsRepository };
