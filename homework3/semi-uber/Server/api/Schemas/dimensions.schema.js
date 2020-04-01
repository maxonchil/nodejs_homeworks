const Joi = require("@hapi/joi");
const dimensionsSchema = Joi.object({
  width: Joi.number().required(),
  height: Joi.number().required(),
  length: Joi.number().required()
});

module.exports = dimensionsSchema;
