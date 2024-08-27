import request from 'supertest';
import initApp from '../app';
import mongoose from 'mongoose';
import express from "express";
import jwt from 'jsonwebtoken';

let app: express.Application;
let token: string;

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
    includeStretching: true,
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
}

beforeAll(async () => {
    console.log("beforeAll");
    app = await initApp();
    // Generate a JWT token
    token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll((done) => {
    mongoose.connection.close()
    done();
});

describe('Gemini API', () => {
    it('should get a response from Gemini API', async () => {
        const res = await request(app)
            .get('/api/gemini/try-gemini')
            .send();
        expect(res.status).toEqual(200);
    }, 30000);
});

describe('Create Workout Plan', () => {
    it('should create a workout plan for a user', async () => {
        const res = await request(app)
            .post('/api/gemini/create-workout')
            .set('Authorization', `Bearer ${token}`)
            .send(user);
        expect(res.status).toEqual(200);
        console.log(res.body);
        expect(res.body).toHaveProperty('dailyMenu');
        expect(res.body).toHaveProperty('weeklyWorkout.monday');
        expect(res.body).toHaveProperty('specificCalories');
        expect(res.body).toHaveProperty('nutritionalInformation.breakfast');
    }, 60000);
});
