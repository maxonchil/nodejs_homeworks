const express = require("express");
const router = express.Router();
const config = require("config");
const { secret } = config.get("JWT");
const jwt = require("jsonwebtoken");
const log4js = require("log4js");
const logger = log4js.getLogger();
const { User } = require("../Schemas/user.schema");
const writeLog = require("../middlewars/writeLog");

router.get("/:id", writeLog, (req, res) => {
  const token = req.headers["token"];
  const userID = jwt.verify(token, secret);

  User.findById(userID)
    .then(userData => res.json(userData))
    .catch(err => {
      logger.error(err.name);
      throw err;
    });
});
module.exports = router;
