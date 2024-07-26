import { Request, Response } from 'express';
import { generateWorkoutPlan, getResponseFromGemini, changeWorkoutPlan} from '../services/geminiService';
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
