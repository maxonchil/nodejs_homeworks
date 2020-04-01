const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const servicePatchHandler = require("../handlers/serviceHandlers/servicePatchHandler");
const servicePutHandler = require("../handlers/serviceHandlers/servicePutHandler");

router.patch("/", writeLog, servicePatchHandler);

router.put("/", writeLog, servicePutHandler);

module.exports = router;
