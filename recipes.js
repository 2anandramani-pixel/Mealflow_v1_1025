// Recipes.js - Mock recipe database
const RECIPES_DB = [
    {
        id: 'rec001',
        name: 'Grilled Chicken Breast with Vegetables',
        cuisine: 'American',
        prepTime: 15,
        cookTime: 25,
        servings: 4,
        difficulty: 'easy',
        tags: ['high-protein', 'low-carb', 'gluten-free'],
        mealType: ['lunch', 'dinner'],
        ingredients: [
            { name: 'Chicken breast', quantity: 600, unit: 'g', calories: 660, protein: 124, carbs: 0, fat: 14, category: 'meat', aisle: 'meat' },
            { name: 'Broccoli', quantity: 400, unit: 'g', calories: 140, protein: 12, carbs: 28, fat: 1.6, category: 'produce', aisle: 'produce' },
            { name: 'Bell peppers', quantity: 200, unit: 'g', calories: 60, protein: 2, carbs: 12, fat: 0.6, category: 'produce', aisle: 'produce' },
            { name: 'Olive oil', quantity: 30, unit: 'ml', calories: 270, protein: 0, carbs: 0, fat: 30, category: 'pantry', aisle: 'oils' },
            { name: 'Garlic', quantity: 3, unit: 'cloves', calories: 15, protein: 0.6, carbs: 3, fat: 0, category: 'produce', aisle: 'produce' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Grilled+Chicken'
    },
    {
        id: 'rec002',
        name: 'Overnight Oats with Berries',
        cuisine: 'American',
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        difficulty: 'easy',
        tags: ['vegetarian', 'high-fiber', 'kid-friendly'],
        mealType: ['breakfast'],
        ingredients: [
            { name: 'Rolled oats', quantity: 100, unit: 'g', calories: 380, protein: 13, carbs: 66, fat: 7, category: 'pantry', aisle: 'grains' },
            { name: 'Greek yogurt', quantity: 200, unit: 'g', calories: 120, protein: 20, carbs: 8, fat: 0, category: 'dairy', aisle: 'dairy' },
            { name: 'Mixed berries', quantity: 150, unit: 'g', calories: 75, protein: 1.5, carbs: 18, fat: 0.5, category: 'produce', aisle: 'produce' },
            { name: 'Honey', quantity: 30, unit: 'g', calories: 90, protein: 0, carbs: 24, fat: 0, category: 'pantry', aisle: 'condiments' },
            { name: 'Almond milk', quantity: 250, unit: 'ml', calories: 40, protein: 1, carbs: 2, fat: 3, category: 'dairy', aisle: 'dairy' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Overnight+Oats'
    },
    {
        id: 'rec003',
        name: 'Vegetable Stir-Fry with Tofu',
        cuisine: 'Asian',
        prepTime: 20,
        cookTime: 15,
        servings: 4,
        difficulty: 'medium',
        tags: ['vegetarian', 'vegan', 'high-protein'],
        mealType: ['lunch', 'dinner'],
        ingredients: [
            { name: 'Firm tofu', quantity: 400, unit: 'g', calories: 320, protein: 36, carbs: 8, fat: 16, category: 'produce', aisle: 'produce' },
            { name: 'Mixed vegetables', quantity: 600, unit: 'g', calories: 240, protein: 12, carbs: 48, fat: 2.4, category: 'produce', aisle: 'produce' },
            { name: 'Soy sauce', quantity: 60, unit: 'ml', calories: 36, protein: 4, carbs: 4, fat: 0, category: 'asian', aisle: 'asian' },
            { name: 'Sesame oil', quantity: 20, unit: 'ml', calories: 180, protein: 0, carbs: 0, fat: 20, category: 'asian', aisle: 'asian' },
            { name: 'Ginger', quantity: 20, unit: 'g', calories: 16, protein: 0.4, carbs: 3.6, fat: 0.2, category: 'produce', aisle: 'produce' },
            { name: 'Garlic', quantity: 4, unit: 'cloves', calories: 20, protein: 0.8, carbs: 4, fat: 0, category: 'produce', aisle: 'produce' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Tofu+Stir-Fry'
    },
    {
        id: 'rec004',
        name: 'Salmon with Sweet Potato and Asparagus',
        cuisine: 'American',
        prepTime: 15,
        cookTime: 30,
        servings: 4,
        difficulty: 'medium',
        tags: ['high-protein', 'omega-3', 'gluten-free'],
        mealType: ['dinner'],
        ingredients: [
            { name: 'Salmon fillets', quantity: 600, unit: 'g', calories: 780, protein: 120, carbs: 0, fat: 30, category: 'meat', aisle: 'seafood' },
            { name: 'Sweet potato', quantity: 600, unit: 'g', calories: 516, protein: 6, carbs: 120, fat: 0.6, category: 'produce', aisle: 'produce' },
            { name: 'Asparagus', quantity: 400, unit: 'g', calories: 80, protein: 8.8, carbs: 16, fat: 0.8, category: 'produce', aisle: 'produce' },
            { name: 'Olive oil', quantity: 30, unit: 'ml', calories: 270, protein: 0, carbs: 0, fat: 30, category: 'pantry', aisle: 'oils' },
            { name: 'Lemon', quantity: 1, unit: 'whole', calories: 17, protein: 0.6, carbs: 5, fat: 0.2, category: 'produce', aisle: 'produce' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/ec4899/ffffff?text=Salmon+Dinner'
    },
    {
        id: 'rec005',
        name: 'Chicken Tikka Masala',
        cuisine: 'Indian',
        prepTime: 30,
        cookTime: 40,
        servings: 6,
        difficulty: 'medium',
        tags: ['high-protein', 'indian'],
        mealType: ['dinner'],
        ingredients: [
            { name: 'Chicken thighs', quantity: 800, unit: 'g', calories: 1600, protein: 144, carbs: 0, fat: 112, category: 'meat', aisle: 'meat' },
            { name: 'Yogurt', quantity: 200, unit: 'g', calories: 120, protein: 12, carbs: 16, fat: 2, category: 'dairy', aisle: 'dairy' },
            { name: 'Tomato sauce', quantity: 400, unit: 'g', calories: 120, protein: 4, carbs: 24, fat: 1.6, category: 'pantry', aisle: 'canned' },
            { name: 'Coconut cream', quantity: 200, unit: 'ml', calories: 400, protein: 4, carbs: 8, fat: 40, category: 'asian', aisle: 'asian' },
            { name: 'Garam masala', quantity: 20, unit: 'g', calories: 60, protein: 2, carbs: 12, fat: 2, category: 'indian', aisle: 'spices' },
            { name: 'Onion', quantity: 200, unit: 'g', calories: 80, protein: 2, carbs: 18, fat: 0.2, category: 'produce', aisle: 'produce' },
            { name: 'Ginger-garlic paste', quantity: 30, unit: 'g', calories: 30, protein: 1, carbs: 6, fat: 0.3, category: 'indian', aisle: 'spices' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/ef4444/ffffff?text=Tikka+Masala'
    },
    {
        id: 'rec006',
        name: 'Quinoa Buddha Bowl',
        cuisine: 'American',
        prepTime: 20,
        cookTime: 25,
        servings: 3,
        difficulty: 'easy',
        tags: ['vegetarian', 'high-fiber', 'gluten-free', 'kid-friendly'],
        mealType: ['lunch', 'dinner'],
        ingredients: [
            { name: 'Quinoa', quantity: 200, unit: 'g', calories: 720, protein: 24, carbs: 120, fat: 12, category: 'pantry', aisle: 'grains' },
            { name: 'Chickpeas', quantity: 300, unit: 'g', calories: 360, protein: 21, carbs: 60, fat: 6, category: 'pantry', aisle: 'canned' },
            { name: 'Avocado', quantity: 200, unit: 'g', calories: 320, protein: 4, carbs: 18, fat: 30, category: 'produce', aisle: 'produce' },
            { name: 'Cherry tomatoes', quantity: 200, unit: 'g', calories: 36, protein: 1.6, carbs: 8, fat: 0.4, category: 'produce', aisle: 'produce' },
            { name: 'Spinach', quantity: 100, unit: 'g', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: 'produce', aisle: 'produce' },
            { name: 'Tahini', quantity: 60, unit: 'g', calories: 360, protein: 10, carbs: 12, fat: 32, category: 'pantry', aisle: 'condiments' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Buddha+Bowl'
    },
    {
        id: 'rec007',
        name: 'Scrambled Eggs with Toast',
        cuisine: 'American',
        prepTime: 5,
        cookTime: 10,
        servings: 2,
        difficulty: 'easy',
        tags: ['high-protein', 'kid-friendly', 'quick'],
        mealType: ['breakfast'],
        ingredients: [
            { name: 'Eggs', quantity: 4, unit: 'whole', calories: 280, protein: 24, carbs: 2, fat: 20, category: 'dairy', aisle: 'dairy' },
            { name: 'Whole wheat bread', quantity: 4, unit: 'slices', calories: 280, protein: 12, carbs: 48, fat: 4, category: 'pantry', aisle: 'bakery' },
            { name: 'Butter', quantity: 20, unit: 'g', calories: 144, protein: 0.2, carbs: 0, fat: 16, category: 'dairy', aisle: 'dairy' },
            { name: 'Milk', quantity: 50, unit: 'ml', calories: 25, protein: 1.7, carbs: 2.5, fat: 1, category: 'dairy', aisle: 'dairy' },
            { name: 'Cheese', quantity: 40, unit: 'g', calories: 160, protein: 10, carbs: 1.6, fat: 13, category: 'dairy', aisle: 'dairy' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Scrambled+Eggs'
    },
    {
        id: 'rec008',
        name: 'Beef Tacos',
        cuisine: 'Mexican',
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        difficulty: 'easy',
        tags: ['high-protein', 'kid-friendly'],
        mealType: ['dinner'],
        ingredients: [
            { name: 'Ground beef', quantity: 500, unit: 'g', calories: 1000, protein: 100, carbs: 0, fat: 65, category: 'meat', aisle: 'meat' },
            { name: 'Taco shells', quantity: 12, unit: 'pieces', calories: 480, protein: 12, carbs: 72, fat: 18, category: 'pantry', aisle: 'international' },
            { name: 'Lettuce', quantity: 150, unit: 'g', calories: 22, protein: 1.5, carbs: 4.5, fat: 0.3, category: 'produce', aisle: 'produce' },
            { name: 'Tomato', quantity: 200, unit: 'g', calories: 36, protein: 1.8, carbs: 8, fat: 0.4, category: 'produce', aisle: 'produce' },
            { name: 'Shredded cheese', quantity: 100, unit: 'g', calories: 400, protein: 25, carbs: 4, fat: 32, category: 'dairy', aisle: 'dairy' },
            { name: 'Taco seasoning', quantity: 30, unit: 'g', calories: 60, protein: 2, carbs: 12, fat: 1, category: 'pantry', aisle: 'spices' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Beef+Tacos'
    },
    {
        id: 'rec009',
        name: 'Greek Salad with Grilled Chicken',
        cuisine: 'Mediterranean',
        prepTime: 20,
        cookTime: 15,
        servings: 3,
        difficulty: 'easy',
        tags: ['high-protein', 'low-carb', 'gluten-free'],
        mealType: ['lunch'],
        ingredients: [
            { name: 'Chicken breast', quantity: 450, unit: 'g', calories: 495, protein: 93, carbs: 0, fat: 10.5, category: 'meat', aisle: 'meat' },
            { name: 'Romaine lettuce', quantity: 300, unit: 'g', calories: 51, protein: 4.5, carbs: 9.9, fat: 0.9, category: 'produce', aisle: 'produce' },
            { name: 'Cucumber', quantity: 200, unit: 'g', calories: 30, protein: 1.3, carbs: 7.2, fat: 0.2, category: 'produce', aisle: 'produce' },
            { name: 'Feta cheese', quantity: 100, unit: 'g', calories: 264, protein: 14, carbs: 4, fat: 21, category: 'dairy', aisle: 'dairy' },
            { name: 'Kalamata olives', quantity: 60, unit: 'g', calories: 72, protein: 0.5, carbs: 3.6, fat: 6.6, category: 'pantry', aisle: 'condiments' },
            { name: 'Olive oil', quantity: 40, unit: 'ml', calories: 360, protein: 0, carbs: 0, fat: 40, category: 'pantry', aisle: 'oils' },
            { name: 'Lemon juice', quantity: 30, unit: 'ml', calories: 6, protein: 0.1, carbs: 1.8, fat: 0, category: 'produce', aisle: 'produce' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Greek+Salad'
    },
    {
        id: 'rec010',
        name: 'Protein Smoothie Bowl',
        cuisine: 'American',
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        difficulty: 'easy',
        tags: ['high-protein', 'vegetarian', 'kid-friendly', 'quick'],
        mealType: ['breakfast', 'snack'],
        ingredients: [
            { name: 'Protein powder', quantity: 60, unit: 'g', calories: 240, protein: 48, carbs: 6, fat: 3, category: 'pantry', aisle: 'health' },
            { name: 'Banana', quantity: 200, unit: 'g', calories: 178, protein: 2.2, carbs: 46, fat: 0.7, category: 'produce', aisle: 'produce' },
            { name: 'Frozen berries', quantity: 150, unit: 'g', calories: 75, protein: 1.5, carbs: 18, fat: 0.5, category: 'frozen', aisle: 'frozen' },
            { name: 'Almond milk', quantity: 300, unit: 'ml', calories: 48, protein: 1.2, carbs: 2.4, fat: 3.6, category: 'dairy', aisle: 'dairy' },
            { name: 'Granola', quantity: 60, unit: 'g', calories: 270, protein: 6, carbs: 42, fat: 9, category: 'pantry', aisle: 'grains' },
            { name: 'Chia seeds', quantity: 20, unit: 'g', calories: 97, protein: 3.3, carbs: 8.4, fat: 6.1, category: 'pantry', aisle: 'health' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/ec4899/ffffff?text=Smoothie+Bowl'
    },
    {
        id: 'rec011',
        name: 'Pasta Primavera',
        cuisine: 'Italian',
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        difficulty: 'easy',
        tags: ['vegetarian', 'kid-friendly'],
        mealType: ['dinner'],
        ingredients: [
            { name: 'Whole wheat pasta', quantity: 400, unit: 'g', calories: 1360, protein: 52, carbs: 280, fat: 8, category: 'pantry', aisle: 'pasta' },
            { name: 'Mixed vegetables', quantity: 500, unit: 'g', calories: 200, protein: 10, carbs: 40, fat: 2, category: 'frozen', aisle: 'frozen' },
            { name: 'Olive oil', quantity: 40, unit: 'ml', calories: 360, protein: 0, carbs: 0, fat: 40, category: 'pantry', aisle: 'oils' },
            { name: 'Parmesan cheese', quantity: 60, unit: 'g', calories: 240, protein: 21, carbs: 3, fat: 16, category: 'dairy', aisle: 'dairy' },
            { name: 'Garlic', quantity: 4, unit: 'cloves', calories: 20, protein: 0.8, carbs: 4, fat: 0, category: 'produce', aisle: 'produce' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Pasta+Primavera'
    },
    {
        id: 'rec012',
        name: 'Turkey Chili',
        cuisine: 'American',
        prepTime: 15,
        cookTime: 45,
        servings: 6,
        difficulty: 'easy',
        tags: ['high-protein', 'high-fiber'],
        mealType: ['dinner'],
        ingredients: [
            { name: 'Ground turkey', quantity: 600, unit: 'g', calories: 900, protein: 120, carbs: 0, fat: 45, category: 'meat', aisle: 'meat' },
            { name: 'Kidney beans', quantity: 400, unit: 'g', calories: 480, protein: 28, carbs: 80, fat: 2, category: 'pantry', aisle: 'canned' },
            { name: 'Tomatoes (canned)', quantity: 800, unit: 'g', calories: 240, protein: 8, carbs: 48, fat: 3.2, category: 'pantry', aisle: 'canned' },
            { name: 'Onion', quantity: 200, unit: 'g', calories: 80, protein: 2, carbs: 18, fat: 0.2, category: 'produce', aisle: 'produce' },
            { name: 'Bell peppers', quantity: 200, unit: 'g', calories: 60, protein: 2, carbs: 12, fat: 0.6, category: 'produce', aisle: 'produce' },
            { name: 'Chili powder', quantity: 20, unit: 'g', calories: 60, protein: 2, carbs: 12, fat: 2, category: 'pantry', aisle: 'spices' }
        ],
        imageUrl: 'https://via.placeholder.com/400x300/ef4444/ffffff?text=Turkey+Chili'
    }
];

// Helper class for recipe operations
class RecipeDatabase {
    constructor(recipes) {
        this.recipes = recipes;
    }

    getAllRecipes() {
        return this.recipes;
    }

    getRecipeById(id) {
        return this.recipes.find(r => r.id === id);
    }

    filterByTags(tags) {
        return this.recipes.filter(recipe => 
            tags.every(tag => recipe.tags.includes(tag))
        );
    }

    filterByMealType(mealType) {
        return this.recipes.filter(recipe => 
            recipe.mealType.includes(mealType)
        );
    }

    filterByCuisine(cuisine) {
        return this.recipes.filter(recipe => 
            recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
        );
    }

    searchRecipes(query) {
        const lowerQuery = query.toLowerCase();
        return this.recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(lowerQuery) ||
            recipe.cuisine.toLowerCase().includes(lowerQuery) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }

    filterByDietaryRestrictions(restrictions) {
        return this.recipes.filter(recipe => {
            if (restrictions.vegetarian && !recipe.tags.includes('vegetarian')) {
                return false;
            }
            if (restrictions.vegan && !recipe.tags.includes('vegan')) {
                return false;
            }
            if (restrictions.glutenFree && !recipe.tags.includes('gluten-free')) {
                return false;
            }
            // Add more restrictions as needed
            return true;
        });
    }

    // Calculate nutrition per serving
    calculateNutritionPerServing(recipe) {
        const totals = recipe.ingredients.reduce((acc, ing) => ({
            calories: acc.calories + ing.calories,
            protein: acc.protein + ing.protein,
            carbs: acc.carbs + ing.carbs,
            fat: acc.fat + ing.fat
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

        return {
            calories: Math.round(totals.calories / recipe.servings),
            protein: Math.round(totals.protein / recipe.servings),
            carbs: Math.round(totals.carbs / recipe.servings),
            fat: Math.round(totals.fat / recipe.servings)
        };
    }

    // Get recipes that fit macro targets
    getRecipesForMacroTarget(mealType, targetMacros, tolerance = 0.2) {
        const candidates = this.filterByMealType(mealType);
        
        return candidates.filter(recipe => {
            const nutrition = this.calculateNutritionPerServing(recipe);
            
            const calorieMatch = Math.abs(nutrition.calories - targetMacros.calories) / targetMacros.calories <= tolerance;
            const proteinMatch = Math.abs(nutrition.protein - targetMacros.protein) / targetMacros.protein <= tolerance;
            
            return calorieMatch && proteinMatch;
        }).map(recipe => ({
            ...recipe,
            nutritionPerServing: this.calculateNutritionPerServing(recipe)
        }));
    }
}

// Export recipe database instance
const recipeDB = new RecipeDatabase(RECIPES_DB);

