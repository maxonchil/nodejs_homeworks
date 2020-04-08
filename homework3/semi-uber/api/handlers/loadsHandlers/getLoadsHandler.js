const config = require("config");
const { secret } = config.get("JWT");
const { JWT_TOKEN } = require("../../../data/headers.json");
const getLoads = require("../../utilits/getLoads");
const errorHandler = require("../../handlers/error.handler");
const { USER_LOGS } = require("../../../data/usersData.json");

const getLoadsHandler = async (req, res) => {
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);
  let loads;

  try {
    loads = await getLoads(userID);
  } catch (error) {
    return errorHandler(error.message, res);
  }
  res.json({
    status: USER_LOGS.SUCCESS,
    loads,
  });
};
module.exports = getLoadsHandler;
