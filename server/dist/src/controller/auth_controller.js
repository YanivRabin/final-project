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
const workout_model_1 = __importDefault(require("../model/workout_model"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const google_auth_library_1 = require("google-auth-library");
dotenv_1.default.config();
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName, gender, age, height, weight, workoutGoals, daysPerWeek, minutesPerWorkout, workoutLocation, includeWarmup, includeStretching, dietaryRestrictions, } = req.body;
    if (!email ||
        !password ||
        !firstName ||
        !lastName ||
        !gender ||
        !age ||
        !height ||
        !weight ||
        !workoutGoals ||
        !daysPerWeek ||
        !minutesPerWorkout ||
        !workoutLocation ||
        includeWarmup === undefined ||
        includeStretching === undefined ||
        !dietaryRestrictions) {
        return res.status(400).send("Missing required fields");
    }
    try {
        const existUser = yield user_model_1.default.findOne({ email });
        if (existUser != null) {
            return res.status(406).send("Email already exists");
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const encryptedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield user_model_1.default.create({
            email,
            password: encryptedPassword,
            firstName,
            lastName,
            gender,
            age,
            height,
            weight,
            workoutGoals,
            daysPerWeek,
            minutesPerWorkout,
            workoutLocation,
            includeWarmup,
            includeStretching,
            dietaryRestrictions,
        });
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);
        user.tokens = [refreshToken];
        yield user.save();
        return res.status(201).send({
            user,
            accessToken,
            refreshToken,
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
        console.error("error: " + err.message);
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
const googleAuthCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Google auth callback");
    const { token } = req.body;
    try {
        // Verify the token with Google's OAuth2 client
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).send("Invalid Google token");
        }
        console.log("Google payload:", JSON.stringify(payload, null, 2));
        // Find or create the user
        const email = payload.email;
        let user = yield user_model_1.default.findOne({ email });
        if (!user) {
            console.log("User not found, creating new user");
            return res.status(200).send({
                firstName: payload.given_name,
                lastName: payload.family_name,
                email: payload.email,
            });
        }
        console.log("User found:", user);
        // Generate JWT tokens
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);
        user.tokens.push(refreshToken);
        yield user.save();
        return res.status(200).send({
            user,
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error("Error during Google authentication:", error.message);
        return res.status(500).send("Server error");
    }
});
// const findOrCreateGoogleUser = async (req: Request, res: Response) => {
//   const email = req.body.email;
//   try {
//     // Check if the user already exists in your database using email
//     let user = await User.findOne({ email: email });
//     if (!user) {
//       // If the user doesn't exist, create a new user in the database
//       const randomPassword = Math.random().toString(36).substring(7);
//       const salt = await bcrypt.genSalt(10);
//       const encryptedPassword = await bcrypt.hash(randomPassword, salt);
//       user = await User.create({
//         email: email,
//         password: encryptedPassword,
//       });
//     }
//     // Create JWT tokens
//     const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRATION,
//     });
//     const refreshToken = jwt.sign(
//       { _id: user._id },
//       process.env.JWT_REFRESH_SECRET
//     );
//     // Save the refresh token in the database
//     user.tokens = [refreshToken];
//     await user.save();
//     return res.status(200).send({
//       user: user,
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//     });
//   } catch (error) {
//     console.error("Error in Google callback:", error);
//     return res.status(500).send("Server error");
//   }
// };
/**
 * Finds a user by email from the database.
 * @param email - The email of the user to find.
 * @returns The full user data if found, otherwise null.
 */
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email });
        return user;
    }
    catch (error) {
        console.error("Error finding user by email:", error);
        throw new Error("Error finding user by email");
    }
});
const getWorkoutForUser = [
    auth_middleware_1.default,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Assuming the authenticate middleware attaches the decoded user to req.user
            const { _id } = req.user; // This will have the user's _id and email
            const user = yield user_model_1.default.findById(_id);
            const email = user.email;
            // Find the workout plan associated with the user's email
            const workoutPlan = yield workout_model_1.default.findOne({ email });
            if (!workoutPlan) {
                return res.status(404).send("Workout plan not found");
            }
            return res.status(200).json(workoutPlan);
        }
        catch (err) {
            console.error("Error fetching workout plan:", err.message);
            return res.status(500).send("Server error");
        }
    }),
];
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user["_id"];
    const { email, password, firstName, lastName, gender, age, height, weight, workoutGoals, daysPerWeek, minutesPerWorkout, workoutLocation, includeWarmup, includeStretching, dietaryRestrictions, } = req.body;
    try {
        // Find the user by ID
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Update the user fields if provided
        if (email) {
            const existingUser = yield user_model_1.default.findOne({ email });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(409).send("Email already in use");
            }
            user.email = email;
        }
        if (password) {
            const salt = yield bcrypt_1.default.genSalt(10);
            user.password = yield bcrypt_1.default.hash(password, salt);
        }
        if (firstName)
            user.firstName = firstName;
        if (lastName)
            user.lastName = lastName;
        if (gender)
            user.gender = gender;
        if (age)
            user.age = age;
        if (height)
            user.height = height;
        if (weight)
            user.weight = weight;
        if (workoutGoals)
            user.workoutGoals = workoutGoals;
        if (daysPerWeek)
            user.daysPerWeek = daysPerWeek;
        if (minutesPerWorkout)
            user.minutesPerWorkout = minutesPerWorkout;
        if (workoutLocation)
            user.workoutLocation = workoutLocation;
        if (includeWarmup !== undefined)
            user.includeWarmup = includeWarmup;
        if (includeStretching !== undefined)
            user.includeStretching = includeStretching;
        if (dietaryRestrictions)
            user.dietaryRestrictions = dietaryRestrictions;
        // Save the updated user
        yield user.save();
        return res.status(200).send(user);
    }
    catch (err) {
        console.error("Error updating user:", err.message);
        return res.status(500).send("Server error");
    }
});
const googleApiKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send(process.env.GOOGLE_CLIENT_ID);
});
module.exports = {
    login,
    register,
    logout,
    refreshToken,
    userInfo,
    googleAuthCallback,
    findUserByEmail,
    getWorkoutForUser,
    updateUser,
    googleApiKey,
};
//# sourceMappingURL=auth_controller.js.map