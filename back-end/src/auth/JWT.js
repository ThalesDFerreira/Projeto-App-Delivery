const JWT = require('jsonwebtoken');
const fs = require('fs');
const { join } = require('path');
const CustomError = require('../error/CustomError');

const jwtConfig = {
    expiresIn: '20h',
    algorithm: 'HS256',
};

const JWT_SECRET = fs.readFileSync(join(__dirname, '../../jwt.evaluation.key'));

const generateToken = (payload) => JWT.sign(payload, JWT_SECRET, jwtConfig);

const authTokenValidation = (token) => {
    if (!token) {
        throw new CustomError('Token not found', 401);
    }

    try {
        const verification = JWT.verify(token, JWT_SECRET);
        return verification;
    } catch (error) {
        throw new CustomError('Expired or invalid token', 401);
    }
};

module.exports = {
    generateToken,
    authTokenValidation,
};
