import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { DeleteAddressUseCase } from './DeleteAddressUseCase';

class DeleteAddressController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const deleteAddressUseCase = container.resolve(DeleteAddressUseCase);
    const { id, addressId } = req.params;
    try {
      const user = await deleteAddressUseCase.execute(id, addressId);
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}

export { DeleteAddressController };
