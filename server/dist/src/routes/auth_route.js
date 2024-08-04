"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_1 = __importDefault(require("../controller/auth_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
// #region route configuration
/**
* @swagger
* tags:
*   name: Authentication
*   description: The Authentication API
*/
/**
 * @swagger
 * components:
 *  securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
// #endregion
// #region schemas
// #region user schema
/**
* @swagger
* components:
*  schemas:
*      User:
*          type: object
*          required:
*              - email
*              - password
*              - name
*          properties:
*              email:
*                  type: string
*                  description: Email for the user, needs to be unique
*              password:
*                  type: string
*                  description: Password for the user
*              name:
*                  type: string
*                  description: Name for the user
*              photo:
*                  type: string
*                  description: Photo for the user
*              posts:
*                  type: array
*                  items:
*                      type: object
*                      properties:
*                          post:
*                              type: string
*                              description: Post ID
*          example:
*              email: 'joni910.malki@gmail.com'
*              password: '123456'
*              name: 'Joni Malki'
*/
// #endregion
// #region tokens schema
/**
* @swagger
* components:
*  schemas:
*      Tokens:
*          type: object
*          required:
*              - accessToken
*              - refreshToken
*          properties:
*              accessToken:
*                  type: string
*                  description: Access token for the user
*              refreshToken:
*                  type: string
*                  description: Refresh token for the user
*          example:
*              accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
*              refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
*/
// #endregion 
// #endregion
// #region API requests
// #region register POST request
/**
 * Registers a new user.
 *
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: Registers a new user with the provided email, password, and name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *     responses:
 *       201:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *                   description: An access token for the user session.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                 refreshToken:
 *                   type: string
 *                   description: A refresh token for the user session.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       400:
 *         description: Bad request
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: missing email, password, or name
 *       406:
 *         description: Not Acceptable
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Name already exists - choose a different name
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', auth_controller_1.default.register);
// #endregion
// #region login POST request
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user by email and password and provides access and refresh tokens.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *                   description: Access token for authentication
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token for authentication
 *       400:
 *         description: Bad request, missing email or password
 *       401:
 *         description: Unauthorized, email or password incorrect
 *       500:
 *         description: Internal server error
 */
router.post('/login', auth_controller_1.default.login);
// #endregion
// #region googleLogin POST request
/**
 * @swagger
 * /auth/googleLogin:
 *   post:
 *     summary: Find or create Google user
 *     description: Finds or creates a user based on Google OAuth authentication.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               name:
 *                 type: string
 *                 description: User's name
 *     responses:
 *       200:
 *         description: User found or created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *                   description: Access token for authentication
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token for authentication
 *       500:
 *         description: Internal server error
 */
router.post('/googleLogin', auth_controller_1.default.findOrCreateGoogleUser);
// #endregion
// #region logout GET request
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out a user by removing the provided JWT token from the user's tokens list.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized, token not provided
 *       403:
 *         description: Forbidden, user not found
 *       500:
 *         description: Internal server error
 */
router.get('/logout', auth_controller_1.default.logout);
// #endregion
// #region refreshToken GET request
/**
 * @swagger
 * /auth/refreshToken:
 *   post:
 *     summary: Refresh access token
 *     description: Refreshes the access token using the refresh token provided.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Refreshed access token
 *                 refreshToken:
 *                   type: string
 *                   description: New refresh token
 *       401:
 *         description: Unauthorized, token not provided
 *       403:
 *         description: Forbidden, invalid request or token
 *       500:
 *         description: Internal server error
 */
router.get('/refreshToken', auth_controller_1.default.refreshToken);
// #endregion
// #region userInfo GET request
/**
 * @swagger
 * /auth/userInfo:
 *   get:
 *     summary: Get user information
 *     description: Retrieves information about the authenticated user.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Not found, user not found
 *       500:
 *         description: Internal server error
 */
router.get('/userInfo', auth_middleware_1.default, auth_controller_1.default.userInfo);
module.exports = router;
//# sourceMappingURL=auth_route.js.map