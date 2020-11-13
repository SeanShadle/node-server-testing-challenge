const supertest = require("supertest");
const server = require("../server");
const db = require("../data/config");
const hobbitsModel = require("../hobbits/hobbits-model");

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("hobbits integration tests", () => {
    it("GET /hobbits", async () => {
        const res = await supertest(server).get("/hobbits")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(4)
        expect(res.body[0].name).toBe("sam")
    })

    it("GET /hobbits/id", async () => {
        const res = await supertest(server).get("/hobbits/2")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("frodo")
    })

    it("POST /hobbits", async () => {
        const res = await supertest(server)
            .post("/hobbits")
            .send({name: "Rodrigo"})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("Rodrigo")
    })

    it("deletes a hobbit", async () => {
        const res = await supertest(server).delete("/hobbits/3");
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body).toHaveLength(3);
        expect(res.body[2].name).toBe("merry");
      });
})