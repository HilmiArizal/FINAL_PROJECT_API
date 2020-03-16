const database = require('../Database');
const { createJWTToken } = require('../Helpers/jwt')
const Crypto = require('crypto');
const transporter = require('../Helpers/nodemailer')
const { uploader } = require('../Helpers/uploader')
const fs = require('fs');

module.exports = {
    getAllUsers: (req, res) => {
        // console.log(req.query)
        const query = `SELECT * FROM users`
        database.query(query, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
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
            res.status(200).send({ ...results[0], token })
        })
    },
    keepLogin: (req, res) => {
        let queryKeepLogin = `SELECT * FROM users WHERE id = ${req.user.id}`
        database.query(queryKeepLogin, (err, results) => {
            if (err) return res.status(500).send(err)
            const { username, password, email, role } = results[0]
            const token = createJWTToken({ ...results[0] })
            res.status(200).send({ ...results[0], token })
        })
    },
    registerUsers: (req, res) => {
        // console.log(req.body)
        const { username, email, password } = req.body
        const hashPassword = Crypto.createHmac('sha256', 'secretKey').update(password).digest('hex')
        const queryRegister = `INSERT into users (username, email, password, role) VALUES ('${username}', '${email}', '${hashPassword}', 'user');`
        database.query(queryRegister, req.body, (err, results) => {
            if (err) return res.status(500).send(err)
            const queryUsername = `SELECT * FROM users WHERE username = '${username}';`
            database.query(queryUsername, (err, results) => {
                if (err) return res.status(500).send(err)

                const { username, email, password, role, verified } = results[0]
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
                    res.status(200).send({ ...results[0], token })
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
    editPassword: (req, res) => {
        const id = parseInt(req.params.id)
        const { oldpassword, newpassword } = req.body
        const hashOldPassword = Crypto.createHmac('sha256', 'secretKey').update(oldpassword).digest('hex')
        const queryUser = `SELECT * FROM users WHERE password = '${hashOldPassword}' AND id = ${id}`
        database.query(queryUser, (err, results) => {
            if (err) return res.status(500).send(err)

            const hashNewPassword = Crypto.createHmac('sha256', 'secretKey').update(newpassword).digest('hex')
            if (results && results.length !== 0) {
                const queryEditPassword = `UPDATE users SET password = '${hashNewPassword}' WHERE id = ${id}`;
                database.query(queryEditPassword, (err, results2) => {
                    if (err) return res.status(500).send(err)
                    res.status(200).send(results2)
                })
            } else {
                return res.status(401).send('INVALID PASSWORD')
            }
        })
    },
    getProfileUser: (req, res) => {
        const id = parseInt(req.params.id)
        let queryGetProfile = `SELECT u.*, g.id AS idGender, g.gender, j.id AS idJob, j.job
        FROM users u
        LEFT JOIN gender g ON u.genderId = g.id
        LEFT JOIN job j ON u.jobId = j.id
        WHERE u.id = ${id}`
        database.query(queryGetProfile, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    editProfileUser: (req, res) => {
        try {
            const path = '/images'
            const upload = uploader(path, 'IMG').fields([{ name: 'image' }])
            upload(req, res, (err) => {
                // console.log('ini', req.files.image)
                if (err) {
                    console.log(err)
                    return res.status(500).send(err)
                }
                const { image } = req.files
                // console.log('ini', image)
                const imagepath = image ? path + '/' + image[0].filename : null
                const profilecomplete = JSON.parse(req.body.profilecomplete)
                profilecomplete.imagePath = imagepath


                let changeimage = profilecomplete.changeImage

                const id = parseInt(req.params.id)
                const { firstname, lastname, age, phonenumber, genderId, jobId, address } = profilecomplete.dataprofile
                console.log(profilecomplete.dataprofile)
                let queryEditProfile = `UPDATE users SET firstname = '${firstname}', lastname = '${lastname}', phonenumber = '${phonenumber}', age = '${age}', genderId = '${genderId}', jobId = '${jobId}', address = '${address}' WHERE id = ${id}`
                database.query(queryEditProfile, profilecomplete.dataprofile, (err, results) => {
                    if (err) {
                        fs.unlinkSync('./Public' + imagepath)
                        console.log(err)
                        return res.status(500).send(err)
                    }
                    let queryGetProfile = `SELECT * FROM users WHERE id = ${id}`
                    database.query(queryGetProfile, (err, results2) => {
                        // console.log(results2)
                        if (err) {
                            return res.status(500).send(err)
                        } else if (results2 !== 0) {
                            if (changeimage) {
                                console.log('editsuccesss')
                                console.log(changeimage)
                                const queryEditImage = `UPDATE users SET imagePath = '${profilecomplete.imagePath}' WHERE id = ${id}`
                                database.query(queryEditImage, (err, results3) => {
                                    // fs.unlinkSync('./Public' + imagePath)
                                    if (err) {
                                        console.log(err)
                                        fs.unlinkSync('./Public' + imagepath)
                                        return res.status(500).send(err)
                                    }
                                    if (image) {
                                        fs.unlinkSync('./Public' + results2[0].imagePath)
                                    }
                                    res.status(200).send(results)
                                })
                            } else {
                                res.status(200).send(results)
                            }
                        }
                    })

                })
            })
        } catch (err) {
            console.log(err)
        }
    },
    editProfileUserTransaction: (req, res) => {
        const id = parseInt(req.params.id)
        const { firstname, lastname, phonenumber, address } = req.body
        let queryEditProfileTransaction = `UPDATE users SET firstname = '${firstname}', lastname = '${lastname}', phonenumber = '${phonenumber}', address = '${address}' WHERE id = '${id}'`
        database.query(queryEditProfileTransaction, req.body, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getGenderUser: (req, res) => {
        const queryGetGender = `SELECT * FROM gender`
        database.query(queryGetGender, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getJobUser: (req, res) => {
        const queryGetGender = `SELECT * FROM job`
        database.query(queryGetGender, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    }
}