const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Teste CRUD Alunos", () => {

    test("GET /alunos deve retornar lista", async () => {
        const response = await request(app)
            .get("/alunos");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

});