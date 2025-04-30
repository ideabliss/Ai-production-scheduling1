const express = require("express");
const { placeStockOrder,getStockOrders } = require("../Controller/stockController");

const router = express.Router();

router.post("/order", placeStockOrder);
router.get("/orders", getStockOrders); 


module.exports = router;
