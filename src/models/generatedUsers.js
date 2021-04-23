const faker = require("faker");
const jwt = require("jsonwebtoken");
const AuthError = require("./errors/auth");

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
    generateSharedLink(profile) {
      const token = jwt.sign(
        { user: { ...this.toObject(), ...profile } },
        process.env.JWT_SECRET,
        { expiresIn: "1s" }
      );
      return process.env.GENERATED_LINK_ADDRESS.concat(token);
    }

    static decodeGeneratedLink(link) {
      try {
        const { user } = jwt.verify(link, process.env.JWT_SECRET);
        return user;
      } catch {
        throw new AuthError("invalid link provided", 403);
      }
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
