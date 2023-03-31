// Imports
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

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

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

/** This gets called before or after the .route() method depending on where its called in the codebase!
 * Since the Router methods call res.json, they end the middleware. If this was placed after the route methods, it would never get called.
 *
 * Global middleware is typically defined at the top
 */
function myMiddlware(req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
}
app.use(myMiddlware);

// REST Endpoints (Route Handlers)
function isValidTour(id) {
  const tour = tours.find((tour) => tour.id === Number(id));
  if (id > tours.length || !tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found! Check the id and try again.',
    });
  } else return true;
}
// GET
function getAllTours(req, res) {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: tours });
}

function getTour(req, res) {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);
  if (id > tours.length || !tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found! Check the id and try again.',
    });
  } else {
    res.status(200).json({ status: 'success', data: tour });
  }
}

// POST

function createTour(req, res) {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => console.error(err)
  );
  res.status(201).json({ status: 'success', data: { tour: newTour } });
}

// PATCH

function updateTour(req, res) {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);
  if (id > tours.length || !tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found! Check the id and try again.',
    });
  } else {
    res
      .status(200)
      .json({ status: 'success', data: { tour: '<Updated Tour here>...' } });
  }
}

// DELETE

function deleteTour(req, res) {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);
  if (id > tours.length || !tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found! Check the id and try again.',
    });
  } else {
    res.status(204).json({ status: 'success', data: null });
  }
}

function getAllUsers(req, res) {
  res.status(500).json({
    status: 'error',
    message: "This route isn't working yet.",
  });
}
function getUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: "This route isn't working yet.",
  });
}
function createUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: "This route isn't working yet.",
  });
}
function updateUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: "This route isn't working yet.",
  });
}
function deleteUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: "This route isn't working yet.",
  });
}

// ROUTES
app.route(`${api}/users`).get(getAllUsers).post(createUser);
app.route(`${api}/users/:id`).get(getUser).patch(updateUser).delete(deleteUser);
app.route(`${api}/tours`).get(getAllTours).post(createTour);
app.route(`${api}/tours/:id`).get(getTour).patch(updateTour).delete(deleteTour);

// Start server
app.listen(8000, () => {
  console.log(`App running on port ${port}`);
});
