import { auth, firestore } from "./firebaseConfig";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export interface User {
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
}

export class AuthModel {
  private static instance: AuthModel;
  private constructor() {}

  public static getInstance(): AuthModel {
    if (!AuthModel.instance) {
      AuthModel.instance = new AuthModel();
    }
    return AuthModel.instance;
  }

  public async signIn(email: string, password: string): Promise<User | null> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return this.getCurrentUser();
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed.");
    }
  }

  public async signUp(user: User): Promise<User | null> {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);

      const { password, ...userDataWithoutPassword } = user;

      // Save user in Firestore
      if (auth.currentUser) {
        const userDocRef = doc(firestore, "users", auth.currentUser.uid);
        await setDoc(userDocRef, userDataWithoutPassword);
      }
      return this.getCurrentUser();
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed.");
    }
  }

  public isUserLoggedIn(): boolean {
    return auth.currentUser !== null;
  }

  public async logout(): Promise<void> {
    await signOut(auth);
  }
  public async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in failed:", error);
      throw new Error("Google sign-in failed.");
    }
  }

  public async signInWithFacebook(): Promise<void> {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Facebook sign-in failed:", error);
      throw new Error("Facebook sign-in failed.");
    }
  }

  public async getCurrentUser(): Promise<User | null> {
    if (!auth.currentUser) return null;

    const userDocRef = doc(firestore, "users", auth.currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as User;
    } else {
      return null;
    }
  }
}
const authModelInstance = AuthModel.getInstance();
export const signIn = (email: string, password: string) =>
  authModelInstance.signIn(email, password);
export const signUp = (user: User) => authModelInstance.signUp(user);

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