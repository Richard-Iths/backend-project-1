const { userModel } = require("../database/db");
const generatedUsersLimit = async (req, res, next) => {
  const userId = req.user;
  try {
    const user = await userModel.findByPk(userId, {
      include: "GeneratedLimit",
    });

    const [currentDate] = new Date().toString().split("T");
    const [lastValid] = user.GeneratedLimit.lastValidGenerate
      .toString()
      .split("T");
    console.log(currentDate, "currentDate");
    console.log(lastValid);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generatedUsersLimit,
};
