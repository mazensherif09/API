const Joi = require("joi");
const walletSchema = Joi.object({
  address: Joi.string().min(5).max(50).required(),
  network: Joi.number().required(),
});

module.exports = { walletSchema };
