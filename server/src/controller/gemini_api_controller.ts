import { Request, Response } from 'express';
import { generateWorkoutPlan, changeWorkoutPlan, fetchNutritionalTip, getResponseFromGemini, getRecipeFromGemini } from '../services/geminiService';
import { User } from '../model/user_model'; // Import the User interface
import WorkoutPlan from '../model/workout_model'; // Import the WorkoutPlan model
import authenticate from '../common/auth_middleware';

export const createWorkoutPlan = [
    authenticate,
    async (req: Request, res: Response) => {
        try {
            console.log("Request received at /create-workout");
            const userProfile: User = req.body; // Use the User interface instead of typeof User
            const  email  = userProfile.email;

            // Log the received user profile for debugging
            console.log("Received user profile:", userProfile);

            // Generate workout plan
            const workoutPlanData = await generateWorkoutPlan(userProfile);
            workoutPlanData.email = email;

            // Log the generated workout plan data
            console.log("Generated workout plan data:", workoutPlanData);

            // Save the workout plan to the database
            const workoutPlan = new WorkoutPlan(workoutPlanData);
            await workoutPlan.save();

            // Log success message
            console.log("Workout plan saved successfully:", workoutPlan);

            res.status(200).json(workoutPlan);
        } catch (error) {
            console.error("Error creating workout plan:", error);
            res.status(500).json({ message: error.message });
        }
    }
];

export const updateWorkoutPlan = [
    authenticate,
    async (req: Request, res: Response) => {
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
            const updatedWorkoutPlan = await changeWorkoutPlan(existingWorkoutPlan, changes);

            // Save the updated workout plan to the database
            const workoutPlan = await WorkoutPlan.findByIdAndUpdate(existingWorkoutPlan._id, updatedWorkoutPlan, { new: true });

            // Log the updated workout plan
            console.log("Updated workout plan:", workoutPlan);

            // Return the updated workout plan in the response
            res.status(200).json(workoutPlan);
        } catch (error) {
            console.error("Error updating workout plan:", error);
            res.status(500).json({ message: error.message });
        }
    }
];

export const getRecipe = async (req: Request, res: Response) => {
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
        const recipeResponse = await getRecipeFromGemini(mealJson); // Await the result here
        const text = await recipeResponse.text(); // Get the text from the response

        // Log the generated recipe
        console.log("Generated recipe:", text);

        // Return the generated recipe in the response
        res.status(200).json({ text });
    } catch (error) {
        console.error("Error generating recipe from Gemini:", error);
        res.status(500).json({ message: error.message });
    }
};

export const handleNutritionalTipRequest = async (req: Request, res: Response) => {
    console.log("Request made to /get-nutritional-tip");
    try {
        console.log("Processing request to Gemini API for nutritional tip");
        const tip = await fetchNutritionalTip();
        const text = await tip.text(); // Get the text from the response

        // Log the fetched nutritional tip
        console.log("Fetched nutritional tip:", text);

        res.status(200).json({ text });
    } catch (error) {
        console.error("Error fetching nutritional tip from Gemini:", error);
        res.status(500).json({ message: error.message });
    }
};

export const tryGemini = async (req: Request, res: Response) => {
    console.log("Request received at /try-gemini");
    try {
        console.log("Trying Gemini API");
        const response = await getResponseFromGemini();

        // Log the response from Gemini API
        console.log("Response from Gemini API:", response);

        res.status(200).json(response);
    } catch (error) {
        console.error("Error trying Gemini API:", error);
        res.status(500).json({ message: error.message });
    }
};
