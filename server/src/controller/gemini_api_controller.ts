import { Request, Response } from 'express';
import { generateWorkoutPlan } from '../services/geminiService';
import { UserProfile } from '../model/user_model';
import Workout, { WorkoutPlan } from '../model/workout_model';

export const createWorkoutPlan = async (req: Request, res: Response) => {
    try {
        const userProfile: UserProfile = req.body;
        const workoutPlanData = await generateWorkoutPlan(userProfile);
        
        // Save the workout plan to the database
        const workoutPlan = new Workout(workoutPlanData);
        await workoutPlan.save();

        res.status(200).json(workoutPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
