const Sequelize = require("sequelize");
const path = require("path");
const UserModel = require("../models/users");

const sequelize = new Sequelize.Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "faker.sqlite"),
});

const userModel = UserModel(sequelize, Sequelize);

const db = {
  userModel,
  sequelize,
};

module.exports = db;
