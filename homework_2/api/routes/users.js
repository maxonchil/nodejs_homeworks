const express = require("express");
const router = express.Router();

const { users } = require("../../data/users.json");

const tokenAuth = require("../middlewars/tokenAuth");
const addNote = require("../requestHandlers/addNote");
const deleteNote = require("../requestHandlers/deleteNote");
const changeSatus = require("../requestHandlers/changeStatus");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/:id", tokenAuth, (req, res) => {
  const logedUserId = Number(req.params.id);
  const user = users.find(({ id }) => id === logedUserId);

  if (user === undefined) {
    res.status(400);
    console.error(err.name);
    throw new Error();
  }

  res
    .status(200)
    .render("index", { home: false, login: false, loginError: false, user });
});

router.put("/:id", changeSatus);
router.delete("/:id", deleteNote);
router.post("/:id", addNote);

module.exports = router;
