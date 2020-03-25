const express = require("express");
const router = express.Router();
const writeLog = require("../middlewars/writeLog");
const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  mongoose.Schema({
    username: String,
    password: String,
    email: String,
    status: String
  })
);

const saveUser = user => {
  user
    .save()
    .then(res.json(user))
    .catch(err => {
      console.error(err.name);
      throw err;
    });
};

router.post("/", writeLog, (req, res) => {
  const { username, password, email, status } = req.body;
  const user = new User({
    username,
    password,
    email,
    status
  });

  User.find({ username }).then(answer =>
    answer.length === 0
      ? saveUser(user)
      : res.json({ status: "Nickname is allready taken" })
  );
});
module.exports = router;
