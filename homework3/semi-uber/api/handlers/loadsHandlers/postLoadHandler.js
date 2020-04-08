const errorHandler = require("../error.handler");
const findTruckForLoad = require("../../utilits/findTruckForLoad");
const { LOAD_STATUS, LOAD_LOGS } = require("../../../data/loadData.json");
const { USER_ROLE, USER_LOGS } = require("../../../data/usersData.json");
const changeLoadStatus = require("../../utilits/changeLoadStatus");
const checkForAccess = require("./../../utilits/checkForAccess");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../../data/headers.json");
const config = require("config");
const { secret } = config.get("JWT");

const loadsPatchHandler = async (req, res) => {
  const loadID = req.params.id;
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);

  const access = await checkForAccess(userID, USER_ROLE.SHIPPER);
  if (!access) {
    return errorHandler(USER_LOGS.ERROR_ACCESS, res);
  }

  const load = await changeLoadStatus(
    loadID,
    LOAD_STATUS.NEW,
    LOAD_STATUS.POSTED
  );

  if (!load) {
    return errorHandler(LOAD_LOGS.ERROR_UPDATE, res);
  }

  const serachResult = await findTruckForLoad(load);

  if (serachResult === null) {
    await changeLoadStatus(loadID, LOAD_STATUS.POSTED, LOAD_STATUS.NEW);

    if (!changeLoadStatus) {
      return errorHandler(LOAD_LOGS.ERROR_UPDATE, res);
    }
    return res.json({ status: LOAD_LOGS.NO_DRIVERS });
  }
  res.json({
    status: LOAD_LOGS.POSTED,
    assigned_to: "fiwanfoianw",
  });
};

module.exports = loadsPatchHandler;
