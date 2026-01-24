// routes.js
const express = require('express');
const router = express.Router();

// Define a simple GET route
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});


// Define a POST route that uses the body-parser
router.post('/data', (req, res) => {
    console.log(req.body); // Contains the parsed JSON data
    res.status(200).json({ received: req.body });
});

module.exports = router;