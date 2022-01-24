const Helpers = require("../helpers/helper")
const { readFileSync } = require("fs")

class Order {
  constructor({table,productsList}) {
    this.id = this.getMaxId() + 1
    this.table = table
    this.total = 0
    this.createdAt = this.createdAt()
    this.paid = false
    this.productsList = this.FilterProductsList(productsList)
  }


  getMaxId() {
    const read = readFileSync("./src/mock/db.json")
    const data = JSON.parse(read)
    let maxId = 0
    data.orders.forEach((order) => {
      if (order.id > maxId) {
        maxId = order.id
      }
    })

    return maxId
  }

  createdAt() {
    let today = new Date()
    let UTCstring = today.toUTCString()
    return UTCstring
  }

  FilterProductsList(lista) {
    const read = readFileSync("./src/mock/db.json")
    const {products} = JSON.parse(read)
    let array = []

    for (let i = 0; i < lista.length; i++) {
      let produto = products.find(product => {
        return product.id === lista[i]
      })

      if (produto === undefined) {
        return 0
      }
      array.push(produto)
    }

    

    let result = array.reduce((acc, product) => {
      return acc + product.price}, 0)
    this.total = result

    return array
  }

  save() {
    const read = readFileSync("./src/mock/db.json")
    const data = JSON.parse(read)

    data.orders.push(this)

    Helpers.writeData(data)
  }
}

// let object = {table: 3, productList: [1,2,3]}

// let teste = new Order(object)
// console.log(teste.body())

module.exports = Order
