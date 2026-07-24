const assert = require("assert");
const request = require("supertest");
const app = require("../server.js");

describe("GET /", () => {
  it("serves the search form", async () => {
    const res = await request(app).get("/");
    assert.strictEqual(res.status, 200);
    assert.match(res.text, /name="q"/);
  });
});

describe("GET /search", () => {
  it("accepts a valid search term", async () => {
    const res = await request(app).get("/search").query({ q: "hello world" });
    assert.strictEqual(res.status, 200);
  });

  it("rejects a term below the minimum length", async () => {
    const res = await request(app).get("/search").query({ q: "a" });
    assert.strictEqual(res.status, 400);
  });

  it("redirects to the homepage on a SQLi/XSS-style payload", async () => {
    const res = await request(app).get("/search").query({ q: "' OR 1=1 --" });
    assert.strictEqual(res.status, 302);
    assert.strictEqual(res.headers.location, "/");
  });

  it("requires a search term", async () => {
    const res = await request(app).get("/search");
    assert.strictEqual(res.status, 400);
  });
});
