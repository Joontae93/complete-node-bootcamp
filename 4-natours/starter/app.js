// Imports
const express = require('express');
const app = express();

// Utils
const port = 8000;

// App
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server-side Greetings!', app: 'Natours' });
});

// Start server
app.listen(8000, () => {
  console.log(`App running on port ${port}`);
});
