// Utils
const fs = require('fs');

exports.port = 8000;
exports.api = `/api/v1`;
exports.tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
