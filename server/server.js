//import pool from pg
const { Pool } = require("pg");
require("dotenv").config();
//initialize router
const router = express.Router();
//create pg uri
const PG_URI = process.env.PG_URI;
//import controller
const surveyController = require("server/controllers");
//initialize port
const PORT = 300;
//import express
const express = require("express");
const app = express();

//create pool
const pool = new Pool({
  connectionString: PG_URI,
});

// create survey table
surveyController.createSurveyTable();

//parse request body
app.use(express.json());
//decode formats other than json
app.use(express.urlencoded({ extended: true }));

//create default endpoint
app.use("/survey", router);

//get general survey
router.get("/", surveyController.getSurvey, (req, res) => {
  return res.status(200).json(res.locals.survey);
});

//POST 
router.post('/add', surveyController.surveyInput, (req, res) =>{
  
})

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(app.get("port"), function () {
  console.log("express server listening on port ${}" + app.get("port"));
});

//export pool
//object that contains a prop called query
//its value is a function that return invocation of query
//this will be required in controller file
module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
  app,
};
