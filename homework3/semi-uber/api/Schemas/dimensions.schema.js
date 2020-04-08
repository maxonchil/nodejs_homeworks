const Joi = require("@hapi/joi");
const dimensionsSchema = Joi.object({
  width: Joi.number().required().positive(),
  height: Joi.number().required().positive(),
  length: Joi.number().required().positive()
});

module.exports = dimensionsSchema;
