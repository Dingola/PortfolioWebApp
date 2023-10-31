'use strict';
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(config.port, () => console.log('APP is listening on url http://localhost:' + config.port));
