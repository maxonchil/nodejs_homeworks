const { userSchemaValidation } = require("../../../Schemas/user.schema");
const errorHandler = require("../../error.handler");
const hashPassword = require("../../../utilits/hashPassword");
const createUser = require("../../../utilits/createUser");
const { USER_LOGS } = require("../../../../data/usersData.json");

const registrationPostHandler = async (req, res) => {
  const { value, error } = userSchemaValidation.validate(req.body);
  const { username, password, role } = value;
  let hashedPassword;

  if (error) {
    return errorHandler(error.message, res);
  }

  try {
    hashedPassword = await hashPassword(password);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  const user = createUser(username, hashedPassword, role);

  try {
    await user.save();
  } catch (error) {
    return errorHandler(error.message, res);
  }

  res.json({ status: USER_LOGS.REG_SUCCESS });
};

module.exports = registrationPostHandler;
