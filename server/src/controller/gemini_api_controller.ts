import { Request, Response } from 'express';
import { generateWorkoutPlan, getResponseFromGemini, changeWorkoutPlan, fetchNutritionalTip, getRecipeFromGemini} from '../services/geminiService';
import { User } from '../model/AuthModel';

export const createWorkoutPlan = async (req: Request, res: Response) => {
    try {
        const userProfile: User = req.body;
        const workoutPlanData = await generateWorkoutPlan(userProfile);
        
        // Save the workout plan to the database

        res.status(200).json(workoutPlanData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateWorkoutPlan = async (req: Request, res: Response) => {
    try {
        // Extract the WorkoutPlan and PartialWorkoutPlan from the request body
        const { WorkoutPlan: existingWorkoutPlan, PartialWorkoutPlan: changes } = req.body;

        // Validate that both parts are provided
        if (!existingWorkoutPlan || !changes) {
            return res.status(400).json({ message: "Both WorkoutPlan and PartialWorkoutPlan must be provided." });
        }

        // Call the function to change the workout plan
        const updatedWorkoutPlan = await changeWorkoutPlan(existingWorkoutPlan, changes);

        // Return the updated workout plan in the response
        res.status(200).json(updatedWorkoutPlan);
    } catch (error) {
        console.error("Error updating workout plan:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getRecipe = async (req: Request, res: Response) => {
    try {
        // Extract the meal JSON from the request body
        const mealJson = req.body;

        // Validate that the meal JSON is provided
        if (!mealJson || !mealJson.name || !mealJson.ingredients) {
            return res.status(400).json({ message: "Meal name and ingredients must be provided." });
        }

        // Call the Gemini API to generate the content
        const recipeResponse = await getRecipeFromGemini(mealJson); // Await the result here
        const text = await recipeResponse.text(); // Get the text from the response

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
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
