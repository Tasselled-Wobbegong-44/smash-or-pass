const { Client } = require('pg');
require('dotenv').config();
const stats = require('./scraper.js');

const client = new Client({
  connectionString: process.env.PG_URI,
});

client.connect();
console.log('Client connection successful');

/* Initialize PSQL Tables
decimal(precision, scale) 
  precision = total significant digits on both sides of the decimal point
  scale = number of digits on the right side of the decimal
  e.g., decimal (4, 3) expects a number such as 1.805
*/

// Declare SQL query text that will be used to create blank tables
const createTableScript = `
  CREATE TABLE IF NOT EXISTS weights (
    _id serial PRIMARY KEY,
    name varchar,
    weight integer
  );

  CREATE TABLE IF NOT EXISTS ground_speed (
    _id serial PRIMARY KEY,
    name varchar,
    initial_dash decimal(4, 3),
    run_speed decimal(4,3),
    dash_frames integer,
    pivot_dash_frames integer
  );

  CREATE TABLE IF NOT EXISTS jump_height (
    _id serial PRIMARY KEY,
    name varchar,
    full_hop decimal(4, 2),
    short_hop decimal(4, 2),
    air_jump decimal(4, 2)
  );

  CREATE TABLE IF NOT EXISTS grab_range (
    _id serial PRIMARY KEY,
    name varchar,
    grab_range integer
  );
  `;

// Pass defined query text into the client query function
// to create tables in Elephant SQL
client.query(createTableScript, (err, result) => {
  if (err) {
    console.error('Error creating weight table:', err);
  } else {
    console.log('Table created successfully:', result);
  }
});

// Initialize query script to insert values into newly created tables

// ---- WEIGHT
let insertWeightTableScript = `
  INSERT INTO weights (name, weight)
  VALUES
`;

stats.parseWeight.then((results) => {
  // console.log('nested weights: ', results);
  for (let j = 0; j < results[0].length; j++) {
    insertWeightTableScript += `('${results[0][j]}', ${results[1][j]}),`;
  }

  // console.log('insert weight script: ', insertWeightTableScript);

  insertWeightTableScript = insertWeightTableScript.slice(0, -1); // remove trailing comma

  client.query(insertWeightTableScript, (err, result) => {
    if (err) {
      console.error('Error inserting to weights table:', err);
    } else {
      console.log('Table populated successfully:', result);
    }
  });
});

// // ---- GROUND SPEED
let insertGroundSpeedTableScript = `
  INSERT INTO ground_speed (name, initial_dash, run_speed, dash_frames, pivot_dash_frames)
  VALUES
`;

stats.parseGroundSpeed.then((results) => {
  for (let i = 0; i < results.length; i++) {
    insertGroundSpeedTableScript += `('${results[0][i]}', ${results[1][i]}), ${results[2][i]}, ${results[3][i]}, ${results[4][i]}, `;
  }

  insertGroundSpeedTableScript = insertGroundSpeedTableScript.slice(0, -1); // remove trailing comma

  client.query(insertGroundSpeedTableScript, (err, result) => {
    if (err) {
      console.error('Error inserting to GroundSpeed table:', err);
    } else {
      console.log('Table populated successfully:', result);
    }
  });
});

// // ---- JUMP HEIGHT
let insertJumpHeightTableScript = `
  INSERT INTO jump_height (name, full_hop, short_hop, air_jump)
  VALUES
`;

stats.parseJumpHeight.then((results) => {
  for (let i = 0; i < results.length; i++) {
    insertJumpHeightTableScript += `('${results[0][i]}', ${results[1][i]}, ${results[2][i]}, ${results[3][i]}),`;
  }

  insertJumpHeightTableScript = insertJumpHeightTableScript.slice(0, -1); // remove trailing comma

  console.log('full script: ', insertJumpHeightTableScript);

  client.query(insertJumpHeightTableScript, (err, result) => {
    if (err) {
      console.error('Error inserting to JumpHeights table:', err);
    } else {
      console.log('Table populated successfully:', result);
    }
  });
});

// // ---- GRAB RANGE
let insertGrabTableScript = `
  INSERT INTO grab_range (name, grab_range)
  VALUES
`;

stats.parseGrab.then((results) => {
  for (let i = 0; i < results.length; i++) {
    insertGrabTableScript += `('${results[0][i]}', ${results[1][i]}),`;
  }

  insertGrabTableScript = insertGrabTableScript.slice(0, -1); // remove trailing comma

  //   console.log('full script: ', insertGrabTableScript);

  client.query(insertGrabTableScript, (err, result) => {
    if (err) {
      console.error('Error inserting to GrabRange table:', err);
    } else {
      console.log('Table populated successfully:', result);
    }
  });
});
