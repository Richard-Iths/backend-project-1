const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new Error();
    }
    const token = authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = id;
    next();
  } catch (error) {
    res.status(403).json({ error: "unauthorized action" });
  }
};
