const sendMail = require("../../utilits/sendMail");
const generatePassword = require("../../utilits/generatePassword");
const hashPassword = require("../../utilits/hashPassword");
const errorHandler = require("../error.handler");
const { USER_LOGS } = require("../../../data/usersData.json");
const success = require("../../utilits/successResponse");
const updatePassword = require("../../utilits/updatePassword");

const userGetResetHandler = async (req, res) => {
  const userID = req.params.id;
  const generatedPass = generatePassword();

  const hashedPass = await hashPassword(generatedPass);
  if (!hashedPass) {
    return errorHandler(error.message, res);
  }

  const user = await updatePassword(userID, hashedPass);
  if (!user) {
    return errorHandler(error.message, res);
  }

  try {
    sendMail(
      user.email,
      `Your new password ${generatedPass}`,
      USER_LOGS.EMAIL_RESET
    );
  } catch (error) {
    return errorHandler(error.message, res);
  }

  res.json(success(USER_LOGS.PASSWORD_EMAIL));
};

module.exports = userGetResetHandler;
