import express from 'express';
const router = express.Router();
import AuthController from '../controller/auth_controller';
import authenticate from '../common/auth_middleware';

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.post('/google', AuthController.googleAuthCallback);

router.get('/logout', AuthController.logout);

router.get('/refreshToken', AuthController.refreshToken);

router.get('/userInfo', authenticate, AuthController.userInfo);

router.get('/workout', AuthController.getWorkoutForUser);

router.get('/updateUser',authenticate, AuthController.updateUser)

router.get('/googleApiKey', AuthController.googleApiKey);


export = router;