const { Load } = require("../../Schemas/load.schema");
const errorHandler = require("../error.handler");
const { LOAD_STATUS, LOAD_LOGS } = require("../../../data/loadData.json");
const success = require("../../utilits/successResponse");
const checkForAccess = require("../../utilits/checkForAccess");
const { USER_ROLE, USER_LOGS } = require("../../../data/usersData.json");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../../data/headers.json");
const config = require("config");
const { secret } = config.get("JWT");

const loadsDeleteHandler = async (req, res) => {
  const loadID = req.params.id;
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);

  const access = await checkForAccess(userID, USER_ROLE.SHIPPER);
  if (!access) {
    return errorHandler(USER_LOGS.ERROR_ACCESS, res);
  }

  Load.findOneAndRemove({
    _id: loadID,
    status: { $in: [LOAD_STATUS.NEW, LOAD_STATUS.SHIPPED] },
  })
    .then((result) => {
      if (!result) {
        throw new Error(LOAD_LOGS.ERROR_DELETE);
      }
      res.json(success(LOAD_LOGS.DELETED));
    })
    .catch((error) => errorHandler(error.message, res));
};

module.exports = loadsDeleteHandler;
