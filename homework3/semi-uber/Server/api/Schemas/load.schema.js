const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;
const { STATUS } = require("../../data/loadData.json");
const dimensionsSchema = require("./dimensions.schema");

const Load = new Schema({
  created_by: { type: String },
  logs: { type: Array },
  assigned_to: { type: String, default: "Not assigned" },
  status: { type: String, default: STATUS.NEW },
  state: { type: String, default: "Created" },
  dimensions: { type: Object },
  payload: { type: Number }
});

const loadSchemaValidation = Joi.object({
  created_by: Joi.string().required(),
  logs: Joi.array().required(),
  assigned_to: Joi.string(),
  status: Joi.string(),
  state: Joi.string(),
  dimensions: dimensionsSchema,
  payload: Joi.number().required()
});

module.exports = { Load: mongoose.model("Load", Load), loadSchemaValidation };
