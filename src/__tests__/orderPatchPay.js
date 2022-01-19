const request = require("supertest");
const app = require("../app");
const { clearDb, backupDb, populateOrders } = require("./helpers");

beforeAll(clearDb);
afterAll(backupDb);
beforeEach(populateOrders);

describe("Testa na rota PATCH /order/:id/pay", () => {
  

  test("Se o status estiver correto", async () => {
    const res = await request(app).patch(`/order/1/pay`);
    expect(res.statusCode).toBe(204);
  });

  test("Se as alterações foram realizadas", async () => {
    await request(app).patch(`/order/1/pay`);

    const res = await request(app).get(`/order/1`);
    expect(res.body.paid).toEqual(true);
  });

  test("Se não encontrar o id passado", async () => {
    const res = await request(app).patch(`/order/9999999/pay`);
    expect(res.body).toEqual({});
    expect(res.statusCode).toBe(404);
  });

  test("Se o status estiver correto", async () => {
    await request(app).patch(`/order/1/pay`);
    await request(app).patch(`/order/1/pay`);
    const res = await request(app).get(`/order/1`);
    expect(res.body.paid).toEqual(true);
  });
});
