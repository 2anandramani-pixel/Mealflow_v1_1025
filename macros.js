// Macros.js - Macro calculation algorithms
class MacroCalculator {
    constructor() {
        this.ACTIVITY_MULTIPLIERS = {
            sedentary: 1.2,      // Little or no exercise
            light: 1.375,        // Light exercise 1-3 days/week
            moderate: 1.55,      // Moderate exercise 3-5 days/week
            active: 1.725,       // Hard exercise 6-7 days/week
            veryActive: 1.9      // Very hard exercise & physical job
        };

        this.GOAL_ADJUSTMENTS = {
            weightLoss: -500,    // 500 cal deficit
            maintenance: 0,
            weightGain: 500,     // 500 cal surplus
            muscleGain: 300      // Slight surplus for lean mass
        };

        this.MACRO_SPLITS = {
            balanced: { protein: 30, carbs: 40, fat: 30 },
            highProtein: { protein: 40, carbs: 30, fat: 30 },
            lowCarb: { protein: 35, carbs: 25, fat: 40 },
            lowFat: { protein: 30, carbs: 50, fat: 20 },
            keto: { protein: 25, carbs: 5, fat: 70 }
        };
    }

    // Mifflin-St Jeor Equation for BMR
    calculateBMR(weight, height, age, gender) {
        // weight in kg, height in cm
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        return Math.round(bmr);
    }

    // Total Daily Energy Expenditure
    calculateTDEE(bmr, activityLevel) {
        const multiplier = this.ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
        return Math.round(bmr * multiplier);
    }

    // Adjust calories based on goal
    adjustForGoal(tdee, goal) {
        const adjustment = this.GOAL_ADJUSTMENTS[goal] || 0;
        return Math.round(tdee + adjustment);
    }

    // Calculate macros from calories
    calculateMacros(calories, macroSplit = 'balanced') {
        const split = this.MACRO_SPLITS[macroSplit] || this.MACRO_SPLITS.balanced;
        
        const proteinCals = calories * (split.protein / 100);
        const carbsCals = calories * (split.carbs / 100);
        const fatCals = calories * (split.fat / 100);

        return {
            calories: Math.round(calories),
            protein: Math.round(proteinCals / 4),    // 4 cal per gram
            carbs: Math.round(carbsCals / 4),        // 4 cal per gram
            fat: Math.round(fatCals / 9)             // 9 cal per gram
        };
    }

    // Complete calculation for a family member
    calculateMemberMacros(member) {
        const { weight, height, age, gender, activityLevel, goal, macroSplit } = member;
        
        const bmr = this.calculateBMR(weight, height, age, gender);
        const tdee = this.calculateTDEE(bmr, activityLevel);
        const targetCalories = this.adjustForGoal(tdee, goal);
        const macros = this.calculateMacros(targetCalories, macroSplit);

        return {
            bmr,
            tdee,
            ...macros
        };
    }

    // Child-specific calculations (simplified)
    calculateChildMacros(age, weight, activityLevel = 'moderate') {
        // Simplified formula for children
        let baseCalories;
        
        if (age <= 3) {
            baseCalories = 1000 + (100 * (age - 1));
        } else if (age <= 8) {
            baseCalories = 1200 + (100 * (age - 3));
        } else if (age <= 13) {
            baseCalories = 1600 + (100 * (age - 8));
        } else {
            baseCalories = 2000 + (100 * (age - 13));
        }

        const multiplier = this.ACTIVITY_MULTIPLIERS[activityLevel] || 1.375;
        const targetCalories = Math.round(baseCalories * multiplier);

        // Children need balanced macros for growth
        return this.calculateMacros(targetCalories, 'balanced');
    }

    // Calculate recommended water intake (ml)
    calculateWaterIntake(weight) {
        // 30-35 ml per kg of body weight
        return Math.round(weight * 33);
    }

    // Calculate protein needs for muscle building (alternative method)
    calculateProteinForMuscle(weight) {
        // 1.6-2.2g per kg for muscle building
        return {
            min: Math.round(weight * 1.6),
            max: Math.round(weight * 2.2)
        };
    }

    // Validate macro targets
    validateMacros(macros) {
        const totalCals = (macros.protein * 4) + (macros.carbs * 4) + (macros.fat * 9);
        const difference = Math.abs(totalCals - macros.calories);
        
        return {
            valid: difference < 50, // Allow 50 cal margin
            difference,
            totalFromMacros: totalCals
        };
    }
}

// Export singleton instance
const macroCalculator = new MacroCalculator();

