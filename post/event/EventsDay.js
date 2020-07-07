var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

var Calendar = require("../../model/Calendar");
var Event = require("../../model/Event");

module.exports = async function (req, res) {
  Calendar.findOne({
    attributes: ["id"],
    where: {
      id: req.body.id,
    },
  })
    .then((calendar) => {
      Event.findAll({
        attributes: ["id", "date", "title"],
        where: {
          calendar: calendar.id,
          date: {
            [Op.gt]: moment({
              month: req.body.month,
              year: req.body.year,
              day: req.body.day,
            })
              .startOf("day")
              .format(),
            [Op.lt]: moment({
              month: req.body.month,
              year: req.body.year,
              day: req.body.day,
            })
              .endOf("day")
              .format(),
          },
        },
      })
        .then((events) => {
          res.send({ events: events });
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
};
