import express from 'express';
import { signIn,signUp } from "../model/AuthModel"; // Import AuthModel using curly braces
const router = express.Router();
router.post('/login', signIn);
router.post('/signup', signUp);



export = router;