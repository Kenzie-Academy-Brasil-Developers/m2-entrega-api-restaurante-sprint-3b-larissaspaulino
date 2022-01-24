const { writeFileSync } = require("fs")

class Helpers {
  static writeData(data) {
    writeFileSync(
      "./src/mock/db.json",
      JSON.stringify({ ...data }, null, 2),
      (error) => {
        if (error) {
          console.log(error)
        }
      }
    )
  }
  
 /*  static //valores default para page e perPage caso não seja enviado nada
  //data recebe qualquer array
  paginateData(data, tipo, page = 1, perPage = 15) {
    page = Number(page)
    perPage = Number(perPage)

    const start = (page - 1) * perPage
    const end = start + perPage

    const dataSliced = data.tipo.slice(start, end)

    const previousPage = page - 1
    const nextPage = page + 1

    //retornamos um objeto que contem a pagina anterior/proxima/atual
    //e tambem uma chave "data" onde fica um array dos dados referente a pagina
    return {
      page: page,
      previousPage: previousPage,
      nextPage: nextPage,
      data: dataSliced,
    }
  } */
}

module.exports = Helpers
