const models = require("../database/db");
const generateUsersModel = models.generatedUserModel;
const generateUserProfileModel = models.generatedProfileModel;

const getGeneratedUser = async (req, res, next) => {
  const UserId = req.user;
  try {
    const { user, profile } = await generateUsersModel.generateUser();

    const generatedUser = await generateUsersModel.create({
      ...user,
      UserId,
    });
    const generatedProfile = await generateUserProfileModel.create({
      ...profile,
      GeneratedUserId: generatedUser.id,
    });

    res.status(201).json({
      message: "success",
      data: {
        ...generatedUser.toObject(),
        ...generatedProfile.toObject(),
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  getGeneratedUser,
};
