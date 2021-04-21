const models = require("../database/db");
const userModel = models.userModel;

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    await user.comparePassword(password);
    res.json({ message: "success", token: user.getJwtToken() });
  } catch (error) {
    res.json(error.message);
  }
};

const getUserProfile = async (req, res, next) => {
  const id = req.user;
  try {
    const user = await userModel.findOne({ id });
    res.json(user.toObject());
  } catch (error) {}
};

module.exports = {
  postLogin,
  getUserProfile,
};
