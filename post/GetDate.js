const { Pool, Client } = require('pg')
var conf = require('../conf/db')

module.exports = async function (req, res) {
    const pool = new Pool(conf.postgres)
    pool.query('SELECT * FROM public.setting', (err, answer) => {
        if (err) {
          throw err
        }
        res.send({ "date": answer.rows[0].date })
        pool.end()
    })
}