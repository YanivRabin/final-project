"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseFromGemini = exports.generateWorkoutPlan = void 0;
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_API_KEY);
// ...
// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const generateWorkoutPlan = (profile) => __awaiter(void 0, void 0, void 0, function* () {
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
        1. A detailed weekly workout schedule including daily workouts:
           For each day, list the exercises, how many times they should be done, and a brief description of each exercise.
           Example:
           Sunday:
           - Exercise 1: 3 sets of 10 reps, description of Exercise 1
           - Exercise 2: 4 sets of 15 reps, description of Exercise 2
           - Exercise 3: 3 sets of 12 reps, description of Exercise 3
           - Exercise 4: 4 sets of 10 reps, description of Exercise 4
           - Exercise 5: 3 sets of 8 reps, description of Exercise 5

           Monday:
           - Exercise 1: 3 sets of 10 reps, description of Exercise 1
           - Exercise 2: 4 sets of 15 reps, description of Exercise 2
           - Exercise 3: 3 sets of 12 reps, description of Exercise 3
           - Exercise 4: 4 sets of 10 reps, description of Exercise 4
           - Exercise 5: 3 sets of 8 reps, description of Exercise 5

           Continue this format for each day of the week.
           If the user needs to rest on certain days based on their training frequency, return:
           {name: "Rest", sets: "", reps: "", description: "" }


        2. A breakdown of nutritional information including:
        - Breakfast option, which name of ingredients and how much (amount in grams) the meal consists of and each raw material with nutritional values (carbohydrates, fats, proteins).
        - Lunch option, which name of ingredients and how much (amount in grams) the meal consists of and each raw material with nutritional values (carbohydrates, fats, proteins).
        - Dinner option, which name of ingredients and how much (amount in grams) the meal consists of and each raw material with nutritional values (carbohydrates, fats, proteins).
        - Snacks option, which name of ingredients and how much (amount in grams) the meal consists of and each raw material with nutritional values (carbohydrates, fats, proteins).

        Example but use the spicific name of the raw materiel you suggest me and not just "raw matriel 1":
        {
            dailyMenu: "This is a sample daily menu",
            weeklyWorkout: {
                sunday: [
                    { name: "Exercise 1", sets: "3", reps: "10", description: "Description of Exercise 1" },
                    { name: "Exercise 2", sets: "4", reps: "15", description: "Description of Exercise 2" }
                ],
                monday: [
                    { name: "Exercise 1", sets: "3", reps: "10", description: "Description of Exercise 1" },
                    { name: "Exercise 2", sets: "4", reps: "15", description: "Description of Exercise 2" }
                ],
                tuesday: [
                    // Continue in the same format for other days
                ],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: []
            },
            specificCalories: caloriesValue,
            nutritionalInformation: {
                breakfast: [
                    {
                        name: "Breakfast Option 1",
                        ingredients: [
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "30", fats: "5", proteins: "7", amount: "50g" },
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "15", fats: "1", proteins: "1", amount: "30g" }
                        ]
                    },
                    {
                        name: "Breakfast Option 2",
                        ingredients: [
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "2", fats: "10", proteins: "14", amount: "100g" },
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "15", fats: "25", proteins: "2", amount: "50g" }
                        ]
                    }
                ],
                lunch: [
                    {
                        name: "Lunch Option 1",
                        ingredients: [
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "0", fats: "3", proteins: "26", amount: "120g" },
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "3", fats: "0", proteins: "1", amount: "50g" }
                        ]
                    },
                    {
                        name: "Lunch Option 2",
                        ingredients: [
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "40", fats: "6", proteins: "8", amount: "100g" },
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "10", fats: "3", proteins: "2", amount: "80g" }
                        ]
                    }
                ],
                dinner: [
                    {
                        name: "Dinner Option 1",
                        ingredients: [
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "0", fats: "12", proteins: "20", amount: "150g" },
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "30", fats: "0", proteins: "2", amount: "120g" }
                        ]
                    },
                    {
                        name: "Dinner Option 2",
                        ingredients: [
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "0", fats: "5", proteins: "25", amount: "120g" },
                            { name: "Specify a type of ingredient, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "15", fats: "3", proteins: "2", amount: "100g" }
                        ]
                    }
                ],
                snacks: [
                    {
                        name: "Snack Option 1",
                        ingredients: [
                            { name: "Specify a type of snack, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "10", fats: "2", proteins: "5", amount: "150g" },
                            { name: "Specify a type of snack, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "5", fats: "0", proteins: "1", amount: "50g" }
                        ]
                    },
                    {
                        name: "Snack Option 2",
                        ingredients: [
                            { name: "Specify a type of snack, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "10", fats: "2", proteins: "15", amount: "40g" },
                            { name: "Specify a type of snack, e.g., a type of vegetable, protein, carbohydrate, etc.", carbohydrates: "5", fats: "1", proteins: "2", amount: "30g" }
                        ]
                    }
                ]
            }
        };

        Please return the workout plan in the following JSON format:
        {
            "dailyMenu": "string",
            "weeklyWorkout": {
                "sunday": [
                    { "name": string, "sets": string, "reps": string, "description": string }
                ],
                "monday": [
                    { "name": string, "sets": string, "reps": string, "description": string }
                ],
                "tuesday": [
                    { "name": string, "sets": string, "reps": string, "description": string }
                ],
                "wednesday": [
                    { "name": string, "sets": string, "reps": string, "description": string }
                ],
                "thursday": [
                    { "name": string, "sets": string, "reps": string, "description": string }
                ],
                "friday": [
                    { "name": string, "sets": string, "reps": string, "description": string }
                ],
                "saturday": [
                    { "name": string, "sets": string, "reps": string, "description": string }
                ]
            },
            "specificCalories": number,
            "nutritionalInformation": {
                "breakfast": [
                    {
                        "name": string,
                        "ingredients": [
                            { "name": string, "carbohydrates": string, "fats": string, "proteins": string, "amount": string }
                        ]
                    }
                ],
                "lunch": [
                    {
                        "name": string,
                        "ingredients": [
                            { "name": string, "carbohydrates": string, "fats": string, "proteins": string, "amount": string }
                        ]
                    }
                ],
                "dinner": [
                    {
                        "name": string,
                        "ingredients": [
                            { "name": string, "carbohydrates": string, "fats": string, "proteins": string, "amount": string }
                        ]
                    }
                ],
                "snacks": [
                    {
                        "name": string,
                        "ingredients": [
                            { "name": string, "carbohydrates": string, "fats": string, "proteins": string, "amount": string }
                        ]
                    }
                ]
            }
        }
    `;
    const result = yield model.generateContent(prompt);
    // Assuming response.data has the structure { dailyMenu, weeklyWorkout, specificCalories }
    // const workoutPlan: WorkoutPlan = new WorkoutPlan(result);
    // // Extract and clean the JSON string from the result
    const jsonString = result.response.candidates[0].content.parts[0].text;
    const jsonStart = jsonString.indexOf('{');
    const jsonEnd = jsonString.lastIndexOf('}') + 1;
    const cleanJsonString = jsonString.slice(jsonStart, jsonEnd).replace(/\\n/g, '');
    // Parse the JSON string into an object
    const workoutPlan = JSON.parse(cleanJsonString);
    // Log the entire workout plan object
    console.log("Received Workout Plan:");
    console.log("Weekly Workout Schedule:");
    Object.keys(workoutPlan.weeklyWorkout).forEach(day => {
        console.log(day.charAt(0).toUpperCase() + day.slice(1) + ":");
        workoutPlan.weeklyWorkout[day].forEach(exercise => {
            console.log(`  - ${exercise.name}: ${exercise.sets} sets x ${exercise.reps} reps`);
            console.log(`    Description: ${exercise.description}`);
        });
    });
    console.log("\nNutritional Information:");
    console.log(workoutPlan.dailyMenu);
    console.log("Specific Calories: " + workoutPlan.specificCalories);
    console.log("\nBreakfast:");
    workoutPlan.nutritionalInformation.breakfast.forEach((item, index) => {
        console.log(`- Breakfast Option ${index + 1}:`);
        item.ingredients.forEach((ingredient, i) => {
            console.log(`  - Breakfast Raw Material ${i + 1}, ${ingredient.name}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`);
        });
    });
    console.log("\nLunch:");
    workoutPlan.nutritionalInformation.lunch.forEach((item, index) => {
        console.log(`- Lunch Option ${index + 1}:`);
        item.ingredients.forEach((ingredient, i) => {
            console.log(`  - Lunch Raw Material ${i + 1}, ${ingredient.name}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`);
        });
    });
    console.log("\nDinner:");
    workoutPlan.nutritionalInformation.dinner.forEach((item, index) => {
        console.log(`- Dinner Option ${index + 1}:`);
        item.ingredients.forEach((ingredient, i) => {
            console.log(`  - Dinner Raw Material ${i + 1}, ${ingredient.name}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`);
        });
    });
    console.log("\nSnacks:");
    workoutPlan.nutritionalInformation.snacks.forEach((item, index) => {
        console.log(`- Snack Option ${index + 1}:`);
        item.ingredients.forEach((ingredient, i) => {
            console.log(`  - Snack Raw Material ${i + 1}, ${ingredient.name}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`);
        });
    });
    return result;
});
exports.generateWorkoutPlan = generateWorkoutPlan;
const getResponseFromGemini = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Generating content from Gemini API");
    const prompt = "Write a story about a magic backpack.";
    const result = yield model.generateContent(prompt);
    console.log("Content generated from Gemini API" + result);
    const response = yield result.response;
    const text = response.text();
    console.log(text);
    return result;
});
exports.getResponseFromGemini = getResponseFromGemini;
//# sourceMappingURL=geminiService.js.map