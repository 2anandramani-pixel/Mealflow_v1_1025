// Shopping.js - Shopping list generation and categorization
class ShoppingListGenerator {
    constructor() {
        this.STORE_CATEGORIES = {
            costco: {
                name: 'Costco',
                categories: ['meat', 'frozen', 'dairy', 'pantry', 'produce'],
                bulkItems: true
            },
            safeway: {
                name: 'Safeway',
                categories: ['produce', 'dairy', 'meat', 'pantry', 'frozen', 'bakery'],
                bulkItems: false
            },
            asian: {
                name: 'Asian Market',
                categories: ['asian', 'produce'],
                bulkItems: false
            },
            indian: {
                name: 'Indian Grocery',
                categories: ['indian', 'produce'],
                bulkItems: false
            }
        };

        this.AISLE_MAPPING = {
            produce: ['Fruits', 'Vegetables', 'Herbs'],
            meat: ['Meat Counter', 'Poultry', 'Seafood'],
            dairy: ['Dairy', 'Eggs', 'Cheese'],
            frozen: ['Frozen Foods'],
            pantry: ['Dry Goods', 'Canned Foods', 'Condiments'],
            bakery: ['Bakery', 'Bread'],
            asian: ['Asian Foods', 'Sauces', 'Noodles'],
            indian: ['Spices', 'Lentils', 'Indian Foods'],
            grains: ['Grains', 'Rice', 'Pasta'],
            oils: ['Oils & Vinegars'],
            spices: ['Spices & Seasonings'],
            canned: ['Canned Goods'],
            health: ['Health & Supplements'],
            condiments: ['Condiments & Sauces']
        };

        this.BULK_ELIGIBLE_ITEMS = [
            'chicken', 'beef', 'rice', 'oats', 'quinoa', 'pasta',
            'yogurt', 'cheese', 'eggs', 'oil', 'frozen'
        ];

        this.PRICE_ESTIMATES = {
            // Prices per 100g or 100ml for estimation
            'chicken breast': 0.80,
            'ground beef': 0.90,
            'ground turkey': 0.85,
            'salmon': 2.00,
            'eggs': 0.30,
            'yogurt': 0.15,
            'cheese': 1.20,
            'milk': 0.12,
            'rice': 0.20,
            'pasta': 0.25,
            'bread': 0.40,
            'olive oil': 0.60,
            'vegetables': 0.30,
            'fruits': 0.40,
            'tofu': 0.50,
            'beans': 0.15,
            'quinoa': 0.60
        };
    }

    // Generate shopping list from meal plan
    generateShoppingList(weekPlan, familyMembers) {
        // Aggregate all ingredients
        const aggregatedIngredients = this.aggregateIngredients(weekPlan);
        
        // Categorize by store
        const categorizedList = this.categorizeByStore(aggregatedIngredients);
        
        // Organize within stores by aisle
        const organizedList = this.organizeByAisle(categorizedList);
        
        // Calculate estimated cost
        const totalCost = this.calculateTotalCost(aggregatedIngredients);
        
        // Add metadata
        return {
            items: organizedList,
            totalCost: Math.round(totalCost * 100) / 100,
            itemCount: Object.values(aggregatedIngredients).length,
            familyMembers: familyMembers.map(m => ({ id: m.id, name: m.name })),
            generatedAt: new Date().toISOString(),
            checked: {}
        };
    }

    // Aggregate ingredients from all meals
    aggregateIngredients(weekPlan) {
        const ingredients = {};
        
        Object.values(weekPlan).forEach(dayPlan => {
            Object.values(dayPlan).forEach(meal => {
                if (!meal || !meal.recipe) return;
                
                meal.recipe.ingredients.forEach(ingredient => {
                    const key = ingredient.name.toLowerCase();
                    
                    if (!ingredients[key]) {
                        ingredients[key] = {
                            name: ingredient.name,
                            totalQuantity: 0,
                            unit: ingredient.unit,
                            category: ingredient.category,
                            aisle: ingredient.aisle,
                            usedIn: [],
                            familyMembers: new Set()
                        };
                    }
                    
                    // Calculate total quantity needed across all portions
                    const totalServings = Object.values(meal.portions).reduce(
                        (sum, portion) => sum + portion.servings, 0
                    );
                    
                    const quantityPerServing = ingredient.quantity / meal.recipe.servings;
                    const totalQuantity = quantityPerServing * totalServings;
                    
                    ingredients[key].totalQuantity += totalQuantity;
                    ingredients[key].usedIn.push(meal.recipe.name);
                    
                    // Track which family members need this
                    Object.keys(meal.portions).forEach(memberId => {
                        ingredients[key].familyMembers.add(memberId);
                    });
                });
            });
        });
        
        // Convert Sets to Arrays
        Object.values(ingredients).forEach(ing => {
            ing.familyMembers = Array.from(ing.familyMembers);
        });
        
        return ingredients;
    }

    // Categorize ingredients by store
    categorizeByStore(ingredients) {
        const storeList = {};
        
        Object.values(ingredients).forEach(ingredient => {
            const store = this.determineOptimalStore(ingredient);
            
            if (!storeList[store]) {
                storeList[store] = [];
            }
            
            storeList[store].push(ingredient);
        });
        
        return storeList;
    }

