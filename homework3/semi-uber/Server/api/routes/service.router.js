const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const servicePatchHandler = require("../handlers/serviceHandlers/servicePatchHandler");
const servicePutHandler = require("../handlers/serviceHandlers/servicePutHandler");
const tokenAuth = require("../middlewars/tokenAuth");

router.patch("/", writeLog, tokenAuth, servicePatchHandler);

router.put("/", writeLog, tokenAuth, servicePutHandler);

module.exports = router;
