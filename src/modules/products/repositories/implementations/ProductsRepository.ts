import { Product } from '../../model/Product';
import {
  ICreateProductDTO,
  IProductsRepository,
  IUpdateProductDTO,
} from '../IProductsRepository';
import { ProductSchema } from '../../schema/ProductSchema';

class ProductsRepository implements IProductsRepository {
  async findAll(): Promise<Product[]> {
    try {
      return await ProductSchema.find();
    } catch (error) {
      throw error;
    }
  }
  async findById(id: string): Promise<Product> {
    try {
      return await ProductSchema.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async findByName(name: string): Promise<Product> {
    try {
      return await ProductSchema.findOne({ name });
    } catch (error) {
      throw error;
    }
  }
  async create({
    name,
    description,
    mainImage,
    price,
    stock,
    categoryId,
    brandId,
    slug,
  }: ICreateProductDTO): Promise<Product> {
    try {
      return await ProductSchema.create({
        name,
        description,
        mainImage,
        price,
        stock,
        categoryId,
        brandId,
        slug,
      });
    } catch (error) {
      throw error;
    }
  }
  async update({
    name,
    description,
    mainImage,
    price,
    stock,
    categoryId,
    brandId,
    id,
    slug,
  }: IUpdateProductDTO): Promise<Product> {
    try {
      return await ProductSchema.findByIdAndUpdate(id, {
        name,
        description,
        mainImage,
        price,
        stock,
        categoryId,
        brandId,
        slug,
      });
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<Product> {
    try {
      return await ProductSchema.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

export { ProductsRepository };
