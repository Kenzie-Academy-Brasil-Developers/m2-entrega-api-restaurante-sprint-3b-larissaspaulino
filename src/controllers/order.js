const OrderModel = require("../models/order")
const Helpers = require("../helpers/helper")
const { readFileSync } = require("fs")


class OrderController {
  static getAll() {
    const read = readFileSync("./src/mock/db.json")
    const data = JSON.parse(read)
    return data
  }

  static createOne(data) {
    const newOrder = new OrderModel(data)
    newOrder.save()
    return newOrder
  }

  static getOne(req) {
    const id = Number(req.params.id)
    const {orders} = this.getAll()
    const ordersId = orders.find(order => order.id === id)
    return ordersId
  }
  
  static changeTable(req) {
    const id = Number(req.params.id)
    const data = this.getAll()
    const dataIndex = data.orders.findIndex(a => a.id === id)
    if (dataIndex !== -1) {
        data.orders[dataIndex].table = req.body.table

        Helpers.writeData(data)
    }
    return data.orders[dataIndex]

  }

  static changePaid(req) {
    const id = Number(req.params.id)
    const data = this.getAll()
    const dataIndex = data.orders.findIndex(a => a.id === id)
    if (dataIndex !== -1) {
        data.orders[dataIndex].paid = true

        Helpers.writeData(data)
    }
    return data.orders[dataIndex]

  }

  static deleteOne(req) {
    const id = Number(req.params.id)
    const data = this.getAll()
    const dataIndex = data.orders.findIndex(a => a.id === id)

    if (dataIndex === -1) {
      return undefined
    }
    data.orders.splice(dataIndex, 1)
    Helpers.writeData(data)
    return dataIndex
    
  }


}

module.exports = OrderController
