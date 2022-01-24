const express = require("express")
const cors = require("cors")
const app = express()
const routerProduct = require("./routes/product")
const routerOrder = require("./routes/order")

app.use(cors())
app.use(express.json())
app.use("/products", routerProduct)
app.use("/orders", routerOrder)

module.exports = app
