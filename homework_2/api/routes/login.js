const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { users } = require("../../data/users.json");

const renderProp = { home: false, login: true, loginError: false };

router.get("/", (req, res) => {
  res.status(200).render("index", renderProp);
});

router.post("/", (req, res) => {
  const { logUserName, logUserPass } = req.body;
  const user = users.find(
    ({ username, password }) =>
      username === logUserName && password === logUserPass
  );

  if (!user) {
    return res.status(404).json({ status: "No such user" });
  }
  
  res.cookie("JWT", jwt.sign(user, "secret"));
  res.status(200).json({ user });
});

router.get("/failed", (req, res) => {
  res
    .status(200)
    .render("index", { home: false, login: true, loginError: true });
});
module.exports = router;
