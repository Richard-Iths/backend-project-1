const models = require("../database/db");

(async (models) => {
  try {
    await models.userModel.bulkCreate([
      {
        email: "stabbing.steve@fuskeluring",
        password: "grillkorv123",
      },
      {
        email: "murdering.mike@fuskeluring.hack",
        password: "bananpaj1337",
      },
      {
        email: "crimes.johnsson@fuskeluring.hack",
        password: "sötsursås42",
      },
    ]);
    const users = await models.userModel.findAll();

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
