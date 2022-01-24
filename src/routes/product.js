const express = require("express")
const router = express.Router()
const ProductController = require("../controllers/product")

// ou
// const {Router} = require("express");
// const router = Router();

router.get("/", (req, res) => {
  const data = ProductController.getAll()
  res.status(200).json(data.products)
})



// falta validação 5.80 - com zero no final ele não vai
router.post("/", (req, res) => {
const {name, price, calories} = req.body

  const decimalCount = num => {
    return String(num).includes('.') === true ? String(num).split('.')[1].length : 0
  }
 

 if (req.body.hasOwnProperty("calories")) {
   if (decimalCount(calories) !== 2 && Number.isInteger(calories) === false) {
  res.status(404).json("As calorias devem conter duas casas decimais!")
   }
 }

 if (decimalCount(price) !== 2 && Number.isInteger(price) === false) {
  res.status(404).json("O preço deve conter duas casas decimais!")
 }

  if (typeof name === "string"  && typeof price === "number") {
    const data = ProductController.createOne(req.body)
    res.status(201).json(data)
  }
  res.status(404).json({ error: "O nome e preço do produto são obrigatórios!" })
})








router.get("/:id", (req, res) => {
  if (req.params.id !== undefined) {
    const data = ProductController.getOne(req)
    if (data === undefined) {
      res.status(404).json({})
    }
    res.status(200).json(data)
  } 
    
})




// falta validação
router.patch("/:id", (req, res) => {
  const {price} = req.body

  const decimalCount = num => {
    return String(num).includes('.') ? String(num).split('.')[1].length : 0}
  if (decimalCount(price) !== 2 && Number.isInteger(price) === false) {
    res.status(404).json("O preço deve conter duas casas decimais!")
   } 

   if (typeof price === "number") {
    const data = ProductController.changeOne(req)
    if (data === undefined) {
      res.status(404).json("Não foi encontrado o produto!")
    }
    res.status(200).json(data)
  }
  res.status(404).json("O preço deve ser um número com duas casas decimais")
    
}) 
    

router.delete("/:id", (req, res) => {
 
    const data = ProductController.deleteOne(req)
    if (data === undefined) {
      res.status(404).json({})
    } 
    res.status(204).json({}) //essa msg de status não permite resposta
    
})


module.exports = router
