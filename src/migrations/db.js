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
  } catch (error) {}
})(models);
