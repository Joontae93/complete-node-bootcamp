const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

/**
 * START SERVER
 */
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
