import { Server } from './Server';

import { Environment } from './environment';

import { DatabaseConnection } from './database';

import './shared/container';

(async () => {
  console.log('API Starting');

  const connectionString = Environment.getConfig('MONGODB_CONNECTION_STRING');
  if (!connectionString) throw new Error('MongoDB Connection String is not set!');

  await new DatabaseConnection(connectionString).connect();

  const port = Environment.getConfig('NODE_LOCAL_PORT');
  new Server(port).start();
})();
