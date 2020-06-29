var sequelize = require("./db");

module.exports = function (name) {
  return {
    sequelize,
    logging: false,
    modelName: name,
    timestamps: false,
    freezeTableName: true,
  };
};
