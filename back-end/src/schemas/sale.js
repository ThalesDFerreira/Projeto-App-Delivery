const Joi = require('joi');

const fillField = 'All fields must be filled';

const validateSale = (body) => Joi.object({
  sellerId: Joi.number().required(),
  totalPrice: Joi.number().required().messages({
    'any.required': fillField,
    'string.empty': fillField,
  }),
  deliveryAddress: Joi.string().required().messages({
    'any.required': fillField,
    'string.empty': fillField,
  }),
  deliveryNumber: Joi.string().required().messages({
    'any.required': fillField,
    'string.empty': fillField,
  }),
  products: Joi.array().required().messages({
    'any.required': fillField,
    'string.empty': fillField,
  }),
}).validate(body);

module.exports = validateSale;
