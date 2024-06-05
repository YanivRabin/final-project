"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestore = exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firebaseConfig = {
    apiKey: process.env.FireBaseAPIKey,
    authDomain: "finalproject-de046.firebaseapp.com",
    projectId: "finalproject-de046",
    storageBucket: "finalproject-de046.appspot.com",
    messagingSenderId: "634114730889",
    appId: "1:634114730889:web:e4df6cc8417ce98c788f58",
    measurementId: "G-ENKNNN47QK"
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
// Initialize Firebase Authentication and Firestore
console.log(process.env.FireBaseAPIKey);
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const firestore = (0, firestore_1.getFirestore)(app);
exports.firestore = firestore;
//# sourceMappingURL=firebaseConfig.js.map