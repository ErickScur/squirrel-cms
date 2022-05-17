import { HTTPNotFound, HTTPBadRequest } from '@http/HTTPHandler';
import { Brand } from '@modules/brands/model/Brand';
import { IBrandsRepository } from '@modules/brands/repositories/IBrandsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateBrandUseCase {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository
  ) {}

  async execute({ name, description, id }): Promise<Brand> {
    try {
      const brand = await this.brandsRepository.findById(id);
      if (!brand) throw new HTTPNotFound('Brand was not found!');

      const brandSameName = await this.brandsRepository.findByName(name);
      if (brandSameName)
        if (brandSameName._id.toString() != id)
          throw new HTTPBadRequest('A Brand with the same name already exists');

      const updatedBrand = await this.brandsRepository.update({
        name,
        description,
        id,
      });
      if (!updatedBrand)
        throw new HTTPBadRequest('An error ocurred while trying to update the Category');

      return brand;
    } catch (error) {
      throw error;
    }
  }
}

export { UpdateBrandUseCase };
