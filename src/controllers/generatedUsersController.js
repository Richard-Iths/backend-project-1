const {
  generatedUserModel,
  generatedProfileModel,
  generatedLimitModel,
  userModel,
} = require("../database/db");
const AuthError = require("../models/errors/auth");
const getGeneratedUser = async (req, res, next) => {
  const UserId = req.user;
  try {
    const generatedLimit = await generatedLimitModel.findOne({
      where: { UserId },
    });

    if (!generatedLimit) {
      throw new AuthError("user does not exist");
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
        sharedLink: {
          link: generatedUser.generateSharedLink(generatedProfile.toObject()),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSharedUser = async (req, res, next) => {
  const { link } = req.params;
  const userId = req.user;
  try {
    const user = await userModel.findByPk(userId);
    if (!user) {
      throw new AuthError("unauthorized action", 409);
    }
    const generatedUser = generatedUserModel.decodeGeneratedLink(link);
    res.json(generatedUser);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getGeneratedUser,
  getSharedUser,
};
