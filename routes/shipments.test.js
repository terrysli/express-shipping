"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if productId is not >= 1000", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 1,
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
      });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message[0]).
      toEqual("instance.productId must be greater than or equal to 1000")
  });

  test("throws error if zip is not a string", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 1000,
        name: "Test Tester",
        addr: "100 Test St",  //test multiple invalid inputs at once
        zip: 12345-6789,
      });

    expect(resp.body.error.message[0]).
      toEqual("instance.zip is not of a type(s) string");
    expect(resp.statusCode).toEqual(400);
  });

  // test not providing required inputs
});
