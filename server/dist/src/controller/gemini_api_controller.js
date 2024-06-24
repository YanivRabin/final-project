"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryGemini = exports.createWorkoutPlan = void 0;
const geminiService_1 = require("../services/geminiService");
const createWorkoutPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProfile = req.body;
        const workoutPlanData = yield (0, geminiService_1.generateWorkoutPlan)(userProfile);
        // Save the workout plan to the database
        res.status(200).json(workoutPlanData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createWorkoutPlan = createWorkoutPlan;
const tryGemini = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request received at /try-gemini");
    try {
        console.log("Trying Gemini API");
        const response = yield (0, geminiService_1.getResponseFromGemini)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.tryGemini = tryGemini;
//# sourceMappingURL=gemini_api_controller.js.map