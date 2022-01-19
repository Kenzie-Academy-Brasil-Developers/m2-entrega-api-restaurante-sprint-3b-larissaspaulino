const request = require("supertest");
const app = require("../app");
const { clearDb, backupDb } = require("./helpers");

beforeAll(clearDb);
afterAll(backupDb);

describe("Testa na rota POST /products", () => {
  const postReq = {
    "name": "Coca-Cola lata",
    "calories": 2.551,
    "price": 2.551
  };

  test("Se esta retornando o id", async () => {
    const res = await request(app).post("/product").send(postReq);
    expect(res.body).toHaveProperty("id");
  });

  test("Se retorna 'id', 'name', 'calories', 'price', 'session'", async () => {
    const res = await request(app).post("/product").send(postReq);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("calories");
    expect(res.body).toHaveProperty("price");
    expect(res.body).toHaveProperty("session");
  });

  test("Se o status estiver correto", async () => {
    const res = await request(app).post("/product").send(postReq);
    expect(res.statusCode).toBe(201);
  });

  test("Se o id esta incrementando", async () => {
    const res = await request(app).post("/product").send(postReq);
    expect(res.body.id).toBe(4);
  });

  test("Se calories e price estiverem com 2 casas decimais", async () => {
    const res = await request(app).post("/product").send(postReq);
    expect(res.body.calories).toBe(2.55);
    expect(res.body.price).toBe(2.55);
  });

  test("Se session não for passado, deverá retornar null", async () => {
    const res = await request(app).post("/product").send(postReq);
    expect(res.body.session).toEqual(null);
  });

  test("Se calories não for passado, deverá retornar 0", async () => {
    const body = {
      "name": "Agua de coco",
      "price": 2
    }
    const res = await request(app).post("/product").send(body);
    expect(res.body.calories).toEqual(0);
  });
});
