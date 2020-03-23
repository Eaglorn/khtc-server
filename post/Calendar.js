var User = require("../model/User");
var Calendar = require("../model/Calendar");
var Event = require("../model/Event");

module.exports.UserCalendars = async function(req, res) {
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
            user: user.id
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

module.exports.UserCalendar = async function(req, res) {
  User.findOne({
    attributes: ["id", "password"],
    where: {
      login: req.body.login
    }
  }).then(user => {
    if (user != null) {
      if (req.body.password === user.password) {
        Calendar.findOne({
          attributes: ["id", "title", "text", "user"],
          where: {
            id: req.body.id
          }
        }).then(calendar => {
          if (calendar.user === user.id) {
            Event.findAll({
              attributes: ["id", "title", "text", "date", "calendar"],
              where: {
                calendar: calendar.id
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

module.exports.UserCalendarCreate = async function(req, res) {
  User.findOne({
    attributes: ["id", "password"],
    where: {
      login: req.body.login
    }
  }).then(user => {
    if (user != null) {
      if (req.body.password === user.password) {
        Calendar.create({
          title: "Ваш новый календарь",
          text: "Пользуйтесь с пользой!",
          user: user.id
        }).then(calendar => {
          Event.create({
            title: "Создание календаря",
            text: "В этот день создан данный календарь",
            date: "2020/03/30",
            calendar: calendar.id
          }).then(event => {
            var events = [event];
            res.send({ success: true, calendar: calendar, events: events });
          });
        });
      } else {
        res.send({ success: false });
      }
    } else {
      res.send({ success: false });
    }
  });
};

module.exports.UserCalendarDelete = async function(req, res) {
  User.findOne({
    attributes: ["id", "password"],
    where: {
      login: req.body.login
    }
  }).then(user => {
    if (user != null) {
      if (req.body.password === user.password) {
        Calendar.findOne({
          attributes: ["id", "user"],
          where: {
            id: req.body.id
          }
        }).then(calendar => {
          if (calendar.user === user.id) {
            calendar.destroy().then(calendar => {
              Calendar.findAll({
                attributes: ["id", "title", "text"],
                where: {
                  user: user.id
                }
              }).then(calendars => {
                res.send({ success: true, calendars: calendars });
              });
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
