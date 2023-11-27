## Server notes

This stretch goal code was added with the idea in mind of creating a little survey box where users could vote on the cuteness scale of each character. The results would be stored in a PSQL database and be displayed in a box off to the side. In the end, we did not have time to implement it.

The code is fairly standard express routing to a /survey endpoint, with a GET and POST route. It would route the request to the controller.js, which contains three functions:

1. Instantiate the PSQL table (only needs to be run once).
2. Get the current contents of the table.
3. Post a new entry to the table.
