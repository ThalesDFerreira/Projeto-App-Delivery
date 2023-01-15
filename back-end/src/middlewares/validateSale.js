const CustomError = require('../error/CustomError');
const joiValidateUser = require('../schemas/sale');

const validateSale = (req, _res, next) => {
  const { error } = joiValidateUser(req.body);

  //   if (error?.message.includes('is required')) throw new CustomError(error.message, 400);
  if (error) throw new CustomError(error.message, 400);

  next();
};

module.exports = validateSale;
