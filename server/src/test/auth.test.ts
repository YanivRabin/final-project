import { AuthModel } from '../model/AuthModel';

describe('AuthModel', () => {
  let authModel: AuthModel;

  beforeEach(() => {
    authModel = AuthModel.getInstance();
  });

  afterEach(() => {
    // Clear user authentication state after each test
    authModel.logout();
  });

  it('should sign up a user successfully', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john2@example.com',
      password: 'password123',
      gender: 'male',
      age: 25,
      height: 180,
      weight: 75,
      workoutGoals: 'Build muscle',
      daysPerWeek: 3,
      minutesPerWorkout: 60,
      workoutLocation: 'Gym',
      includeWarmup: true,
      includeStreching: true,
      dietaryRestrictions: {
        vegan: false,
        vegetarian: false,
        pescatarian: false,
        glutenFree: false,
        dairyFree: false,
        nutFree: false,
        soyFree: false,
        eggFree: false,
        shellfishFree: false,
        lactoseFree: false,
        kosher: false,
        halal: false,
        other: ''
      }
    };

    // Sign up the user
    await authModel.signUp(testUser);

    // Ensure the user is signed up
    expect(authModel.isUserLoggedIn()).toBe(true);
  });

  it('should sign in a user successfully', async () => {
    const testUser = {
      email: 'john@example.com',
      password: 'password123',
    };

    // Sign in the user
    await authModel.signIn(testUser.email, testUser.password);

    // Ensure the user is signed in
    expect(authModel.isUserLoggedIn()).toBe(true);
  });
});
