const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const uploadPostHandler = require("../handlers/uploadHandlers/uploadsPostHandler");
const tokenAuth = require("../middlewars/tokenAuth");

router.post("/", writeLog, tokenAuth, uploadPostHandler);

module.exports = router;
