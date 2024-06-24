import request from 'supertest';
import initApp from '../app';
import mongoose from 'mongoose';
import express from "express";

let app: express.Application;

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
  }

  beforeAll(async () => {
    console.log("brforeAll");
    app = await initApp();
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
            .send(user);
        expect(res.status).toEqual(200);
        console.log(res.body);
        expect(res.body).toHaveProperty('dailyMenu');
        expect(res.body).toHaveProperty('weeklyWorkout.monday');
        expect(res.body).toHaveProperty('specificCalories');
        expect(res.body).toHaveProperty('nutritionalInformation.breakfast');    }, 60000);
});