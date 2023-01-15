module.exports = class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
};