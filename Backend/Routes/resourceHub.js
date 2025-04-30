const express = require("express");
const router = express.Router();
const {
  addMachine,
  addStaff,
  scheduleMaintenance,
  getAllResourceData,
} = require("../Controller/resourceHub");

router.post("/machine", addMachine);
router.post("/staff", addStaff);
router.put("/maintenance", scheduleMaintenance);
router.get("/", getAllResourceData);

module.exports = router;
