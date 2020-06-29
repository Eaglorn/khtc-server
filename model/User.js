const config = require("../config");
const Sequelize = require("sequelize");

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    surname: {
      type: Sequelize.STRING,
    },
  },
  config("user")
);

module.exports = User;
