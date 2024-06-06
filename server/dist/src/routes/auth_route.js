"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AuthModel_1 = require("../model/AuthModel"); // Import AuthModel using curly braces
const router = express_1.default.Router();
router.post('/login', AuthModel_1.signIn);
router.post('/signup', AuthModel_1.signUp);
module.exports = router;
//# sourceMappingURL=auth_route.js.map