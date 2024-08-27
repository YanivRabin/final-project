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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let app;
let token;
const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "securePassword123",
    gender: "male",
    age: 20,
    height: 180,
    weight: 75.5,
    workoutGoals: "gain muscles",
    daysPerWeek: 3,
    minutesPerWorkout: 60,
    workoutLocation: "home",
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
        other: ""
    },
    tokens: []
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("beforeAll");
    app = yield (0, app_1.default)();
    // Generate a JWT token
    token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}));
afterAll((done) => {
    mongoose_1.default.connection.close();
    done();
});
describe('Gemini API', () => {
    it('should get a response from Gemini API', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get('/api/gemini/try-gemini')
            .send();
        expect(res.status).toEqual(200);
    }), 30000);
});
describe('Create Workout Plan', () => {
    it('should create a workout plan for a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post('/api/gemini/create-workout')
            .set('Authorization', `Bearer ${token}`)
            .send(user);
        expect(res.status).toEqual(200);
        console.log(res.body);
        expect(res.body).toHaveProperty('dailyMenu');
        expect(res.body).toHaveProperty('weeklyWorkout.monday');
        expect(res.body).toHaveProperty('specificCalories');
        expect(res.body).toHaveProperty('nutritionalInformation.breakfast');
    }), 60000);
});
//# sourceMappingURL=gemini.test.js.map