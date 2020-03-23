const fs = require("fs");

const { users } = require("../../data/users.json");

module.exports = addNote = (req, res, next) => {
  const { title, description, status, add } = req.body;

  const logedUserId = Number(req.params.id);
  const user = users.find(({ id }) => id === logedUserId);
  const { notes } = user;

  try {
    notes.push({ title, description, status });
    fs.writeFileSync("./data/users.json", JSON.stringify({ users }));
  } catch (err) {
    res.status(304);
    console.log(err.name);
    throw err;
  }

  res
    .status(200)
    .render("index", { home: false, login: true, loginError: false, user });
};
