const request = require("supertest");
const app = require("../app");
const { clearDb, backupDb } = require("./helpers");

beforeAll(clearDb);
afterAll(backupDb);

describe("Testa na rota GET /products/:id", () => {
  let postReq = {
    name: "Coca-Cola lata",
    calories: 2.551,
    price: 2.551,
  };

  test("Se status do retorno estiver correto", async () => {
    const post = await request(app).post("/product").send(postReq);
    const res = await request(app).get(`/product/${post.body.id}`);
    expect(res.statusCode).toBe(200);
    postReq = post.body
  });

  test("Se retorna 'id', 'name', 'calories', 'price', 'session'", async () => {
    const res = await request(app).get(`/product/1`);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("calories");
    expect(res.body).toHaveProperty("price");
    expect(res.body).toHaveProperty("session");
  });


  test("Se não encontrar o id passado", async () => {
    const res = await request(app).get(`/product/99999999`);
    expect(res.body).toEqual({});
    expect(res.statusCode).toBe(404);
  });
});
