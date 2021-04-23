const BaseError = require("./baseError");
class InvalidBody extends BaseError {
  constructor(statusCode, message) {
    super(message, statusCode);
  }
}

module.exports = InvalidBody;
