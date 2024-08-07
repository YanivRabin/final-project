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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryGemini = exports.handleNutritionalTipRequest = exports.getRecipe = exports.updateWorkoutPlan = exports.createWorkoutPlan = void 0;
const geminiService_1 = require("../services/geminiService");
const workout_model_1 = __importDefault(require("../model/workout_model")); // Import the WorkoutPlan model
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
exports.createWorkoutPlan = [
    auth_middleware_1.default,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Request received at /create-workout");
            const userProfile = req.body; // Use the User interface instead of typeof User
            // Log the received user profile for debugging
            console.log("Received user profile:", userProfile);
            // Generate workout plan
            const workoutPlanData = yield (0, geminiService_1.generateWorkoutPlan)(userProfile);
            // Log the generated workout plan data
            console.log("Generated workout plan data:", workoutPlanData);
            // Save the workout plan to the database
            const workoutPlan = new workout_model_1.default(workoutPlanData);
            yield workoutPlan.save();
            // Log success message
            console.log("Workout plan saved successfully:", workoutPlan);
            res.status(200).json(workoutPlan);
        }
        catch (error) {
            console.error("Error creating workout plan:", error);
            res.status(500).json({ message: error.message });
        }
    })
];
exports.updateWorkoutPlan = [
    auth_middleware_1.default,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Request received at /update-workout");
            const { WorkoutPlan: existingWorkoutPlan, PartialWorkoutPlan: changes } = req.body;
            // Validate that both parts are provided
            if (!existingWorkoutPlan || !changes) {
                return res.status(400).json({ message: "Both WorkoutPlan and PartialWorkoutPlan must be provided." });
            }
            // Log the received data for debugging
            console.log("Existing workout plan:", existingWorkoutPlan);
            console.log("Changes to be applied:", changes);
            // Call the function to change the workout plan
            const updatedWorkoutPlan = yield (0, geminiService_1.changeWorkoutPlan)(existingWorkoutPlan, changes);
            // Save the updated workout plan to the database
            const workoutPlan = yield workout_model_1.default.findByIdAndUpdate(existingWorkoutPlan._id, updatedWorkoutPlan, { new: true });
            // Log the updated workout plan
            console.log("Updated workout plan:", workoutPlan);
            // Return the updated workout plan in the response
            res.status(200).json(workoutPlan);
        }
        catch (error) {
            console.error("Error updating workout plan:", error);
            res.status(500).json({ message: error.message });
        }
    })
];
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request received at /get-recipe");
        const mealJson = req.body;
        // Validate that the meal JSON is provided
        if (!mealJson || !mealJson.name || !mealJson.ingredients) {
            return res.status(400).json({ message: "Meal name and ingredients must be provided." });
        }
        // Log the received meal JSON for debugging
        console.log("Received meal JSON:", mealJson);
        // Call the Gemini API to generate the content
        const recipeResponse = yield (0, geminiService_1.getRecipeFromGemini)(mealJson); // Await the result here
        const text = yield recipeResponse.text(); // Get the text from the response
        // Log the generated recipe
        console.log("Generated recipe:", text);
        // Return the generated recipe in the response
        res.status(200).json({ text });
    }
    catch (error) {
        console.error("Error generating recipe from Gemini:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.getRecipe = getRecipe;
const handleNutritionalTipRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request made to /get-nutritional-tip");
    try {
        console.log("Processing request to Gemini API for nutritional tip");
        const tip = yield (0, geminiService_1.fetchNutritionalTip)();
        const text = yield tip.text(); // Get the text from the response
        // Log the fetched nutritional tip
        console.log("Fetched nutritional tip:", text);
        res.status(200).json({ text });
    }
    catch (error) {
        console.error("Error fetching nutritional tip from Gemini:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.handleNutritionalTipRequest = handleNutritionalTipRequest;
const tryGemini = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request received at /try-gemini");
    try {
        console.log("Trying Gemini API");
        const response = yield (0, geminiService_1.getResponseFromGemini)();
        // Log the response from Gemini API
        console.log("Response from Gemini API:", response);
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error trying Gemini API:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.tryGemini = tryGemini;
//# sourceMappingURL=gemini_api_controller.js.map