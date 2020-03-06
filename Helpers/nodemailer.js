const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user : 'hilmi.arizal36@gmail.com',
        pass : 'odorwyksexztyowe'
    },
    tls : {
        rejectUnauthorized :  false
    }
})

module.exports = transporter;
