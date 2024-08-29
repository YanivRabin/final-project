import { Request, Response } from "express";
import User from "../model/user_model";
import Workout from "../model/workout_model";
import authenticate, { AuthRequest } from "../common/auth_middleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req: Request, res: Response) => {
  const {
    email,
    password,
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
    includeStreching,
    dietaryRestrictions,
  } = req.body;
  if (
    !email ||
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
    includeStreching === undefined ||
    !dietaryRestrictions
  ) {
    return res.status(400).send("Missing required fields");
  }
  try {
    const existUser = await User.findOne({ email });
    if (existUser != null) {
      return res.status(406).send("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
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
      includeStreching,
      dietaryRestrictions,
    });

    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_REFRESH_SECRET
    );

    user.tokens = [refreshToken];
    await user.save();

    return res.status(201).send({
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log("error: " + err.message);
    return res.status(500).send("Server error");
  }
};

const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send("Missing email or password");
  }
  try {
    // Check if user exists
    const user = await User.findOne({ email: email });
    if (user == null) {
      return res.status(401).send("Email or password incorrect");
    }

    // Check password is correct
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("Email or password incorrect");
    }

    // Create tokens
    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_REFRESH_SECRET
    );

    // Save refresh token in db
    user.tokens = [refreshToken];
    await user.save();

    // Send tokens to client
    return res.status(200).send({
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.error("error: " + err.message);
    return res.status(500).send("Server error");
  }
};

const logout = async (req: Request, res: Response) => {
  // Check if token exists
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.sendStatus(401);
  }

  // Check if token is valid
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    async (err: { message: string }, user: { _id: string }) => {
      try {
        // Check if user exists
        const userDb = await User.findById(user._id);
        if (userDb === null) {
          return res.sendStatus(403);
        }

        // Remove token from db
        userDb.tokens = userDb.tokens.filter((t) => t !== token);
        await userDb.save();

        return res.status(200).send(userDb);
      } catch (err) {
        return res.sendStatus(500);
      }
    }
  );
};

const refreshToken = async (req: Request, res: Response) => {
  // Check if token exists
  const authHeaders = req.headers.authorization;
  const token = authHeaders && authHeaders.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  // Check if token is valid
  jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET,
    async (err: { message: string }, user: { _id: string }) => {
      if (err) {
        return res.status(403).send(err.message);
      }
      try {
        // Check if user exists
        const userDb = await User.findById(user._id);
        if (userDb === null) {
          return res.status(403).send("Invalid request");
        }

        // Check if token is valid
        if (!userDb.tokens.includes(token)) {
          userDb.tokens = []; // Invalidate all user tokens
          await userDb.save();
          return res.status(403).send("Invalid request");
        }

        // Create new tokens and save in db
        const accessToken = jwt.sign(
          { _id: userDb._id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRATION }
        );
        const refreshToken = jwt.sign(
          { _id: userDb._id },
          process.env.JWT_REFRESH_SECRET
        );
        userDb.tokens[userDb.tokens.indexOf(token)] = refreshToken;
        await userDb.save();

        // Send tokens to client
        return res.status(200).send({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } catch (err) {
        return res.status(500).send("Server error");
      }
    }
  );
};

const userInfo = async (
  req: Request & { user: { _id: string } },
  res: Response
) => {
  try {
    const user = await User.findById(req.user["_id"]);
    if (user === null) {
      return res.sendStatus(404);
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.sendStatus(500);
  }
};

const googleAuthCallback = async (req: Request, res: Response) => {
  console.log("Google auth callback");

  const { token } = req.body;
  //console.log("Received token:", token);


  try {
    // Verify the token with Google's OAuth2 client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();

    if (!payload) {
      console.error("Invalid Google token: No payload found");
      return res.status(400).send("Invalid Google token");
    }
    console.log("Google payload:", JSON.stringify(payload, null, 2));
    console.log("Audience (aud) claim:", payload.aud);
    console.log("Expected audience:", process.env.GOOGLE_CLIENT_ID);

    // Find or create the user
    const email = payload.email;
    console.log("Email from Google payload:", email);
    let user = await User.findOne({ email });

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
    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_REFRESH_SECRET
    );

    user.tokens.push(refreshToken);
    await user.save();

    return res.status(200).send({
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error during Google authentication:", error);
    return res.status(500).send("Server error");
  }
};

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
const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Error finding user by email");
  }
};

const getWorkoutForUser = [
  authenticate,
  async (req: AuthRequest, res: Response) => {
    try {
      // Assuming the authenticate middleware attaches the decoded user to req.user
      const { _id } = req.user; // This will have the user's _id and email
      const user = await User.findById(_id);
      const email = user.email;

      // Find the workout plan associated with the user's email
      const workoutPlan = await Workout.findOne({ email });
      if (!workoutPlan) {
        return res.status(404).send("Workout plan not found");
      }

      return res.status(200).json(workoutPlan);
    } catch (err) {
      console.error("Error fetching workout plan:", err.message);
      return res.status(500).send("Server error");
    }
  },
];

const updateUser = async (
  req: Request & { user: { _id: string } },
  res: Response
) => {
  const userId = req.user["_id"];
  const {
    email,
    password,
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
    includeStreching,
    dietaryRestrictions,
  } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update the user fields if provided
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(409).send("Email already in use");
      }
      user.email = email;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (gender) user.gender = gender;
    if (age) user.age = age;
    if (height) user.height = height;
    if (weight) user.weight = weight;
    if (workoutGoals) user.workoutGoals = workoutGoals;
    if (daysPerWeek) user.daysPerWeek = daysPerWeek;
    if (minutesPerWorkout) user.minutesPerWorkout = minutesPerWorkout;
    if (workoutLocation) user.workoutLocation = workoutLocation;
    if (includeWarmup !== undefined) user.includeWarmup = includeWarmup;
    if (includeStreching !== undefined)
      user.includeStreching = includeStreching;
    if (dietaryRestrictions) user.dietaryRestrictions = dietaryRestrictions;

    // Save the updated user
    await user.save();

    return res.status(200).send(user);
  } catch (err) {
    console.error("Error updating user:", err.message);
    return res.status(500).send("Server error");
  }
};

const googleApiKey = async (req: Request, res: Response) => {
  return res.status(200).send(process.env.GOOGLE_CLIENT_ID);
};

export = {
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
