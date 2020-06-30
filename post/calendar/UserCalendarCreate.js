var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

var User = require("../../model/User");
var Calendar = require("../../model/Calendar");
var Event = require("../../model/Event");

module.exports = async function (req, res) {
  User.findOne({
    attributes: ["id"],
    where: {
      login: req.body.login,
    },
  })
    .then((user) => {
      Calendar.create({
        title: req.body.title,
        text: req.body.text,
        user: user.id,
      })
        .then((calendar) => {
          Event.create({
            title: "Создание календаря",
            text: "В этот день создан данный календарь",
            date: moment(moment.now()).format(),
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
    })
    .catch(function (err) {
      console.log(err);
    });
};
