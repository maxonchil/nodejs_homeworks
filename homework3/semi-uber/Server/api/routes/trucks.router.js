const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const trucksPostHandler = require("../handlers/trucksHandlers/trucksPostHandler");
const trucksPatchHandler = require("../handlers/trucksHandlers/trucksPatchHandler");
const trucksDeleteHandler = require("../handlers/trucksHandlers/trucksDeleteHandler");
const trucksPutHandler = require("../handlers/trucksHandlers/trucksPutHandler");

router.post("/", writeLog, trucksPostHandler);

router.patch("/", writeLog, trucksPatchHandler);

router.delete("/", writeLog, trucksDeleteHandler);

router.put("/", writeLog, trucksPutHandler);

module.exports = router;
