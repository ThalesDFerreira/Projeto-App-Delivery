const { authTokenValidation } = require('../auth/JWT');

const validateToken = (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    const { id: userId } = authTokenValidation(authorization);
    req.userId = userId; 
    next();
  } catch (error) {
    next(error);
}
};

module.exports = validateToken;