    // Determine optimal store for an ingredient
    determineOptimalStore(ingredient) {
        const category = ingredient.category;
        
        // Special categories go to specific stores
        if (category === 'asian') return 'asian';
        if (category === 'indian') return 'indian';
        
        // Check if bulk purchase makes sense
        if (this.shouldBuyInBulk(ingredient)) {
            return 'costco';
        }
        
        // Default to Safeway
        return 'safeway';
    }

    // Determine if item should be bought in bulk
    shouldBuyInBulk(ingredient) {
        const itemName = ingredient.name.toLowerCase();
        const quantity = ingredient.totalQuantity;
        
        // Check if item is bulk-eligible
        const isBulkEligible = this.BULK_ELIGIBLE_ITEMS.some(bulkItem => 
            itemName.includes(bulkItem)
        );
        
        // Buy in bulk if quantity is high enough
        if (isBulkEligible && quantity > 500) {
            return true;
        }
        
        return false;
    }

    // Organize ingredients within each store by aisle
    organizeByAisle(storeList) {
        const organized = {};
        
        Object.entries(storeList).forEach(([store, ingredients]) => {
            organized[store] = {};
            
            ingredients.forEach(ingredient => {
                const aisle = this.getAisleName(ingredient.aisle || ingredient.category);
                
                if (!organized[store][aisle]) {
                    organized[store][aisle] = [];
                }
                
                organized[store][aisle].push({
                    id: this.generateId(),
                    name: ingredient.name,
                    quantity: this.formatQuantity(ingredient.totalQuantity, ingredient.unit),
                    unit: ingredient.unit,
                    estimatedCost: this.estimateItemCost(ingredient),
                    usedIn: [...new Set(ingredient.usedIn)], // Remove duplicates
                    familyMembers: ingredient.familyMembers,
                    checked: false
                });
            });
        });
        
        return organized;
    }

    // Get aisle name from category
    getAisleName(category) {
        return this.AISLE_MAPPING[category]?.[0] || 'Other';
    }

    // Format quantity for display
    formatQuantity(quantity, unit) {
        if (unit === 'g') {
            if (quantity >= 1000) {
                return `${(quantity / 1000).toFixed(1)} kg`;
            }
            return `${Math.round(quantity)} g`;
        }
        
        if (unit === 'ml') {
            if (quantity >= 1000) {
                return `${(quantity / 1000).toFixed(1)} L`;
            }
            return `${Math.round(quantity)} ml`;
        }
        
        if (unit === 'whole' || unit === 'pieces' || unit === 'cloves' || unit === 'slices') {
            return `${Math.ceil(quantity)} ${unit}`;
        }
        
        return `${Math.round(quantity)} ${unit}`;
    }

    // Estimate cost of an item
    estimateItemCost(ingredient) {
        const itemName = ingredient.name.toLowerCase();
        let pricePerUnit = 0.50; // Default price
        
        // Find matching price estimate
        for (const [key, price] of Object.entries(this.PRICE_ESTIMATES)) {
            if (itemName.includes(key)) {
                pricePerUnit = price;
                break;
            }
        }
        
        // Calculate based on quantity
        let quantity = ingredient.totalQuantity;
        if (ingredient.unit === 'g' || ingredient.unit === 'ml') {
            quantity = quantity / 100; // Convert to per 100g/ml
        }
        
        return Math.round(quantity * pricePerUnit * 100) / 100;
    }

    // Calculate total cost
    calculateTotalCost(ingredients) {
        return Object.values(ingredients).reduce((total, ingredient) => {
            return total + this.estimateItemCost(ingredient);
        }, 0);
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Export shopping list as text
    exportAsText(shoppingList) {
        let text = `MEALFLOW SHOPPING LIST\n`;
        text += `Generated: ${new Date(shoppingList.generatedAt).toLocaleDateString()}\n`;
        text += `Total Items: ${shoppingList.itemCount}\n`;
        text += `Estimated Cost: $${shoppingList.totalCost}\n\n`;
        
        Object.entries(shoppingList.items).forEach(([store, aisles]) => {
            const storeName = this.STORE_CATEGORIES[store]?.name || store;
            text += `\n=== ${storeName.toUpperCase()} ===\n`;
            
            Object.entries(aisles).forEach(([aisle, items]) => {
                text += `\n  ${aisle}:\n`;
                items.forEach(item => {
                    text += `    [ ] ${item.name} - ${item.quantity}\n`;
                });
            });
        });
        
        return text;
    }

    // Get items for specific store
    getItemsForStore(shoppingList, storeName) {
        return shoppingList.items[storeName] || {};
    }

    // Mark item as checked
    checkItem(shoppingList, itemId) {
        if (!shoppingList.checked) {
            shoppingList.checked = {};
        }
        shoppingList.checked[itemId] = true;
    }

    // Get completion percentage
    getCompletionPercentage(shoppingList) {
        let totalItems = 0;
        let checkedItems = 0;
        
        Object.values(shoppingList.items).forEach(store => {
            Object.values(store).forEach(aisle => {
                totalItems += aisle.length;
                aisle.forEach(item => {
                    if (shoppingList.checked && shoppingList.checked[item.id]) {
                        checkedItems++;
                    }
                });
            });
        });
        
        return totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
    }
}

// Export shopping list generator instance
const shoppingListGenerator = new ShoppingListGenerator();

