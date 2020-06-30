var sequelize = require("./db");

module.exports = function (name) {
  return {
    sequelize,
    modelName: name,
    timestamps: false,
    freezeTableName: true,
  };
};
