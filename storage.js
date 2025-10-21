// Storage.js - LocalStorage wrapper with data models
class StorageManager {
    constructor() {
        this.STORAGE_KEYS = {
            HOUSEHOLD: 'mealflow_household',
            FAMILY_MEMBERS: 'mealflow_family_members',
            MEAL_PLANS: 'mealflow_meal_plans',
            SHOPPING_LISTS: 'mealflow_shopping_lists',
            PREFERENCES: 'mealflow_preferences'
        };
    }

    // Generic storage methods
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Storage error:', error);
            return null;
        }
    }

    delete(key) {
        localStorage.removeItem(key);
    }

    // Household methods
    saveHousehold(household) {
        return this.save(this.STORAGE_KEYS.HOUSEHOLD, household);
    }

    getHousehold() {
        return this.load(this.STORAGE_KEYS.HOUSEHOLD);
    }

    // Family member methods
    saveFamilyMembers(members) {
        return this.save(this.STORAGE_KEYS.FAMILY_MEMBERS, members);
    }

    getFamilyMembers() {
        return this.load(this.STORAGE_KEYS.FAMILY_MEMBERS) || [];
    }

    addFamilyMember(member) {
        const members = this.getFamilyMembers();
        member.id = this.generateId();
        members.push(member);
        return this.saveFamilyMembers(members);
    }

    updateFamilyMember(id, updatedData) {
        const members = this.getFamilyMembers();
        const index = members.findIndex(m => m.id === id);
        if (index !== -1) {
            members[index] = { ...members[index], ...updatedData };
            return this.saveFamilyMembers(members);
        }
        return false;
    }

    deleteFamilyMember(id) {
        const members = this.getFamilyMembers();
        const filtered = members.filter(m => m.id !== id);
        return this.saveFamilyMembers(filtered);
    }

    // Meal plan methods
    saveMealPlan(mealPlan) {
        mealPlan.id = mealPlan.id || this.generateId();
        mealPlan.createdAt = mealPlan.createdAt || new Date().toISOString();
        const plans = this.load(this.STORAGE_KEYS.MEAL_PLANS) || [];
        plans.unshift(mealPlan); // Add to beginning
        return this.save(this.STORAGE_KEYS.MEAL_PLANS, plans);
    }

    getCurrentMealPlan() {
        const plans = this.load(this.STORAGE_KEYS.MEAL_PLANS) || [];
        return plans[0] || null; // Most recent plan
    }

    getAllMealPlans() {
        return this.load(this.STORAGE_KEYS.MEAL_PLANS) || [];
    }

    // Shopping list methods
    saveShoppingList(shoppingList) {
        shoppingList.id = shoppingList.id || this.generateId();
        shoppingList.createdAt = shoppingList.createdAt || new Date().toISOString();
        const lists = this.load(this.STORAGE_KEYS.SHOPPING_LISTS) || [];
        lists.unshift(shoppingList);
        return this.save(this.STORAGE_KEYS.SHOPPING_LISTS, lists);
    }

    getCurrentShoppingList() {
        const lists = this.load(this.STORAGE_KEYS.SHOPPING_LISTS) || [];
        return lists[0] || null;
    }

    updateShoppingListItem(listId, itemId, checked) {
        const lists = this.load(this.STORAGE_KEYS.SHOPPING_LISTS) || [];
        const list = lists.find(l => l.id === listId);
        if (list) {
            Object.values(list.items).forEach(store => {
                Object.values(store).forEach(aisle => {
                    const item = aisle.find(i => i.id === itemId);
                    if (item) {
                        item.checked = checked;
                    }
                });
            });
            return this.save(this.STORAGE_KEYS.SHOPPING_LISTS, lists);
        }
        return false;
    }

    // Preferences
    savePreferences(preferences) {
        return this.save(this.STORAGE_KEYS.PREFERENCES, preferences);
    }

    getPreferences() {
        return this.load(this.STORAGE_KEYS.PREFERENCES) || {
            theme: 'light',
            notifications: true,
            weekStartsOn: 'monday'
        };
    }

    // Utility methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    clearAll() {
        Object.values(this.STORAGE_KEYS).forEach(key => {
            this.delete(key);
        });
    }

    isOnboarded() {
        const household = this.getHousehold();
        const members = this.getFamilyMembers();
        return household && members.length > 0;
    }
}

// Export singleton instance
const storage = new StorageManager();

