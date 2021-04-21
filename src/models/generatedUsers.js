const faker = require("faker");
module.exports = (sequelize, Sequelize) => {
  class GeneratedUser extends Sequelize.Model {
    static async generateUser() {
      const generatedUsers = await GeneratedUser.findAll();
      let uniqueUser = null;

      while (!uniqueUser) {
        const userName = faker.name.findName();
        const userExists = generatedUsers.some(
          (user) => user.name === userName
        );
        if (!userExists) {
          uniqueUser = userName;
        }
      }

      return uniqueUser;
    }
  }
  GeneratedUser.init(
    {
      name: {
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
