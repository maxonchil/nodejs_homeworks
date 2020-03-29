const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const loadsDeleteHandler = require("../handlers/loadsHandlers/loadsDeleteHandler");
const loadsPostHandler = require("../handlers/loadsHandlers/loadsPostHandler");

router.post("/", writeLog, loadsPostHandler);

router.delete("/delete", writeLog, loadsDeleteHandler);

module.exports = router;
