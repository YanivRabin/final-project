import mongoose, { Schema, Document } from 'mongoose';

export interface WorkoutPlan extends Document {
    dailyMenu: string;
    weeklyWorkout: string;
    specificCalories: number;
}

const workoutSchema: Schema = new Schema({
    dailyMenu: { type: String, required: true },
    weeklyWorkout: { type: String, required: true },
    specificCalories: { type: Number, required: true },
});

export default mongoose.model<WorkoutPlan>('Workout', workoutSchema);
