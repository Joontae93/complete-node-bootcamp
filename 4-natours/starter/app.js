// 3rd Part Imports
const express = require('express');
const morgan = require('morgan');

// My Modules
const { api } = require('./utils');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/**
 * MIDDLEWARE
 */
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
/**
 * Mount Routers (still middleware, but route specific)
 */
app.use(`${api}/users`, userRouter);
app.use(`${api}/tours`, tourRouter);

module.exports = app;
