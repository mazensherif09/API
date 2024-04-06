const Joi = require("joi");
const LoginVal = Joi.object({
  identifier: Joi.string().min(6).required().messages({
    "string.empty": "Enter email or username !",
  }).trim(),
  password: Joi.string()
    .pattern(/^[A-Z][a-z0-9#@]{8,30}$/).trim()
    .required()
    .messages({
      "string.pattern.base":
        "password must contain Uppercase letters: A-Z Lowercase letters: a-z.Numbers: 0-9 !",
      "string.empty": " can't be empty!!",
    }),
});

module.exports = { LoginVal };
