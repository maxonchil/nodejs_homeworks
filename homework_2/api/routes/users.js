const express = require("express");
const router = express.Router();

const { users } = require("../../data/users.json");

const tokenAuth = require("../middlewars/tokenAuth");
const addNote = require("../middlewars/addNote");
const deleteNote = require("../middlewars/deleteNote");
const changeSatus = require("../middlewars/changeStatus");

router.get("/:id", tokenAuth, (req, res) => {
  const logedUserId = Number(req.params.id);
  const user = users.find(({ id }) => id === logedUserId);
  res
    .status(200)
    .render("index", { home: false, login: false, loginError: false, user });
});

router.post(
  "/:id",
  tokenAuth,
  changeSatus,
  addNote,
  deleteNote,
  (req, res) => {}
);

module.exports = router;
