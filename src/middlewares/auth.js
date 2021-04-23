const jwt = require("jsonwebtoken");
const Auth = require("../models/errors/auth");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new Auth("Unauthorized action", 403);
    }
    const token = authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = id;
    next();
  } catch (error) {
    next(error);
  }
};
