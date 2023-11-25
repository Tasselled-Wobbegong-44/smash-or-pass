// import * as cheerio from 'cheerio';
const cheerio = require('cheerio');
// import * as fs from 'fs';
const fs = require('fs');
// import * as cheerioTable from 'cheerio-tableparser';
const cheerioTableParser = require('cheerio-tableparser');

console.log('cheerioTable', cheerioTableParser);

(async () => {
  const response = await fetch('https://ultimateframedata.com/stats');
  const rawHtml = await response.text();
  const $ = cheerio.load(rawHtml);

  //testing table-parser
  cheerioTableParser($);
  const parseWeight = $('#weighttable').parsetable(true, true, true);
  console.log(parseWeight);
  const parseJumpHeight = $('#jumpheighttable').parsetable(true, true, true);
  const parseDashRun = $('#dashandruntable').parsetable(true, true, true);
  const parseGrabRange = $('#grabstable').parsetable(true, true, true);

  const weightTable = $('#weighttable');
  // const speedTable = $('#dashruntable');x

  const weightTableData = [];

  weightTable.find('tr').each((i, row) => {
    const rowData = {};

    $(row)
      .find('td, th')
      .each((j, cell) => {
        rowData[$(cell).text()] = j;
      });
    // console.log('rowData', rowData['Rank: 0']);
    weightTableData.push(rowData);
  });

  // console.log('weightTable', weightTableData);
  weightTableData.forEach((el) => {
    console.log('el', el);
  });
})();
