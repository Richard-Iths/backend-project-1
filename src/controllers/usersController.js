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
const patchUserProfile = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const id = req.user;
  try {
    const user = await userModel.findOne({ id });
    await user.comparePassword(oldPassword);
    user.password = await user.hashPassword(newPassword);
    await user.save();

    res.status(200).json({ message: "password changed" });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  postLogin,
  getUserProfile,
  patchUserProfile,
};
