const Joi = require("joi");
const userSchema = Joi.object({
  username: Joi.string().min(6).max(30),
  email: Joi.string().email().min(6).max(30),
  mobile: Joi.number().min(8).max(20),
});

module.exports = { userSchema };
