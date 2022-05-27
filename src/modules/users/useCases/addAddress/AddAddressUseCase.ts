import { HTTPNotFound } from '@http/HTTPHandler';
import { User } from '@modules/users/model/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { Address } from '@modules/users/model/User';
import { inject, injectable } from 'tsyringe';

interface IAddAdressDTO {
  zip_code: string;
  street_name: string;
  street_number: string;
  city_name: string;
  state_name: string;
  country_name: string;
  complement: string;
}
@injectable()
class AddAddressUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(
    id: string,
    {
      zip_code,
      street_name,
      street_number,
      city_name,
      state_name,
      country_name,
      complement,
    }: IAddAdressDTO
  ): Promise<User> {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) throw new HTTPNotFound('User was not found!');

      user.addresses.push({
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

export { AddAddressUseCase };
