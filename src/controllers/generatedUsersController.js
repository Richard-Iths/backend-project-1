const models = require("../database/db");
const generateUsersModel = models.generatedUserModel;
const generateUserProfile = models.generatedProfile;

const getGeneratedUser = async (req, res, next) => {
  const name = await generateUsersModel.generateUser();

  res.json(name);
};

module.exports = {
  getGeneratedUser,
};
