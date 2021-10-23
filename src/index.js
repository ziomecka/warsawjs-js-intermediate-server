require('dotenv').config();

import express from 'express';
import path from 'path';
import fs from 'fs';

import { filter, sorter } from './services';

const app = express();

app.use(corsMiddleware);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/localized', (req, res) => {
  const filePath = path.resolve(
    __dirname,
    './db/',
    [req.query.lang, 'json'].join('.'),
  );

  fs.readFile(filePath, 'utf8', (err, file) => {
    if (err) {
      res.sendStatus(500);
    }

    return res.json(JSON.parse(file));
  });
});

app.get('/channels', (req, res) => {
  const filePath = path.resolve(__dirname, './db/channels.json');

  fs.readFile(filePath, 'utf8', (err, file) => {
    if (err) {
      return res.sendStatus(500);
    }

    const {
      query: { sortBy, orderBy, ...filters },
    } = req;

    let { channels } = JSON.parse(file);

    if (filters) {
      try {
        channels = filter.filter(filters)(channels);
      } catch (err) {
        return res.sendStatus(500);
      }
    }

    if (sortBy) {
      if (!orderBy) {
        return res.sendStatus(400);
      }

      try {
        channels = sorter.sort(sortBy, orderBy)(channels);
      } catch (err) {
        console.warn(err);
        return res.sendStatus(500);
      }
    }

    return res.json({ channels });
  });
});

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log('Server listening at  http://localhost:', port);
});

function corsMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
}
