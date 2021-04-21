const jwt = require("jsonwebtoken");

module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {
    toObject() {
      delete this.id;
    }
  }
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
      getterMethods: {
        toObject() {
          return { email: this.email };
        },
        getToken() {
          const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          return token;
        },
      },
    }
  );

  return User;
};
