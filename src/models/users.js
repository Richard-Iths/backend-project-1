const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AuthError = require("./errors/auth");

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
        throw new AuthError("passwords do not match", 409);
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
      hooks: {
        beforeBulkCreate(users) {
          for (user of users) {
            user.password = bcrypt.hashSync(user.password, 10);
          }
        },
        beforeSave(user) {
          if (user.changed().includes("password")) {
            user.password = bcrypt.hashSync(user.password, 10);
          }
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
