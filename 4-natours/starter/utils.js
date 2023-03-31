// Utils
const fs = require('fs');

exports.api = `/api/v1`;
exports.tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
