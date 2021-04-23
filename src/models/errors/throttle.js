const BaseError = require("./baseError");

class Throttle extends BaseError {
  constructor(message, statusCode) {
    super(message, statusCode);
  }
}

module.exports = Throttle;
