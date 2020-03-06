const database = require('../Database');
const { createJWTToken } = require('../Helpers/jwt')
const Crypto = require('crypto');
const transporter = require('../Helpers/nodemailer')

module.exports = {
    getAllUsers: (req, res) => {
        // console.log(req.query)
        const query = `SELECT * FROM users`
        database.query(query, (err, results) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(results)
        })
    },
    loginUsers: (req, res) => {
        // console.log(req.body)
        const { username, password } = req.body
        const queryLogin = `SELECT * FROM users WHERE username = '${username}'`
        database.query(queryLogin, (err, results) => {
            if (err) return res.status(500).send(err)
            // INPUT FULL DATA
            if (username === '' || password === '') return res.status(401).send('FILL IN CORRECTLY!')
            // CHECK USER
            if (results.length === 0) return res.status(404).send('USER NOT FOUND')
            // CHECK PASSWORD
            const hashPassword = Crypto.createHmac('sha256', 'secretKey').update(password).digest('hex')
            if (hashPassword !== results[0].password)
                return res.status(401).send('INVALID PASSWORD')
            // EVERYTHING IS OK
            const token = createJWTToken({ ...results[0] })
            return res.status(200).send({ ...results[0], token })
        })
    },
    keepLogin: (req, res) => {
        let queryKeepLogin = `SELECT * FROM users WHERE id = ${req.user.id}`
        database.query(queryKeepLogin, (err, results) => {
            if (err) return res.status(500).send(err)
            const { id, username, password, email, role } = results[0]
            const token = createJWTToken({
                id, username, password, email, role
            })
            return res.status(200).send({ ...results[0], token })
        })
    },
    registerUsers: (req, res) => {
        // console.log(req.body)
        console.log('masuk')
        const { username, email, password } = req.body
        const hashPassword = Crypto.createHmac('sha256', 'secretKey').update(password).digest('hex')
        const queryRegister = `INSERT into users (username, email, password, role) VALUES ('${username}', '${email}', '${hashPassword}', 'user');`
        database.query(queryRegister, req.body, (err, results) => {
            if (err) return res.status(500).send(err)
            const queryUsername = `SELECT * FROM users WHERE username = '${username}';`
            database.query(queryUsername, (err, results) => {
                if (err) return res.status(500).send(err)
                const { id, username, email, password, role, verified } = results[0]
                const token = createJWTToken({ ...results[0] })

                let verificationLink = `http://localhost:3000/verified?token=${token}`
                let mailOption = {
                    from: `Admin <hilmi.arizal36@gmail.com>`,
                    to: email,
                    subject: `Email Confirmation`,
                    html: `
                    <h1> Hello ${username}</h1> \n
                    <a href='${verificationLink}'>
                    Click here to verify account
                    `
                }
                transporter.sendMail(mailOption, (err, results) => {
                    if (err) return res.status(500).send(err)
                    return res.status(200).send({ ...results[0], token })
                })
            })
        })
    },
    emailVerification: (req, res) => {
        let queryGetId = `SELECT * FROM users WHERE id = '${req.user.id}'`
        database.query(queryGetId, (err, results) => {
            if (err) return res.status(500).send(err)
            let queryUpdate = `UPDATE users SET verified = 'verified' WHERE id = '${results[0].id}'`
            database.query(queryUpdate, (err, results2) => {
                if (err) return res.status(500).send(err)
                res.status(200).send({ message: 'success' })
            })
        })
    },
}