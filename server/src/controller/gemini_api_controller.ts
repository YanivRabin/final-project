import { Request, Response } from 'express';
import { generateWorkoutPlan } from '../services/geminiService';
import userSchema from '../model/user_model';
import workoutSchema from '../model/workout_model';


export const createWorkoutPlan = async (req: Request, res: Response) => {
    try {
        const userProfile: typeof userSchema = req.body;
        const workoutPlan: typeof workoutSchema = await generateWorkoutPlan(userProfile);
        res.status(200).json(workoutPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
