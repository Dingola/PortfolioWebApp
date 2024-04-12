'use strict';

import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.js';
import HomeRouter from './routes/HomeRouter.js';
import CareerRouter from './routes/CareerRouter.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
// const __dirname = import.meta.dirname;  // node.js 20.11 / 21.2
    
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/node_modules'));
app.use('/api/home', HomeRouter.routes);
app.use('/api/career', CareerRouter.routes);
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));


app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(config.port, () => console.log('APP is listening on url http://localhost:' + config.port));
