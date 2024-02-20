const Joi = require("joi");
const createFromVal = Joi.object({
  first_name: Joi.string().min(3).max(30).trim().required(),
  last_name: Joi.string().min(3).trim().required(),
  email: Joi.string().email().trim().required(),
  mobile: Joi.string().trim().required(),
  subject: Joi.string().min(5).max(200).trim().required(),
  message: Joi.string().min(5).max(500).required(),
});

module.exports = { createFromVal };
