const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;
const Load = new Schema({
  created_by: { type: String },
  logs: { type: Array },
  assigned_to: { type: String },
  status: { type: String },
  state: { type: String },
  dimensions: { type: Object },
  payload: { type: Number }
});
const loadSchemaValidation = Joi.object({
  created_by: Joi.string().required(),
  logs: Joi.array().required(),
  assigned_to: Joi.string().required(),
  status: Joi.string()
    .min(3)
    .required(),
  state: Joi.string()
    .required()
    .min(3),
  dimensions: Joi.object().required(),
  payload: Joi.number().required()
});

module.exports = { Load: mongoose.model("Load", Load), loadSchemaValidation };
