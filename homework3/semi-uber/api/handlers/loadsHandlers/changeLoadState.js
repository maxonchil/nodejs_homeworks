const checkForAccess = require("../../utilits/checkForAccess");
const config = require("config");
const { secret } = config.get("JWT");
const { Truck } = require("../../Schemas/truck.schema");
const { LOAD_LOGS } = require("../../../data/loadData.json");
const { TRUCK_STATUS } = require("../../../data/trucksData.json");
const { USER_ROLE, USER_LOGS } = require("../../../data/usersData.json");
const errorHandler = require("../error.handler");
const log4js = require("log4js");
const logger = log4js.getLogger();
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../../data/headers.json");
const updateDeliveredLoad = require("../../utilits/updateDeliveredLoad");

const changeLoadState = async (req, res) => {
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);
  const loadID = req.params.id;

  const access = checkForAccess(userID, USER_ROLE.DRIVER);
  if (!access) {
    return errorHandler(USER_LOGS.ERROR_ACCESS, res);
  }

  const updatedLoad = updateDeliveredLoad(loadID);
  if (!updatedLoad) {
    return errorHandler(LOAD_LOGS.ERROR_UPDATE, res);
  }

  try {
    updatedTruck = await Truck.findOneAndUpdate(
      {
        created_by: userID,
        status: TRUCK_STATUS.ON_LOAD,
      },
      { status: TRUCK_STATUS.IN_SERVICE }
    );
  } catch (error) {
    return errorHandler(error.message);
  }

  if (!updatedTruck) {
    return errorHandler(LOAD_LOGS.ERROR_SHIPPED, res);
  }
  logger.info(`Truck in status ${TRUCK_STATUS.IN_SERVICE}`);

  try {
    await Truck.updateMany({ created_by: userID, edit: false }, { edit: true });
  } catch (error) {
    return errorHandler(error.message);
  }

  res.json({
    status: LOAD_LOGS.CHANGED,
  });
};

module.exports = changeLoadState;
