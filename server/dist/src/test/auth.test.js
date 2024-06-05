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
Object.defineProperty(exports, "__esModule", { value: true });
const AuthModel_1 = require("../model/AuthModel");
describe('AuthModel', () => {
    let authModel;
    beforeEach(() => {
        authModel = AuthModel_1.AuthModel.getInstance();
    });
    afterEach(() => {
        // Clear user authentication state after each test
        authModel.logout();
    });
    it('should sign up a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const testUser = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john2@example.com',
            password: 'password123',
            gender: 'male',
            age: 25,
            height: 180,
            weight: 75,
            workoutGoals: 'Build muscle',
            daysPerWeek: 3,
            minutesPerWorkout: 60,
            workoutLocation: 'Gym',
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
            }
        };
        // Sign up the user
        yield authModel.signUp(testUser);
        // Ensure the user is signed up
        expect(authModel.isUserLoggedIn()).toBe(true);
    }));
    it('should sign in a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const testUser = {
            email: 'john@example.com',
            password: 'password123',
        };
        // Sign in the user
        yield authModel.signIn(testUser.email, testUser.password);
        // Ensure the user is signed in
        expect(authModel.isUserLoggedIn()).toBe(true);
    }));
});
//# sourceMappingURL=auth.test.js.map