module.exports = (sequelize, Sequelize) => {
  class GeneratedProfile extends Sequelize.Model {
    toObject() {
      const profile = this.dataValues;
      delete profile.id;
      delete profile.GeneratedUserId;
      delete profile.createdAt;
      delete profile.updatedAt;
      return profile;
    }
  }
  GeneratedProfile.init(
    {
      address: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        required: true,
      },
      city: {
        type: Sequelize.DataTypes.STRING,
        required: true,
      },
      birthday: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        required: true,
      },
      personal: {
        type: Sequelize.DataTypes.STRING,
        required: true,
      },
      profession: {
        type: Sequelize.DataTypes.STRING,
        required: true,
      },
      picture: {
        type: Sequelize.DataTypes.STRING,
        required: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "GeneratedProfile",
    }
  );

  return GeneratedProfile;
};
