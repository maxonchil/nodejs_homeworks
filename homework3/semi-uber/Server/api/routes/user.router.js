const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const userGetHandler = require("../handlers/userHandlers/userGetHandler");
const userPatchHandler = require("../handlers/userHandlers/userPatchHandler");
const userDeleteHandler = require("../handlers/userHandlers/userDeteleHandler");

router.get("/:id", writeLog, userGetHandler);

router.patch("/:id", writeLog, userPatchHandler);

router.delete("/:id", writeLog, userDeleteHandler);

module.exports = router;
