import { Server } from './Server';

import { Environment } from './environment';

(async () => {
  const port = Environment.getConfig('NODE_LOCAL_PORT');

  new Server(port).start();
})();
