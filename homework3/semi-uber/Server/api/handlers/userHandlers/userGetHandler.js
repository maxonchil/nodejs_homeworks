const config = require("config");
const { User } = require("../../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const { secret } = config.get("JWT");
const errorHandler = require("../error.handler");
const getCustomData = require("../../utilits/getCustomData");
const success = require("../../utilits/successResponse");
const { USER_LOGS } = require("../../../data/usersData.json");

const userGetHandler = async (req, res) => {
  const pageID = req.params.id;
  const token = req.headers["token"];
  const userID = jwt.verify(token, secret);
  let user;
  let customData;

  if (pageID !== userID) {
    return errorHandler(USER_LOGS.ERROR_ACCESS, res);
  }
  
  try {
    user = await User.findById(userID);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  const { name, username, email, status } = user;

  try {
    customData = await getCustomData(status, userID);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  const userData = {
    name,
    username,
    email,
    status,
    customData
  };
  res.json(success(USER_LOGS.RECEIVED, userData));
};
module.exports = userGetHandler;
