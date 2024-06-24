import mongoose, { Schema, Document } from 'mongoose';

export interface UserProfile extends Document {
    email: string;
    password: string;
    name: string
    photo: string
    age: number;
    height: number;
    weight: number;
    workoutGoal: string;
    allergies: string[];
    trainingFrequency: number;
    biologicalSex: string;
    workoutLocation: string;
    minutesPerWorkout: number;
    includeWarmup: boolean;
    includeStretching: boolean;
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    photo: { type: String, default: null },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    workoutGoal: { type: String, required: true },
    allergies: { type: [String], required: true },
    trainingFrequency: { type: Number, required: true },
    biologicalSex: { type: String, required: true },
    workoutLocation: { type: String, required: true },
    minutesPerWorkout: { type: Number, required: true },
    includeWarmup: { type: Boolean, required: true },
    includeStretching: { type: Boolean, required: true },
});

export default mongoose.model<UserProfile>('User', userSchema);
