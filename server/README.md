## Backend branch server notes

This branch is where we tried out all of our initial backend ideas. The general flow of data that we had in mind is:

1. Use a web scraper npm module (cheerio) to scrape smash characters' stats from table data on https://ultimateframedata.com/stats
2. Dynamically pass the scraped data into PSQL tables (we used ElephantSQL).
3. Join the PSQL tables into one master table with each row is a character, and each stat going across the top.
4. When the front-end sliders are adjusted, the state variables will update, triggering fetch requests through our express server to the PSQL DB.
5. Each DB request should perform a SQL query on the master table, which will have a WHERE clause for each stat, and filter out the ones that don't meet the qualifications.

Scraper notes

The web scraper library we used is called cheerio. It is an older library that is not being actively maintained, so an alternative should be sought out. We used the cheerio-table-parser library as well, which is specifically designed for HTML tables made using the <td> syntax. See the documentation here: https://www.npmjs.com/package/cheerio-tableparser

The web scraper itself actually worked rather well, however, we went down a rabbit hole when trying to clean that data for use in PSQL. You may want to revisit how we are taking the raw scraped data. We ended up keeping the data in a data structure of a nested array of arrays, but a nested object would probably work better. We also created a function, characterExtractor, which would extract out a reduced list of characters (only the 22 from Smash Bros Melee) that would be easier to work with.

PSQL notes

In the create_db.js, we attempted to take that scraped data and push it into PSQL. However, we ran into a ton of errors, and lost a lot of time debugging. Ultimately, we had to pivot away from using PSQL and just store the characters' stats directly on the frontend.

1. See if you can get the INSERT INTO statements working without error in create_db.js, or maybe there is a better way to do it.
2. The create_db.js INSERT INTO statements are very WET, with a full code block for each of the 4 stats we scraped, so they could be made to be dynamic.
