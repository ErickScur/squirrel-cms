import { HTTPNotFound } from '@http/HTTPHandler';
import { User } from '@modules/users/model/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IUpdateAdressDTO {
  zip_code: string;
  street_name: string;
  street_number: string;
  city_name: string;
  state_name: string;
  country_name: string;
  complement: string;
}

@injectable()
class UpdateAddressUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(
    id: string,
    addressId: string,
    {
      zip_code,
      street_name,
      street_number,
      city_name,
      state_name,
      country_name,
      complement,
    }: IUpdateAdressDTO
  ): Promise<User> {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) throw new HTTPNotFound('User was not found!');

      const index = user.addresses.findIndex((a: any) => a._id.toString() == addressId);
      if (index == -1) throw new HTTPNotFound('Address was not found!');

      const address = user.addresses[index];
      Object.assign(address, {
        zip_code,
        street_name,
        street_number,
        city_name,
        state_name,
        country_name,
        complement,
      });

      const updated = await this.usersRepository.updateAll(id, user);
      return updated;
    } catch (e) {
      throw e;
    }
  }
}

export { UpdateAddressUseCase };
