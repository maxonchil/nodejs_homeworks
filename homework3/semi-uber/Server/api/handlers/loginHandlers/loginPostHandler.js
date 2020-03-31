const config = require("config");
const { secret } = config.get("JWT");
const bcrypt = require("bcrypt");
const { User } = require("../../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const errorHandler = require("../error.handler");
const log4js = require("log4js");
const logger = log4js.getLogger();

const loginPostHandler = async (req, res) => {
  const { password, username } = req.body;
  let user;
  let token;

  try {
    user = await User.findOne({ username });
  } catch (error) {
    return errorHandler(error.message, res);
  }

  try {
    token = jwt.sign(user.id, secret);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  try {
    await bcrypt.compare(password, user.password);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  logger.info("Login successful");

  res.status(200).json({
    success: true,
    data: { id: user.id, token: token },
    error: null
  });
};

module.exports = loginPostHandler;
