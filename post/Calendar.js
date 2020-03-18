var User = require("../model/User");
var Calendar = require("../model/Calendar");
var Event = require("../model/Event");

module.exports.GetUserCalendars = async function(req, res) {
  User.findOne({
    attributes: ["id", "password"],
    where: {
      login: req.body.login
    }
  }).then(user => {
    if (user != null) {
      if (req.body.password === user.password) {
        Calendar.findAll({
          attributes: ["id", "title", "text"],
          where: {
            owner: user.id
          }
        }).then(calendars => {
          res.send({ success: true, calendars: calendars });
        });
      } else {
        res.send({ success: false });
      }
    } else {
      res.send({ success: false });
    }
  });
};

module.exports.GetUserCalendar = async function(req, res) {
  User.findOne({
    attributes: ["id", "password"],
    where: {
      login: req.body.login
    }
  }).then(user => {
    if (user != null) {
      if (req.body.password === user.password) {
        Calendar.findOne({
          attributes: ["id", "title", "text", "owner"],
          where: {
            id: req.body.id
          }
        }).then(calendar => {
          if (calendar.owner === user.id) {
            Event.findAll({
              attributes: ["id", "title", "text", "date", "calendar_id"],
              where: {
                calendar_id: calendar.id
              }
            }).then(events => {
              res.send({ success: true, calendar: calendar, events: events });
            });
          } else {
            res.send({ success: false });
          }
        });
      } else {
        res.send({ success: false });
      }
    } else {
      res.send({ success: false });
    }
  });
};
