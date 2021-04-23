const moment = require("moment");

module.exports = (sequelize, Sequelize) => {
  class GeneratedLimit extends Sequelize.Model {
    checkLimit() {
      const lastValid = moment(this.lastValidGenerate).format("YYYYMMDD");
      const currentDate = moment(new Date()).format("YYYYMMDD");

      if (currentDate > lastValid) {
        this.count = 0;
      } else if (this.count > process.env.GENERATED_USER_LIMIT) {
        throw new Error("Max limit reached");
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
