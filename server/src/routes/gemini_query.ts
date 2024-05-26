import express from 'express';
import { getGeminiGenerativeAI } from '../services/geminiService'; // Make sure this path is correct
const router = express.Router();

// #region route configuration
/**
 * @swagger
 * tags:
 *   name: Gemini API
 *   description: The Gemini API
 */
// #endregion

// #region TryGimini GET request 
/**
 * Retrieves a response from Gemini.
 * 
 * @swagger
 * /api/try-gemini:
 *   get:
 *     summary: Retrieves a response from Gemini
 *     tags: [Gemini API]
 *     description: |
 *       Retrieves a response from Gemini.
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/try-gemini', getGeminiGenerativeAI);
// #endregion

export default router;
