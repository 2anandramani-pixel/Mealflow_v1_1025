// App.js - Core application state management
class AppState {
    constructor() {
        this.currentView = 'dashboard';
        this.selectedMember = null;
        this.currentMealPlan = null;
        this.currentShoppingList = null;
    }

    setView(view) {
        this.currentView = view;
    }

    setSelectedMember(memberId) {
        this.selectedMember = memberId;
    }

    refreshMealPlan() {
        this.currentMealPlan = storage.getCurrentMealPlan();
    }

    refreshShoppingList() {
        this.currentShoppingList = storage.getCurrentShoppingList();
    }

    getFamilyMembers() {
        return storage.getFamilyMembers();
    }

    getHousehold() {
        return storage.getHousehold();
    }
}

// Initialize app state
const appState = new AppState();

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function formatMacros(macros) {
    return `${macros.calories} cal | ${macros.protein}g P | ${macros.carbs}g C | ${macros.fat}g F`;
}

function calculateProgress(current, target) {
    return Math.round((current / target) * 100);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('App error:', e.error);
});

// Prevent form submissions from refreshing page
document.addEventListener('submit', function(e) {
    e.preventDefault();
}, true);

