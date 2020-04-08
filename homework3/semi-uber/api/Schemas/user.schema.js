const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;
const User = new Schema({
  username: { type: String, unique: true, index: true },
  password: { type: String },
  email: { type: String },
  role: { type: String },
  avatar: { type: String, default: null },
});
const userSchemaValidation = Joi.object({
  username: Joi.string().min(5).max(20).required(),
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().max(30).email(),
  role: Joi.string().required().min(6),
  avatar: Joi.string(),
});

module.exports = { User: mongoose.model("User", User), userSchemaValidation };
