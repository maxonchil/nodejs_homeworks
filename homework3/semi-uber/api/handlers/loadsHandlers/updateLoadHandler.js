const { Load } = require("../../Schemas/load.schema");
const errorHandler = require("../error.handler");
const logMessage = require("../../utilits/logMessage");
const { LOAD_STATUS, LOAD_LOGS } = require("../../../data/loadData.json");
const success = require("../../utilits/successResponse");
const checkForAccess = require("../../utilits/checkForAccess");
const { USER_ROLE, USER_LOGS } = require("../../../data/usersData.json");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../../data/headers.json");
const config = require("config");
const { secret } = config.get("JWT");

const updateLoadHandler = async (req, res) => {
  const { dimensions, payload } = req.body;
  const loadID = req.params.id;
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);

  const access = await checkForAccess(userID, USER_ROLE.SHIPPER);
  if (!access) {
    return errorHandler(USER_LOGS.ERROR_ACCESS, res);
  }

  Load.findOneAndUpdate(
    { _id: loadID, status: LOAD_STATUS.NEW },
    {
      dimensions,
      payload,
      $push: { logs: logMessage(LOAD_LOGS.UPDATED) },
    }
  )
    .then((result) => {
      if (!result) {
        throw new Error(LOAD_LOGS.ERROR_EDIT);
      }
      res.json(success(LOAD_LOGS.UPDATED, { message: LOAD_STATUS.UPDATED }));
    })
    .catch((error) => errorHandler(error.message, res));
};

module.exports = updateLoadHandler;
