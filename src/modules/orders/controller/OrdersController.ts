import { Controller, Middleware, Post } from '@overnightjs/core';
import { CheckoutController } from '../useCases/checkout/CheckoutController';
import { Request, Response, NextFunction } from 'express';
import { authenticationMiddleware } from '@middlewares/userAuthenticated';

@Controller('orders')
class OrdersController {
  private _checkoutController = new CheckoutController();
  @Post('checkout')
  @Middleware(authenticationMiddleware)
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this._checkoutController.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
