const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Auth = require("./errors/auth");

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
      if (!(await bcrypt.compare(password, this.password))) {
        throw new Auth("passwords do not match", 409);
      }
    }
    async hashPassword(password) {
      return await bcrypt.hash(password, 10);
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
    }
  );

  return User;
};
