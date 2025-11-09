import request from "supertest";
import app from "../app";
import { pool } from "../config/database";

describe("🧠 Intentions Module", () => {
  let createdId: string;

  afterAll(async () => {
    await pool.end();
  });

  it("should create a new intention", async () => {
    const res = await request(app).post("/api/v1/intentions").send({
      full_name: "Teste Usuário",
      email: "teste@example.com",
      phone: "11999999999",
      message: "Quero participar do grupo",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.full_name).toBe("Teste Usuário");

    createdId = res.body.data.id;
  });

  it("should list all intentions", async () => {
    const res = await request(app).get("/api/v1/intentions");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("should approve an intention", async () => {
    const res = await request(app).patch(
      `/api/v1/intentions/${createdId}/approve`
    );
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  it("should reject an intention", async () => {
    const res = await request(app).patch(
      `/api/v1/intentions/${createdId}/reject`
    );
    expect([200, 400]).toContain(res.status);
  });

  it("should return error for non-existent intention", async () => {
    const res = await request(app).patch(
      "/api/v1/intentions/00000000-0000-0000-0000-000000000000/approve"
    );
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
