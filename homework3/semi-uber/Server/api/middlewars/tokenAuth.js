const jwt = require("jsonwebtoken");
const errorHandler = require("../handlers/error.handler");
const config = require("config");
const { secret } = config.get("JWT");
const { USER_LOGS } = require("../../data/usersData.json");

const tokenAuth = (req, res, next) => {
  const { userID } = req.body;
  const userID_2 = req.headers["userid"];
  const userID_3 = req.params.id;
  const user = userID || userID_2 || userID_3;
  let idFromToken;
  try {
    idFromToken = jwt.verify(req.headers["token"], secret);
  } catch (error) {
    return errorHandler(error.message, res);
  }
  if (idFromToken !== user) {
    return errorHandler(USER_LOGS.ERROR_ACCESS, res);
  }
  next();
};
module.exports = tokenAuth;
