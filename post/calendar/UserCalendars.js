var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

var User = require("../../model/User");
var Calendar = require("../../model/Calendar");

module.exports = async function (req, res) {
  User.findOne({
    attributes: ["id", "password"],
    where: {
      login: req.body.login,
    },
  }).then((user) => {
    if (user != null) {
      if (req.body.password === user.password) {
        Calendar.findAll({
          attributes: ["id", "title", "text"],
          where: {
            user: user.id,
          },
        }).then((calendars) => {
          res.send({ success: true, calendars: calendars });
        });
      } else {
        res.send({ success: false });
      }
    } else {
      res.send({ success: false });
    }
  });
};
