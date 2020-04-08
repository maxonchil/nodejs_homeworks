const { Load, loadSchemaValidation } = require("../../Schemas/load.schema");
const errorHandler = require("../error.handler");
const logMessage = require("../../utilits/logMessage");
const { LOAD_LOGS } = require("../../../data/loadData.json");
const jwt = require("jsonwebtoken");
const config = require("config");
const { secret } = config.get("JWT");
const { JWT_TOKEN } = require("../../../data/headers.json");
const { USER_LOGS, USER_ROLE } = require("../../../data/usersData.json");
const checkForAccess = require("../../utilits/checkForAccess");

const loadsPostHandler = async (req, res) => {
  const { dimensions, payload } = req.body;
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);
  const access = await checkForAccess(userID, USER_ROLE.SHIPPER);
  if (!access) {
    return errorHandler(USER_LOGS.ERROR_ACCESS, res);
  }

  const load = {
    created_by: userID,
    logs: [logMessage(LOAD_LOGS.CREATED)],
    dimensions,
    payload,
  };
  const { value: validatedLoad, error } = loadSchemaValidation.validate(load);

  if (error) {
    return errorHandler(error.message, res);
  }

  const newLoad = new Load(validatedLoad);

  newLoad
    .save()
    .then(() => {
      res.json({ status: LOAD_LOGS.CREATED });
    })
    .catch((error) => errorHandler(error.message, res));
};

module.exports = loadsPostHandler;
