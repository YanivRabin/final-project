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

