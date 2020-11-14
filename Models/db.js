const mysql = require('mysql');

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
});

connection.getConnection(function(err, connection) {
    if (err) {
        console.log(err)
    }
    if (connection) {
        console.log('Database connected!!')
    }
})

module.exports = connection