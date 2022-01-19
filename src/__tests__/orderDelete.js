const request = require("supertest");
const app = require("../app");
const { clearDb, backupDb, populateOrders } = require("./helpers");

beforeAll(clearDb);
afterAll(backupDb);
beforeEach(populateOrders);

describe("Testa na rota DELETE /order", () => {
  test("Se status do retorno estiver correto", async () => {
    const res = await request(app).delete(`/order/1`);

    expect(res.statusCode).toBe(204);
  });

  test("Se não encontrar o id passado", async () => {
    const res = await request(app).delete(`/order/9999999`);
    expect(res.body).toEqual({});
    expect(res.statusCode).toBe(404);
  });

  test("Se deleta o produto correto", async () => {
    await request(app).delete(`/order/1`);
    const res = await request(app).get(`/order/1`);
    expect(res.body).toEqual({});
    expect(res.statusCode).toBe(404);

    const resTwo = await request(app).get(`/order/2`);
    expect(resTwo.body).toHaveProperty("id");
    expect(resTwo.body).toHaveProperty("table");
    expect(resTwo.body).toHaveProperty("total");
    expect(resTwo.body).toHaveProperty("createdAt");
    expect(resTwo.body).toHaveProperty("paid");
    expect(resTwo.body).toHaveProperty("productsList");
  });
});
