import { Controller, Middleware, Post } from '@overnightjs/core';
import { CheckoutController } from '../useCases/checkout/CheckoutController';
import { Request, Response, NextFunction } from 'express';
import { authenticationMiddleware } from '@middlewares/userAuthenticated';
import { UpdateStatusController } from '../useCases/updateStatus/UpdateStatusController';

@Controller('orders')
class OrdersController {
  private _checkoutController = new CheckoutController();
  private _updateStatusController = new UpdateStatusController();

  @Post('checkout')
  @Middleware(authenticationMiddleware)
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._checkoutController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  @Post('webhook')
  private async webhook(req: Request, res: Response, next: NextFunction) {
    try {
      await this._updateStatusController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
