const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;
const { trucksStatuses } = require("../../data/trucksData.json");
const { IN_SERVISE } = trucksStatuses;

const Truck = new Schema({
  created_by: { type: String },
  assigned_to: { type: String, default: null },
  status: { type: String, default: IN_SERVISE },
  type: { type: String },
  dimensions: { type: Object },
  payload: { type: Number },
  name: { type: String },
  edit: { type: Boolean, default: true }
});

const truckSchemaValidation = Joi.object({
  created_by: Joi.string().required(),
  assigned_to: Joi.string(),
  status: Joi.string(),
  type: Joi.string()
    .required()
    .min(3),
  dimensions: Joi.object().required(),
  payload: Joi.number().required(),
  name: Joi.string()
    .required()
    .min(2),
  edit: Joi.boolean()
});

module.exports = {
  Truck: mongoose.model("Truck", Truck),
  truckSchemaValidation
};
