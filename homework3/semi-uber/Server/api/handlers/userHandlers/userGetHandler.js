const config = require("config");
const log4js = require("log4js");
const logger = log4js.getLogger();
const { User } = require("../../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const { secret } = config.get("JWT");
const errorHandler = require("../error.handler");
const { Load } = require("../../Schemas/load.schema");

async function getCustomData(stats, userID) {
  if (stats === "Shipper") {
    const loads = await Load.find({ created_by: userID });
    return { loads };
  } else {
    // const trucks = await Load.find({ created_by: userID });
    // return { trucks };
  }
}

const userGetHandler = async (req, res) => {
  const pageID = req.params.id;
  const token = req.headers["token"];
  const userID = jwt.verify(token, secret);

  if (pageID !== userID) {
    return errorHandler("Access rejected", res);
  }

  const user = await User.findById(userID);
  if (!user) {
    return errorHandler("Can not find such user", res);
  }
  const { name, username, email, status } = user;

  const customData = await getCustomData(status, userID);
  if (!customData) {
    return errorHandler("Can not find custom data", res);
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
