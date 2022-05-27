import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { UpdateAddressUseCase } from './UpdateAddressUseCase';

class UpdateAddressController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const updateAddressUseCase = container.resolve(UpdateAddressUseCase);
    const { id, addressId } = req.params;
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
      const user = await updateAddressUseCase.execute(id, addressId, {
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

export { UpdateAddressController };
