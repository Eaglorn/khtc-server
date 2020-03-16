const config = require("../config");
const Sequelize = require("sequelize");

class Event extends Sequelize.Model {}

Event.init(
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
    date: {
      type: Sequelize.STRING
    },
    calendar_id: {
      type: Sequelize.INTEGER
    }
  },
  config("event")
);

module.exports = Event;
