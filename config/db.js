const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://khtc:1352461324q@46.8.146.12:5432/khtc"
);

module.exports = sequelize;
