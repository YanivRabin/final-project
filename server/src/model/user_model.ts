import mongoose, { Schema, Document } from 'mongoose';

export interface UserProfile extends Document {
    age: number;
    height: number;
    weight: number;
    workoutGoal: string;
    allergies: string[];
    trainingFrequency: string;
    biologicalSex: 'male' | 'female' | 'other';
    workoutLocation: 'gym' | 'home';
    daysPerWeek: number;
    minutesPerWorkout: number;
    includeWarmup: boolean;
    includeStretching: boolean;
}

const userSchema: Schema = new Schema({
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    workoutGoal: { type: String, required: true },
    allergies: { type: [String], required: true },
    trainingFrequency: { type: String, required: true },
    biologicalSex: { type: String, enum: ['male', 'female', 'other'], required: true },
    workoutLocation: { type: String, enum: ['gym', 'home'], required: true },
    daysPerWeek: { type: Number, required: true },
    minutesPerWorkout: { type: Number, required: true },
    includeWarmup: { type: Boolean, required: true },
    includeStretching: { type: Boolean, required: true },
});

export default mongoose.model<UserProfile>('User', userSchema);
