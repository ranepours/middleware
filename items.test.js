process.env.MODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let aThing = {
        name: "airfryer",
        price: 37.56
            }

beforeEach(() => {
    items.push(someThings)
})

afterEach(() => {
    items.length = 0;
})

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: [aThing]});
    })
})

describe("POST /items", () => {
    test("create new item", async () => {
        const res = await request(app).post("/items").send({
            name: "tv",
            price: 785.99
        })

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({item: 
                                    {
                                        name: "tv",
                                        price: 785.99
                                    }
        })
    })
    test("no invalid data", async () => {
        const res = await request(app).post("/items").send({});

        expect(res.statusCode).toBe(400);
    })
})

describe("GET /items/:name", () => {
    test("get item by name", async () => {
        const res = await request(app).get(`/items/${items.name}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            name: "airfryer", 
            price: 37.56
        })
    })
    test("responds w/ 404 when request invalid", async () => {
        const res = await request(app).get(`/items/skillet`);

        expect(res.statusCode).toBe(404);
    })
})

describe("PATCH /items/:name", () => {
    test("updates cat name", async () => {
        const res = await request(app).patch(`items/${items.name}`).send({name: "iphone", price: 899});

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: {name:"iphone",price:899}});
    })
    test("responds with 404 when request invalid", async () => {
        const res = await request(app).patch(`/items/fan`).send({name: "vaseline", price: 6.72});

        expect(res.statusCode).toBe(404);
    })
})

describe("DELETE /items/:name", () => {
    test("deletes items for db", async () => {
        const res = await request(app).delete(`/items/${aThing.name}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"});
    })
    test("responds w/ 404 when request invalid", async () => {
        const res = await request(app).delete(`/items/babylotion`);
        expect(res.statusCode).toBe(404);
    })
})