const querry = require('mysql')

const connection = querry.createConnection({
    host: 'localhost',
    user: 'hilmi',
    password: 'Hilmi12345',
    database: 'dbsarenone',
    port: 3306,
    multipleStatements: true
})

module.exports = connection;