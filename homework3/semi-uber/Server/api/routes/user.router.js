const express = require("express");
const router = express.Router();
const config = require("config");
const log4js = require("log4js");
const logger = log4js.getLogger();
const { User } = require("../Schemas/user.schema");
const writeLog = require("../middlewars/writeLog");
const jwt = require("jsonwebtoken");
const { secret } = config.get("JWT");

router.get("/:id", writeLog, (req, res) => {
  const pageID = req.params.id;
  const token = req.headers["token"];
  const userID = jwt.verify(token, secret);
  if (pageID !== userID) {
    logger.error("Access rejected");
    return res.status(403).json({ status: "Access rejected" });
  }

  User.findById(userID)
    .then(userData => res.json(userData))
    .catch(err => {
      logger.error(err.name);
      return res.json({ status: err.name });
    });
});
module.exports = router;
