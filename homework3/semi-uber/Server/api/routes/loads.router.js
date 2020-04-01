const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const loadsDeleteHandler = require("../handlers/loadsHandlers/loadsDeleteHandler");
const loadsPostHandler = require("../handlers/loadsHandlers/loadsPostHandler");
const loadsPutHandler = require("../handlers/loadsHandlers/loadsPutHandler");
const tokenAuth = require("../middlewars/tokenAuth");

router.post("/", writeLog, tokenAuth, loadsPostHandler);

router.delete("/", writeLog, tokenAuth, loadsDeleteHandler);

router.put("/", writeLog, tokenAuth, loadsPutHandler);

module.exports = router;
