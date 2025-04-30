const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../Controller/dashboardsummary");

// Route to fetch dashboard data
router.get("/dashboard-data", getDashboardData);

module.exports = router;
