import mongoose, { Schema, Document } from 'mongoose';

// export interface WorkoutPlan extends Document {
//     nutritionalMenu: string;
//     weeklyWorkout: string;
//     specificCalories: number;
// }

const workoutSchema: Schema = new Schema({
    nutritionalMenu: { type: String, required: true },
    weeklyWorkout: { type: String, required: true },
    specificCalories: { type: Number, required: true },
});


export interface WorkoutPlan extends Document{
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
}


export default mongoose.model<WorkoutPlan>('Workout', workoutSchema);
