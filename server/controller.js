//import database
const db = require('/server.js');

//create controller object
const surveyController = {};

surveyController.createSurveyTable = async (req, res, next) => {
  try {
    const createString = `CREATE IF NOT EXISTS survey (
      _id serial PRIMARY KEY,
      name varchar,
      cuteness bigint
    );`;
    db.query(createString);
    return next();
  } catch (err) {
    return next({
      err: `uh oh`,
      status: 400,
      message: `something went wrong!`,
    });
  }
};

surveyController.getSurvey = async (req, res, next) => {
  //set up try catch block
  try {
    //query string
    const queryString = `SELECT * from survey`;

    //pass queryString into db query
    const result = await db.query(queryString);
    res.locals.survey = result;

    return next();
  } catch (err) {
    next({
      err: `uh oh`,
      status: 400,
      message: `something went wrong!`,
    });
  }
};

//add to existing survey
surveyController.surveyInput = async (req, res, next) => {
  try {
    //get variables off req.body
    const { name, cuteness } = req.body;
    const queryString = `
        INSERT INTO survey (name, cuteness)
        VALUES ()
        `;

    next();
  } catch (error) {
    next({
      err: `Something is wrong with the survey input controller`,
      status: 400,
      message: `it may be your fault, it may be my fault. i dont know and i hope you dont too`,
    });
  }
};

//export controller
module.exports = surveyController;
