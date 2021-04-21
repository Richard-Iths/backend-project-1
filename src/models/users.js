module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {}
  User.init(
    {
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
