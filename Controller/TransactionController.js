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
        data.cart.datetransaction = req.body.datetransaction
        let detailtransaction = data.cart.map((item) => {
            return [item.username, item.productname, item.imagePath, item.size, item.price, item.qty, item.stockId, item.totalprice, req.body.datetransaction, req.body.timescart]
        })
        console.log('ini', detailtransaction)
        const queryAddDetailTransaction = `INSERT INTO detailtransaction (username, productname, imagePath, size, price, qty, stockId, totalprice, datetransaction, timescart) VALUES ?`
        database.query(queryAddDetailTransaction, [detailtransaction], (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            // console.log(results)
            const queryGetStock = `SELECT *
            FROM detailtransaction dt
            JOIN stock st ON dt.stockId = st.id
            WHERE dt.id = ${results.insertId};`
            database.query(queryGetStock, (err, results2) => {
                console.log('stock', results2)
                if (err) {
                    // console.log(err)
                    return res.status(500).send(err)
                }
                res.status(200).send(results)
            })

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
    getAllTotalTransaction: (req, res) => {
        const queryGetAllTotal = `SELECT SUM(totaltransaction) AS alltotaltransaction, datetransaction FROM transaction;`
        database.query(queryGetAllTotal, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getProductPopuler: (req, res) => {
        const queryGetProductPopuler = `SELECT productname, imagePath, SUM(qty) AS qty FROM detailtransaction
        GROUP BY productname
        ORDER BY qty DESC LIMIT 3;`
        database.query(queryGetProductPopuler, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    }
}