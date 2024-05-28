import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserProfile } from '../model/user_model';
import { WorkoutPlan } from '../model/workout_model';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const generateWorkoutPlan = async (profile: UserProfile) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = `
        Create a workout plan for a user with the following profile:
        Age: ${profile.age}
        Height: ${profile.height}
        Weight: ${profile.weight}
        Workout Goal: ${profile.workoutGoal}
        Allergies: ${profile.allergies.join(', ')}
        Training Frequency: ${profile.trainingFrequency}
        Biological Sex: ${profile.biologicalSex}
        Workout Location: ${profile.workoutLocation}
        Days Per Week: ${profile.daysPerWeek}
        Minutes Per Workout: ${profile.minutesPerWorkout}
        Include Warmup: ${profile.includeWarmup}
        Include Stretching: ${profile.includeStretching}
    `;
    const result = await model.generateContent(prompt);
    // Assuming response.data has the structure { dailyMenu, weeklyWorkout, specificCalories }
    // const workoutPlan: WorkoutPlan = new WorkoutPlan(result);
    return result;
};
