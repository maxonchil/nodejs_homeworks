const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const loadsDeleteHandler = require("../handlers/loadsHandlers/loadsDeleteHandler");
const loadsPostHandler = require("../handlers/loadsHandlers/loadsPostHandler");
const loadsPatchHandler = require("../handlers/loadsHandlers/loadsPatchHandler");

router.post("/", writeLog, loadsPostHandler);

router.delete("/", writeLog, loadsDeleteHandler);

router.patch("/", writeLog, loadsPatchHandler);

module.exports = router;
