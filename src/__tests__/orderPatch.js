const request = require("supertest");
const app = require("../app");
const { clearDb, backupDb, populateOrders } = require("./helpers");

beforeAll(clearDb);
afterAll(backupDb);
beforeEach(populateOrders);

describe("Testa na rota PATCH /order/id", () => {
  const patchReq = {
    table: "5",
  };

  test("Se o status estiver correto", async () => {
    const res = await request(app).patch(`/order/1`).send(patchReq);
    expect(res.statusCode).toBe(200);
  });

  test("Se retorna 'id', 'table', 'total', 'createdAt', 'paid', 'productsList'", async () => {
    const res = await request(app).patch(`/order/1`).send(patchReq);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("table");
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("paid");
    expect(res.body).toHaveProperty("productsList");
  });

  test("Se o campo table pode ser atualizado", async () => {
    const res = await request(app).patch(`/order/1`).send(patchReq);
    expect(res.body.table).toEqual(patchReq.table);
  });

  test("Se não encontrar o id passado", async () => {
    const res = await request(app).patch(`/order/9999999`).send(patchReq);
    expect(res.body).toEqual({});
    expect(res.statusCode).toBe(404);
  });

  test("Se não estiver alterando o id", async () => {
    const body = {
      id: 12323,
    };
    const res = await request(app).patch(`/order/1`).send(body);
    expect(res.body.id).toEqual(1);
  });

  test("Campo 'total' nao pode ser alterado, deve retornar o valor sem alteracao", async () => {
    const initial = await request(app).patch('/order/1').send({table: '3'})
    const res = await request(app).patch('/order/1').send({total: 100000})

    expect(res.body.total).toBe(initial.body.total)
  })

  test("Campo 'createdAt' nao pode ser alterado, deve retornar o valor sem alteracao", async () => {
    const initial = await request(app).patch('/order/1').send({table: '3'})
    const res = await request(app).patch('/order/1').send({createdAt: 'teste'})

    expect(res.body.createdAt).toBe(initial.body.createdAt)
  })

  test("'productsList' nao pode ser alterado, deve retornar o valor sem alteracao", async () => {
    const initial = await request(app).patch('/order/1').send({table: '3'})
    const res = await request(app).patch('/order/1').send({productsList: [1,13,4]})

    expect(res.body.productsList).toEqual(initial.body.productsList)
  })

  test("Campo 'paid' deve ser atualizado", async () => {
    const res = await request(app).patch('/order/1').send({paid: true})
    expect(res.body.paid).toBe(true)

    const secondRes = await request(app).patch('/order/1').send({paid: false})
    expect(secondRes.body.paid).toBe(false)
    
  })

  test("Deve ser retornado apenas o 'id' dos produtos", async () => {
    const res = await request(app).patch('/order/1').send({createdAt: 'teste'})

    res.body.productsList.forEach(id => {
      expect(typeof(id) === 'number').toBe(true)
    })

  })

});
