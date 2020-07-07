var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

var Event = require("../../model/Event");

module.exports = async function (req, res) {
  Event.create({
    title: req.body.title,
    text: req.body.text,
    date: moment(req.body.date, ["YYYY/MM/DD/HH/mm"]).format(),
    calendar: req.body.calendar,
  })
    .then((event) => {
      res.send({ id: event.id });
    })
    .catch(function (err) {
      console.log(err);
    });
};
