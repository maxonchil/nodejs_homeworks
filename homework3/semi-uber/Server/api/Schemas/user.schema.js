const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const User = new Schema({
  name: { type: String, require: true, minLength: [3, "Name is too short!"] },
  username: {
    type: String,
    require: true,
    minLength: [5, "Username is too short!"],
    unique: true
  },
  password: { type: String, require: true },
  email: {
    type: String,
    index: true,
    unique: true,
    require: true,
    minLength: [4, "Email is too short!"],
    uniqueCaseInsensitive: true
  },
  status: { type: String, require: true },
  jwt: { type: String, require: true }
});
User.plugin(uniqueValidator);

module.exports = mongoose.model("User", User);
