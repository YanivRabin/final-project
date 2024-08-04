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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryGemini = exports.handleNutritionalTipRequest = exports.getRecipe = exports.updateWorkoutPlan = exports.createWorkoutPlan = void 0;
const geminiService_1 = require("../services/geminiService");
const createWorkoutPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProfile = req.body; // Use the UserModel interface instead of typeof User
        const workoutPlanData = yield (0, geminiService_1.generateWorkoutPlan)(userProfile);
        // Save the workout plan to the database
        res.status(200).json(workoutPlanData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createWorkoutPlan = createWorkoutPlan;
const updateWorkoutPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the WorkoutPlan and PartialWorkoutPlan from the request body
        const { WorkoutPlan: existingWorkoutPlan, PartialWorkoutPlan: changes } = req.body;
        // Validate that both parts are provided
        if (!existingWorkoutPlan || !changes) {
            return res.status(400).json({ message: "Both WorkoutPlan and PartialWorkoutPlan must be provided." });
        }
        // Call the function to change the workout plan
        const updatedWorkoutPlan = yield (0, geminiService_1.changeWorkoutPlan)(existingWorkoutPlan, changes);
        // Return the updated workout plan in the response
        res.status(200).json(updatedWorkoutPlan);
    }
    catch (error) {
        console.error("Error updating workout plan:", error);
        res.status(500).json({ message: error.message });
    }
});
exports.updateWorkoutPlan = updateWorkoutPlan;
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the meal JSON from the request body
        const mealJson = req.body;
        // Validate that the meal JSON is provided
        if (!mealJson || !mealJson.name || !mealJson.ingredients) {
            return res.status(400).json({ message: "Meal name and ingredients must be provided." });
        }
        // Call the Gemini API to generate the content
        const recipeResponse = yield (0, geminiService_1.getRecipeFromGemini)(mealJson); // Await the result here
        const text = yield recipeResponse.text(); // Get the text from the response
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
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.tryGemini = tryGemini;
//# sourceMappingURL=gemini_api_controller.js.map