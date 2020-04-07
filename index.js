const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bearerToken())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.status(200).send(`<h1> Welcome My API </h1>`)
})

const { userRouter, productRouter, cartRouter, transactionRouter} = require('./Router')

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/carts', cartRouter)
app.use('/transaction', transactionRouter)

app.listen(2000, () => console.log(2000))