import request from "supertest";
import app from "../app";
import { pool } from "../config/database";

describe("👥 Members Module", () => {
  let intentionId: string;
  let validToken: string;

  // Fecha a pool após os testes
  afterAll(async () => {
    await pool.end();
  });

  // Cria uma intenção e aprova para gerar o token antes dos testes
  beforeAll(async () => {
    // 1️⃣ Cria uma intenção
    const intentionRes = await request(app).post("/api/v1/intentions").send({
      full_name: "João Teste",
      email: "joao.teste@example.com",
      phone: "11999999999",
      message: "Quero fazer parte do grupo",
    });

    intentionId = intentionRes.body.data.id;

    // 2️⃣ Aprova a intenção para gerar o token
    const approveRes = await request(app).patch(
      `/api/v1/intentions/${intentionId}/approve`
    );

    expect(approveRes.status).toBe(200);
    expect(approveRes.body.token).toBeDefined();

    validToken = approveRes.body.token;
  });

  it("should register a new member using a valid token", async () => {
    const res = await request(app).post("/api/v1/members/register").send({
      token: validToken,
      full_name: "Carlos Oliveira",
      email: "carlos@email.com",
      phone: "11999999999",
      company_name: "CO Soluções",
      business_area: "Consultoria",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Membro cadastrado com sucesso");
    expect(res.body.data.email).toBe("carlos@email.com");
  });

  it("should return error when using an invalid token", async () => {
    const res = await request(app).post("/api/v1/members/register").send({
      token: "00000000-0000-0000-0000-000000000000",
      full_name: "Usuário Inválido",
      email: "invalid@example.com",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Token inválido");
  });

  it("should not allow reusing the same token", async () => {
    const res = await request(app).post("/api/v1/members/register").send({
      token: validToken,
      full_name: "Outro Usuário",
      email: "outro@example.com",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Este convite já foi utilizado");
  });
});
