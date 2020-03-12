const config = require("../config");
const Sequelize = require("sequelize");

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    login: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },
  config("user")
);

module.exports = User;
