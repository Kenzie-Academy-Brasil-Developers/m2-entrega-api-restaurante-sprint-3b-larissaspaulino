const request = require("supertest");
const app = require("../app");
const { clearDb, backupDb } = require("./helpers");

beforeAll(clearDb);
afterAll(backupDb);

describe("Testa na rota DELETE /product/:id", () => {
  const postReq = {
    name: "Coca-Cola lata",
    calories: 2.551,
    price: 2.551,
  };

  test("Se status do retorno estiver correto", async () => {
    const post = await request(app).post("/product").send(postReq);
    const res = await request(app).delete(`/product/${post.body.id}`)
    expect(res.statusCode).toBe(204);
  });

  test("Se não encontrar o id passado", async () => {
    const res = await request(app).delete(`/product/9999999`);
    expect(res.body).toEqual({});
    expect(res.statusCode).toBe(404);
  });

  test("Se deleta o produto correto", async() => {
    const postOne = await request(app).post("/product").send(postReq);
    const postTwo = await request(app).post("/product").send(postReq);
    await request(app).delete(`/product/${postOne.body.id}`)

    const res = await request(app).get(`/product/${postOne.body.id}`)
    expect(res.body).toEqual({})

    const resTwo = await request(app).get(`/product/${postTwo.body.id}`)
    expect(resTwo.body).toEqual(postTwo.body)
  })
});
