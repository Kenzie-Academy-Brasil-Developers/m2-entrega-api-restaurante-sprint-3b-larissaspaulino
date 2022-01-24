const Helpers = require("../helpers/helper")
const { readFileSync } = require("fs")

class Product {
  constructor({ name, calories = 0, price, session = null }) {
    this.id = this.getMaxId() + 1
    this.name = name
    this.calories = calories
    this.price = price
    this.session = session
    this.createdAt = this.createdAt()
  }

  getMaxId() {
    const read = readFileSync("./src/mock/db.json");
    const data = JSON.parse(read)

    let maxId = 0
    data.products.forEach((product) => {
      if (product.id > maxId) {
        maxId = product.id
      }
    })

    return maxId
  }

  createdAt() {
    let today = new Date()
    let UTCstring = today.toUTCString()
    return UTCstring
  }

  save() {
    const read = readFileSync("./src/mock/db.json");
    const data = JSON.parse(read)

    data.products.push(this)

    Helpers.writeData(data)
  }
}
 

module.exports = Product