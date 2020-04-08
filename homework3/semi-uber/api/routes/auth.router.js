const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const loginPostHandler = require("../handlers/authHandler/loginHandlers/loginPostHandler");
const registerPostHandler = require("../handlers/authHandler/registrationHandlers/registrationPostHandler");

router.post("/login", writeLog, loginPostHandler);

router.post("/register", writeLog, registerPostHandler);

module.exports = router;
