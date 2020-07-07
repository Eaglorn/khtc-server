var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

var Event = require("../../model/Event");

module.exports = async function (req, res) {
  Event.findOne({
    attributes: ["id", "calendar"],
    where: {
      id: req.body.id,
    },
  })
    .then((event) => {
      event.destroy().then((event_delete) => {
        Event.findAll({
          attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("date")), "date"]],
          where: {
            calendar: event.calendar,
            date: {
              [Op.gt]: moment().startOf("month").format(),
              [Op.lt]: moment().endOf("month").format(),
            },
          },
        }).then((dates) => {
          res.send({ dates: dates });
        })
          .catch(function (err) {
            console.log(err);
          });
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};
