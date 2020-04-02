const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const loginPostHandler = require("../handlers/loginHandlers/loginPostHandler");

router.post("/", writeLog, loginPostHandler);

module.exports = router;
