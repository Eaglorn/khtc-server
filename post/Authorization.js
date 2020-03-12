var User = require("../model/User");

module.exports = async function(req, res) {
  User.findOne({
    attributes: ['password'],
    where: {
      login: req.body.login
    }
  }).then(result => {
    var login = false;
    var password = false;
    
    if (result != null) {     
      login = true;
      if (req.body.password == result.password) {
        password = true;
      }
    }
    res.send({ login: login, password: password });
  });
};
