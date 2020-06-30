const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://khtc:1352461324q@46.8.146.12:5434/khtc",
  { logging: false }
);

module.exports = sequelize;
