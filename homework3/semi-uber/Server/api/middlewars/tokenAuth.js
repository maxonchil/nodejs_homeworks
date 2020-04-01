const jwt = require("jsonwebtoken");
const errorHandler = require("../handlers/error.handler");
const config = require("config");
const { secret } = config.get("JWT");

const tokenAuth = (req, res, next) => {
  const token = req.headers["token"];
  try {
    jwt.verify(token, secret);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  next();
};
module.exports = tokenAuth;
