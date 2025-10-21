// Meal Planner.js - Meal planning algorithm for multi-family members
class MealPlanner {
    constructor(recipeDatabase) {
        this.recipeDB = recipeDatabase;
        this.DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.MEAL_TIMES = ['breakfast', 'lunch', 'dinner', 'snack'];
        this.MEAL_CALORIE_SPLIT = {
            breakfast: 0.25,
            lunch: 0.35,
            dinner: 0.30,
            snack: 0.10
        };
    }

    // Main meal planning function
    generateWeeklyPlan(familyMembers) {
        const weekPlan = {};
        
        this.DAYS_OF_WEEK.forEach(day => {
            weekPlan[day] = {
                breakfast: this.selectMealForFamily(familyMembers, 'breakfast'),
                lunch: this.selectMealForFamily(familyMembers, 'lunch'),
                dinner: this.selectMealForFamily(familyMembers, 'dinner'),
                snack: this.selectMealForFamily(familyMembers, 'snack')
            };
        });

        return this.balanceVariety(weekPlan);
    }

    // Select a meal that works for the whole family
    selectMealForFamily(familyMembers, mealType) {
        // Get dietary restrictions from all family members
        const restrictions = this.aggregateDietaryRestrictions(familyMembers);
        
        // Calculate average macro needs for this meal time
        const targetMacros = this.calculateFamilyMealTarget(familyMembers, mealType);
        
        // Get compatible recipes
        let candidates = this.recipeDB.filterByMealType(mealType);
        
        // Apply dietary restrictions
        candidates = this.filterByRestrictions(candidates, restrictions);
        
        // Score recipes based on how well they fit family needs
        const scoredRecipes = candidates.map(recipe => ({
            recipe,
            score: this.scoreRecipeForFamily(recipe, familyMembers, mealType)
        }));
        
        // Sort by score and pick best option
        scoredRecipes.sort((a, b) => b.score - a.score);
        
        if (scoredRecipes.length === 0) {
            console.warn(`No suitable recipes found for ${mealType}`);
            return null;
        }
        
        const selectedRecipe = scoredRecipes[0].recipe;
        
        // Calculate portions for each family member
        const portions = this.calculatePortions(selectedRecipe, familyMembers, mealType);
        
        return {
            recipe: selectedRecipe,
            portions,
            mealType
        };
    }

    // Aggregate dietary restrictions from all family members
    aggregateDietaryRestrictions(familyMembers) {
        const restrictions = {
            vegetarian: false,
            vegan: false,
            glutenFree: false,
            dairyFree: false,
            allergens: [],
            proteinExclusions: [],
            kidDislikes: [],
            spiceLevels: []
        };

        familyMembers.forEach(member => {
            if (member.dietaryPreferences) {
                if (member.dietaryPreferences.includes('vegetarian')) {
                    restrictions.vegetarian = true;
                }
                if (member.dietaryPreferences.includes('vegan')) {
                    restrictions.vegan = true;
                }
                if (member.dietaryPreferences.includes('gluten-free')) {
                    restrictions.glutenFree = true;
                }
                if (member.dietaryPreferences.includes('dairy-free')) {
                    restrictions.dairyFree = true;
                }
            }
            
            if (member.allergens && member.allergens.length > 0) {
                restrictions.allergens.push(...member.allergens);
            }
            
            // Protein exclusions
            if (member.proteinExclusions && member.proteinExclusions.length > 0) {
                restrictions.proteinExclusions.push(...member.proteinExclusions);
            }
            
            // Kid dislikes
            if (member.kidDislikes && member.kidDislikes.length > 0) {
                restrictions.kidDislikes.push(...member.kidDislikes);
            }
            
            // Track spice levels (use most restrictive)
            if (member.spiceLevel) {
                restrictions.spiceLevels.push(member.spiceLevel);
            }
        });
        
        // Remove duplicates
        restrictions.allergens = [...new Set(restrictions.allergens)];
        restrictions.proteinExclusions = [...new Set(restrictions.proteinExclusions)];
        restrictions.kidDislikes = [...new Set(restrictions.kidDislikes)];

        return restrictions;
    }

