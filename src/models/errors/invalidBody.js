const ErrorBase = require("./errorBase");
class InvalidBody extends ErrorBase {
  constructor(statusCode, message) {
    super(message, statusCode);
  }
}

module.exports = InvalidBody;
