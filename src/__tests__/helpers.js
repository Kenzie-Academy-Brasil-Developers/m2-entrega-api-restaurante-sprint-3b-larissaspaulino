const { readFileSync, writeFileSync } = require("fs");
const request = require("supertest");
const app = require("../app");


const clearDb = () => {
  const backupDb = JSON.parse(readFileSync("./src/mock/db.json"));
  writeFileSync("./src/mock/db.backup.json", JSON.stringify(backupDb, null, 2));
  writeFileSync(
    "./src/mock/db.json",
    JSON.stringify({ products: [], orders: [] }, null, 2)
  );
};

const backupDb = () => {
  const backupDb = JSON.parse(readFileSync("./src/mock/db.backup.json"));
  clearDb();
  writeFileSync("./src/mock/db.json", JSON.stringify(backupDb, null, 2));
};

const populateProducts = async () => {
  clearDb();
  const postReq = {
    name: "Coca-Cola lata",
    calories: 2.551,
    price: 2.551,
  };
  for (let i = 0; i < 35; i++) {
    await request(app).post("/product").send(postReq);
  }
}

const populateOrders = async () => {
  populateProducts()
  const postOrderReq = {
    table: "10",
    productsList: [1, 2, 3, 4, 5],
  };
  for (let i = 0; i < 30; i++) {
    await request(app).post("/order").send(postOrderReq);
  }
}

module.exports = { clearDb, backupDb, populateOrders, populateProducts };
