var User = require("../../model/User");

module.exports = async function (req, res) {
  User.findOne({
    attributes: ["password"],
    where: {
      login: req.body.login,
    },
  })
    .then((user) => {
      if (user != null) {
        if (req.body.password === user.password) {
          res.send({ login: true, password: true });
        } else {
          res.send({ login: true, password: false });
        }
      } else {
        res.send({ login: false, password: false });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};
