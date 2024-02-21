const Joi = require("joi");
const userSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .trim()
    .messages({
      "string.min": " name must be greater than 3 characters !",
      "string.max": " name must be less than 30 characters !",
    })
    .allow(null),
  email: Joi.string().email({ tlds: false }),
  mobile: Joi.string(),
});

module.exports = { userSchema };
