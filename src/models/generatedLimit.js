const moment = require("moment");
const Throttle = require("./errors/throttle");

module.exports = (sequelize, Sequelize) => {
  class GeneratedLimit extends Sequelize.Model {
    checkLimit() {
      const lastValid = moment(this.lastValidGenerate).format("YYYYMMDD");
      const currentDate = moment(new Date()).format("YYYYMMDD");

      if (currentDate > lastValid) {
        this.count = 0;
        this.lastValidGenerate = new Date();
      } else if (this.count > process.env.GENERATED_USER_LIMIT) {
        throw new Throttle("max limit of generated users reached", 403);
      }
      this.count++;
    }
  }

  GeneratedLimit.init(
    {
      count: {
        type: Sequelize.DataTypes.INTEGER,
        required: true,
      },
      lastValidGenerate: {
        type: Sequelize.DataTypes.DATE,
        required: true,
      },
    },
    {
      sequelize,
      modelName: "GeneratedLimit",
    }
  );

  return GeneratedLimit;
};
