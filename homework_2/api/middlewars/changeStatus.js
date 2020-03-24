const fs = require("fs");

const { users } = require("../../data/users.json");

module.exports = changeStatus = (req, res, next) => {
  const { status: newStatus, changeStatus, title: titleOfChanged } = req.body;

  const logedUserId = Number(req.params.id);
  const user = users.find(({ id }) => id === logedUserId);
  const { notes } = user;
  const changedNote = notes.find(({ title }) => title === titleOfChanged);
console.log(user)
  try {
    changedNote.status = newStatus;
    fs.writeFileSync("./data/users.json", JSON.stringify({ users }));
  } catch (err) {
    res.status(400);
    console.error(err.name);
    throw err;
  }
  res
    .status(200)
    .render("index", { home: false, login: true, loginError: false, user });
};
