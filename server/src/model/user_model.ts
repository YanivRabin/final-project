import mongoose from "mongoose";

export interface User {
    // properties and methods
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    age: number;
    height: number;
    weight: number;
    workoutGoals: string;
    daysPerWeek: number;
    minutesPerWorkout: number;
    workoutLocation: string;
    includeWarmup: boolean;
    includeStreching: boolean;
    dietaryRestrictions: {
        vegan: boolean;
        vegetarian: boolean;
        pescatarian: boolean;
        glutenFree: boolean;
        dairyFree: boolean;
        nutFree: boolean;
        soyFree: boolean;
        eggFree: boolean;
        shellfishFree: boolean;
        lactoseFree: boolean;
        kosher: boolean;
        halal: boolean;
        other: string;
    };
    tokens: string[];
  }
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    workoutGoals: { type: String, required: true },
    daysPerWeek: { type: Number, required: true },
    minutesPerWorkout: { type: Number, required: true },
    workoutLocation: { type: String, required: true },
    includeWarmup: { type: Boolean, required: true },
    includeStreching: { type: Boolean, required: true },
    dietaryRestrictions: {
      vegan: { type: Boolean, default: false },
      vegetarian: { type: Boolean, default: false },
      pescatarian: { type: Boolean, default: false },
      glutenFree: { type: Boolean, default: false },
      dairyFree: { type: Boolean, default: false },
      nutFree: { type: Boolean, default: false },
      soyFree: { type: Boolean, default: false },
      eggFree: { type: Boolean, default: false },
      shellfishFree: { type: Boolean, default: false },
      lactoseFree: { type: Boolean, default: false },
      kosher: { type: Boolean, default: false },
      halal: { type: Boolean, default: false },
      other: { type: String, default: '' }
    },
    tokens: { type: [String] }
});

export default mongoose.model('User', userSchema);

