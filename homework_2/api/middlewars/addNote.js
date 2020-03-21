const fs = require("fs");

const { users } = require("../../data/users.json");

module.exports = addNote = (req, res, next) => {
  const { title, description, status, add } = req.body;

  if (add) {
    const logedUserId = Number(req.params.id);
    const { notes } = users.find(({ id }) => id === logedUserId);

    try {
      notes.push({ title, description, status });
      fs.writeFileSync("./data/users.json", JSON.stringify({ users }));
    } catch (err) {
      console.log(err.name);
      throw err;
    }

    return;
  }
  next();
};
