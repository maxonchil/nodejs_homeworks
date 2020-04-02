const config = require("config");
const { secret } = config.get("JWT");
const bcrypt = require("bcrypt");
const { User } = require("../../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const errorHandler = require("../error.handler");
const success = require("../../utilits/successResponse");
const { USER_LOGS } = require("../../../data/usersData.json");

const loginPostHandler = async (req, res) => {
  const { password, username } = req.body;
  let user;
  let token;
  let comparedPass;

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
    comparedPass = await bcrypt.compare(password, user.password);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  if (!comparedPass) {
    return errorHandler(USER_LOGS.LOGIN_FAILED, res);
  }

  res.json(success(USER_LOGS.LOGIN_SUCCESS, { id: user.id, token }));
};

module.exports = loginPostHandler;
