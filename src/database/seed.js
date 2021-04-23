const models = require("../database/db");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

(async (models) => {
  try {
    await models.userModel.bulkCreate([
      {
        email: "stabbing.steve@fuskeluring",
        password: await hashPassword("grillkorv123"),
      },
      {
        email: "murdering.mike@fuskeluring.hack",
        password: await hashPassword("bananpaj1337"),
      },
      {
        email: "crimes.johnsson@fuskeluring.hack",
        password: await hashPassword("sötsursås42"),
      },
    ]);
    const users = await models.userModel.findAll();
    console.log("here");
    for (let user of users) {
      await models.generatedLimitModel.create({
        count: 0,
        lastValidGenerate: new Date(),
        UserId: user.id,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
})(models);
