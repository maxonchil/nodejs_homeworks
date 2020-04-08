const config = require("config");
const { secret } = config.get("JWT");
const { User } = require("../../../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const errorHandler = require("../../error.handler");
const { USER_LOGS } = require("../../../../data/usersData.json");
const comparePasswords = require("../../../utilits/comparePasswords");

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

  const comparedPass = await comparePasswords(password, user.password);

  if (!comparedPass) {
    return errorHandler(USER_LOGS.LOGIN_FAILED, res);
  }

  res.json({
    status: USER_LOGS.LOGIN_SUCCESS,
    token,
  });
};

module.exports = loginPostHandler;
