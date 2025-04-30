const express = require('express');
const { generateForecast ,getForecastData} = require('../Controller/forecastController');  // Import controller

const router = express.Router();

// Define the POST route for generating forecast
router.post('/forecast', generateForecast);
router.get('/forecast', getForecastData);

module.exports = router;
