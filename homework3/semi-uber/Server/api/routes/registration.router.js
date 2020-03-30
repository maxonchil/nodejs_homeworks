const express = require("express");
const router = express.Router();
const config = require("config");
const { secret } = config.get("JWT");
const saltRounds = Number(config.get("saltRounds"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const log4js = require("log4js");
const logger = log4js.getLogger();
const { User, userSchemaValidation } = require("../Schemas/user.schema");
const writeLog = require("../middlewars/writeLog");
const errorHandler = require("../handlers/error.handler");

const hashPassword = (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds);
};

const createToken = (body, secret) => {
  return jwt.sign(body, secret);
};

const createUser = (name, username, password, email, status) => {
  return new User({
    name,
    username,
    password,
    email,
    status
  });
};

router.post("/", writeLog, (req, res) => {
  const { value, error } = userSchemaValidation.validate(req.body);
  const { name, username, password, email, status } = value;

  if (error) {
    return errorHandler(error.message, res);
  }

  hashPassword(password, saltRounds)
    .then(password => createUser(name, username, password, email, status))
    .then(user => user.save())
    .then(({ id }) => {
      logger.info("New user added to BD and token was sended");
      res.json({
        success: true,
        data: { id, token: createToken(id, secret) },
        error: null
      });
    })
    .catch(error => {
      return errorHandler(error.message, res);
    });
});
module.exports = router;
