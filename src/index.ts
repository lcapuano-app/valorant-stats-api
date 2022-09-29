import logger from './logger';
import app from './app';
import { HenrikController } from './controllers/henrik-api';
import { TrackerController } from './controllers/tracker-api';

const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () => {
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  HenrikController.clearCache();
  TrackerController.clearCache();
});
