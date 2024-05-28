import { UserProfile } from '../model/user_model';
import { WorkoutPlan } from '../model/workout_model';

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.ddeed);

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
        - Breakfast option, which raw materials, and how much (amount in grams) the meal consists of and each raw material with nutritional values (carbohydrates, fats, proteins).
        - Lunch option, which raw materials, and how much (amount in grams) the meal consists of and each raw material with nutritional values (carbohydrates, fats, proteins).
        - Dinner option, which raw materials, and how much (amount in grams) the meal consists of and each raw material with nutritional values (carbohydrates, fats, proteins).
        - Snacks option, which raw materials, and how much (amount in grams) the meal consists of and each raw material with nutritional values (carbohydrates, fats, proteins).

        Example but use the spicific name of the raw materiel you suggest me and not just "raw matriel 1":
        {
            dailyMenu: "This is a sample daily menu",
            weeklyWorkout: {
                monday: "Chest and Triceps workout",
                tuesday: "Back and Biceps workout",
                wednesday: "Rest day",
                thursday: "Legs workout",
                friday: "Shoulders workout",
                saturday: "Rest or active recovery",
                sunday: "Rest day"
            },
            specificCalories: 2500,
            nutritionalInformation: {
                breakfast: [
                    {
                        name: "Breakfast Option 1",
                        ingredients: [
                            { name: "Breakfast Raw Material 1", carbohydrates: 30, fats: 5, proteins: 7, amount: "50g" },
                            { name: "Breakfast Raw Material 2", carbohydrates: 15, fats: 1, proteins: 1, amount: "30g" },
                            { name: "Breakfast Raw Material 3", carbohydrates: 0, fats: 6, proteins: 2, amount: "10g" }
                        ]
                    },
                    {
                        name: "Breakfast Option 2",
                        ingredients: [
                            { name: "Breakfast Raw Material 4", carbohydrates: 2, fats: 10, proteins: 14, amount: "100g" },
                            { name: "Breakfast Raw Material 5", carbohydrates: 15, fats: 25, proteins: 2, amount: "50g" },
                            { name: "Breakfast Raw Material 6", carbohydrates: 20, fats: 2, proteins: 5, amount: "40g" }
                        ]
                    }
                ],
                lunch: [
                    {
                        name: "Lunch Option 1",
                        ingredients: [
                            { name: "Lunch Raw Material 1", carbohydrates: 0, fats: 3, proteins: 26, amount: "120g" },
                            { name: "Lunch Raw Material 2", carbohydrates: 3, fats: 0, proteins: 1, amount: "50g" },
                            { name: "Lunch Raw Material 3", carbohydrates: 5, fats: 0, proteins: 1, amount: "30g" },
                            { name: "Lunch Raw Material 4", carbohydrates: 2, fats: 0, proteins: 1, amount: "30g" },
                            { name: "Lunch Raw Material 5", carbohydrates: 2, fats: 4, proteins: 1, amount: "20g" }
                        ]
                    },
                    {
                        name: "Lunch Option 2",
                        ingredients: [
                            { name: "Lunch Raw Material 6", carbohydrates: 40, fats: 6, proteins: 8, amount: "100g" },
                            { name: "Lunch Raw Material 7", carbohydrates: 10, fats: 3, proteins: 2, amount: "80g" }
                        ]
                    }
                ],
                dinner: [
                    {
                        name: "Dinner Option 1",
                        ingredients: [
                            { name: "Dinner Raw Material 1", carbohydrates: 0, fats: 12, proteins: 20, amount: "150g" },
                            { name: "Dinner Raw Material 2", carbohydrates: 30, fats: 0, proteins: 2, amount: "120g" },
                            { name: "Dinner Raw Material 3", carbohydrates: 5, fats: 1, proteins: 2, amount: "80g" }
                        ]
                    },
                    {
                        name: "Dinner Option 2",
                        ingredients: [
                            { name: "Dinner Raw Material 4", carbohydrates: 0, fats: 5, proteins: 25, amount: "120g" },
                            { name: "Dinner Raw Material 5", carbohydrates: 15, fats: 3, proteins: 2, amount: "100g" }
                        ]
                    }
                ],
                snacks: [
                    {
                        name: "Snack Option 1",
                        ingredients: [
                            { name: "Snack Raw Material 1", carbohydrates: 10, fats: 2, proteins: 5, amount: "150g" },
                            { name: "Snack Raw Material 2", carbohydrates: 5, fats: 0, proteins: 1, amount: "50g" }
                        ]
                    },
                    {
                        name: "Snack Option 2",
                        ingredients: [
                            { name: "Snack Raw Material 3", carbohydrates: 10, fats: 2, proteins: 15, amount: "40g" },
                            { name: "Snack Raw Material 4", carbohydrates: 5, fats: 1, proteins: 2, amount: "30g" },
                            { name: "Snack Raw Material 5", carbohydrates: 5, fats: 3, proteins: 1, amount: "200ml" }
                        ]
                    }
                ]
            }
        };

        Please return the workout plan in the following JSON format:
        {
            dailyMenu: string;
            weeklyWorkout: {
                monday: string;
                tuesday: string;
                wednesday: string;
                thursday: string;
                friday: string;
                saturday: string;
                sunday: string;
            };
            specificCalories: number;
            nutritionalInformation: {
                breakfast: {
                    name: string;
                    ingredients: {
                        name: string;
                        carbohydrates: number;
                        fats: number;
                        proteins: number;
                        amount: string;
                    }[];
                }[];
                lunch: {
                    name: string;
                    ingredients: {
                        name: string;
                        carbohydrates: number;
                        fats: number;
                        proteins: number;
                        amount: string;
                    }[];
                }[];
                dinner: {
                    name: string;
                    ingredients: {
                        name: string;
                        carbohydrates: number;
                        fats: number;
                        proteins: number;
                        amount: string;
                    }[];
                }[];
                snacks: {
                    name: string;
                    ingredients: {
                        name: string;
                        carbohydrates: number;
                        fats: number;
                        proteins: number;
                        amount: string;
                    }[];
                }[];
            };
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
    console.log(`Monday: ${workoutPlan.weeklyWorkout.monday}`);
    console.log(`Tuesday: ${workoutPlan.weeklyWorkout.tuesday}`);
    console.log(`Wednesday: ${workoutPlan.weeklyWorkout.wednesday}`);
    console.log(`Thursday: ${workoutPlan.weeklyWorkout.thursday}`);
    console.log(`Friday: ${workoutPlan.weeklyWorkout.friday}`);
    console.log(`Saturday: ${workoutPlan.weeklyWorkout.saturday}`);
    console.log(`Sunday: ${workoutPlan.weeklyWorkout.sunday}`);
    console.log("\nSpecific Calories:");
    console.log(workoutPlan.specificCalories);
    console.log("\nNutritional Information:");

    console.log("\nBreakfast:");
    workoutPlan.nutritionalInformation.breakfast.forEach((item, index) => {
        console.log(`- Breakfast Option ${index + 1}:`);
        item.ingredients.forEach((ingredient, i) => {
            console.log(`  - Breakfast Raw Material ${i + 1}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`);
        });
    });

    console.log("\nLunch:");
    workoutPlan.nutritionalInformation.lunch.forEach((item, index) => {
        console.log(`- Lunch Option ${index + 1}:`);
        item.ingredients.forEach((ingredient, i) => {
            console.log(`  - Lunch Raw Material ${i + 1}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`);
        });
    });

    console.log("\nDinner:");
    workoutPlan.nutritionalInformation.dinner.forEach((item, index) => {
        console.log(`- Dinner Option ${index + 1}:`);
        item.ingredients.forEach((ingredient, i) => {
            console.log(`  - Dinner Raw Material ${i + 1}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`);
        });
    });

    console.log("\nSnacks:");
    workoutPlan.nutritionalInformation.snacks.forEach((item, index) => {
        console.log(`- Snack Option ${index + 1}:`);
        item.ingredients.forEach((ingredient, i) => {
            console.log(`  - Snack Raw Material ${i + 1}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`);
        });
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