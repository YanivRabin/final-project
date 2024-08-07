"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const workoutSchema = new mongoose_1.Schema({
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
    email: { type: String, required: true } // Added email field
});
exports.default = mongoose_1.default.model('Workout', workoutSchema);
//# sourceMappingURL=workout_model.js.map