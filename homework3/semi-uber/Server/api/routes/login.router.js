const express = require("express");
const router = express.Router();
const config = require("config");
const { secret } = config.get("JWT");
const bcrypt = require("bcrypt");
const { User } = require("../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const log4js = require("log4js");
const logger = log4js.getLogger();

const errorHandle = (err, res) => {
  logger.error(err);
  res.status(400).json({ status: err });
};

router.post("/", async (req, res) => {
  const { password, username } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return errorHandle("Login failed", res);
  }
  const token = await jwt.sign(user.id, secret);
  if (!token) {
    return errorHandle("Login failed", res);
  }
  const verify = await bcrypt.compare(password, user.password);
  if (!verify) {
    return errorHandle("Login failed", res);
  }
  logger.info(user);
  res.status(200).json({ id: user.id, token: token });
});

module.exports = router;
