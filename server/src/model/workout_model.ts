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


export default mongoose.model<WorkoutPlan>('Workout', workoutSchema);
