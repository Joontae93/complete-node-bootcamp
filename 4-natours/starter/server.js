const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

/**
 * START SERVER
 */
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
