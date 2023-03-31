// Imports
const express = require('express');
const fs = require('fs');

// Utils
const port = 8000;
const api = `/api/v1`;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/**
 * APP
 */

const app = express();

// REST Endpoints
app.get(`${api}/tours`, (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: tours });
});

// Start server
app.listen(8000, () => {
  console.log(`App running on port ${port}`);
});
