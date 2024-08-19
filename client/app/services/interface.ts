export interface Exercise {
  name: string;
  description: string;
  reps: string;
  sets: string;
}

export interface WorkoutDetails {
  muscleGroup: string;
  duration: string;
  exercise: Exercise[];
}

export interface WorkoutCardProps {
  day: string;
  exercises: WorkoutDetails;
}
export interface Ingredient {
  name: string;
  carbohydrates: string;
  fats: string;
  proteins: string;
  amount: string;
}

export interface Meal {
  name: string;
  ingredients: Ingredient[];
}

export interface MealCardProps {
  mealType: string;
  meals: Meal[];
}

export interface DietaryRestrictions {
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
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  workoutGoals: string;
  daysPerWeek: number;
  minutesPerWorkout: number;
  workoutLocation: string;
  includeWarmup: boolean;
  includeStretching: boolean;
  dietaryRestrictions: DietaryRestrictions;
}

// Alias for MainUser to resolve import issue
export type MainUser = User;