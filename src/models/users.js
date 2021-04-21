const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {
    toObject() {
      const user = this.dataValues;
      delete user.id;
      delete user.password;
      return user;
    }
    getJwtToken() {
      return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });
    }
    async comparePassword(password) {
      try {
        await bcrypt.compare(password, this.password);
      } catch (error) {
        throw new Error("compare failed");
      }
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
      hooks: {},
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
