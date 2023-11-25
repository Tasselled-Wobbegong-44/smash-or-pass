//import pool from pg
const { Pool } = require('pg');
require('dotenv').config();

//create pg uri
const PG_URI = process.env.PG_URI;

//initialize port

const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.json({ test: 'test data' });
});

app.listen(app.get('port'), function () {
  console.log('express server listening on port ${}' + app.get('port'));
});
