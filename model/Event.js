const config = require("../config");
const Sequelize = require("sequelize");

class Event extends Sequelize.Model {}

Event.init(
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
    date: {
      type: Sequelize.STRING
    },
    calendar: {
      type: Sequelize.BIGINT
    }
  },
  config("event")
);

module.exports = Event;
