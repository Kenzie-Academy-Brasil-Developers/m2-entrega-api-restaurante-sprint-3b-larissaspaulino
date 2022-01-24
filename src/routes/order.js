const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order")


router.get("/", (req, res) => {
    const data = OrderController.getAll()
    const arrFalse = []

    data.orders.forEach(element => {
      if (element.paid === false) {
        arrFalse.push(element)
      }
    });
    res.status(200).json(arrFalse)
  })



  
  router.post("/", (req, res) => {
    let {table, productsList} = req.body

    if (typeof table === "string" && Array.isArray(productsList)) {
      const data = OrderController.createOne(req.body)
      if (data.productsList === 0) {
        res.status(404).json("Produto inválido")
      }
      res.status(201).json(data)
    }
    res.status(404).json("Dados inválidos")
  })


router.get("/:id", (req, res) => {
  if (req.params.id !== undefined) {
    const data = OrderController.getOne(req)
    if (data === undefined) {
      res.status(404).json({})
    }
    res.status(200).json(data)
  } 
    
})

router.patch("/:id", (req, res) => {
  const keys = Object.keys(req.body)

  if (keys[0] === 'table' && keys.length === 1) {
      const data = OrderController.changeTable(req)
      if (data === undefined) {
      res.status(404).json("Não foi encontrado o produto!")
        
      }
    res.status(200).json(data)
  }
  res.status(404).json("Apenas a chave TABLE pode ser alterada!")

})


router.patch("/:id/pay", (req, res) => {
 
      const data = OrderController.changePaid(req)
      if (data === undefined) {
      res.status(404).json("Não foi encontrado o produto!")
        
      }
    res.status(204).json(data)
  
})




router.delete("/:id", (req, res) => {
 
  const data = OrderController.deleteOne(req)
  if (data === undefined) {
    res.status(404).json({})
  } 
  res.status(204).json({}) //essa msg de status não permite resposta
  
})



module.exports = router;
