const { Client } = require('pg');
require('dotenv').config();
const weights = require('./scraper.js');
console.log('weight', weights);

const client = new Client({
  connectionString: process.env.PG_URI,
});

client.connect();
console.log('Client connection successful');

// create weights table
const createWeightTableScript = `
  CREATE TABLE IF NOT EXISTS weights (
    _id serial PRIMARY KEY,
    name varchar,
    weight integer
  );
  `;

client.query(createWeightTableScript, (err, result) => {
  if (err) {
    console.error('Error creating weight table:', err);
  } else {
    console.log('Table created successfully:', result);
  }
});

let insertWeightTableScript = `
  INSERT INTO TABLE weights
`;

weights.then((results) => {
  results = JSON.parse(results);
  for (let i = 0; i < Object.keys(results).length; i++) {
    insertWeightTableScript += `\n VALUES (${i}, ${Object.keys(results)[i]}, ${
      Object.values(results)[i]
    })`;
  }
});
console.log(insertWeightTableScript);

client.query(createWeightTableScript, (err, result) => {
  if (err) {
    console.error('Error creating weight table:', err);
  } else {
    console.log('Table created successfully:', result);
  }
});

client.query(insertWeightTableScript, (err, result) => {
  if (err) {
    console.error('Error inserting to weights table:', err);
  } else {
    console.log('Table populated successfully:', result);
  }
});
