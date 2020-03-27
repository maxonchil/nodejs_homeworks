const express = require("express");
const router = express.Router();
const config = require("config");
const { secret } = config.get("JWT");
const bcrypt = require("bcrypt");
const { User } = require("../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const log4js = require("log4js");
const logger = log4js.getLogger();

router.post("/", async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await User.findOne({ username });
    const token = await jwt.sign(user.id, secret);
    const verify = await bcrypt.compare(password, user.password);

    if (!verify) {
      throw new Error();
    }

    logger.info(user);
    res.status(200).json({ id: user.id, token: token });
  } catch (err) {
    res.status(400).json({ status: err.name });
    logger.error(err.name);
    throw err;
  }
});

module.exports = router;
