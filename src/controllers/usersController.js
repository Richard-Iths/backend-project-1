const models = require("../database/db");
const userModel = models.userModel;

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  console.log(user.toObject);

  res.json(user.toObject);
};

module.exports = {
  postLogin,
};
