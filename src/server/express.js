/*eslint-disable no-console */

import compression from 'compression';
import config from './config';
import express from 'express';
import render from './render';
import api from './api';
import Fetcher from '../lib/fetcher';

export default function() {

  const app = express();

  app.use(compression());

  app.disable('x-powered-by');

  if (process.env.NODE_ENV === 'production') {
    app.use('/build', express.static('build'));
    app.use('/assets', express.static('assets'), {
      maxAge: 365 * 24 * 60 * 60
    });
  }

  Fetcher.register('dataset', require('../services/dataset/fetcher'));

  app.use(config.api.url, api);

  app.get('*', (request, response) => {
    render(request, response)
      .catch((error) => {
        const msg = error.stack || error;
        console.log(msg);
        response.status(500).send('500: ' + msg);
      });
  });

  app.listen(config.port);

  console.log(`App started on port ${config.port}`);

}
