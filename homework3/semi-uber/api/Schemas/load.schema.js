const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;
const {
  LOAD_STATUS,
  LOAD_STATE,
  LOAD_ASSIGNED_DEFAULT
} = require("../../data/loadData.json");
const dimensionsSchema = require("./dimensions.schema");

const Load = new Schema({
  created_by: { type: String },
  logs: { type: Array },
  assigned_to: { type: String, default: LOAD_ASSIGNED_DEFAULT },
  status: { type: String, default: LOAD_STATUS.NEW },
  state: { type: String, default: LOAD_STATE.DEFAULT },
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
  payload: Joi.number()
    .required()
    .positive()
});

module.exports = { Load: mongoose.model("Load", Load), loadSchemaValidation };
