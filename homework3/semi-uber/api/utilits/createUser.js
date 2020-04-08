const { User } = require("../Schemas/user.schema");

const createUser = (username, password, role) => {
  return new User({
    username,
    password,
    role,
  });
};
module.exports = createUser;
