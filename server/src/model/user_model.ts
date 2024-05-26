import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    photo: { type: String, default: null },
    age: { type: Number, default: null },
    height: { type: Number, default: null },
    weight: { type: Number, default: null },
    workoutGoal: { type: String, default: null },
    allergies: { type: [String], default: [] },
    trainingFrequency: { type: String, default: null },
    biologicalSex: { type: String, default: null },
    workoutLocation: { type: String, default: null },
    daysPerWeek: { type: Number, default: null },
    minutesPerWorkout: { type: Number, default: null },
    includeWarmup: { type: Boolean, default: null },
    includeStretching: { type: Boolean, default: null },
    refreshToken: { type: String }
});

export default mongoose.model('User', userSchema);
