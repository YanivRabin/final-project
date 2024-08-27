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
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - gender
 *         - age
 *         - height
 *         - weight
 *         - workoutGoals
 *         - daysPerWeek
 *         - minutesPerWorkout
 *         - workoutLocation
 *         - includeWarmup
 *         - includeStretching
 *         - dietaryRestrictions
 *       properties:
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           example: "securePassword123"
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           example: "male"
 *         age:
 *           type: integer
 *           example: 30
 *         height:
 *           type: number
 *           example: 180
 *         weight:
 *           type: number
 *           example: 75
 *         workoutGoals:
 *           type: string
 *           example: "muscle gain"
 *         daysPerWeek:
 *           type: integer
 *           example: 5
 *         minutesPerWorkout:
 *           type: integer
 *           example: 60
 *         workoutLocation:
 *           type: string
 *           enum: [gym, home]
 *           example: "gym"
 *         includeWarmup:
 *           type: boolean
 *           example: true
 *         includeStretching:
 *           type: boolean
 *           example: true
 *         dietaryRestrictions:
 *           type: object
 *           properties:
 *             vegan:
 *               type: boolean
 *               example: false
 *             vegetarian:
 *               type: boolean
 *               example: false
 *             pescatarian:
 *               type: boolean
 *               example: false
 *             glutenFree:
 *               type: boolean
 *               example: false
 *             dairyFree:
 *               type: boolean
 *               example: false
 *             nutFree:
 *               type: boolean
 *               example: true
 *             soyFree:
 *               type: boolean
 *               example: false
 *             eggFree:
 *               type: boolean
 *               example: false
 *             shellfishFree:
 *               type: boolean
 *               example: false
 *             lactoseFree:
 *               type: boolean
 *               example: false
 *             kosher:
 *               type: boolean
 *               example: false
 *             halal:
 *               type: boolean
 *               example: false
 *             other:
 *               type: string
 *               example: "none"
 *       example:
 *         firstName: "John"
 *         lastName: "Doe"
 *         email: "john.doe@example.com"
 *         password: "securePassword123"
 *         gender: "male"
 *         age: 30
 *         height: 180
 *         weight: 75
 *         workoutGoals: "muscle gain"
 *         daysPerWeek: 5
 *         minutesPerWorkout: 60
 *         workoutLocation: "gym"
 *         includeWarmup: true
 *         includeStretching: true
 *         dietaryRestrictions:
 *           vegan: false
 *           vegetarian: false
 *           pescatarian: false
 *           glutenFree: false
 *           dairyFree: false
 *           nutFree: true
 *           soyFree: false
 *           eggFree: false
 *           shellfishFree: false
 *           lactoseFree: false
 *           kosher: false
 *           halal: false
 *           other: "none"
 */
