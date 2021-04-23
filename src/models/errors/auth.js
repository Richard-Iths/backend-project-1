const BaseError = require("./baseError");

class Auth extends BaseError {
  constructor(message, statusCode) {
    super(message, statusCode);
  }
}

module.exports = Auth;
