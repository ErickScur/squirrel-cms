import express from 'express';
import cors from 'cors';
import { controllers } from './controllers';

import { Server as OvernightServer } from '@overnightjs/core';
import { errorHandler } from './middlewares/errorHandler';

class Server extends OvernightServer {
  private readonly port: number;

  constructor(port: number) {
    super();
    this.port = port;

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(express.json());
    super.addControllers(controllers);
    this.app.use(errorHandler);
  }

  public start() {
    this.app.get('/health', (req, res) => {
      res.send('API is Running');
    });
    this.app.listen(this.port, () => {
      console.log(`✅ Server is listening on port ${this.port}`);
    });
  }
}

export { Server };
