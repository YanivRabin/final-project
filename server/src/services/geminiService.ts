import { UserProfile } from '../model/user_model';
import { WorkoutPlan } from '../model/workout_model';

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_API_KEY);

// ...

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export const generateWorkoutPlan = async (profile: UserProfile) => {
    const prompt = `
        Create a detailed workout and nutrition plan for a user with the following profile:
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

        Please provide the following details:
        1. A detailed weekly workout schedule including daily workouts.
        2. A breakdown of nutritional information including:
        - Breakfast option with nutritional values (carbohydrates, fats, proteins).
        - Lunch option, which raw materials the meal consists of and each raw material with nutritional values (carbohydrates, fats, proteins).
        - Dinner option, which raw materials the meal consists of and each raw material with nutritional values (carbohydrates, fats, proteins).
        - Snacks option, which raw materials the meal consists of and each raw material with nutritional values (carbohydrates, fats, proteins).

        Example:
        {
            "dailyMenu": "Your daily menu here",
            "weeklyWorkout": {
                "monday": "Detailed workout plan for Monday",
                "tuesday": "Detailed workout plan for Tuesday",
                "wednesday": "Detailed workout plan for Wednesday",
                "thursday": "Detailed workout plan for Thursday",
                "friday": "Detailed workout plan for Friday",
                "saturday": "Detailed workout plan for Saturday",
                "sunday": "Detailed workout plan for Sunday"
            },
            "specificCalories": 2500,
            "nutritionalInformation": {
                "breakfast": [
                    { "name": "Oatmeal with berries", "carbohydrates": 30, "fats": 5, "proteins": 10 },
                ],
                "lunch": [
                    { "name": "Grilled chicken with quinoa", "carbohydrates": 40, "fats": 10, "proteins": 30 },
                ],
                "dinner": [
                    { "name": "Steak with brown rice", "carbohydrates": 45, "fats": 12, "proteins": 35 },
                ],
                "snacks": [
                    { "name": "Protein shake", "carbohydrates": 10, "fats": 5, "proteins": 20 },
                ]
            }
        }

        Please return the workout plan in the following JSON format:
        {
            "dailyMenu": "string",
            "weeklyWorkout": {
                "monday": "string",
                "tuesday": "string",
                "wednesday": "string",
                "thursday": "string",
                "friday": "string",
                "saturday": "string",
                "sunday": "string"
            },
            "specificCalories": number,
            "nutritionalInformation": {
                "breakfast": [
                    { "name": "string", "carbohydrates": number, "fats": number, "proteins": number }
                ],
                "lunch": [
                    { "name": "string", "carbohydrates": number, "fats": number, "proteins": number }
                ],
                "dinner": [
                    { "name": "string", "carbohydrates": number, "fats": number, "proteins": number }
                ],
                "snacks": [
                    { "name": "string", "carbohydrates": number, "fats": number, "proteins": number }
                ]
            }
        }
    `;
    const result = await model.generateContent(prompt);
    // Assuming response.data has the structure { dailyMenu, weeklyWorkout, specificCalories }
    // const workoutPlan: WorkoutPlan = new WorkoutPlan(result);

    // // Extract and clean the JSON string from the result
    const jsonString = result.response.candidates[0].content.parts[0].text;
    const jsonStart = jsonString.indexOf('{');
    const jsonEnd = jsonString.lastIndexOf('}') + 1;
    const cleanJsonString = jsonString.slice(jsonStart, jsonEnd).replace(/\\n/g, '');

    // Parse the JSON string into an object
    const workoutPlan: WorkoutPlan = JSON.parse(cleanJsonString);
    // Log the entire workout plan object
    console.log("Received Workout Plan:");
    console.log("Daily Menu:");
    console.log(workoutPlan.dailyMenu);
    console.log("\nWeekly Workout Schedule:");
    console.log("Monday:");
    console.log(workoutPlan.weeklyWorkout.monday);
    console.log("\nTuesday:");
    console.log(workoutPlan.weeklyWorkout.tuesday);
    console.log("\nWednesday:");
    console.log(workoutPlan.weeklyWorkout.wednesday);
    console.log("\nThursday:");
    console.log(workoutPlan.weeklyWorkout.thursday);
    console.log("\nFriday:");
    console.log(workoutPlan.weeklyWorkout.friday);
    console.log("\nSaturday:");
    console.log(workoutPlan.weeklyWorkout.saturday);
    console.log("\nSunday:");
    console.log(workoutPlan.weeklyWorkout.sunday);
    console.log("\nSpecific Calories:");
    console.log(workoutPlan.specificCalories);
    console.log("\nNutritional Information:");
    console.log("Breakfast:");
    workoutPlan.nutritionalInformation.breakfast.forEach(item => {
        console.log(`- ${item.name}: Carbs ${item.carbohydrates}g, Fats ${item.fats}g, Proteins ${item.proteins}g`);
    });
    console.log("\nLunch:");
    workoutPlan.nutritionalInformation.lunch.forEach(item => {
        console.log(`- ${item.name}: Carbs ${item.carbohydrates}g, Fats ${item.fats}g, Proteins ${item.proteins}g`);
    });
    console.log("\nDinner:");
    workoutPlan.nutritionalInformation.dinner.forEach(item => {
        console.log(`- ${item.name}: Carbs ${item.carbohydrates}g, Fats ${item.fats}g, Proteins ${item.proteins}g`);
    });
    console.log("\nSnacks:");
    workoutPlan.nutritionalInformation.snacks.forEach(item => {
        console.log(`- ${item.name}: Carbs ${item.carbohydrates}g, Fats ${item.fats}g, Proteins ${item.proteins}g`);
    });

    return result;
}

export const getResponseFromGemini = async () => {
    console.log("Generating content from Gemini API");
    const prompt = "Write a story about a magic backpack."
    const result = await model.generateContent(prompt);
    console.log("Content generated from Gemini API"+result);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return result;
}


// async function run() {
//     // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
//     const prompt = "Write a story about a magic backpack."
  
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//   }
  
//   run();