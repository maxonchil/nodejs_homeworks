const fs = require("fs");

const { users } = require("../../data/users.json");

module.exports = addNote = (req, res, next) => {
  const { title, description, status, add } = req.body;

  const logedUserId = Number(req.params.id);
  const user = users.find(({ id }) => id === logedUserId);
  const { notes } = user;

  if (user === undefined) {
    res.status(401).json({ status: "Login failed" });
    throw new Error();
  }

  try {
    notes.push({ title, description, status });
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
