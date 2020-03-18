const config = require("../config");
const Sequelize = require("sequelize");

class Calendar extends Sequelize.Model {}

Calendar.init(
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.STRING
    },
    owner: {
      type: Sequelize.INTEGER
    }
  },
  config("calendar")
);

module.exports = Calendar;
