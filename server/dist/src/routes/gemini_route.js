"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gemini_api_controller_1 = require("../controller/gemini_api_controller");
const router = express_1.default.Router();
console.log("Registering routes");
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
 *         - age
 *         - height
 *         - weight
 *         - workoutGoal
 *         - allergies
 *         - trainingFrequency
 *         - biologicalSex
 *         - workoutLocation
 *         - daysPerWeek
 *         - minutesPerWorkout
 *         - includeWarmup
 *         - includeStretching
 *       properties:
 *         age:
 *           type: integer
 *           example: 30
 *         height:
 *           type: number
 *           example: 180
 *         weight:
 *           type: number
 *           example: 75.5
 *         workoutGoal:
 *           type: string
 *           example: muscle gain
 *         allergies:
 *           type: array
 *           items:
 *             type: string
 *           example: ["none"]
 *         trainingFrequency:
 *           type: string
 *           example: "3-4 times a week"
 *         biologicalSex:
 *           type: string
 *           enum: [male, female, other]
 *           example: male
 *         workoutLocation:
 *           type: string
 *           enum: [gym, home]
 *           example: gym
 *         daysPerWeek:
 *           type: integer
 *           example: 4
 *         minutesPerWorkout:
 *           type: integer
 *           example: 60
 *         includeWarmup:
 *           type: boolean
 *           example: true
 *         includeStretching:
 *           type: boolean
 *           example: true
 *       example:
 *         age: 30
 *         height: 180
 *         weight: 75.5
 *         workoutGoal: muscle gain
 *         allergies: ["none"]
 *         trainingFrequency: "3-4 times a week"
 *         biologicalSex: male
 *         workoutLocation: gym
 *         daysPerWeek: 4
 *         minutesPerWorkout: 60
 *         includeWarmup: true
 *         includeStretching: true
 */
// #endregion
// #region CreateWorkoutPlan POST request 
/**
 * @swagger
 * /api/gemini/create-workout:
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
router.post('/create-workout', gemini_api_controller_1.createWorkoutPlan);
// #endregion
// #region TryGemini GET request
/**
 * @swagger
 * /api/gemini/try-gemini:
 *  get:
 *   summary: Try the Gemini API
 *   tags: [Workout API]
 *   description: Try the Gemini API
 *   responses:
 *      200:
 *        description: Successful response
 *      500:
 *        description: Internal server error
 */
router.get('/try-gemini', gemini_api_controller_1.tryGemini);
// #endregion
exports.default = router;
//# sourceMappingURL=gemini_route.js.map