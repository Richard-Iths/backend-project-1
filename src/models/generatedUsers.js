const faker = require("faker");

module.exports = (sequelize, Sequelize) => {
  class GeneratedUser extends Sequelize.Model {
    static async generateUser() {
      const generatedUsers = await GeneratedUser.findAll({
        include: "GeneratedProfile",
      });

      let uniqueUser = null;

      while (!uniqueUser) {
        const generatedUser = faker.helpers.contextualCard();
        const userExists = generatedUsers.some(
          (user) =>
            user.name === generatedUser.name ||
            user.GeneratedProfile.picture === generatedUser.avatar ||
            user.GeneratedProfile.birthday === generatedUser.dob ||
            user.GeneratedProfile.address === generatedUser.address.street
        );
        if (!userExists) {
          uniqueUser = {
            user: {
              name: generatedUser.name,
            },
            profile: {
              picture: generatedUser.avatar,
              address: generatedUser.address.street,
              city: generatedUser.address.city,
              birthday: generatedUser.dob.toString(),
              profession: generatedUser.company.bs,
              personal: faker.hacker.phrase(),
            },
          };
        }
      }
      return uniqueUser;
    }
    toObject() {
      const user = this.dataValues;
      delete user.id;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.UserId;
      return user;
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
