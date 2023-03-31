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
// GET
app.get(`${api}/tours`, (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: tours });
});

app.get(`${api}/tours/:id`, (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);
  if (id > tours.length || !tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found! Check the id and try again.',
    });
  }
  res.status(200).json({ status: 'success', data: tour });
});

// POST
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
