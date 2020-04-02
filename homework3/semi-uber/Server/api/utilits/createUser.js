const { User } = require("../Schemas/user.schema");

const createUser = (name, username, password, email, status) => {
  return new User({
    name,
    username,
    password,
    email,
    status
  });
};
module.exports = createUser;
