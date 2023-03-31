const fs = require('fs');
const { tours } = require('../utils');

exports.checkBody = (req, res, next) => {
  if (!req.body.price || !req.body.name) {
    return res.status(404).json({
      status: 'fail',
      message: 'Price and/or Name is not set!',
    });
  }
  next();
};
exports.checkID = (req, res, next, val) => {
  const tour = tours.find((tour) => tour.id === Number(val));
  if (val > tours.length || !tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found! Check the id and try again.',
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: tours });
};

exports.getTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === Number(req.params.id));
  res.status(200).json({ status: 'success', data: tour });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => console.error(err)
  );
  res.status(201).json({ status: 'success', data: { tour: newTour } });
};

exports.updateTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated Tour here>...' } });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
