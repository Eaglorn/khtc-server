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
        Calendar.create({
          title: req.body.title,
          text: req.body.text,
          user: user.id,
        }).then((calendar) => {
          Event.create({
            title: "Создание календаря",
            text: "В этот день создан данный календарь",
            date: moment(moment.now()).format(),
            calendar: calendar.id,
          }).then((event) => {
            var events = [event];
            res.send({ success: true, calendar: calendar, events: events });
          });
        });
      } else {
        res.send({ success: false });
      }
    } else {
      res.send({ success: false });
    }
  });
};
