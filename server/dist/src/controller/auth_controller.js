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
const user_model_1 = __importDefault(require("../model/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send("Missing email or password");
    }
    try {
        // Check if user exists
        const existUser = yield user_model_1.default.findOne({ email: email });
        if (existUser != null) {
            return res.status(406).send("Email already exists");
        }
        // Encrypt password and save user
        const salt = yield bcrypt_1.default.genSalt(10);
        const encryptedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield user_model_1.default.create({
            email: email,
            password: encryptedPassword,
        });
        // Create tokens
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);
        // Save refresh token in db
        user.tokens = [refreshToken];
        yield user.save();
        // Send tokens to client
        return res.status(201).send({
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    }
    catch (err) {
        console.log("error: " + err.message);
        return res.status(500).send("Server error");
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send("Missing email or password");
    }
    try {
        // Check if user exists
        const user = yield user_model_1.default.findOne({ email: email });
        if (user == null) {
            return res.status(401).send("Email or password incorrect");
        }
        // Check password is correct
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            return res.status(401).send("Email or password incorrect");
        }
        // Create tokens
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);
        // Save refresh token in db
        user.tokens = [refreshToken];
        yield user.save();
        // Send tokens to client
        return res.status(200).send({
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    }
    catch (err) {
        return res.status(500).send("Server error");
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if token exists
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
    if (!token) {
        return res.sendStatus(401);
    }
    // Check if token is valid
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Check if user exists
            const userDb = yield user_model_1.default.findById(user._id);
            if (userDb === null) {
                return res.sendStatus(403);
            }
            // Remove token from db
            userDb.tokens = userDb.tokens.filter((t) => t !== token);
            yield userDb.save();
            return res.status(200).send(userDb);
        }
        catch (err) {
            return res.sendStatus(500);
        }
    }));
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if token exists
    const authHeaders = req.headers.authorization;
    const token = authHeaders && authHeaders.split(" ")[1];
    if (!token) {
        return res.sendStatus(401);
    }
    // Check if token is valid
    jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).send(err.message);
        }
        try {
            // Check if user exists
            const userDb = yield user_model_1.default.findById(user._id);
            if (userDb === null) {
                return res.status(403).send("Invalid request");
            }
            // Check if token is valid
            if (!userDb.tokens.includes(token)) {
                userDb.tokens = []; // Invalidate all user tokens
                yield userDb.save();
                return res.status(403).send("Invalid request");
            }
            // Create new tokens and save in db
            const accessToken = jsonwebtoken_1.default.sign({ _id: userDb._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
            const refreshToken = jsonwebtoken_1.default.sign({ _id: userDb._id }, process.env.JWT_REFRESH_SECRET);
            userDb.tokens[userDb.tokens.indexOf(token)] = refreshToken;
            yield userDb.save();
            // Send tokens to client
            return res.status(200).send({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        catch (err) {
            return res.status(500).send("Server error");
        }
    }));
});
const userInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.user["_id"]);
        if (user === null) {
            return res.sendStatus(404);
        }
        return res.status(200).send(user);
    }
    catch (err) {
        return res.sendStatus(500);
    }
});
const findOrCreateGoogleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        // Check if the user already exists in your database using email
        let user = yield user_model_1.default.findOne({ email: email });
        if (!user) {
            // If the user doesn't exist, create a new user in the database
            const randomPassword = Math.random().toString(36).substring(7);
            const salt = yield bcrypt_1.default.genSalt(10);
            const encryptedPassword = yield bcrypt_1.default.hash(randomPassword, salt);
            user = yield user_model_1.default.create({
                email: email,
                password: encryptedPassword,
            });
        }
        // Create JWT tokens
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);
        // Save the refresh token in the database
        user.tokens = [refreshToken];
        yield user.save();
        return res.status(200).send({
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    }
    catch (error) {
        console.error("Error in Google callback:", error);
        return res.status(500).send("Server error");
    }
});
module.exports = {
    login,
    register,
    logout,
    refreshToken,
    userInfo,
    findOrCreateGoogleUser,
};
//# sourceMappingURL=auth_controller.js.map