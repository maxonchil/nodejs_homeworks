const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;
const User = new Schema({
  name: { type: String },
  username: { type: String, unique: true, index: true },
  password: { type: String },
  email: { type: String, unique: true, index: true },
  status: { type: String }
});
const userSchemaValidation = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .required(),
  username: Joi.string()
    .min(5)
    .max(20)
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
  email: Joi.string()
    .max(30)
    .email()
    .min(4)
    .required(),
  status: Joi.string()
    .required()
    .min(6)
});

module.exports = { User: mongoose.model("User", User), userSchemaValidation };
