const database = require('../Database');

module.exports = {
    getAllTransaction: (req, res) => {
        const queryGetAllTransaction = `SELECT tr.id AS idtransaction, tr.userId,tr.totaltransaction,tr.status,tr.datetransaction,u.*
        FROM transaction tr
        JOIN users u ON tr.userId = u.id;`
        database.query(queryGetAllTransaction, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getTransaction: (req, res) => {
        // console.log(req.user.id)
        const getTransaction = `SELECT *
        FROM transaction tr
        JOIN users u ON tr.userId = u.id
        WHERE tr.userId = ${req.user.id}`
        database.query(getTransaction, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    addTransaction: (req, res) => {
        const { userId, totaltransaction, datetransaction, timescart } = req.body
        const queryAddTransaction = `INSERT INTO transaction (userId, totaltransaction, datetransaction, timescart) VALUES (${userId}, ${totaltransaction}, '${datetransaction}', '${timescart}')`
        database.query(queryAddTransaction, req.body, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getDetailTransaction: (req, res) => {
        const queryGetDetailTransaction = `SELECT * FROM detailtransaction WHERE username = '${req.query.username}'`
        database.query(queryGetDetailTransaction, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    addDetailTransaction: (req, res) => {
        const data = req.body
        data.cart.datetransaction=req.body.datetransaction
        let detailtransaction = data.cart.map((item) => {
            return [item.username, item.productname, item.imagePath, item.size, item.price, item.qty, item.totalprice,req.body.datetransaction, req.body.timescart]
        })
        const queryAddDetailTransaction = `INSERT INTO detailtransaction (username, productname, imagePath, size, price, qty, totalprice, datetransaction, timescart) VALUES ?`
        database.query(queryAddDetailTransaction, [detailtransaction], (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    editStatus: (req, res) => {
        const { status } = req.body
        const queryEditStatus = `UPDATE transaction SET status = '${status}' WHERE id = ${req.query.id}`
        database.query(queryEditStatus, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    
}