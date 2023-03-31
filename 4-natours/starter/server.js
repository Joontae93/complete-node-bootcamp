const app = require('./app');
const { port } = require('./utils');

/**
 * START SERVER
 */
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
