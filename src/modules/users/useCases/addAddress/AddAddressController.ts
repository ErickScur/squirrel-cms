import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { AddAddressUseCase } from './AddAddressUseCase';

class AddAddressController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const addAddressUseCase = container.resolve(AddAddressUseCase);
    const { id } = req.params;
    const {
      zip_code,
      street_name,
      street_number,
      city_name,
      state_name,
      country_name,
      complement,
    } = req.body;
    try {
      const user = await addAddressUseCase.execute(id, {
        zip_code,
        street_name,
        street_number,
        city_name,
        state_name,
        country_name,
        complement,
      });
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}

export { AddAddressController };
