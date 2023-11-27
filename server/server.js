//import pool from pg
const { Pool } = require('pg');

const express = require('express');
const app = express();
//initialize router
const router = express.Router();
//import controller
const smashController = require('server/controllers');

require('dotenv').config();
const PORT = 3000;

//create pg uri
const PG_URI = process.env.PG_URI;
const pool = new Pool({
  connectionString: PG_URI,
});

//parse request body
app.use(express.json());
//decode formats other than json
app.use(express.urlencoded({ extended: true }));

//create default endpoint
app.use('/character', router);

//idk
router.get('/', function (req, res) {
  res.json({ test: 'test data' });
});

//get character route?
router.get('somepathidk', smashController.getCharacter, (req, res) => {
  return res.status(200).json(res.locals.characters);
});

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}...`);
});

//export pool
//object that contains a prop called query
//its value is a function that return invocation of query
//this will be required in controller file
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
