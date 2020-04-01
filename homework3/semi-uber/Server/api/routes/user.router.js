const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const userGetHandler = require("../handlers/userHandlers/userGetHandler");
const userPatchHandler = require("../handlers/userHandlers/userPatchHandler");
const userDeleteHandler = require("../handlers/userHandlers/userDeteleHandler");
const tokenAuth = require("../middlewars/tokenAuth");

router.get("/:id", writeLog, tokenAuth, userGetHandler);

router.patch("/:id", writeLog, tokenAuth, userPatchHandler);

router.delete("/:id", writeLog, tokenAuth, userDeleteHandler);

module.exports = router;
