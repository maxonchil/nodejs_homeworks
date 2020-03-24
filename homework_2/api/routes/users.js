const express = require("express");
const router = express.Router();

const { users } = require("../../data/users.json");

const tokenAuth = require("../middlewars/tokenAuth");
const addNote = require("../middlewars/addNote");
const deleteNote = require("../middlewars/deleteNote");
const changeSatus = require("../middlewars/changeStatus");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/:id", tokenAuth, (req, res) => {
  const logedUserId = Number(req.params.id);
  const user = users.find(({ id }) => id === logedUserId);

  if (user === undefined) {
    res.status(400);
    console.error(err.name);
    throw err;
  }

  res
    .status(200)
    .render("index", { home: false, login: false, loginError: false, user });
});

router.put("/:id", changeSatus);
router.delete("/:id", deleteNote);
router.post("/:id", addNote);

module.exports = router;
