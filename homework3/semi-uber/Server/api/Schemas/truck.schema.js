const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;
const {
  TRUCK_STATUS,
  TRUCK_ASSIGNED_DEFAULT,
  TRUCK_EDIT_DEFAULT
} = require("../../data/trucksData.json");
const dimensionsSchema = require("./dimensions.schema");

const Truck = new Schema({
  created_by: { type: String },
  assigned_to: { type: String, default: TRUCK_ASSIGNED_DEFAULT },
  status: { type: String, default: TRUCK_STATUS.IN_SERVICE },
  type: { type: String },
  dimensions: { type: Object },
  payload: { type: Number },
  name: { type: String },
  edit: { type: Boolean, default: TRUCK_EDIT_DEFAULT }
});

const truckSchemaValidation = Joi.object({
  created_by: Joi.string().required(),
  assigned_to: Joi.string(),
  status: Joi.string(),
  type: Joi.string()
    .required()
    .min(3),
  dimensions: dimensionsSchema,
  payload: Joi.number()
    .positive()
    .required(),
  name: Joi.string()
    .required()
    .min(2),
  edit: Joi.boolean()
});

module.exports = {
  Truck: mongoose.model("Truck", Truck),
  truckSchemaValidation
};
