module.exports = (sequelize, Sequelize) => {
  class GeneratedUser extends Sequelize.Model {}
  GeneratedUser.init(
    {
      firstName: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        required: true,
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        required: true,
      },
    },
    {
      sequelize,
      modelName: "GeneratedUser",
    }
  );

  return GeneratedUser;
};
