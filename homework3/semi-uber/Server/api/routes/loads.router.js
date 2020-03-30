const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const loadsDeleteHandler = require("../handlers/loadsHandlers/loadsDeleteHandler");
const loadsPostHandler = require("../handlers/loadsHandlers/loadsPostHandler");
const loadsPatchHandler = require("../handlers/loadsHandlers/loadsPatchHandler");
const loadsPutHandler = require("../handlers/loadsHandlers/loadsPutHandler");

router.post("/", writeLog, loadsPostHandler);

router.delete("/", writeLog, loadsDeleteHandler);

router.patch("/", writeLog, loadsPatchHandler);

router.put("/", writeLog, loadsPutHandler);

module.exports = router;
