const BaseError = require("../models/errors/baseError");

module.exports = (error, req, res, next) => {
  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  res.status(500).json({ error: "something went wrong please try again" });
};
