const md5 = require('md5');

const codeAndDecodePassword = (password) => {
  const codePassFromFront = md5(password);
  return codePassFromFront;
};

module.exports = codeAndDecodePassword;
