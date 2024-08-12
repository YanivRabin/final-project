import express from 'express';
const router = express.Router();
import AuthController from '../controller/auth_controller';
import authenticate from '../common/auth_middleware';

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.post('/googleLogin', AuthController.findOrCreateGoogleUser);

router.get('/logout', AuthController.logout);

router.get('/refreshToken', AuthController.refreshToken);

router.get('/userInfo', authenticate, AuthController.userInfo);

router.get('/workout', AuthController.getWorkoutForUser);


export = router;