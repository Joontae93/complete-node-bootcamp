const fs = require('fs');
const { api, tours } = require('../utils');

exports.isValidTour = (id) => {
  const tour = tours.find((tour) => tour.id === Number(id));
  if (id > tours.length || !tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found! Check the id and try again.',
    });
  } else return true;
};

exports.getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: tours });
};

exports.getTour = (req, res) => {
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
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => console.error(err)
  );
  res.status(201).json({ status: 'success', data: { tour: newTour } });
};

exports.updateTour = (req, res) => {
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
};

exports.deleteTour = (req, res) => {
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
};
