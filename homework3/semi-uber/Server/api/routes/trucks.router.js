const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const trucksPostHandler = require("../handlers/trucksHandlers/trucksPostHandler");
const trucksPatchHandler = require("../handlers/trucksHandlers/trucksPatchHandler");
const trucksDeleteHandler = require("../handlers/trucksHandlers/trucksDeleteHandler");
const trucksPutHandler = require("../handlers/trucksHandlers/trucksPutHandler");
const tokenAuth = require("../middlewars/tokenAuth");

router.post("/", writeLog, tokenAuth, trucksPostHandler);

router.patch("/", writeLog, tokenAuth, trucksPatchHandler);

router.delete("/", writeLog, tokenAuth, trucksDeleteHandler);

router.put("/", writeLog, tokenAuth, trucksPutHandler);

module.exports = router;
