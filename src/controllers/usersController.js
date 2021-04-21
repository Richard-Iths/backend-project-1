const models = require("../database/db");
const userModel = models.userModel;

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  // user.comparePassword(password);
  res.json({ message: "success", token: user.getToken });
};

module.exports = {
  postLogin,
};
