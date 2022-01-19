const request = require("supertest");
const app = require("../app");
const { clearDb, backupDb, populateOrders } = require("./helpers");

beforeAll(clearDb);
afterAll(backupDb);
beforeEach(populateOrders);

describe("Testa na rota GET /order/:id", () => {
  test("Se o retorno estiver correto", async () => {
    const res = await request(app).get(`/order/1`);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("table");
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("paid");
    expect(res.body).toHaveProperty("productsList");
  });

  test("Se status do retorno estiver correto", async () => {
    const res = await request(app).get(`/order/1`);
    expect(res.statusCode).toBe(200);
  });

  test("Se não encontrar o id passado", async () => {
    const res = await request(app).get(`/order/9999999`);
    expect(res.body).toEqual({});
    expect(res.statusCode).toBe(404);
  });
});
