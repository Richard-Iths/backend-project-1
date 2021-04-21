const Sequelize = require("sequelize");
const path = require("path");
const UserModel = require("../models/users");
const GeneratedUserModel = require("../models/generatedUsers");
const GeneratedProfile = require("../models/generatedProfile");

const sequelize = new Sequelize.Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "faker.sqlite"),
});

const userModel = UserModel(sequelize, Sequelize);
const generatedUserModel = GeneratedUserModel(sequelize, Sequelize);
const generatedProfile = GeneratedProfile(sequelize, Sequelize);

userModel.hasMany(generatedUserModel, {
  onDelete: "CASCADE",
});
generatedProfile.hasOne(generatedProfile, {
  onDelete: "CASCADE",
});
generatedProfile.belongsTo(generatedProfile);

const db = {
  userModel,
  sequelize,
};

module.exports = db;
