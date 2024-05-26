import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    dailyMenu: { type: String, required: true },
    weeklyWorkout: { type: String, required: true },
    specificCalories: { type: Number, required: true }
});

export default mongoose.model('Workout', workoutSchema);
