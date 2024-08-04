"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../model/user_model"));
let app;
let accessToken = "";
let refreshToken = "";
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
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    jest.setTimeout(10000); // Set timeout to 10 seconds for this hook
    console.log("beforeAll");
    app = yield (0, app_1.default)();
    yield user_model_1.default.deleteMany();
}));
afterAll((done) => {
    mongoose_1.default.connection.close();
    done();
});
describe("-- Auth tests --", () => {
    test("test register - success", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post("/auth/register")
            .send(user);
        expect(res.statusCode).toBe(201);
    }));
    test("test register - exist email", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app)
            .post("/auth/register")
            .send(user);
        const res = yield (0, supertest_1.default)(app)
            .post("/auth/register")
            .send(user);
        expect(res.statusCode).toBe(406);
    }));
    test("test register - missing required fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/register")
            .send({ email: "test@fail.com" });
        expect(response.statusCode).toBe(400);
    }));
    test("test login - success", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app).post("/auth/register").send(user);
        const res = yield (0, supertest_1.default)(app)
            .post("/auth/login")
            .send({ email: user.email, password: user.password });
        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).not.toBe(null);
        expect(res.body.refreshToken).not.toBe(null);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
    }));
    test("test login - missing password", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app).post("/auth/register").send(user);
        const res = yield (0, supertest_1.default)(app)
            .post("/auth/login")
            .send({ email: user.email });
        expect(res.statusCode).toBe(400);
    }));
    test("test login - wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app).post("/auth/register").send(user);
        const res = yield (0, supertest_1.default)(app)
            .post("/auth/login")
            .send({ email: user.email, password: "wrongpassword" });
        expect(res.statusCode).toBe(401);
    }));
    test("test token - forbidden access without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/posts/getAllPosts");
        expect(res.statusCode).toBe(401);
    }));
    test("test token - success", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get("/posts/getAllPosts")
            .set("Authorization", "Bearer " + accessToken);
        expect(res.statusCode).toBe(200);
    }));
    test("test token - invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get("/posts/getAllPosts")
            .set("Authorization", "Bearer " + accessToken + "1");
        expect(res.statusCode).toBe(401);
    }));
    // Uncomment and adjust if necessary for token expiration
    // test("test token - expired token", async () => {
    //     await new Promise(resolve => setTimeout(resolve, 4000));
    //     const res = await request(app)
    //         .get("/posts/getAllPosts")
    //         .set("Authorization", "Bearer " + accessToken);
    //     expect(res.statusCode).toBe(401);
    // });
    test("test refresh token - success", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get("/auth/refreshToken")
            .set("Authorization", "Bearer " + refreshToken)
            .send();
        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).not.toBe(null);
        expect(res.body.refreshToken).not.toBe(null);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        const res2 = yield (0, supertest_1.default)(app)
            .get("/posts/getAllPosts")
            .set("Authorization", "Bearer " + accessToken);
        expect(res2.statusCode).toBe(200);
    }));
    test("test logout - success", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get("/auth/logout")
            .set("Authorization", "Bearer " + accessToken);
        expect(res.statusCode).toBe(200);
        const res2 = yield (0, supertest_1.default)(app)
            .get("/auth/refreshToken")
            .set("Authorization", "Bearer " + refreshToken)
            .send();
        expect(res2.statusCode).toBe(403);
    }));
});
//# sourceMappingURL=auth.test.js.map