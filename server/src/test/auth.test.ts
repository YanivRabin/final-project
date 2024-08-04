import request from 'supertest';
import initApp from '../app';
import mongoose from 'mongoose';
import User from '../model/user_model';
import express from 'express';

let app: express.Application;
let accessToken: string = "";
let refreshToken: string = "";

// Updated user object with all required fields
const user = {
    firstName: "Yaniv",
    lastName: "Rabin",
    email: "yaniv@rabin.com",
    password: "yanivrabin",
    gender: "Male",
    age: 30,
    height: 180,
    weight: 75,
    workoutGoals: "Build Muscle",
    daysPerWeek: 4,
    minutesPerWorkout: 60,
    workoutLocation: "Gym",
    includeWarmup: true,
    includeStreching: true,
    dietaryRestrictions: {
        vegan: false,
        vegetarian: false,
        pescatarian: false,
        glutenFree: false,
        dairyFree: false,
        nutFree: false,
        soyFree: false,
        eggFree: false,
        shellfishFree: false,
        lactoseFree: false,
        kosher: false,
        halal: false,
        other: ''
    },
    tokens: []
};

beforeAll(async () => {
  jest.setTimeout(10000); // Set timeout to 10 seconds for this hook
  console.log("beforeAll");
  app = await initApp();
  await User.deleteMany();
});

afterAll((done) => {
    mongoose.connection.close()
    done();
});

describe("-- Auth tests --", () => {

    test("test register - success", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send(user);
        expect(res.statusCode).toBe(201);
    });

    test("test register - exist email", async () => {
        await request(app)
            .post("/auth/register")
            .send(user);
        const res = await request(app)
            .post("/auth/register")
            .send(user);
        expect(res.statusCode).toBe(406);
    });

    test("test register - missing required fields", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({ email: "test@fail.com" });
        expect(response.statusCode).toBe(400);
    });

    test("test login - success", async () => {
        await request(app).post("/auth/register").send(user);
        const res = await request(app)
            .post("/auth/login")
            .send({ email: user.email, password: user.password });
        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).not.toBe(null);
        expect(res.body.refreshToken).not.toBe(null);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
    });

    test("test login - missing password", async () => {
        await request(app).post("/auth/register").send(user);
        const res = await request(app)
            .post("/auth/login")
            .send({ email: user.email });
        expect(res.statusCode).toBe(400);
    });

    test("test login - wrong password", async () => {
        await request(app).post("/auth/register").send(user);
        const res = await request(app)
            .post("/auth/login")
            .send({ email: user.email, password: "wrongpassword" });
        expect(res.statusCode).toBe(401);
    });

    test("test token - forbidden access without token", async () => {
        const res = await request(app).get("/posts/getAllPosts");
        expect(res.statusCode).toBe(401);
    });

    test("test token - success", async () => {
        const res = await request(app)
            .get("/posts/getAllPosts")
            .set("Authorization", "Bearer " + accessToken);
        expect(res.statusCode).toBe(200);
    });

    test("test token - invalid token", async () => {
        const res = await request(app)
            .get("/posts/getAllPosts")
            .set("Authorization", "Bearer " + accessToken + "1");
        expect(res.statusCode).toBe(401);
    });

    // Uncomment and adjust if necessary for token expiration
    // test("test token - expired token", async () => {
    //     await new Promise(resolve => setTimeout(resolve, 4000));
    //     const res = await request(app)
    //         .get("/posts/getAllPosts")
    //         .set("Authorization", "Bearer " + accessToken);
    //     expect(res.statusCode).toBe(401);
    // });

    test("test refresh token - success", async () => {
        const res = await request(app)
            .get("/auth/refreshToken")
            .set("Authorization", "Bearer " + refreshToken)
            .send();
        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).not.toBe(null);
        expect(res.body.refreshToken).not.toBe(null);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        const res2 = await request(app)
            .get("/posts/getAllPosts")
            .set("Authorization", "Bearer " + accessToken);
        expect(res2.statusCode).toBe(200);
    });

    test("test logout - success", async () => {
        const res = await request(app)
            .get("/auth/logout")
            .set("Authorization", "Bearer " + accessToken);
        expect(res.statusCode).toBe(200);
        const res2 = await request(app)
            .get("/auth/refreshToken")
            .set("Authorization", "Bearer " + refreshToken)
            .send();
        expect(res2.statusCode).toBe(403);
    });
});
