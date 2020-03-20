const express = require("express");
const router = express.Router();
const fs = require("fs");

const { users } = require("../../data/users.json");
const authUser = require("../middlewars/authUser");

const getUserID = array => (array[array.length - 1].id = 1);

router.get("/", (req, resp) => {
  resp.json(users);
});

router.get("/user:id", (req, resp) => {
  const { id } = req.params;
  resp.json(users[id]);
});

router.post("/register", (req, resp) => {
  const { name, username, password } = req.body;

  const user = {
    name,
    username,
    password,
    id: getUserID(users)
  };

  users.push(user);

  fs.writeFileSync("data/users.json", JSON.stringify({ users }));

  resp.status(201).send("User was registred successfully!");
});

router.post("/login", authUser, (req, resp) => {
  console.log("Logged in");
});

module.exports = router;
