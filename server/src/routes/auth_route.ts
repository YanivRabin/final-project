import express from 'express';
import AuthController from '../controller/auth_controller';
import authenticate from '../common/auth_middleware';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth API
 *   description: API for user authentication and management
 */

// #region Register POST request
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth API]
 *     description: Register a new user by providing personal details, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - gender
 *               - age
 *               - height
 *               - weight
 *               - workoutGoals
 *               - daysPerWeek
 *               - minutesPerWorkout
 *               - workoutLocation
 *               - includeWarmup
 *               - includeStreching
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               age:
 *                 type: integer
 *                 example: 30
 *               height:
 *                 type: number
 *                 example: 175
 *               weight:
 *                 type: number
 *                 example: 70
 *               workoutGoals:
 *                 type: string
 *                 example: "Build muscle"
 *               daysPerWeek:
 *                 type: integer
 *                 example: 5
 *               minutesPerWorkout:
 *                 type: integer
 *                 example: 60
 *               workoutLocation:
 *                 type: string
 *                 example: "Gym"
 *               includeWarmup:
 *                 type: boolean
 *                 example: true
 *               includeStreching:
 *                 type: boolean
 *                 example: true
 *               dietaryRestrictions:
 *                 type: object
 *                 properties:
 *                   vegan:
 *                     type: boolean
 *                     example: false
 *                   vegetarian:
 *                     type: boolean
 *                     example: false
 *                   pescatarian:
 *                     type: boolean
 *                     example: false
 *                   glutenFree:
 *                     type: boolean
 *                     example: false
 *                   dairyFree:
 *                     type: boolean
 *                     example: false
 *                   nutFree:
 *                     type: boolean
 *                     example: false
 *                   soyFree:
 *                     type: boolean
 *                     example: false
 *                   eggFree:
 *                     type: boolean
 *                     example: false
 *                   shellfishFree:
 *                     type: boolean
 *                     example: false
 *                   lactoseFree:
 *                     type: boolean
 *                     example: false
 *                   kosher:
 *                     type: boolean
 *                     example: false
 *                   halal:
 *                     type: boolean
 *                     example: false
 *                   other:
 *                     type: string
 *                     example: "None"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request - Invalid input
 *       409:
 *         description: Conflict - Email already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', AuthController.register);
// #endregion


// #region Login POST request
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth API]
 *     description: Login a user by providing email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/login', AuthController.login);
// #endregion

// #region Google Auth POST request
/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Google OAuth callback
 *     tags: [Auth API]
 *     description: Handle the callback after Google OAuth authentication.
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/google', AuthController.googleAuthCallback);
// #endregion

// #region Logout GET request
/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout a user
 *     tags: [Auth API]
 *     description: Logout the currently authenticated user.
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal server error
 */
router.get('/logout', AuthController.logout);
// #endregion

// #region RefreshToken GET request
/**
 * @swagger
 * /api/auth/refreshToken:
 *   get:
 *     summary: Refresh JWT token
 *     tags: [Auth API]
 *     description: Refresh the JWT token using a valid refresh token.
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/refreshToken', AuthController.refreshToken);
// #endregion

// #region UserInfo GET request
/**
 * @swagger
 * /api/auth/userInfo:
 *   get:
 *     summary: Get user information
 *     tags: [Auth API]
 *     description: Get the information of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/userInfo', authenticate, AuthController.userInfo);
// #endregion

// #region Workout GET request
/**
 * @swagger
 * /api/auth/workout:
 *   get:
 *     summary: Get workout plan for user
 *     tags: [Auth API]
 *     description: Retrieve the workout plan associated with the authenticated user.
 *     responses:
 *       200:
 *         description: Workout plan retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/workout', AuthController.getWorkoutForUser);
// #endregion

// #region UpdateUser PUT request
/**
 * @swagger
 * /api/auth/updateUser:
 *   put:
 *     summary: Update user information
 *     tags: [Auth API]
 *     description: Update the information of the currently authenticated user. The request requires the user to be authenticated, and any of the user fields can be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: []
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               age:
 *                 type: integer
 *                 example: 30
 *               height:
 *                 type: integer
 *                 example: 180
 *               weight:
 *                 type: integer
 *                 example: 75
 *               workoutGoals:
 *                 type: string
 *                 example: "Lose weight"
 *               daysPerWeek:
 *                 type: integer
 *                 example: 4
 *               minutesPerWorkout:
 *                 type: integer
 *                 example: 60
 *               workoutLocation:
 *                 type: string
 *                 example: "Gym"
 *               includeWarmup:
 *                 type: boolean
 *                 example: true
 *               includeStreching:
 *                 type: boolean
 *                 example: false
 *               dietaryRestrictions:
 *                 type: object
 *                 properties:
 *                   vegan:
 *                     type: boolean
 *                     example: false
 *                   vegetarian:
 *                     type: boolean
 *                     example: true
 *                   pescatarian:
 *                     type: boolean
 *                     example: false
 *                   glutenFree:
 *                     type: boolean
 *                     example: false
 *                   dairyFree:
 *                     type: boolean
 *                     example: false
 *                   nutFree:
 *                     type: boolean
 *                     example: false
 *                   soyFree:
 *                     type: boolean
 *                     example: false
 *                   eggFree:
 *                     type: boolean
 *                     example: false
 *                   shellfishFree:
 *                     type: boolean
 *                     example: false
 *                   lactoseFree:
 *                     type: boolean
 *                     example: false
 *                   kosher:
 *                     type: boolean
 *                     example: false
 *                   halal:
 *                     type: boolean
 *                     example: false
 *                   other:
 *                     type: string
 *                     example: ""
 *     responses:
 *       200:
 *         description: Successful response with the updated user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 height:
 *                   type: integer
 *                 weight:
 *                   type: integer
 *                 workoutGoals:
 *                   type: string
 *                 daysPerWeek:
 *                   type: integer
 *                 minutesPerWorkout:
 *                   type: integer
 *                 workoutLocation:
 *                   type: string
 *                 includeWarmup:
 *                   type: boolean
 *                 includeStreching:
 *                   type: boolean
 *                 dietaryRestrictions:
 *                   type: object
 *                   properties:
 *                     vegan:
 *                       type: boolean
 *                     vegetarian:
 *                       type: boolean
 *                     pescatarian:
 *                       type: boolean
 *                     glutenFree:
 *                       type: boolean
 *                     dairyFree:
 *                       type: boolean
 *                     nutFree:
 *                       type: boolean
 *                     soyFree:
 *                       type: boolean
 *                     eggFree:
 *                       type: boolean
 *                     shellfishFree:
 *                       type: boolean
 *                     lactoseFree:
 *                       type: boolean
 *                     kosher:
 *                       type: boolean
 *                     halal:
 *                       type: boolean
 *                     other:
 *                       type: string
 *       400:
 *         description: Bad request, validation failed
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: User not found
 *       409:
 *         description: Email already in use by another account
 *       500:
 *         description: Internal server error
 */
router.put('/updateUser', authenticate, AuthController.updateUser);
// #endregion




// #region GoogleApiKey GET request
/**
 * @swagger
 * /api/auth/googleApiKey:
 *   get:
 *     summary: Get Google API Key
 *     tags: [Auth API]
 *     description: Retrieve the Google API Key for the application.
 *     responses:
 *       200:
 *         description: Google API Key retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/googleApiKey', AuthController.googleApiKey);
// #endregion

export = router;
