// routes/productionPlan.js
const express = require('express');
const { generateProductionSchedule } = require('../Controller/generateProductionSchedule');
const router = express.Router();

router.get('/schedule', generateProductionSchedule);

module.exports = router;
