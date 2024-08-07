"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
<<<<<<< HEAD
const AuthModel_1 = require("../model/AuthModel");
const router = express_1.default.Router();
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, AuthModel_1.signIn)(email, password);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, AuthModel_1.signUp)(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
=======
const router = express_1.default.Router();
const auth_controller_1 = __importDefault(require("../controller/auth_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
router.post('/register', auth_controller_1.default.register);
router.post('/login', auth_controller_1.default.login);
router.post('/googleLogin', auth_controller_1.default.findOrCreateGoogleUser);
router.get('/logout', auth_controller_1.default.logout);
router.get('/refreshToken', auth_controller_1.default.refreshToken);
router.get('/userInfo', auth_middleware_1.default, auth_controller_1.default.userInfo);
>>>>>>> origin/Server_Roy
module.exports = router;
//# sourceMappingURL=auth_route.js.map