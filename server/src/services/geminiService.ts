import  {User} from "../model/user_model";
import { WorkoutPlan } from "../model/workout_model";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDg-m-XGj7-woIcJ_yy-NSnVM83XnQ6Ric");

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateWorkoutPlan = async (profile: User) => {

    console.log(profile);
    console.log("daietry ", profile.dietaryRestrictions);    
    
    


  const prompt = `
        Create a detailed workout and nutrition plan for a user with the following profile:
        Age: ${profile.age}
        Height: ${profile.height}
        Weight: ${profile.weight}
        Workout Goal: ${profile.workoutGoals}
        Dietary Restrictions: ${Object.keys(profile.dietaryRestrictions).filter(key => profile.dietaryRestrictions[key]).join(', ')}
        Training Frequency: ${profile.daysPerWeek}
        Biological Sex: ${profile.gender}
        Workout Location: ${profile.workoutLocation}
        Minutes Per Workout: ${profile.minutesPerWorkout}
        Include Warmup: ${profile.includeWarmup}
        Include Stretching: ${profile.includeStreching}

        Please provide the following details:
        1. A detailed weekly workout schedule including daily workouts:
           For each day, list the exercises, how many times they should be done, and a brief description of each exercise and what muscle does the exercise work on, add emojis in the description.
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
  const result = await model.generateContent(prompt);
  // Assuming response.data has the structure { dailyMenu, weeklyWorkout, specificCalories }
  // const workoutPlan: WorkoutPlan = new WorkoutPlan(result);

  // // Extract and clean the JSON string from the result
  const jsonString = result.response.candidates[0].content.parts[0].text;
  const jsonStart = jsonString.indexOf("{");
  const jsonEnd = jsonString.lastIndexOf("}") + 1;
  const cleanJsonString = jsonString
    .slice(jsonStart, jsonEnd)
    .replace(/\\n/g, "");

  // Parse the JSON string into an object
  const workoutPlan: WorkoutPlan = JSON.parse(cleanJsonString);
  // Log the entire workout plan object
  console.log("Received Workout Plan:");
  console.log("Weekly Workout Schedule:");
  Object.keys(workoutPlan.weeklyWorkout).forEach((day) => {
    console.log(day.charAt(0).toUpperCase() + day.slice(1) + ":");
    workoutPlan.weeklyWorkout[day].forEach((exercise) => {
      console.log(
        `  - ${exercise.name}: ${exercise.sets} sets x ${exercise.reps} reps`
      );
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
      console.log(
        `  - Breakfast Raw Material ${i + 1}, ${ingredient.name}: Carbs ${
          ingredient.carbohydrates
        }g, Fats ${ingredient.fats}g, Proteins ${
          ingredient.proteins
        }g, Amount: ${ingredient.amount}`
      );
    });
  });

  console.log("\nLunch:");
  workoutPlan.nutritionalInformation.lunch.forEach((item, index) => {
    console.log(`- Lunch Option ${index + 1}:`);
    item.ingredients.forEach((ingredient, i) => {
      console.log(
        `  - Lunch Raw Material ${i + 1}, ${ingredient.name}: Carbs ${
          ingredient.carbohydrates
        }g, Fats ${ingredient.fats}g, Proteins ${
          ingredient.proteins
        }g, Amount: ${ingredient.amount}`
      );
    });
  });

  console.log("\nDinner:");
  workoutPlan.nutritionalInformation.dinner.forEach((item, index) => {
    console.log(`- Dinner Option ${index + 1}:`);
    item.ingredients.forEach((ingredient, i) => {
      console.log(
        `  - Dinner Raw Material ${i + 1}, ${ingredient.name}: Carbs ${
          ingredient.carbohydrates
        }g, Fats ${ingredient.fats}g, Proteins ${
          ingredient.proteins
        }g, Amount: ${ingredient.amount}`
      );
    });
  });

  console.log("\nSnacks:");
  workoutPlan.nutritionalInformation.snacks.forEach((item, index) => {
    console.log(`- Snack Option ${index + 1}:`);
    item.ingredients.forEach((ingredient, i) => {
      console.log(
        `  - Snack Raw Material ${i + 1}, ${ingredient.name}: Carbs ${
          ingredient.carbohydrates
        }g, Fats ${ingredient.fats}g, Proteins ${
          ingredient.proteins
        }g, Amount: ${ingredient.amount}`
      );
    });
  });

  return workoutPlan;
};

export const changeWorkoutPlan = async (workoutPlan: WorkoutPlan, changes: Partial<WorkoutPlan>) => {
  // Combine the existing workout plan with the requested changes
  const updatedWorkoutPlan = { ...workoutPlan, ...changes };

  const prompt = `
    This is my Workout Plan:
    ${JSON.stringify(workoutPlan, null, 2)}
    
    My request refering --only-- to the following sections:
    ${JSON.stringify(changes, null, 2)}
    
    The soulution is good, i want another option instead of this one.
    Replace this section answer with another replacement.

    Return the updated Workout Plan with only the specified changes applied. Do not alter any other sections.
    Ensure the response is a complete Workout Plan, maintaining the original goals and nutritional values.
`;





  const result = await model.generateContent(prompt);
  // Assuming response.data has the structure { dailyMenu, weeklyWorkout, specificCalories }
  // const newWorkoutPlan: WorkoutPlan = new WorkoutPlan(result);

  // Extract and clean the JSON string from the result
  const jsonString = result.response.candidates[0].content.parts[0].text;
  const jsonStart = jsonString.indexOf("{");
  const jsonEnd = jsonString.lastIndexOf("}") + 1;
  const cleanJsonString = jsonString
      .slice(jsonStart, jsonEnd)
      .replace(/\\n/g, "");

  // Parse the JSON string into an object
  const newWorkoutPlan: WorkoutPlan = JSON.parse(cleanJsonString);
  // Log the entire updated workout plan object
  console.log("Received Updated Workout Plan:");
  console.log("Weekly Workout Schedule:");
  Object.keys(newWorkoutPlan.weeklyWorkout).forEach((day) => {
      console.log(day.charAt(0).toUpperCase() + day.slice(1) + ":");
      newWorkoutPlan.weeklyWorkout[day].forEach((exercise) => {
          console.log(
              `  - ${exercise.name}: ${exercise.sets} sets x ${exercise.reps} reps`
          );
          console.log(`    Description: ${exercise.description}`);
      });
  });
  console.log("\nNutritional Information:");
  console.log(newWorkoutPlan.dailyMenu);
  console.log("Specific Calories: " + newWorkoutPlan.specificCalories);
  console.log("\nBreakfast:");
  newWorkoutPlan.nutritionalInformation.breakfast.forEach((item, index) => {
      console.log(`- Breakfast Option ${index + 1}:`);
      item.ingredients.forEach((ingredient, i) => {
          console.log(
              `  - Breakfast Raw Material ${i + 1}, ${ingredient.name}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`
          );
      });
  });

  console.log("\nLunch:");
  newWorkoutPlan.nutritionalInformation.lunch.forEach((item, index) => {
      console.log(`- Lunch Option ${index + 1}:`);
      item.ingredients.forEach((ingredient, i) => {
          console.log(
              `  - Lunch Raw Material ${i + 1}, ${ingredient.name}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`
          );
      });
  });

  console.log("\nDinner:");
  newWorkoutPlan.nutritionalInformation.dinner.forEach((item, index) => {
      console.log(`- Dinner Option ${index + 1}:`);
      item.ingredients.forEach((ingredient, i) => {
          console.log(
              `  - Dinner Raw Material ${i + 1}, ${ingredient.name}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`
          );
      });
  });

  console.log("\nSnacks:");
  newWorkoutPlan.nutritionalInformation.snacks.forEach((item, index) => {
      console.log(`- Snack Option ${index + 1}:`);
      item.ingredients.forEach((ingredient, i) => {
          console.log(
              `  - Snack Raw Material ${i + 1}, ${ingredient.name}: Carbs ${ingredient.carbohydrates}g, Fats ${ingredient.fats}g, Proteins ${ingredient.proteins}g, Amount: ${ingredient.amount}`
          );
      });
  });

  return newWorkoutPlan;
};

export const getRecipeFromGemini = async (mealJson) => {
  console.log("Generating recipe from Gemini API");
  const prompt = `
    Create a recipe for the following meal using only the ingredients and quantities specified. Do not add any additional ingredients.
    Meal: ${mealJson.name}
    Ingredients:
    ${mealJson.ingredients.map(ingredient => `
      - ${ingredient.name}: ${ingredient.amount} (Carbs: ${ingredient.carbohydrates}g, Fats: ${ingredient.fats}g, Proteins: ${ingredient.proteins}g)
    `).join('')}
    Please return the recipe as an ordered list with emojis for steps.
  `;
  const result = await model.generateContent(prompt);
  console.log("Content generated from Gemini API" + result);
  const response = await result.response;
  const text = await response.text();
  console.log(text);
  return response;
};

export const fetchNutritionalTip = async () => {
  console.log("Fetching nutritional tip from Gemini API");
  const prompt = "Provide a daily nutritional or fitness tip and include some emojis for visual appeal.";
  const result = await model.generateContent(prompt);
  console.log("Nutritional tip received from Gemini API: " + result);
  const response = await result.response;
  const text = await response.text();
  console.log(text);
  return response;
};

export const getResponseFromGemini = async () => {
  console.log("Generating content from Gemini API");
  const prompt = "Write a story about a magic backpack.";
  const result = await model.generateContent(prompt);
  console.log("Content generated from Gemini API" + result);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
};
