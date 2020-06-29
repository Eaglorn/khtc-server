var moment = require("moment");
var Op = require("sequelize").Op;

var User = require("../../model/User");
var Calendar = require("../../model/Calendar");
var Event = require("../../model/Event");

module.exports = async function (req, res) {
  User.findOne({
    attributes: ["id", "password"],
    where: {
      login: req.body.login,
    },
  }).then((user) => {
    if (user != null) {
      if (req.body.password === user.password) {
        Calendar.findOne({
          attributes: ["id", "title", "text", "user"],
          where: {
            id: req.body.id,
          },
        }).then((calendar) => {
          if (calendar.user === user.id) {
            Event.findAll({
              attributes: ["id", "title", "text", "date", "calendar"],
              where: {
                calendar: calendar.id,
                date: {
                  [Op.gt]: moment().startOf("month").format(),
                  [Op.lt]: moment().endOf("month").format(),
                },
              },
            }).then((events) => {
              res.send({ success: true, calendar: calendar, events: events });
            });
          } else {
            res.send({ success: false });
          }
        });
      } else {
        res.send({ success: false });
      }
    } else {
      res.send({ success: false });
    }
  });
};
