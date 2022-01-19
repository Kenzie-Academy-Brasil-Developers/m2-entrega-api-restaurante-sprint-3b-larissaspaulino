const request = require("supertest");
const app = require("../app");
const { clearDb, backupDb, populateOrders } = require("./helpers");

beforeAll(clearDb);
afterAll(backupDb);
beforeEach(populateOrders);

describe("Testa na rota GET /order", () => {
  test("Se status do retorno estiver correto", async () => {
    const res = await request(app).get(`/order`);
    expect(res.statusCode).toBe(200);
  });

  test("Se retorna 'page', 'previousPage', 'nextPage', 'data' sem query params", async () => {
    const res = await request(app).get(`/product`);
    expect(res.body).toHaveProperty("page");
    expect(res.body).toHaveProperty("previousPage");
    expect(res.body).toHaveProperty("nextPage");
    expect(res.body).toHaveProperty("data");
  });

  test("Se os valores default de page e perPage estao corretos", async () => {
    const res = await request(app).get(`/order`);
    expect(res.body.data.length).toBe(15);
    expect(res.body.nextPage).toBe("page=2&perPage=15");
    expect(res.body.page).toBe(1);
  });

  test("Se retorna 'page', 'previousPage', 'nextPage', 'data' com query params", async () => {
    const res = await request(app).get(`/order?page=1&perPage=5`);
    expect(res.body).toHaveProperty("page");
    expect(res.body).toHaveProperty("previousPage");
    expect(res.body).toHaveProperty("nextPage");
    expect(res.body).toHaveProperty("data");
  });

  test("Se retorna apenas os pedidos com paid=false", async () => {
    await request(app).patch('/order/1/pay')
    
    const res = await request(app).get(`/order?page=1&perPage=20`)

    res.body.data.forEach(order => {
      expect(order.paid).toBe(false)
    })
  })

  test("Deve retornar apenas os 'id' dos produtos na lista", async () => {
    const res = await request(app).get(`/order?page=1&perPage=20`)

    res.body.data.forEach(order => {
      order.productsList.forEach(id => expect(typeof(id) === 'number').toBe(true))
    })
  })

  test("Se retorna a quantidade correta por pagina", async () => {
    const res = await request(app).get(`/order?page=1&perPage=5`);
    expect(res.body.data.length).toBe(5);
  });

  test("Se retorna a quantidade correta na ultima pagina", async () => {
    const res = await request(app).get(`/order?page=2&perPage=28`);
    expect(res.body.data.length).toBe(1);
  });

  test("Se retorna todos os campos do produto dentro de data", async () => {
    const res = await request(app).get(`/order?page=1&perPage=5`);
    const data = res.body.data;
    const keys = ["id", "table", "total", "createdAt", "paid", "productsList"];
    data.forEach((item) => {
      expect(Object.keys(item).sort()).toEqual(keys.sort());
    });
  });

  test("Se nao existir pagina anterior previousPage deve ser null", async () => {
    const res = await request(app).get(`/order?page=1&perPage=5`);
    expect(res.body.previousPage).toBeNull();
  });

  test("Se retorna previousPage da forma correta", async () => {
    const res = await request(app).get(`/order?page=3&perPage=5`);
    expect(res.body.previousPage).toBe("page=2&perPage=5");
  });

  test("Se nao existir proxima pagina em nextPage deve ser null", async () => {
    const res = await request(app).get(`/order?page=1&perPage=30`);
    expect(res.body.nextPage).toBeNull();
  });

  test("Se retorna nextPage da forma correta", async () => {
    const res = await request(app).get(`/order?page=3&perPage=5`);
    expect(res.body.nextPage).toBe("page=4&perPage=5");
  });

  test("Se tentar acessar uma pagina maior que a ultima, deve retornar a ultima pagina", async () => {
    const res = await request(app).get(`/order?page=4&perPage=15`);
    expect(res.body.nextPage).toBeNull();
    expect(res.body.previousPage).toBe("page=1&perPage=15");
    expect(res.body.page).toBe(2);
    expect(res.body.data.length).toBe(14);
  });
});
