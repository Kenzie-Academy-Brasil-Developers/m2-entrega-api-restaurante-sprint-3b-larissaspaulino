const request = require("supertest");
const app = require("../app");
const { clearDb, backupDb } = require("./helpers");

beforeAll(clearDb);
afterAll(backupDb);

describe("Testa na rota PATCH /products/:id", () => {
  const patchReq = {
    price: 5,
    session: "Bebidas",
  };

  let postReq = {
    name: "Coca-Cola lata",
    calories: 2.551,
    price: 2.551,
  };


  test("Se o status do retorno estiver correto", async () => {
    const post = await request(app).post("/product").send(postReq);
    const res = await request(app).patch(`/product/${post.body.id}`).send(patchReq);
    expect(res.statusCode).toBe(200)
    postReq = post.body
  })
   
  test("Se retorna 'id', 'name', 'calories', 'price', 'session'", async () => {
    const res = await request(app).patch(`/product/${postReq.id}`).send(patchReq);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("calories");
    expect(res.body).toHaveProperty("price");
    expect(res.body).toHaveProperty("session");
  });

  test("Se todos os campos podem ser atualizados", async () => {
    const body = {
      "name": "Fanta",
      "calories": 100,
      "price": 2.45,
      "session": "Bebidas"
    }
    const res = await request(app).patch(`/product/${postReq.id}`).send(body);
    expect(res.body.price).toEqual(body.price);
    expect(res.body.session).toEqual(body.session);
    expect(res.body.name).toEqual(body.name);
    expect(res.body.calories).toEqual(body.calories);
  });

  test("Se não encontrar o id passado", async () => {
    const res = await request(app).patch(`/product/9999999`).send(patchReq);
    expect(res.body).toEqual({});
    expect(res.statusCode).toBe(404);
  });

  test("Se não estiver alterando o id", async () => {
    const body = {
      "id": 12323
    }
    const res = await request(app).patch(`/product/${postReq.id}`).send(body);
    expect(res.body.id).toEqual(postReq.id);
  });
});
