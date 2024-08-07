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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../app"));
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    yield mongoose_1.default.connection.db.dropDatabase(); // Clean the database before each test
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe('Authentication Endpoints', () => {
    describe('POST /api/auth/register', () => {
        it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .post('/api/auth/register')
                .send({
                email: 'test@example.com',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
                gender: 'male',
                age: 30,
                height: 180,
                weight: 75,
                workoutGoals: 'fitness',
                daysPerWeek: 3,
                minutesPerWorkout: 45,
                workoutLocation: 'gym',
                includeWarmup: true,
                includeStreching: true,
                dietaryRestrictions: {}
            });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('accessToken');
            expect(response.body).toHaveProperty('refreshToken');
            expect(response.body.user).toHaveProperty('email', 'test@example.com');
        }));
        it('should return 400 if required fields are missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .post('/api/auth/register')
                .send({ email: 'test@example.com' }); // Missing other required fields
            expect(response.status).toBe(400);
            expect(response.text).toBe('Missing required fields'); // Updated expected message
        }));
        it('should return 406 if email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            // First registration
            yield (0, supertest_1.default)(app)
                .post('/api/auth/register')
                .send({
                email: 'test@example.com',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
                gender: 'male',
                age: 30,
                height: 180,
                weight: 75,
                workoutGoals: 'fitness',
                daysPerWeek: 3,
                minutesPerWorkout: 45,
                workoutLocation: 'gym',
                includeWarmup: true,
                includeStreching: true,
                dietaryRestrictions: {}
            });
            // Attempt to register with the same email
            const response = yield (0, supertest_1.default)(app)
                .post('/api/auth/register')
                .send({
                email: 'test@example.com',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
                gender: 'male',
                age: 30,
                height: 180,
                weight: 75,
                workoutGoals: 'fitness',
                daysPerWeek: 3,
                minutesPerWorkout: 45,
                workoutLocation: 'gym',
                includeWarmup: true,
                includeStreching: true,
                dietaryRestrictions: {}
            });
            expect(response.status).toBe(406);
            expect(response.text).toBe('Email already exists');
        }));
    });
    describe('POST /api/auth/login', () => {
        it('should login a user and return tokens', () => __awaiter(void 0, void 0, void 0, function* () {
            // Register a user for login testing
            yield (0, supertest_1.default)(app)
                .post('/api/auth/register')
                .send({
                email: 'test@example.com',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
                gender: 'male',
                age: 30,
                height: 180,
                weight: 75,
                workoutGoals: 'fitness',
                daysPerWeek: 3,
                minutesPerWorkout: 45,
                workoutLocation: 'gym',
                includeWarmup: true,
                includeStreching: true,
                dietaryRestrictions: {}
            });
            // Login with the registered user credentials
            const response = yield (0, supertest_1.default)(app)
                .post('/api/auth/login')
                .send({
                email: 'test@example.com',
                password: 'password123'
            });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('accessToken');
            expect(response.body).toHaveProperty('refreshToken');
        }));
        it('should return 401 if email or password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
            // Register a user for login testing
            yield (0, supertest_1.default)(app)
                .post('/api/auth/register')
                .send({
                email: 'test@example.com',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
                gender: 'male',
                age: 30,
                height: 180,
                weight: 75,
                workoutGoals: 'fitness',
                daysPerWeek: 3,
                minutesPerWorkout: 45,
                workoutLocation: 'gym',
                includeWarmup: true,
                includeStreching: true,
                dietaryRestrictions: {}
            });
            // Attempt to login with incorrect password
            const response = yield (0, supertest_1.default)(app)
                .post('/api/auth/login')
                .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });
            expect(response.status).toBe(401);
            expect(response.text).toBe('Email or password incorrect');
        }));
    });
});
//# sourceMappingURL=auth.test.js.map