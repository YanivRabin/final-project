"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user_model.js.map