const config = require("config");
const log4js = require("log4js");
const logger = log4js.getLogger();
const { User } = require("../../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const { secret } = config.get("JWT");
const errorHandler = require("../error.handler");
const { Load } = require("../../Schemas/load.schema");
const { Truck } = require("../../Schemas/truck.schema");

async function getCustomData(stats, userID) {
  if (stats === "Shipper") {
    try {
      const loads = await Load.find({ created_by: userID });
      return { loads };
    } catch (error) {
      return error;
    }
  } else {
    try {
      const trucks = await Truck.find({ created_by: userID });
      return { trucks };
    } catch (error) {
      return error;
    }
  }
}

const userGetHandler = async (req, res) => {
  const pageID = req.params.id;
  const token = req.headers["token"];
  const userID = jwt.verify(token, secret);
  let user;
  let customData;

  if (pageID !== userID) {
    return errorHandler("Access rejected", res);
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
  logger.info("User data successfully received");

  res.json({
    success: true,
    data: userData,
    error: null
  });
};
module.exports = userGetHandler;
