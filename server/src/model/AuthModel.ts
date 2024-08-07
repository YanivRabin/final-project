// import axios from 'axios';
// import {User} from '../model/user_model';

// export class AuthModel {
//   private static instance: AuthModel;
//   private constructor() {}

//   public static getInstance(): AuthModel {
//     if (!AuthModel.instance) {
//       AuthModel.instance = new AuthModel();
//     }
//     return AuthModel.instance;
//   }

//   public async signIn(email: string, password: string): Promise<User | null> {
//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       const token = response.data.token;
//       localStorage.setItem('jwtToken', token);
//       return this.getCurrentUser();
//     } catch (error) {
//       console.error("Login failed:", error);
//       throw new Error("Login failed.");
//     }
//   }

//   public async signUp(user: User): Promise<User | null> {
//     try {
//       await axios.post('/api/auth/register', user);
//       return this.signIn(user.email, user.password);
//     } catch (error) {
//       console.error("Registration failed:", error);
//       throw new Error("Registration failed.");
//     }
//   }

//   public isUserLoggedIn(): boolean {
//     return !!localStorage.getItem('jwtToken');
//   }

//   public logout(): void {
//     localStorage.removeItem('jwtToken');
//   }

//   public async getCurrentUser(): Promise<User | null> {
//     const token = localStorage.getItem('jwtToken');
//     if (!token) return null;

//     try {
//       const response = await axios.get('/api/currentUser', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return response.data.user as User;
//     } catch (error) {
//       console.error("Error fetching current user:", error);
//       return null;
//     }
//   }
// }
