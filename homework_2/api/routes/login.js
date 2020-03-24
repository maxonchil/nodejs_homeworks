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

  if (user === undefined) {
    res.status(400).json({ status: "Login failed" });
    throw new Error();
  }

  const { name, username, password, id } = user;
  const token = jwt.sign({ name, username, password, id }, "secret");
  res.cookie("JWT", token);
  res.status(200).json({ user });
});

router.get("/failed", (req, res) => {
  res
    .status(401)
    .render("index", { home: false, login: true, loginError: true });
});
module.exports = router;
