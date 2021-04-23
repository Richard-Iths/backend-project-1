class BaseError extends Error {
  constructor(message, statusCode) {
    this._message = message;
    this._statusCode = statusCode;
  }
  get message() {
    return this._message;
  }
  get statusCode() {
    return this._statusCode;
  }
}

module.exports = BaseError;
