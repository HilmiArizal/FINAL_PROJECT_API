const database = require('../Database');
const { uploader } = require('../Helpers/uploader');
const fs = require('fs');

module.exports = {
    getAllTransactionPaid: (req, res) => {
        const queryGetAllTransactionPaid = `SELECT tr.id AS idtransaction, tr.userId,tr.totaltransaction,tr.status,tr.datetransaction, tr.imagePath AS buktitransaksi, u.*
        FROM transaction tr
        JOIN users u ON tr.userId = u.id
        WHERE status = "PAID" ORDER BY tr.id DESC limit ${req.query.limit} offset ${req.query.offset};`
        database.query(queryGetAllTransactionPaid, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getAllTransactionOnProses: (req, res) => {
        const queryGetAllTransactionProses = `SELECT tr.id AS idtransaction, tr.userId,tr.totaltransaction,tr.status,tr.datetransaction, tr.imagePath AS buktitransaksi, u.*
        FROM transaction tr
        JOIN users u ON tr.userId = u.id
        WHERE status = "ON PROCESS";`
        database.query(queryGetAllTransactionProses, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getTransaction: (req, res) => {
        // console.log(req.user.id)
        const getTransaction = `SELECT u.*, tr.id AS idtransaction, tr.totaltransaction, tr.status, tr.datetransaction, tr.timescart, tr.metodetransaksiId, tr.imagePath
        FROM transaction tr
        JOIN users u ON tr.userId = u.id
        WHERE tr.userId = ${req.user.id} ORDER BY tr.id DESC limit ${req.query.limit} offset ${req.query.offset}`
        database.query(getTransaction, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getTransactionGroupByDate: (req, res) => {
        const queryGetTransactionDate = `SELECT * FROM transaction GROUP BY datetransaction`
        database.query(queryGetTransactionDate, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    addTransaction: (req, res) => {
        try {
            const path = '/images'
            const upload = uploader(path, 'IMG').fields([{ name: 'image' }])
            upload(req, res, (err) => {
                if (err) {
                    // console.log(err)
                    return res.status(500).send(err)
                }
                const { image } = req.files
                const imagepath = image ? path + '/' + image[0].filename : null
                // console.log('ini', imagepath)
                const transactioncomplete = JSON.parse(req.body.transactioncomplete)
                // console.log('itu',transactioncomplete)
                transactioncomplete.datatransaction.imagePath = imagepath

                const queryAddTransaction = `INSERT INTO transaction SET ?`
                database.query(queryAddTransaction, transactioncomplete.datatransaction, (err, results) => {
                    if (err) {
                        console.log(err)
                        fs.unlinkSync('./Public' + imagepath)
                        return res.status(500).send(err)
                    }
                    res.status(200).send(results)
                })
            })
        } catch (err) {
            console.log(err)
        }
    },
    getDetailTransaction: (req, res) => {
        const queryGetDetailTransaction = `SELECT * FROM detailtransaction WHERE username = '${req.query.username}'`
        database.query(queryGetDetailTransaction, (err, results) => {
            // console.log(results)
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    addDetailTransaction: (req, res) => {
        const data = req.body
        data.cart.datetransaction = req.body.datetransaction
        let detailtransaction = data.cart.map((item) => {
            return [item.username, item.productname, item.imagePath, item.size, item.price, item.qty, item.stockId, item.totalprice, req.body.transactionId, req.body.datetransaction, req.body.timescart]
        })
        const queryAddDetailTransaction = `INSERT INTO detailtransaction (username, productname, imagePath, size, price, qty, stockId, totalprice, transactionId, datetransaction, timescart) VALUES ?`
        database.query(queryAddDetailTransaction, [detailtransaction], (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            console.log(results)
            const queryGetStock = `SELECT st.id AS idstock, st.jumlahstock, dt.qty, dt.transactionId
            FROM detailtransaction dt
            JOIN stock st ON dt.stockId = st.id
            WHERE dt.transactionId = ${req.body.transactionId};`
            database.query(queryGetStock, (err, results2) => {
                if (err) {
                    // console.log(err)
                    return res.status(500).send(err)
                }
                results2.map((item) => {
                    const queryUpdateStock = `UPDATE stock SET jumlahstock = ${item.jumlahstock} - ${item.qty} WHERE id = ${item.idstock}`
                    database.query(queryUpdateStock, (err, results3) => {
                        console.log('update', results3)
                        if (err) {
                            // console.log(err)
                            return res.status(500).send(err)
                        }
                    })
                })
            })
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
    getAllTotalTransaction: (req, res) => {
        const queryGetAllTotal = `SELECT SUM(totaltransaction) AS alltotaltransaction, datetransaction FROM transaction WHERE status = "PAID" GROUP BY datetransaction;`
        database.query(queryGetAllTotal, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getAllTotalTransactionWithoutDate: (req, res) => {
        const queryGetAllTotal = `SELECT SUM(totaltransaction) AS alltotaltransaction FROM transaction WHERE status = "PAID";`
        database.query(queryGetAllTotal, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getAllTotalTransactionProses: (req, res) => {
        const queryGetAllTotal = `SELECT SUM(totaltransaction) AS alltotaltransaction, datetransaction FROM transaction WHERE status = "ON PROCESS" GROUP BY datetransaction;`
        database.query(queryGetAllTotal, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getAllTotalTransactionProsesWithoutDate: (req, res) => {
        const queryGetAllTotal = `SELECT SUM(totaltransaction) AS alltotaltransaction FROM transaction WHERE status = "ON PROCESS";`
        database.query(queryGetAllTotal, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getProductPopuler: (req, res) => {
        const queryGetProductPopuler = `SELECT dt.id AS iddetail, dt.productname, dt.imagePath, SUM(dt.qty) AS qty, st.*
        FROM detailtransaction dt
        JOIN stock st ON dt.stockId = st.id
        GROUP BY productname
        ORDER BY qty DESC LIMIT 3;`
        database.query(queryGetProductPopuler, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getMetodeTransaction: (req, res) => {
        const queryGetMetodeTransaction = `SELECT * FROM metodetransaksi`
        database.query(queryGetMetodeTransaction, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getSalesProduct: (req, res) => {
        const queryGetSalesProduct = `SELECT SUM(qty) AS salesproduct FROM detailtransaction`;
        database.query(queryGetSalesProduct, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    }
}