const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const registrationPostHandler = require("../handlers/registrationHandlers/registrationPostHandler");
// const tokenAuth = require("../middlewars/tokenAuth");

router.post("/", writeLog, registrationPostHandler);

module.exports = router;
