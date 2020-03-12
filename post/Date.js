const { Pool, Client } = require("pg");
var conf = require("../config/db");

module.exports.Get = async function(req, res) {
  const pool = new Pool(conf.postgres);
  pool.query("SELECT * FROM public.setting", (err, answer) => {
    if (err) {
      throw err;
    }
    pool.end();
    res.send({ date: answer.rows[0].date });
  });
};

module.exports.Set = async function(req, res) {
  const pool = new Pool(conf.postgres);
  pool.query(
    "UPDATE public.setting SET date = $1 WHERE id = 0",
    [req.body.date],
    (err, answer) => {
      if (err) {
        throw err;
      }
      pool.end();
      res.send({});
    }
  );
};
