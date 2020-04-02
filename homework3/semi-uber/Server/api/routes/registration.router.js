const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const registrationPostHandler = require("../handlers/registrationHandlers/registrationPostHandler");

router.post("/", writeLog, registrationPostHandler);

module.exports = router;
