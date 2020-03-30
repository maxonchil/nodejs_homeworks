const express = require("express");
const router = express.Router();
const config = require("config");
const { secret } = config.get("JWT");
const bcrypt = require("bcrypt");
const { User } = require("../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const errorHandler = require("../handlers/error.handler");
const writeLog = require("../middlewars/writeLog");
const log4js = require("log4js");
const logger = log4js.getLogger();

router.post("/", writeLog, async (req, res) => {
  const { password, username } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return errorHandler("Login failed", res);
  }
  const token = await jwt.sign(user.id, secret);
  if (!token) {
    return errorHandler("Login failed", res);
  }
  const verify = await bcrypt.compare(password, user.password);
  if (!verify) {
    return errorHandler("Login failed", res);
  }

  logger.info("Login successful");

  res.status(200).json({
    success: true,
    data: { id: user.id, token: token },
    error: null
  });
});

module.exports = router;
