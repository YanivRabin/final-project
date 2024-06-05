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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const firebaseConfig_1 = require("./firebaseConfig");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
class AuthModel {
    constructor() { }
    static getInstance() {
        if (!AuthModel.instance) {
            AuthModel.instance = new AuthModel();
        }
        return AuthModel.instance;
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, auth_1.signInWithEmailAndPassword)(firebaseConfig_1.auth, email, password);
            }
            catch (error) {
                console.error("Login failed:", error);
                throw new Error("Login failed.");
            }
        });
    }
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, auth_1.createUserWithEmailAndPassword)(firebaseConfig_1.auth, user.email, user.password);
                const { password } = user, userDataWithoutPassword = __rest(user, ["password"]);
                // Save user in Firestore
                if (firebaseConfig_1.auth.currentUser) {
                    const userDocRef = (0, firestore_1.doc)(firebaseConfig_1.firestore, 'users', firebaseConfig_1.auth.currentUser.uid);
                    yield (0, firestore_1.setDoc)(userDocRef, userDataWithoutPassword);
                }
            }
            catch (error) {
                console.error("Registration failed:", error);
                throw new Error("Registration failed.");
            }
        });
    }
    isUserLoggedIn() {
        return firebaseConfig_1.auth.currentUser !== null;
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, auth_1.signOut)(firebaseConfig_1.auth);
        });
    }
    signInWithGoogle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provider = new auth_1.GoogleAuthProvider();
                yield (0, auth_1.signInWithPopup)(firebaseConfig_1.auth, provider);
            }
            catch (error) {
                console.error("Google sign-in failed:", error);
                throw new Error("Google sign-in failed.");
            }
        });
    }
    signInWithFacebook() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provider = new auth_1.FacebookAuthProvider();
                yield (0, auth_1.signInWithPopup)(firebaseConfig_1.auth, provider);
            }
            catch (error) {
                console.error("Facebook sign-in failed:", error);
                throw new Error("Facebook sign-in failed.");
            }
        });
    }
}
exports.AuthModel = AuthModel;
// // Google Authentication
// const googleProvider = new firebase.auth.GoogleAuthProvider();
// function signInWithGoogle(): Promise<{ user: firebase.User | null, token: string | undefined }> {
//   return auth.signInWithPopup(googleProvider)
//     .then((result: firebase.auth.UserCredential) => {
//       const credential = result.credential as firebase.auth.OAuthCredential;
//       const token = credential.accessToken;
//       const user = result.user;
//       console.log('User signed in with Google:', user);
//       return { user, token };
//     })
//     .catch((error: firebase.auth.AuthError) => {
//       console.error('Error with Google sign-in:', error);
//       throw error;
//     });
// }
// // Facebook Authentication
// const facebookProvider = new firebase.auth.FacebookAuthProvider();
// function signInWithFacebook(): Promise<{ user: firebase.User | null, token: string | undefined }> {
//   return auth.signInWithPopup(facebookProvider)
//     .then((result: firebase.auth.UserCredential) => {
//       const credential = result.credential as firebase.auth.OAuthCredential;
//       const token = credential.accessToken;
//       const user = result.user;
//       console.log('User signed in with Facebook:', user);
//       return { user, token };
//     })
//     .catch((error: firebase.auth.AuthError) => {
//       console.error('Error with Facebook sign-in:', error);
//       throw error;
//     });
// }
// // Apple Authentication
// const appleProvider = new firebase.auth.OAuthProvider('apple.com');
// function signInWithApple(): Promise<{ user: firebase.User | null, token: string | undefined }> {
//   return auth.signInWithPopup(appleProvider)
//     .then((result: firebase.auth.UserCredential) => {
//       const credential = result.credential as firebase.auth.OAuthCredential;
//       const token = credential.accessToken;
//       const user = result.user;
//       console.log('User signed in with Apple:', user);
//       return { user, token };
//     })
//     .catch((error: firebase.auth.AuthError) => {
//       console.error('Error with Apple sign-in:', error);
//       throw error;
//     });
// }
//# sourceMappingURL=AuthModel.js.map