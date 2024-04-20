import createDebug from 'debug';
import { createServer } from 'http';
import 'dotenv/config';
import { exit } from 'process';
import { createApp, startApp } from './app.js';
import { dbConnect } from './tools/db.connect.js';

const debug = createDebug('W7E:server');
debug('Starting server');

const port = process.env.PORT ?? 3400;

const app = createApp();
const server = createServer(app);

dbConnect()
  .then((prisma) => {
    startApp(app, prisma);
    server.listen(port);
  })
  .catch((error) => {
    server.emit('Error: ', error);
  });

server.on('error', (error) => {
  debug('Error', error);
  exit(1);
});

server.on('listening', () => {
  debug(`server running on http://localhost:${port}`);
});
