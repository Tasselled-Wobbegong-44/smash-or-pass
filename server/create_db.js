const { Client } = require('pg');
require('dotenv').config();
const stats = require('./scraper.js');
console.log('weight', stats);

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
    pivot_dash_frames
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
    grab_range
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
  INSERT INTO weights (_id, name, weight) 
  VALUES
`;

stats.parseWeight.then((results) => {
  results = JSON.parse(results);
  for (let i = 0; i < Object.keys(results).length; i++) {
    insertWeightTableScript += `(${i}, '${Object.keys(results)[i]}', ${
      Object.values(results)[i]
    }),`;
  }

  insertWeightTableScript = insertWeightTableScript.slice(0, -1); // remove trailing comma

  client.query(insertWeightTableScript, (err, result) => {
    if (err) {
      console.error('Error inserting to weights table:', err);
    } else {
      console.log('Table populated successfully:', result);
    }
  });
});

// ---- GROUND SPEED
let insertGroundSpeedTableScript = `
  INSERT INTO weights (_id, name, weight) 
  VALUES
`;

stats.parseWeight.then((results) => {
  results = JSON.parse(results);
  for (let i = 0; i < Object.keys(results).length; i++) {
    insertGroundSpeedTableScript += `(${i}, '${Object.keys(results)[i]}', ${
      Object.values(results)[i]
    }),`;
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

// ---- JUMP HEIGHT
let insertJumpHeightTableScript = `
  INSERT INTO jump_height (_id, name, full_hop, short_hop, air_jump) 
  VALUES
`;

stats.parseJumpHeight.then((results) => {
  results = JSON.parse(results);
  for (let i = 0; i < Object.keys(results).length; i++) {
    insertWeightTableScript += `(${i}, '${Object.keys(results)[i]}', ${
      Object.values(results)[i]
    }),`;
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

// ---- GRAB RANGE
let insertGrabTableScript = `
  INSERT INTO grab_range (_id, name, grab_range) 
  VALUES
`;

stats.parseGrab.then((results) => {
  results = JSON.parse(results);
  for (let i = 0; i < Object.keys(results).length; i++) {
    insertGrabTableScript += `(${i}, '${Object.keys(results)[i]}', ${
      Object.values(results)[i]
    }),`;
  }

  insertGrabTableScript = insertGrabTableScript.slice(0, -1); // remove trailing comma

  console.log('full script: ', insertGrabTableScript);

  client.query(insertGrabTableScript, (err, result) => {
    if (err) {
      console.error('Error inserting to GrabRange table:', err);
    } else {
      console.log('Table populated successfully:', result);
    }
  });
});
