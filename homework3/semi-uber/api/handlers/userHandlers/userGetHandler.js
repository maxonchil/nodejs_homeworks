const config = require("config");
const { User } = require("../../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const { secret } = config.get("JWT");
const errorHandler = require("../error.handler");
const getCustomData = require("../../utilits/getCustomData");
const success = require("../../utilits/successResponse");
const { USER_LOGS } = require("../../../data/usersData.json");
const { JWT_TOKEN } = require("../../../data/headers.json");

const userGetHandler = async (req, res) => {
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);
  let user;
  let customData;

  try {
    user = await User.findById(userID);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  const { username, email, role, avatar } = user;

  try {
    customData = await getCustomData(role, userID);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  const userData = {
    username,
    email,
    role,
    customData,
    avatar,
  };
  res.json(success(USER_LOGS.RECEIVED, userData));
};
module.exports = userGetHandler;
