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
          attributes: ["id", "user"],
          where: {
            id: req.body.id,
          },
        }).then((calendar) => {
          if (calendar.user === user.id) {
            Event.findAll({
              attributes: ["date"],
              distinct: "date",
              where: {
                calendar: calendar.id,
                date: {
                  [Op.gt]: moment({
                    month: req.body.month,
                    year: req.body.year,
                  })
                    .startOf("month")
                    .format(),
                  [Op.lt]: moment({
                    month: req.body.month,
                    year: req.body.year,
                  })
                    .endOf("month")
                    .format(),
                },
              },
            }).then((events) => {
              res.send({ success: true, events: events });
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
