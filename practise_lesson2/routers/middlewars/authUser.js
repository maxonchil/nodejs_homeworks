const jwt = require("jsonwebtoken");

const { users } = require("../../data/users.json");

module.exports = (req, res) => {
  const { username: logUserName, password: logUserPass } = req.body;
  let status = { JWT: jwt.sign({ foo: "bar" }, "secret") };

  const user = users.find(
    ({ username, password }) =>
      username === logUserName && password === logUserPass
  );
  if (user === null) {
    status = { status: "Can not found user" };
  }
  res.status(200).json(status);
};
