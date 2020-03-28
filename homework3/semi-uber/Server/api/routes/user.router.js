const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const userGetHandler = require("../handlers/user.handlers/userGetHandler");
const userPatchHandler = require("../handlers/user.handlers/userPatchHandler");
const userDeleteHandler = require("../handlers/user.handlers/userDeteleHandler");

router.get("/:id", writeLog, userGetHandler);

router.patch("/:id", writeLog, userPatchHandler);

router.delete("/:id", writeLog, userDeleteHandler);

module.exports = router;
