const request = require("supertest")
const baseURL = "http://localhost:3000"

describe("GET /todos", () => {
    const newUser = {
      id: '646c97de237d9913448b198c',
      name:'Muhammad bilal',
      email:'Admin@gmail.com',
      password:'123456789'
    }
    beforeAll(async () => {
      await request(baseURL).post("/api/v1/users/").send(newUser);
    })
    afterAll(async () => {
      await request(baseURL).delete(`/api/v1/users/${newUser.id}`)
    })
    it("should return 200", async () => {
      const response = await request(baseURL).get("/api/v1/users/");
      expect(response.statusCode).toBe(200);
    });
    it("should return List of users", async () => {
      const response = await request(baseURL).get("/api/v1/users/");
      expect(response.body.data.docs.length >= 1).toBe(true);
  
    });
  });
  describe("POST", () => {
     const newUser = {
          name:'Muhammad bilal',
          email:'Admin@gmail.com',
          password:'123456789'
        }
      it("should add an item to todos array", async () => {
        const response = await request(baseURL).post("/api/v1/users/").send(newUser);
        expect(response.statusCode).toBe(200);
      await request(baseURL).delete(`/api/v1/users/${response.body.data.doc._id}`)
      });
    });