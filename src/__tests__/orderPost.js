const request = require("supertest");
const app = require("../app");
const { clearDb, backupDb, populateOrders, populateProducts } = require("./helpers");

beforeAll(clearDb);
afterAll(backupDb);
beforeEach(populateProducts);

describe("Testa na rota POST /order", () => {
  const postReq = {
    table: "10",
    productsList: [1, 2, 3, 4, 5],
  };

  test("Se esta retornando o id", async () => {
    const res = await request(app).post("/order").send(postReq);
    expect(res.body).toHaveProperty("id");
  });

  test("Se retorna 'id', 'table', 'total', 'createdAt', 'paid', 'productsList'", async () => {
    const res = await request(app).post("/order").send(postReq);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("table");
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("paid");
    expect(res.body).toHaveProperty("productsList");
  });

  test("Se o status estiver correto", async () => {
    const res = await request(app).post("/order").send(postReq);
    expect(res.statusCode).toBe(201);
  });

  test("Se o id esta incrementando", async () => {
    await request(app).post("/order").send(postReq);
    const res = await request(app).post("/order").send(postReq);
    expect(res.body.id).toBe(2); 
  });

  test("Se paid comeca com false", async () => {
    const res = await request(app).post("/order").send(postReq);
    expect(res.body.paid).toEqual(false);
  });

  test("Paid deve ser 'false' mesmo se for enviado como 'true'", async () => {
    const res = await request(app).post("/order").send({...postReq, paid: true})
    expect(res.body.paid).toEqual(false)
  })

  test("Se o total calcula de forma correta", async () => {
    const res = await request(app).post("/order").send(postReq)
    expect(res.body.total).toBe(2.55*5)
  })

  test("O total caso seja enviado na requisicao deve ser ignorado", async () => {
    const res = await request(app).post("/order").send({...postReq, total: 100})
    expect(res.body.total).toBe(2.55*5)
  })

  test("Se o produto não existir o status deve ser 404", async () => {
    postReq.productsList[0] = 9999999
    const res = await request(app).post("/order").send(postReq);
    expect(res.statusCode).toBe(404);
  });

  test("Se o produto não existir a resposta deve ser personalizada", async () => {
    const id = 9999999
    postReq.productsList[0] = id
    const res = await request(app).post("/order").send(postReq);
    expect(res.body).toBeTruthy();
  });
  
  test("Se retorna a descricao completa dos produtos", async () => {
    postReq.productsList[0] = 1
    const keys = ["id", "name", "price", "calories", "session"].sort()
    const res = await request(app).post("/order").send(postReq);
    
    res.body.productsList.forEach(product => {
      expect(Object.keys(product).sort()).toEqual(keys)
    })
  })

  test('Se o campo createdAt esta salvando como UTC', async () => {
    const now = new Date().toUTCString()
    const res = await request(app).post('/order').send(postReq)
    expect(res.body.createdAt.slice(0, -6)).toMatch(now.slice(0, -6))
  })

  test('Se o campo createdAt for enviado na requisicao, deve ser ignorado.', async () => {
      const now = new Date().toUTCString()
      const res = await request(app).post('/order').send(postReq)
      expect(res.body.createdAt.slice(0, -6)).toMatch(now.slice(0, -6))
  })

});
