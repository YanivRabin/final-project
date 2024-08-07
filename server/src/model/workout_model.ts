import mongoose, { Schema, Document } from 'mongoose';

export interface WorkoutPlan extends Document {
    dailyMenu: string;
    weeklyWorkout: {
        monday: {
            name: string;
            sets: string;
            reps: string;
            description: string;
        }[];
        tuesday: {
            name: string;
            sets: string;
            reps: string;
            description: string;
        }[];
        wednesday: {
            name: string;
            sets: string;
            reps: string;
            description: string;
        }[];
        thursday: {
            name: string;
            sets: string;
            reps: string;
            description: string;
        }[];
        friday: {
            name: string;
            sets: string;
            reps: string;
            description: string;
        }[];
        saturday: {
            name: string;
            sets: string;
            reps: string;
            description: string;
        }[];
        sunday: {
            name: string;
            sets: string;
            reps: string;
            description: string;
        }[];
    };
    specificCalories: number;
    nutritionalInformation: {
        breakfast: {
            name: string;
            ingredients: {
                name: string;
                carbohydrates: string;
                fats: string;
                proteins: string;
                amount: string;
            }[];
        }[];
        lunch: {
            name: string;
            ingredients: {
                name: string;
                carbohydrates: string;
                fats: string;
                proteins: string;
                amount: string;
            }[];
        }[];
        dinner: {
            name: string;
            ingredients: {
                name: string;
                carbohydrates: string;
                fats: string;
                proteins: string;
                amount: string;
            }[];
        }[];
        snacks: {
            name: string;
            ingredients: {
                name: string;
                carbohydrates: string;
                fats: string;
                proteins: string;
                amount: string;
            }[];
        }[];
    };
    email: string;  // Added email field
}

const workoutSchema: Schema = new Schema({
    dailyMenu: { type: String, required: true },
    weeklyWorkout: {
        monday: [{ name: String, sets: String, reps: String, description: String }],
        tuesday: [{ name: String, sets: String, reps: String, description: String }],
        wednesday: [{ name: String, sets: String, reps: String, description: String }],
        thursday: [{ name: String, sets: String, reps: String, description: String }],
        friday: [{ name: String, sets: String, reps: String, description: String }],
        saturday: [{ name: String, sets: String, reps: String, description: String }],
        sunday: [{ name: String, sets: String, reps: String, description: String }],
    },
    specificCalories: { type: Number, required: true },
    nutritionalInformation: {
        breakfast: [{ name: String, ingredients: [{ name: String, carbohydrates: String, fats: String, proteins: String, amount: String }] }],
        lunch: [{ name: String, ingredients: [{ name: String, carbohydrates: String, fats: String, proteins: String, amount: String }] }],
        dinner: [{ name: String, ingredients: [{ name: String, carbohydrates: String, fats: String, proteins: String, amount: String }] }],
        snacks: [{ name: String, ingredients: [{ name: String, carbohydrates: String, fats: String, proteins: String, amount: String }] }],
    },
    email: { type: String, required: true }  // Added email field
});

export default mongoose.model<WorkoutPlan>('Workout', workoutSchema);
