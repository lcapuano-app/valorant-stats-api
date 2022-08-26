import logger from './logger';
import app from './app';
import { DiscordBot } from './discord-bot';
import { HenrikController } from './controllers/henrik-api';

const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () => {
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  DiscordBot.getInstance();
  HenrikController.clearCache();
});
