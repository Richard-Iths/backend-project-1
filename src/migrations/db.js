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
  } catch (error) {
    console.log(error.message);
  }
})(models);
