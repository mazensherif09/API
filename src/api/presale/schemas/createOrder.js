const Joi = require("joi");
const orderSchema = Joi.object({
    Qty: Joi.number().min(1).required(),
    address: Joi.string().min(5).max(50).required(),
    network: Joi.number().required(),
});

module.exports = { orderSchema };
