//import pool from pg
const { Pool } = require('pg');
require('dotenv').config();
const PORT = 3000;

//create pg uri
const PG_URI = process.env.PG_URI;
const pool = new Pool({
  connectionString: PG_URI,
});

const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.json({ test: 'test data' });
});

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}...`);
});
