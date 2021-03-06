var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

var User = require("../../model/User");
var Calendar = require("../../model/Calendar");

module.exports = async function (req, res) {
  User.findOne({
    attributes: ["id"],
    where: {
      login: req.body.login,
    },
  })
    .then((user) => {
      Calendar.findAll({
        attributes: ["id", "title", "text"],
        where: {
          user: user.id,
        },
      })
        .then((calendars) => {
          res.send({ calendars: calendars });
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
};
