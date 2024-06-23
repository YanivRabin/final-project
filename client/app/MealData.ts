export const mealData = {
  breakfast: [
    {
      option: "Option 1",
      items: [
        { name: "Oatmeal", carbs: 60, fats: 5, proteins: 5, amount: "100g" },
        { name: "Greek Yogurt", carbs: 5, fats: 3, proteins: 10, amount: "150g" },
        { name: "Mixed Nuts", carbs: 3, fats: 15, proteins: 5, amount: "30g" },
      ],
    },
    {
      option: "Option 2",
      items: [
        { name: "Scrambled Eggs", carbs: 1, fats: 10, proteins: 18, amount: "150g" },
        { name: "Whole Wheat Toast", carbs: 20, fats: 1, proteins: 2, amount: "50g" },
        { name: "Avocado", carbs: 9, fats: 23, proteins: 2, amount: "50g" },
      ],
    },
  ],
  lunch: [
    {
      option: "Option 1",
      items: [
        { name: "Grilled Chicken Breast", carbs: 0, fats: 5, proteins: 30, amount: "150g" },
        { name: "Brown Rice", carbs: 45, fats: 0.5, proteins: 3, amount: "100g" },
        { name: "Broccoli", carbs: 7, fats: 0.5, proteins: 3, amount: "100g" },
        { name: "Sweet Potato", carbs: 25, fats: 0.5, proteins: 2, amount: "100g" },
      ],
    },
  ],
  dinner: [
    {
      option: "Option 1",
      items: [
        { name: "Salmon", carbs: 0, fats: 15, proteins: 20, amount: "150g" },
        { name: "Quinoa", carbs: 45, fats: 2, proteins: 4, amount: "100g" },
        { name: "Asparagus", carbs: 5, fats: 0.5, proteins: 3, amount: "100g" },
      ],
    },
  ],
};

export const weeklyPlan = {
  Monday: {
    breakfast: mealData.breakfast[0],
    lunch: mealData.lunch[0],
    dinner: mealData.dinner[0],
  },
  Tuesday: {
    breakfast: mealData.breakfast[1],
    lunch: mealData.lunch[0],
    dinner: mealData.dinner[0],
  },
  // Add the rest of the week similarly...
};
