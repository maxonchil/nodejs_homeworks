const { User } = require("../../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../../data/headers.json");
const config = require("config");
const { secret } = config.get("JWT");
const errorHandler = require("../error.handler");
const { USER_LOGS } = require("../../../data/usersData.json");

const addEmail = async (req, res) => {
  const { email } = req.body;
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);
  try {
    await User.findByIdAndUpdate(userID, { email });
  } catch (error) {
    return errorHandler(error.message, res);
  }
  res.json({ status: USER_LOGS.EMAIL_ADD });
};
module.exports = addEmail;
