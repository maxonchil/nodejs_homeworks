const config = require("config");
const { secret } = config.get("JWT");
const jwt = require("jsonwebtoken");
const { userSchemaValidation } = require("../../Schemas/user.schema");
const errorHandler = require("../error.handler");
const hashPassword = require("../../utilits/hashPassword");
const createUser = require("../../utilits/createUser");
const { USER_LOGS } = require("../../../data/usersData.json");
const success = require("../../utilits/successResponse");

const registrationPostHandler = (req, res) => {
  const { value, error } = userSchemaValidation.validate(req.body);
  const { name, username, password, email, status } = value;

  if (error) {
    return errorHandler(error.message, res);
  }

  hashPassword(password)
    .then((password) => createUser(name, username, password, email, status))
    .then((user) => user.save())
    .then(({ id }) => {
      const data = { id, token: jwt.sign(id, secret) };
      res.json(success(USER_LOGS.REG_SUCCESS, data));
    })
    .catch((error) => errorHandler(error.message, res));
};

module.exports = registrationPostHandler;
