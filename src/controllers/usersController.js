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

module.exports = {
  postLogin,
};
