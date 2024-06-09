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
let app;
const user = {
    "age": 20,
    "height": 180,
    "weight": 75.5,
    "workoutGoal": "gain muscles",
    "allergies": [
        "Tomato", "berries"
    ],
    "trainingFrequency": 3,
    "biologicalSex": "male",
    "workoutLocation": "home",
    "minutesPerWorkout": 60,
    "includeWarmup": true,
    "includeStretching": true
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("brforeAll");
    app = yield (0, app_1.default)();
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