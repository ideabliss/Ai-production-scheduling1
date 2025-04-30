const express = require("express");
const router = express.Router();
const { saveSalesData, getSalesData } = require("../Controller/salesdata");

router.post("/upload", saveSalesData);
router.get("/sales/month", getSalesData);

module.exports = router;