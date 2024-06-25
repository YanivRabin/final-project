import { Request, Response } from 'express';
import { generateWorkoutPlan, getResponseFromGemini} from '../services/geminiService';
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
