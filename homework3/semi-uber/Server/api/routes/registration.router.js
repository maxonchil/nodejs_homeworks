const express = require("express");
const router = express.Router();
const config = require("config");
const { secret } = config.get("JWT");
const saltRounds = Number(config.get("saltRounds"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const log4js = require("log4js");
const logger = log4js.getLogger();
const User = require("../Schemas/user.schema");
const writeLog = require("../middlewars/writeLog");

const hashPassword = (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds);
};

const createToken = (body, secret) => {
  return { token: jwt.sign(body, secret), password: body.password };
};

router.post("/", writeLog, (req, res) => {
  const { username, password, email, status } = req.body;

  hashPassword(password, saltRounds)
    .then(password => createToken({ username, password }, secret))
    .then(
      res =>
        new User({
          username,
          password: res.password,
          email,
          status,
          jwt: res.token
        })
    )
    .then(user => user.save())
    .then(user => {
      res.json(user);
      logger.info("New user added to BD\n");
    })
    .catch(error => {
      logger.error(error.name);
      res.json({ status: error.name });
      throw error;
    });
});
module.exports = router;
