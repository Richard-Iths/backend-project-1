module.exports = (sequelize, Sequelize) => {
  class GeneratedLimit extends Sequelize.Model {}

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
