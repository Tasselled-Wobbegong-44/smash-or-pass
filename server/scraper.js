// import * as cheerio from 'cheerio';
const cheerio = require('cheerio');
// import * as fs from 'fs';
const fs = require('fs');
// import * as cheerioTable from 'cheerio-tableparser';
const cheerioTableParser = require('cheerio-tableparser');

// console.log('cheerioTable', cheerioTableParser);
const weightTable = {};
const jumpTable = {};
const speedTable = {};
const grabTable = {};

async function scrape(id) {
  //i: tableid(string)
  //o: object(table)

  const response = await fetch('https://ultimateframedata.com/stats');
  const rawHtml = await response.text();
  const $ = cheerio.load(rawHtml);

  //testing table-parser
  cheerioTableParser($);
  const parseTable = $(id).parsetable(true, true, true);
  const parseWeight = $('#weighttable').parsetable(true, true, true);
  const parseJumpHeight = $('#jumpheighttable').parsetable(true, true, true);
  const parseDashRun = $('#dashandruntable').parsetable(true, true, true);
  const parseGrabRange = $('#grabstable').parsetable(true, true, true);
  // console.log(parseWeight);

  return parseTable;
}

scrape();
const neededCharacters = [
  'Donkey Kong',
  'Mario',
  'Link',
  'Young Link',
  'Bowser',
  'Yoshi',
  'Fox',
  'Kirby',
  'Dr. Mario',
  'Falco',
  'Mewtwo',
  'Roy',
  'Ness',
  'Samus',
  'Sheik',
  'Pikachu',
  'Ice Climbers',
  'Zelda',
  'Jigglypuff',
  'Ganondorf',
  'Pichu',
  'Marth',
  'Mr. Game & Watch',
  'Luigi',
];
// const parseWeight = await scrape()
// console.log(parseWeight)

const weight = [];
//helper function
const characterExtractor = (arr) => {
  //i: nested array
  //o: new nested array
  console.log(arr.length);

  //length of array determines number of nested arrays
  const obj = {};

  for (let i = 0; i < arr[1].length; i++) {
    if (neededCharacters.includes(arr[1][i])) {
      const character = arr[1][i];
      const weight = arr[2][i];

      obj[character] = weight;
    }
  }
  return JSON.stringify(obj);
};

// console.log(parseWeight)

const parseWeight = scrape('#weighttable').then((data) => {
  const result = characterExtractor(data);
  // return result;
  console.log(result);
  return result;
});

// const parseDashRun = scarpe('#dashandruntable')

// const parseHeight = scrape('#jumpheighttable').then((data) => {
//   const result = characterExtractor(data);
//   return result;
// });

module.exports = parseWeight;
