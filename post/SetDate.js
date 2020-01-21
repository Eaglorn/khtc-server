const { Pool, Client } = require('pg')
var conf = require('../conf/db')

module.exports = async function (req, res) {
    const pool = new Pool(conf.postgres)
    pool.query('UPDATE public.setting SET date = $1 WHERE id = 0', [req.body.date], (err, answer) => {
        if (err) {
          throw err
        }
        res.send({ })
        pool.end()
    })
}