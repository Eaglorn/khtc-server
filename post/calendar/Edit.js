var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

var Calendar = require("../../model/Calendar");

module.exports = async function (req, res) {
  Calendar.findOne({
    attributes: ["id", "user"],
    where: {
      id: req.body.id,
    },
  })
    .then((calendar) => {
      calendar
        .update(
          { title: req.body.title, text: req.body.text },
          { fields: ["title", "text"] }
        )
        .then(() => {
          res.send({});
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
};
