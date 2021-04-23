const Sequelize = require("sequelize");
const path = require("path");
const UserModel = require("../models/users");
const GeneratedUserModel = require("../models/generatedUsers");
const GeneratedProfileModel = require("../models/generatedProfiles");
const GeneratedLimitModel = require("../models/generatedLimit");

const sequelize = new Sequelize.Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "faker.sqlite"),
});

const userModel = UserModel(sequelize, Sequelize);
const generatedUserModel = GeneratedUserModel(sequelize, Sequelize);
const generatedProfileModel = GeneratedProfileModel(sequelize, Sequelize);
const generatedLimitModel = GeneratedLimitModel(sequelize, Sequelize);

userModel.hasMany(generatedUserModel, {
  onDelete: "CASCADE",
});

userModel.hasOne(generatedLimitModel, {
  onDelete: "CASCADE",
});
generatedLimitModel.belongsTo(userModel);

generatedUserModel.hasOne(generatedProfileModel, {
  onDelete: "CASCADE",
});
generatedProfileModel.belongsTo(generatedUserModel);

const db = {
  userModel,
  sequelize,
  generatedUserModel,
  generatedProfileModel,
  generatedLimitModel,
};

module.exports = db;
