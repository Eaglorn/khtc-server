const config = require("../config");
const Sequelize = require("sequelize");

class Calendar extends Sequelize.Model {}

Calendar.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.BIGINT
    },
    title: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.STRING
    },
    user: {
      type: Sequelize.BIGINT
    }
  },
  config("calendar")
);

module.exports = Calendar;
