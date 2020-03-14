const database = require('../Database');

module.exports = {
    addToCart: (req, res) => {
        const { userId, productId, sizeId, priceId, qty, totalprice } = req.body
        const queryAddToCart = `INSERT INTO cart (userId, productId, sizeId, priceId, qty, totalprice) 
        VALUES (${userId}, ${productId}, ${sizeId}, ${priceId}, ${qty}, ${totalprice}) `
        database.query(queryAddToCart, req.body, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send(results)
        })
    },
    getCart: (req, res) => {
        const queryGetCart = `SELECT u.username, p.productname, p.imagePath, s.size, pr.price, c.qty, c.totalprice
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
        let cartId = parseInt(req.params.id)
        const queryDeleteCart = `DELETE FROM cart WHERE id = ${req.query.id}`
        database.query(queryDeleteCart, [cartId], (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    deleteCartUserId: (req, res) => {
        let cartId = parseInt(req.params.id)
        const queryDeleteCart = `DELETE FROM cart WHERE userId = ${req.query.id}`
        database.query(queryDeleteCart, [cartId], (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    }
}