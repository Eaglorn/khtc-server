const { Pool, Client } = require('pg')
var conf = require('../conf/db')

module.exports = async function (req, res) {
    const pool = new Pool(conf.postgres)
    pool.query('SELECT * FROM public.user WHERE login = $1', [req.body.login], (err, answer) => {
        if (err) {
          throw err
        }
        var login = false
        var password = false
        if (answer.rows.length != 0) {
            login = true
            if(req.body.password.trim() === answer.rows[0].password.trim()) {
                password = true
            }
        }
        res.send({ "login": login, "password": password })
        pool.end()
    })
}