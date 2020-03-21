const fs = require("fs");

const { users } = require("../../data/users.json");

const removeItemFromArray = (array, element) => {
  const removedElement = array.indexOf(element);
  if (removedElement !== -1) {
    return array.splice(removedElement, 1);
  }
  return false;
};

module.exports = deleteNote = (req, res, next) => {
  const logedUserId = Number(req.params.id);
  const { title: titleToDelete } = req.body;
  const user = users.find(({ id }) => id === logedUserId);
  const { notes } = user;
  const removableNote = notes.find(({ title }) => title === titleToDelete);

  try {
    removeItemFromArray(notes, removableNote);
    fs.writeFileSync("./data/users.json", JSON.stringify({ users }));
  } catch (err) {
    console.log(err.name);
    throw err;
  }

  res
    .status(200)
    .render("index", { home: false, login: true, loginError: false, user });
};
