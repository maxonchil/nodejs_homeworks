const jwt = require("jsonwebtoken");
const errorHandler = require("../handlers/error.handler");
const config = require("config");
const { secret } = config.get("JWT");
const { JWT_TOKEN } = require("../../data/headers.json");

const tokenAuth = (req, res, next) => {
  try {
    jwt.verify(req.headers[JWT_TOKEN], secret);
  } catch (error) {
    return errorHandler(error.message, res);
  }
  next();
};
module.exports = tokenAuth;