    // Filter recipes by dietary restrictions
    filterByRestrictions(recipes, restrictions) {
        return recipes.filter(recipe => {
            // If anyone is vegetarian, only show vegetarian recipes
            if (restrictions.vegetarian && !recipe.tags.includes('vegetarian')) {
                return false;
            }
            
            // If anyone is vegan, only show vegan recipes
            if (restrictions.vegan && !recipe.tags.includes('vegan')) {
                return false;
            }
            
            // If anyone needs gluten-free, only show gluten-free recipes
            if (restrictions.glutenFree && !recipe.tags.includes('gluten-free')) {
                return false;
            }
            
            // Check for allergens
            if (restrictions.allergens.length > 0) {
                const recipeIngredients = recipe.ingredients.map(i => i.name.toLowerCase());
                const hasAllergen = restrictions.allergens.some(allergen => 
                    recipeIngredients.some(ing => ing.includes(allergen.toLowerCase()))
                );
                if (hasAllergen) return false;
            }
            
            // Check protein exclusions
            if (restrictions.proteinExclusions.length > 0) {
                const recipeIngredients = recipe.ingredients.map(i => i.name.toLowerCase());
                const hasExcludedProtein = restrictions.proteinExclusions.some(protein => 
                    recipeIngredients.some(ing => ing.includes(protein.toLowerCase()))
                );
                if (hasExcludedProtein) return false;
            }
            
            // Check kid dislikes
            if (restrictions.kidDislikes.length > 0) {
                const recipeIngredients = recipe.ingredients.map(i => i.name.toLowerCase());
                const hasDislikedIngredient = restrictions.kidDislikes.some(dislike => 
                    recipeIngredients.some(ing => ing.includes(dislike.toLowerCase()))
                );
                if (hasDislikedIngredient) return false;
            }
            
            // Check spice level (use most restrictive)
            if (restrictions.spiceLevels.includes('mild') && recipe.tags && recipe.tags.includes('spicy')) {
                return false;
            }
            
            return true;
        });
    }

