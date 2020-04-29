const database = require('../Database');

module.exports = {
    addToCart: (req, res) => {
        const { userId, productId, sizeId, priceId, stockId, jumlahstock, qty, totalprice } = req.body
        const queryGetAllCart = `SELECT c.id AS idcart, pr.price FROM cart c JOIN price pr ON c.priceId = pr.id WHERE productId = ${productId} AND stockId = ${stockId} AND userId = ${userId};`
        database.query(queryGetAllCart, (err, resultsGet) => {
            if (err) return res.status(500).send(err)
            // res.status(200).send(resultsGet)
            console.log(resultsGet)
            if (resultsGet.length === 0) {
                const queryAddToCart = `INSERT INTO cart (userId, productId, sizeId, priceId, stockId, jumlahstock, qty, totalprice) 
                VALUES (${userId}, ${productId}, ${sizeId}, ${priceId}, ${stockId}, ${jumlahstock}, ${qty}, ${totalprice})`
                database.query(queryAddToCart, req.body, (err, results) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err)
                    }
                    console.log(results)
                    res.status(200).send(results)
                })
            } else {
                let id = resultsGet[0].idcart
                let price = resultsGet[0].price
                console.log('harga',price)
                const queryUpdate = `UPDATE cart SET qty = qty + ${qty}, totalprice = ${price} * qty WHERE id = ${id}`
                database.query(queryUpdate, (err, resultsUpdate) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err)
                    }
                    res.status(200).send(resultsUpdate)
                    console.log('masuk', resultsUpdate)
                })
            }
        })
        // console.log(req.body)
    },
    getCart: (req, res) => {
        const queryGetCart = `SELECT u.id, u.username, p.productname, p.imagePath, s.size, pr.price, c.id AS idcart, c.jumlahstock, SUM(c.qty) AS qty, c.stockId, SUM(c.totalprice) AS totalprice
        FROM cart c
        JOIN users u ON c.userId = u.id
        JOIN products p ON c.productId = p.id
        JOIN size s ON c.sizeId = s.id
        JOIN price pr ON c.priceId = pr.id
        WHERE u.id = ${req.user.id} GROUP BY productname, s.size;`
        database.query(queryGetCart, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getValueCart: (req, res) => {
        const queryGetValueCart = `SELECT count(u.id) AS valuecart
        FROM cart c
        JOIN users u ON c.userId = u.id
        JOIN products p ON c.productId = p.id
        JOIN size s ON c.sizeId = s.id
        JOIN price pr ON c.priceId = pr.id
        WHERE u.id = ${req.user.id}`
        database.query(queryGetValueCart, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    deleteCart: (req, res) => {
        const queryDeleteCart = `DELETE FROM cart WHERE id = ${req.query.id}`
        database.query(queryDeleteCart, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    deleteCartUserId: (req, res) => {
        const queryDeleteCart = `DELETE FROM cart WHERE userId = ${req.query.id}`
        database.query(queryDeleteCart, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getAllCart: (req, res) => {
        const queryGetAllCart = `SELECT COUNT(id) as jumlahcart FROM cart`;
        database.query(queryGetAllCart, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    }
}