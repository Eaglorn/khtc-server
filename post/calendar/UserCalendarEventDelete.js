var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

var Event = require("../../model/Event");

module.exports = async function (req, res) {
  Event.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((event) => {
      event.destroy().then((event) => {
        res.send({});
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};
