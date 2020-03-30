const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const trucksPostHandler = require("../handlers/trucksHandlers/trucksPostHandler");
const trucksPatchHandler = require("../handlers/trucksHandlers/trucksPatchHandler");

router.post("/", writeLog, trucksPostHandler);

router.patch("/", writeLog, trucksPatchHandler);

module.exports = router;
