import { Request, Response } from 'express';
import { generateWorkoutPlan, getResponseFromGemini, changeWorkoutPlan, fetchNutritionalTip, getRecipeFromGemini } from '../services/geminiService';
import { User } from '../model/user_model'; // Import the UserModel interface
import WorkoutPlan from '../model/workout_model'; // Import the WorkoutPlan model
import  authenticate  from '../common/auth_middleware'; // Import the authentication middleware

export const createWorkoutPlan = [
    authenticate,
    async (req: Request, res: Response) => {
        try {
            const userProfile: User = req.body; // Use the UserModel interface instead of typeof User
            const workoutPlanData = await generateWorkoutPlan(userProfile);
            
            // Save the workout plan to the database
            const workoutPlan = new WorkoutPlan(workoutPlanData);
            await workoutPlan.save();

            res.status(200).json(workoutPlan);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

export const updateWorkoutPlan = [
    authenticate,
    async (req: Request, res: Response) => {
        try {
            // Extract the WorkoutPlan and PartialWorkoutPlan from the request body
            const { WorkoutPlan: existingWorkoutPlan, PartialWorkoutPlan: changes } = req.body;

            // Validate that both parts are provided
            if (!existingWorkoutPlan || !changes) {
                return res.status(400).json({ message: "Both WorkoutPlan and PartialWorkoutPlan must be provided." });
            }

            // Call the function to change the workout plan
            const updatedWorkoutPlan = await changeWorkoutPlan(existingWorkoutPlan, changes);

            // Save the updated workout plan to the database
            const workoutPlan = await WorkoutPlan.findByIdAndUpdate(existingWorkoutPlan._id, updatedWorkoutPlan, { new: true });

            // Return the updated workout plan in the response
            res.status(200).json(workoutPlan);
        } catch (error) {
            console.error("Error updating workout plan:", error);
            res.status(500).json({ message: error.message });
        }
    }
];

// Other functions remain unchanged