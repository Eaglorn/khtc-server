var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

var Calendar = require("../../model/Calendar");
var Event = require("../../model/Event");

module.exports = async function (req, res) {
  Calendar.findOne({
    attributes: ["id"],
    where: {
      login: req.body.calendar,
    },
  })
    .then((calendar) => {
      Event.create({
        title: "Создание календаря",
        text: "В этот день создан данный календарь",
        date: moment({
          day: req.body.day,
          month: req.body.month,
          year: req.body.year,
        }).format(),
        calendar: calendar.id,
      })
        .then((event) => {
          var events = [event];
          res.send({ calendar: calendar, events: events });
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
};
