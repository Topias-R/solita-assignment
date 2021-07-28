import env from 'dotenv-safe';
env.config();

import 'reflect-metadata';

import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { prepareDatabaseConnection } from './db';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  await prepareDatabaseConnection();
  await app.prepare();

  createServer((req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  // eslint-disable-next-line no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  );
})();
