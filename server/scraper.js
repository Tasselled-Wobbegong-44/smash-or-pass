import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as cheerioTable from 'cheerio-tableparser';

(async () => {
  const response = await fetch('https://ultimateframedata.com/stats');
  const rawHtml = await response.text();
  const $ = cheerio.load(rawHtml);

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
