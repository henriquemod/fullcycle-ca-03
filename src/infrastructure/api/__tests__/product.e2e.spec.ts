import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product A", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      name: "Product A",
      price: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product A");
    expect(response.body.price).toBe(100);
  });

  it("should create a product B", async () => {
    const response = await request(app).post("/product").send({
      type: "b",
      name: "Product B",
      price: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product B");
    expect(response.body.price).toBe(200);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response1 = await request(app).post("/product").send({
      type: "a",
      name: "Product 1",
      price: 100,
    });
    expect(response1.status).toBe(200);

    const response2 = await request(app).post("/product").send({
      type: "a",
      name: "Product 2",
      price: 200,
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(100);

    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(200);
  });
});