    // Calculate target macros for a family meal
    calculateFamilyMealTarget(familyMembers, mealType) {
        const calorySplit = this.MEAL_CALORIE_SPLIT[mealType] || 0.3;
        
        const totalTarget = familyMembers.reduce((acc, member) => ({
            calories: acc.calories + (member.macros.calories * calorySplit),
            protein: acc.protein + (member.macros.protein * calorySplit),
            carbs: acc.carbs + (member.macros.carbs * calorySplit),
            fat: acc.fat + (member.macros.fat * calorySplit)
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
        
        // Average per person
        return {
            calories: Math.round(totalTarget.calories / familyMembers.length),
            protein: Math.round(totalTarget.protein / familyMembers.length),
            carbs: Math.round(totalTarget.carbs / familyMembers.length),
            fat: Math.round(totalTarget.fat / familyMembers.length)
        };
    }

    // Score a recipe based on how well it fits family needs
    scoreRecipeForFamily(recipe, familyMembers, mealType) {
        let score = 100;
        
        const recipeNutrition = this.recipeDB.calculateNutritionPerServing(recipe);
        const targetMacros = this.calculateFamilyMealTarget(familyMembers, mealType);
        
        // Macro matching (higher is better)
        const calorieDiff = Math.abs(recipeNutrition.calories - targetMacros.calories) / targetMacros.calories;
        const proteinDiff = Math.abs(recipeNutrition.protein - targetMacros.protein) / targetMacros.protein;
        
        score -= (calorieDiff * 30); // Penalize calorie mismatch
        score -= (proteinDiff * 30); // Penalize protein mismatch
        
        // Preference matching
        familyMembers.forEach(member => {
            if (member.cuisinePreferences && member.cuisinePreferences.includes(recipe.cuisine)) {
                score += 10;
            }
            
            // Protein preference matching
            if (member.proteinPreferences && member.proteinPreferences.length > 0) {
                const recipeIngredients = recipe.ingredients.map(i => i.name.toLowerCase());
                const hasPreferredProtein = member.proteinPreferences.some(protein => 
                    recipeIngredients.some(ing => ing.includes(protein.toLowerCase()))
                );
                if (hasPreferredProtein) {
                    score += 15;
                }
            }
            
            // Kid-friendly bonus
            if (member.age && member.age < 13 && recipe.tags.includes('kid-friendly')) {
                score += 15;
            }
            
            // Kid dislikes penalty already handled in filtering
            
            // High protein preference
            if (member.macroSplit === 'highProtein' && recipe.tags.includes('high-protein')) {
                score += 10;
            }
            
            // Low carb preference
            if (member.macroSplit === 'lowCarb' && recipe.tags.includes('low-carb')) {
                score += 10;
            }
            
            // Spice level match
            if (member.spiceLevel === 'mild' && recipe.tags && !recipe.tags.includes('spicy')) {
                score += 5;
            }
        });
        
        // Difficulty penalty for busy families
        if (recipe.difficulty === 'hard') {
            score -= 10;
        } else if (recipe.difficulty === 'easy') {
            score += 5;
        }
        
        // Quick meal bonus for breakfast and lunch
        if ((mealType === 'breakfast' || mealType === 'lunch') && recipe.tags.includes('quick')) {
            score += 10;
        }
        
        return Math.max(0, score);
    }

    // Calculate portions for each family member
    calculatePortions(recipe, familyMembers, mealType) {
        const recipeNutrition = this.recipeDB.calculateNutritionPerServing(recipe);
        const calorySplit = this.MEAL_CALORIE_SPLIT[mealType] || 0.3;
        
        const portions = {};
        
        familyMembers.forEach(member => {
            const memberTargetCalories = member.macros.calories * calorySplit;
            const basePortion = memberTargetCalories / recipeNutrition.calories;
            
            // Adjust based on macro preferences
            let adjustedPortion = basePortion;
            
            // Round to reasonable serving sizes
            if (adjustedPortion < 0.5) {
                adjustedPortion = 0.5;
            } else if (adjustedPortion < 1) {
                adjustedPortion = Math.round(adjustedPortion * 4) / 4; // Quarter servings
            } else {
                adjustedPortion = Math.round(adjustedPortion * 2) / 2; // Half servings
            }
            
            portions[member.id] = {
                servings: adjustedPortion,
                calories: Math.round(recipeNutrition.calories * adjustedPortion),
                protein: Math.round(recipeNutrition.protein * adjustedPortion),
                carbs: Math.round(recipeNutrition.carbs * adjustedPortion),
                fat: Math.round(recipeNutrition.fat * adjustedPortion)
            };
        });
        
        return portions;
    }

    // Balance variety - avoid repeating recipes
    balanceVariety(weekPlan) {
        const usedRecipes = new Set();
        const alternativeRecipes = {};
        
        this.DAYS_OF_WEEK.forEach((day, dayIndex) => {
            this.MEAL_TIMES.forEach(mealType => {
                const meal = weekPlan[day][mealType];
                if (!meal || !meal.recipe) return;
                
                const recipeId = meal.recipe.id;
                
                // Check if recipe was used in previous day
                if (dayIndex > 0) {
                    const prevDay = this.DAYS_OF_WEEK[dayIndex - 1];
                    const prevMeal = weekPlan[prevDay][mealType];
                    
                    if (prevMeal && prevMeal.recipe && prevMeal.recipe.id === recipeId) {
                        // Try to find an alternative
                        const alternatives = this.recipeDB.filterByMealType(mealType)
                            .filter(r => r.id !== recipeId && !usedRecipes.has(r.id));
                        
                        if (alternatives.length > 0) {
                            // Pick a random alternative
                            const altRecipe = alternatives[Math.floor(Math.random() * alternatives.length)];
                            meal.recipe = altRecipe;
                            
                            // Recalculate portions
                            const familyMembers = Object.keys(meal.portions).map(id => ({
                                id,
                                macros: meal.portions[id]
                            }));
                        }
                    }
                }
                
                usedRecipes.add(meal.recipe.id);
            });
        });
        
        return weekPlan;
    }

    // Swap a single meal with an alternative
    swapMeal(currentMeal, familyMembers) {
        const alternatives = this.recipeDB.filterByMealType(currentMeal.mealType)
            .filter(r => r.id !== currentMeal.recipe.id);
        
        if (alternatives.length === 0) {
            return null;
        }
        
        // Score alternatives
        const scoredAlternatives = alternatives.map(recipe => ({
            recipe,
            score: this.scoreRecipeForFamily(recipe, familyMembers, currentMeal.mealType)
        }));
        
        scoredAlternatives.sort((a, b) => b.score - a.score);
        
        // Return top 3 alternatives
        return scoredAlternatives.slice(0, 3).map(alt => ({
            recipe: alt.recipe,
            portions: this.calculatePortions(alt.recipe, familyMembers, currentMeal.mealType),
            mealType: currentMeal.mealType,
            score: alt.score
        }));
    }

    // Get daily summary for a family member
    getDailySummaryForMember(dayPlan, memberId) {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;
        
        this.MEAL_TIMES.forEach(mealType => {
            const meal = dayPlan[mealType];
            if (meal && meal.portions && meal.portions[memberId]) {
                const portion = meal.portions[memberId];
                totalCalories += portion.calories;
                totalProtein += portion.protein;
                totalCarbs += portion.carbs;
                totalFat += portion.fat;
            }
        });
        
        return {
            calories: Math.round(totalCalories),
            protein: Math.round(totalProtein),
            carbs: Math.round(totalCarbs),
            fat: Math.round(totalFat)
        };
    }
}

// Export meal planner instance
const mealPlanner = new MealPlanner(recipeDB);