// #endregion
// #region WorkoutPlan schema
/**
 * @swagger
 * components:
 *   schemas:
 *     WorkoutPlan:
 *       type: object
 *       properties:
 *         dailyMenu:
 *           type: string
 *           example: "Sample daily menu"
 *         weeklyWorkout:
 *           type: object
 *           properties:
 *             monday:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *             tuesday:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *             wednesday:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *             thursday:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *             friday:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *             saturday:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *             sunday:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *         specificCalories:
 *           type: number
 *           example: 2500
 *         nutritionalInformation:
 *           type: object
 *           properties:
 *             breakfast:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meal'
 *             lunch:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meal'
 *             dinner:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meal'
 *             snacks:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meal'
 *       example:
 *         dailyMenu: "Sample daily menu"
 *         weeklyWorkout:
 *           monday:
 *             - name: "Push-ups"
 *               sets: "3"
 *               reps: "10"
 *               description: "Standard push-ups"
 *           tuesday:
 *             - name: "Squats"
 *               sets: "3"
 *               reps: "15"
 *               description: "Bodyweight squats"
 *           wednesday: []
 *           thursday:
 *             - name: "Pull-ups"
 *               sets: "3"
 *               reps: "5"
 *               description: "Standard pull-ups"
 *           friday: []
 *           saturday:
 *             - name: "Lunges"
 *               sets: "3"
 *               reps: "12"
 *               description: "Alternating lunges"
 *           sunday: []
 *         specificCalories: 2500
 *         nutritionalInformation:
 *           breakfast:
 *             - name: "Oatmeal"
 *               ingredients:
 *                 - name: "Oats"
 *                   carbohydrates: "30g"
 *                   fats: "5g"
 *                   proteins: "7g"
 *                   amount: "50g"
 *                 - name: "Milk"
 *                   carbohydrates: "15g"
 *                   fats: "8g"
 *                   proteins: "8g"
 *                   amount: "200ml"
 *           lunch:
 *             - name: "Chicken Salad"
 *               ingredients:
 *                 - name: "Chicken Breast"
 *                   carbohydrates: "0g"
 *                   fats: "3g"
 *                   proteins: "26g"
 *                   amount: "120g"
 *                 - name: "Lettuce"
 *                   carbohydrates: "2g"
 *                   fats: "0g"
 *                   proteins: "1g"
 *                   amount: "50g"
 *           dinner:
 *             - name: "Grilled Salmon"
 *               ingredients:
 *                 - name: "Salmon"
 *                   carbohydrates: "0g"
 *                   fats: "12g"
 *                   proteins: "20g"
 *                   amount: "150g"
 *                 - name: "Asparagus"
 *                   carbohydrates: "3g"
 *                   fats: "0g"
 *                   proteins: "2g"
 *                   amount: "120g"
 *           snacks:
 *             - name: "Greek Yogurt"
 *               ingredients:
 *                 - name: "Yogurt"
 *                   carbohydrates: "10g"
 *                   fats: "2g"
 *                   proteins: "15g"
 *                   amount: "200g"
 *             - name: "Almonds"
 *               ingredients:
 *                 - name: "Almonds"
 *                   carbohydrates: "5g"
 *                   fats: "14g"
 *                   proteins: "6g"
 *                   amount: "30g"
 *
 *     Exercise:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Push-ups"
 *         sets:
 *           type: string
 *           example: "3"
 *         reps:
 *           type: string
 *           example: "10"
 *         description:
 *           type: string
 *           example: "Standard push-ups"
 *
 *     Meal:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Oatmeal"
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ingredient'
 *
 *     Ingredient:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Oats"
 *         carbohydrates:
 *           type: string
 *           example: "30g"
 *         fats:
 *           type: string
 *           example: "5g"
 *         proteins:
 *           type: string
 *           example: "7g"
 *         amount:
 *           type: string
 *           example: "50g"
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
// #region UpdateWorkoutPlan POST request 
/**
 * @swagger
 * /api/gemini/update-workout-plan:
 *   post:
 *     summary: Update a workout plan
 *     tags: [Workout API]
 *     description: Update a workout plan for a user based on their previous workout plan.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - WorkoutPlan
 *               - PartialWorkoutPlan
 *             properties:
 *               WorkoutPlan:
 *                 type: object
 *                 properties:
 *                   dailyMenu:
 *                     type: string
 *                     example: "Sample daily menu"
 *                   weeklyWorkout:
 *                     type: object
 *                     properties:
 *                       monday:
 *                         type: array
 *                         items: {}
 *                         example: []
 *                       tuesday:
 *                         type: array
 *                         items: {}
 *                         example: []
 *                       wednesday:
 *                         type: array
 *                         items: {}
 *                         example: []
 *                       thursday:
 *                         type: array
 *                         items: {}
 *                         example: []
 *                       friday:
 *                         type: array
 *                         items: {}
 *                         example: []
 *                       saturday:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               example: "Lunges"
 *                             sets:
 *                               type: string
 *                               example: "3"
 *                             reps:
 *                               type: string
 *                               example: "12"
 *                             description:
 *                               type: string
 *                               example: "Alternating lunges"
 *                         example: [
 *                           {
 *                             "name": "Lunges",
 *                             "sets": "3",
 *                             "reps": "12",
 *                             "description": "Alternating lunges"
 *                           }
 *                         ]
 *                       sunday:
 *                         type: array
 *                         items: {}
 *                         example: []
 *                   specificCalories:
 *                     type: integer
 *                     example: 2500
 *                   nutritionalInformation:
 *                     type: object
 *                     properties:
 *                       breakfast:
 *                         type: array
 *                         items: {}
 *                         example: []
 *                       lunch:
 *                         type: array
 *                         items: {}
 *                         example: []
 *                       dinner:
 *                         type: array
 *                         items: {}
 *                         example: []
 *                       snacks:
 *                         type: array
 *                         items: {}
 *                         example: []
 *               PartialWorkoutPlan:
 *                 type: object
 *                 properties:
 *                   dailyMenu:
 *                     type: string
 *                     example: "Updated daily menu"
 *                   weeklyWorkout:
 *                     type: object
 *                     properties:
 *                       saturday:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               example: "Lunges"
 *                             sets:
 *                               type: string
 *                               example: "3"
 *                             reps:
 *                               type: string
 *                               example: "12"
 *                             description:
 *                               type: string
 *                               example: "Alternating lunges"
 *                         example: [
 *                           {
 *                             "name": "Lunges",
 *                             "sets": "3",
 *                             "reps": "12",
 *                             "description": "Alternating lunges"
 *                           }
 *                         ]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.post('/update-workout-plan', gemini_api_controller_1.updateWorkoutPlan);
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
// #region GetRecipeFromGemini POST request
/**
 * @swagger
 * /api/gemini/get-recipe:
 *   post:
 *     summary: Generate a recipe from Gemini API
 *     tags: [Recipe API]
 *     description: Generate a recipe for a meal based on the provided ingredients and quantities using Gemini API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - ingredients
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Oatmeal with Berries and Protein Powder"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Rolled Oats"
 *                     carbohydrates:
 *                       type: string
 *                       example: "66"
 *                     fats:
 *                       type: string
 *                       example: "6"
 *                     proteins:
 *                       type: string
 *                       example: "13"
 *                     amount:
 *                       type: string
 *                       example: "50g"
 *                 example:
 *                   - name: "Rolled Oats"
 *                     carbohydrates: "66"
 *                     fats: "6"
 *                     proteins: "13"
 *                     amount: "50g"
 *                   - name: "Blueberries"
 *                     carbohydrates: "14"
 *                     fats: "0"
 *                     proteins: "0"
 *                     amount: "100g"
 *                   - name: "Strawberries"
 *                     carbohydrates: "7"
 *                     fats: "0"
 *                     proteins: "1"
 *                     amount: "100g"
 *                   - name: "Whey Protein Powder"
 *                     carbohydrates: "5"
 *                     fats: "1"
 *                     proteins: "25"
 *                     amount: "30g"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "1. 🥣 Cook 50g of Rolled Oats. \n2. 🫐 Add 100g of Blueberries. \n3. 🍓 Add 100g of Strawberries. \n4. 💪 Mix in 30g of Whey Protein Powder. \n5. Enjoy your Oatmeal with Berries and Protein Powder!"
 *       500:
 *         description: Internal server error
 */
router.post('/get-recipe', gemini_api_controller_1.getRecipe);
// #endregion
// #region GetNutritionalTip GET request
/**
 * @swagger
 * /api/gemini/get-nutritional-tip:
 *   get:
 *     summary: Get a daily nutritional or fitness tip
 *     tags: [Tips]
 *     description: Retrieve a daily nutritional or fitness tip from Gemini API
 *     responses:
 *       200:
 *         description: Successful response with a tip
 *       500:
 *         description: Internal server error
 */
router.get('/get-nutritional-tip', gemini_api_controller_1.handleNutritionalTipRequest);
// #endregion
exports.default = router;
//# sourceMappingURL=gemini_route.js.map