const fs = require("fs");

const { users } = require("../../data/users.json");

module.exports = changeStatus = (req, res, next) => {
  const { status: newStatus, changeStatus, title: titleOfChanged } = req.body;

  if (changeStatus) {
    const logedUserId = Number(req.params.id);
    const { notes } = users.find(({ id }) => id === logedUserId);
    const changedNote = notes.find(({ title }) => title === titleOfChanged);

    try {
      changedNote.status = newStatus;
      fs.writeFileSync("./data/users.json", JSON.stringify({ users }));
    } catch (err) {
      console.log(err.name);
      throw err;
    }

    return;
  }
  next();
};
