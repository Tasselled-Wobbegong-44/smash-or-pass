// import * as cheerio from 'cheerio';
const cheerio = require('cheerio');
// import * as fs from 'fs';
const fs = require('fs');
// import * as cheerioTable from 'cheerio-tableparser';
const cheerioTableParser = require('cheerio-tableparser');

//declare async function, 'scrape'
async function scrape(id) {
  //i: tableid(string)
  //o: object(table)

  //fetch url of site we want
  const response = await fetch('https://ultimateframedata.com/stats');
  //convert response to rawHtml text
  const rawHtml = await response.text();
  //load rawHtml into cheerio
  const $ = cheerio.load(rawHtml);

  //testing table-parser
  //passes loaded cheerio variable into table parser
  // See documentation on cheerio-tableparser: https://www.npmjs.com/package/cheerio-tableparser
  cheerioTableParser($);
  //somehow this returns the tables we want
  const parseTable = $(id).parsetable(true, true, true);

  return parseTable;
}

//array of all the characters we need
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

//helper function
const characterExtractor = (data) => {
  //i: nested array
  //o: new nested array

  //create empty buckets array
  let result = [];
  //populate buckets array with empty arrays for the length of our input array
  data.forEach((element) => {
    //push empty array into results
    result.push([]);
  });
  //iterate through data array
  for (let i = 0; i < data.length; i++) {
    //if 0th index position of nested array is 'Rank'
    if (data[i][0] === 'Rank') {
      //slice it from the data array
      data = data.slice(1);
      //slice the result array as well to keep lengths consistent
      result = result.slice(0, result.length - 1);
    }
    //otherwise 0th position will be 'Character'
    //iterate through character array
    for (let j = 0; j < data[0].length; j++) {
      //if needed characters array contains element
      //push that element along with corresponding indexes in other arrays into result
      if (neededCharacters.includes(data[0][j])) result[i].push(data[i][j]);
    }
  }

  //return result
  return result;
};

//in order to get our table data we pass the style tags for the tables we want into scrape
//in each of these functions we utilize a helper function to sort the data we want
const parseWeight = scrape('#weighttable').then((data) => {
  // console.log(data)
  const result = characterExtractor(data);
  // return result;
  // console.log(result);
  return result;
});

const parseGroundSpeed = scrape('#dashandruntable').then((data) => {
  console.log(data);
  const result = characterExtractor(data);
  return result;
});

const parseJumpHeight = scrape('#jumpheighttable').then((data) => {
  const result = characterExtractor(data);
  return result;
});

const parseGrab = scrape('#grabstable').then((data) => {
  const result = characterExtractor(data);
  return result;
});

module.exports = {
  parseWeight,
  parseGroundSpeed,
  parseJumpHeight,
  parseGrab,
};
