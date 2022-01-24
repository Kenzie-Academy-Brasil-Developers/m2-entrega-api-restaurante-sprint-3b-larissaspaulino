const ProductModel = require("../models/product")
const { readFileSync } = require("fs")
const Helpers = require("../helpers/helper")

class ProductController {


  static getAll() {
    const read = readFileSync("./src/mock/db.json")
    const data = JSON.parse(read)
    return data
  }

  static createOne(data) {
    const newProduct = new ProductModel(data)
    newProduct.save()
    return newProduct
  }

  static getOne(req) {
    
      const id = Number(req.params.id)
      const {products} = this.getAll()
      const productsId = products.find((product) => product.id === id)
      return productsId
    }

  static changeOne(req) {
    const id = Number(req.params.id)
    const data = this.getAll()
    const dataIndex = data.products.findIndex(a => a.id === id)
    if (dataIndex !== -1) {
        data.products[dataIndex].price = req.body.price

        Helpers.writeData(data)
    }
    return data.products[dataIndex]

  }

  static deleteOne(req) {
    const id = Number(req.params.id)
    const data = this.getAll()
    const dataIndex = data.products.findIndex(a => a.id === id)

    if (dataIndex === -1) {
      return undefined
    }
    data.products.splice(dataIndex, 1)
    Helpers.writeData(data)
    return dataIndex
    
  }
}

module.exports = ProductController
