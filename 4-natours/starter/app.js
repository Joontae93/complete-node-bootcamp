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
app.use(express.json());

// REST Endpoints
app.get(`${api}/tours`, (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: tours });
});

app.post(`${api}/tours`, (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => console.error(err)
  );
  res.status(201).json({ status: 'success', data: { tour: newTour } });
});

// Start server
app.listen(8000, () => {
  console.log(`App running on port ${port}`);
});
