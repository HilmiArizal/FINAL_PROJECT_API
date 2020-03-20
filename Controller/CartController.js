const database = require('../Database');

module.exports = {
    addToCart: (req, res) => {
        const { userId, productId, sizeId, priceId, stockId, jumlahstock, qty, totalprice } = req.body
        console.log(req.body)
        const queryAddToCart = `INSERT INTO cart (userId, productId, sizeId, priceId, stockId, jumlahstock, qty, totalprice) 
        VALUES (${userId}, ${productId}, ${sizeId}, ${priceId}, ${stockId}, ${jumlahstock}, ${qty}, ${totalprice})`
        database.query(queryAddToCart, req.body, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getCart: (req, res) => {
        const queryGetCart = `SELECT u.username, p.productname, p.imagePath, s.size, pr.price, c.id AS idcart, c.jumlahstock,c.qty, c.stockId, c.totalprice
        FROM cart c
        JOIN users u ON c.userId = u.id
        JOIN products p ON c.productId = p.id
        JOIN size s ON c.sizeId = s.id
        JOIN price pr ON c.priceId = pr.id
        WHERE u.id = ${req.user.id}`
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
    }
}