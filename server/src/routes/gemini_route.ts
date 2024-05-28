import express from 'express';
import { createWorkoutPlan } from '../controller/gemini_api_controller';
const router = express.Router();

// #region route configuration
/**
 * @swagger
 * tags:
 *   name: Workout API
 *   description: The Workout API
 */
// #endregion

// #region UserProfile schema
/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       required:
 *         - username
 *         - age
 *         - gender
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe123
 *         age:
 *           type: integer
 *           example: 30
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           example: male
 *         weight:
 *           type: number
 *           example: 75.5
 *         height:
 *           type: number
 *           example: 180
 *         fitnessLevel:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *           example: intermediate
 *       example:
 *         username: johndoe123
 *         age: 30
 *         gender: male
 *         weight: 75.5
 *         height: 180
 *         fitnessLevel: intermediate
 */
// #endregion

// #region CreateWorkoutPlan POST request 
/**
 * @swagger
 * /api/create-workout:
 *   post:
 *     summary: Creates a workout plan for a user
 *     tags: [Workout API]
 *     description: Creates a workout plan for a user based on their profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.post('/create-workout', createWorkoutPlan);
// #endregion

export default router;


