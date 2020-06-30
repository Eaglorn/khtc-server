var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

var Event = require("../../model/Event");

module.exports = async function (req, res) {
  Event.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("date")), "date"]],
    where: {
      calendar: req.body.id,
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
  })
    .then((events) => {
      res.send({ events: events });
    })
    .catch(function (err) {
      console.log(err);
    });
};
