import request from 'supertest';
import mongoose from 'mongoose';
import { Express } from 'express';
import initApp from '../app'; 

let app: Express;

beforeAll(async () => {
  app = await initApp();
  await mongoose.connection.db.dropDatabase(); // Clean the database before each test
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Authentication Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
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
          includeStretching: true,
          dietaryRestrictions: {}
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com' }); // Missing other required fields

      expect(response.status).toBe(400);
      expect(response.text).toBe('Missing required fields'); // Updated expected message
    });

    it('should return 406 if email already exists', async () => {
      // First registration
      await request(app)
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
          includeStretching: true,
          dietaryRestrictions: {}
        });

      // Attempt to register with the same email
      const response = await request(app)
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
          includeStretching: true,
          dietaryRestrictions: {}
        });

      expect(response.status).toBe(406);
      expect(response.text).toBe('Email already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login a user and return tokens', async () => {
      // Register a user for login testing
      await request(app)
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
          includeStretching: true,
          dietaryRestrictions: {}
        });

      // Login with the registered user credentials
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });

    it('should return 401 if email or password is incorrect', async () => {
      // Register a user for login testing
      await request(app)
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
          includeStretching: true,
          dietaryRestrictions: {}
        });

      // Attempt to login with incorrect password
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.text).toBe('Email or password incorrect');
    });
  });
});
