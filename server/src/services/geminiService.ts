
// Import the GoogleGenerativeAI class from the package
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
export const genAI = new GoogleGenerativeAI(process.env.API_KEY);


export const generateWorkoutPlan = async (profile: any) => {
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
    const response = await genAI.generateText(prompt);
    return response.data;
};
