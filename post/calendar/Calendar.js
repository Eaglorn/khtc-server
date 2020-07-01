var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

var Calendar = require("../../model/Calendar");
var Event = require("../../model/Event");

module.exports = async function (req, res) {
  Calendar.findOne({
    attributes: ["id", "title", "text"],
    where: {
      id: req.body.id,
    },
  })
    .then((calendar) => {
      Event.findAll({
        attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("date")), "date"]],
        where: {
          calendar: calendar.id,
          date: {
            [Op.gt]: moment().startOf("month").format(),
            [Op.lt]: moment().endOf("month").format(),
          },
        },
      })
        .then((dates) => {
          Event.findAll({
            attributes: ["id", "title", "text", "date", "calendar"],
            where: {
              calendar: calendar.id,
              date: {
                [Op.gt]: moment().startOf("day").format(),
                [Op.lt]: moment().endOf("day").format(),
              },
            },
          })
            .then((events) => {
              res.send({ calendar: calendar, dates: dates, events: events });
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
