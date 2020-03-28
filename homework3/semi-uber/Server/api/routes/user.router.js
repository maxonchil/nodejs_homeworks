const express = require("express");
const router = express.Router();
const config = require("config");
const log4js = require("log4js");
const logger = log4js.getLogger();
const { User } = require("../Schemas/user.schema");
const writeLog = require("../middlewars/writeLog");
const jwt = require("jsonwebtoken");
const { secret } = config.get("JWT");
const bcrypt = require("bcrypt");
const saltRounds = Number(config.get("saltRounds"));

const hashPassword = async (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds);
};
const errorHandle = (message, res) => {
  logger.error(message);
  res.status(400).json({
    success: false,
    data: {},
    error: { code: 400, message }
  });
};

router.get("/:id", writeLog, (req, res) => {
  const pageID = req.params.id;
  const token = req.headers["token"];
  const userID = jwt.verify(token, secret);
  if (pageID !== userID) {
    logger.error("Access rejected");
    return res.json({
      success: false,
      data: {},
      error: { code: 400, message: "Access rejected" }
    });
  }

  User.findById(userID)
    .then(userData =>
      res.json({
        success: true,
        data: {
          name: userData.name,
          username: userData.username,
          email: userData.email,
          status: userData.status
        },
        error: null
      })
    )
    .catch(err => {
      logger.error(err.name);
      return res.json({
        success: false,
        data: {},
        error: { code: error.code, message: error.message }
      });
    });
});

router.patch("/:id", async (req, res) => {
  const { newPassword, id: userID } = req.body;
  const hashedPass = await hashPassword(newPassword, saltRounds);
  if (!hashPassword) {
    return errorHandle("Password chanching was failt!", res);
  }
  const updatedUser = await User.findByIdAndUpdate(userID, {
    password: hashedPass
  });
  if (!updatedUser) {
    return errorHandle("Password chanching was failt!", res);
  }
  res.json({
    success: true,
    data: {},
    message: "Password was updated!"
  });
});
module.exports = router;
