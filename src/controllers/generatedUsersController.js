const {
  generatedUserModel,
  generatedProfileModel,
  generatedLimitModel,
} = require("../database/db");
const Auth = require("../models/errors/auth");
const getGeneratedUser = async (req, res, next) => {
  const UserId = req.user;
  try {
    const generatedLimit = await generatedLimitModel.findOne({
      where: { UserId },
    });

    if (!generatedLimit) {
      throw new Auth("user does not exist");
    }

    generatedLimit.checkLimit();

    const { user, profile } = await generatedUserModel.generateUser();

    const generatedUser = await generatedUserModel.create({
      ...user,
      UserId,
    });
    const generatedProfile = await generatedProfileModel.create({
      ...profile,
      GeneratedUserId: generatedUser.id,
    });

    await generatedLimit.save();

    res.status(201).json({
      message: "success",
      data: {
        ...generatedUser.toObject(),
        ...generatedProfile.toObject(),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGeneratedUser,
};
