const database = require('../Database');
const { uploader } = require('../Helpers/uploader');
const fs = require('fs');

module.exports = {
    getProduct: (req, res) => {
        const query = `SELECT * FROM products p ORDER BY p.productcategoryId`
        database.query(query, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getAllProducts: (req, res) => {
        // console.log(req.query)
        const query = `SELECT * FROM GetAllProduct_Complete;`
        database.query(query, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getCategory: (req, res) => {
        // console.log(req.query)
        const query = `SELECT * FROM categories`
        database.query(query, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getProductCategory: (req, res) => {
        const query = `SELECT p.*, c.id AS idcategory, c.category, c.imagecategory
        FROM products p
        LEFT JOIN categories c ON p.productcategoryId = c.id;`
        database.query(query, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getSize: (req, res) => {
        // console.log(req.query)
        const query = `SELECT * FROM size`
        database.query(query, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getPrice: (req, res) => {
        // console.log(req.query)
        const query = `SELECT * FROM price`
        database.query(query, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getStock: (req, res) => {
        // console.log(req.query)
        const query = `SELECT * FROM stock`
        database.query(query, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getStockId: (req, res) => {
        const id = req.params.id
        // console.log(req.query)
        const queryStockId = `SELECT st.*, s.id AS idnyasize, s.size, p.id AS idnyaprice, p.price
        FROM stock st
        LEFT JOIN size s ON st.sizeId = s.id 
        LEFT JOIN price p ON st.priceId = p.id
        WHERE st.productId = ${id};`
        database.query(queryStockId, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getProductId: (req, res) => {
        const id = req.query.id
        // console.log(id)
        const queryGetId = `
        SELECT p.id, p.productname, p.productcategoryId, c.category, p.imagePath, p.description, s.id AS idsize, s.size, pr.id AS idprice, pr.price, st.id AS idstock, st.jumlahstock
        FROM products p
        LEFT JOIN categories c ON p.productcategoryId = c.id
        LEFT JOIN stock st ON p.id = st.productId
        LEFT JOIN size s ON s.id = st.sizeId
        LEFT JOIN price pr ON pr.id = st.priceId
        WHERE p.id=${id};`
        database.query(queryGetId, (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    AddProducts: (req, res) => {
        // console.log(req.files)
        // console.log('uploader')
        try {
            const path = '/images'
            const upload = uploader(path, 'IMG').fields([{ name: 'image' }])
            upload(req, res, (err) => {
                if (err) {
                    return res.status(500).send(err)
                }

                const imagePath = req.files.image ? path + '/' + req.files.image[0].filename : null
                console.log(req.files.image)

                const data = JSON.parse(req.body.data)
                console.log(req.body.data)
                data.dataproduct.imagepath = imagePath
                // console.log(data)
                const queryAddProduct = `INSERT INTO products SET ?`
                // console.log(data.dataproduct)
                database.query(queryAddProduct, data.dataproduct, (err, results) => {
                    if (err) {
                        fs.unlinkSync('./Public' + imagePath)
                        return res.status(500).send(err)
                    }
                    const productId = results.insertId

                    const sendData = data.jumlahstock.map((item) => {
                        return [productId, item[0], item[1], item[2]]
                    })

                    const queryProductStock = `INSERT INTO stock (productId, sizeId, priceId, jumlahstock) VALUES ?`
                    database.query(queryProductStock, [sendData], (err, results2) => {
                        if (err) return res.status(500).send(err)
                        // console.log(sendData)
                        // console.log('last results', results2)
                        res.status(200).send(results)
                    })
                })
            })
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    DeleteProducts: (req, res) => {
        // console.log(req.params)
        const productId = parseInt(req.params.id)
        const queryDeleteProduct = `DELETE FROM products WHERE id = ${req.query.id}`
        database.query(queryDeleteProduct, [productId], (err, results) => {
            if (err) return res.status(500).send(err)
            const queryDeleteStock = `DELETE FROM stock WHERE productId = ?`
            database.query(queryDeleteStock, [productId], (err, results) => {
                if (err) return res.status(500).send(err)
                fs.unlinkSync('./Public' + req.query.imagePath)
                res.status(200).send(results)
            })
        })
    },
    DeleteStocks: (req, res) => {
        // console.log(req.params)
        const stockId = parseInt(req.params.id)
        const queryDeleteProduct = `DELETE FROM stock WHERE id = ${req.query.id}`
        database.query(queryDeleteProduct, [stockId], (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    EditProducts: (req, res) => {
        // console.log(req.body)
        try {
            const path = '/images'
            const upload = uploader(path, 'IMG').fields([{ name: 'image' }])
            upload(req, res, (err) => {
                if (err) return res.status(500).send(err)
                const { image } = req.files
                const imagepath = image ? path + '/' + image[0].filename : null

                const data = JSON.parse(req.body.data)
                data.imagePath = imagepath

                // console.table(data.jumlahstock)
                // console.table(data)

                let stock = data.jumlahstock.map((val) => {
                    return [val.id, val.productId, val.sizeId, val.priceId, val.jumlahstock]
                })
                // console.log(stock)

                let editImage = data.editImage
                // console.log(editImage)

                const queryEditProduct = `UPDATE products SET ? WHERE id = ${database.escape(req.params.id)}`
                database.query(queryEditProduct, data.dataproduct, (err, results) => {
                    if (err) {
                        fs.unlinkSync('./Public' + imagePath)
                        return res.status(500).send(err)
                    }
                    const queryEditStock = `INSERT INTO stock (id, productId, sizeId, priceId, jumlahstock) VALUES ? ON DUPLICATE KEY UPDATE sizeId = VALUES(sizeId), priceId = VALUES(priceId), jumlahstock = VALUES(jumlahstock)`
                    database.query(queryEditStock, [stock], (err, results) => {
                        if (err) return res.status(500).send(err)
                        
                        if (editImage) {
                            const queryEditImage = `UPDATE products SET imagePath = '${data.imagePath}' WHERE id = ${database.escape(req.params.id)}`
                            database.query(queryEditImage, (err, results3) => {
                                console.log('editimage success')
                                if (err) return res.status(500).send(err)
                                res.status(200).send(results)
                            })
                        } else {
                            // console.log(sendData)
                            // console.log('last results', results2)
                            res.status(200).send(results)
                        }
                    })
                })
            })
        }
        catch{
            return res.status(500).send(err)
        }
    },

}
