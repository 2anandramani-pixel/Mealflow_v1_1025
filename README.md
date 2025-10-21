# MealFlow MVP - Personal Meal Planning App

A modern, mobile-first web application for personalized food and meal planning with multi-family member support.

## Features

### ✅ Implemented Features

1. **Multi-Step Onboarding**
   - Household setup
   - Family member profiles (name, age, gender, metrics)
   - Individual goal setting (weight loss, maintenance, muscle gain)
   - Dietary preferences and allergens
   - Automatic macro calculation

2. **Smart Macro Calculator**
   - BMR calculation using Mifflin-St Jeor equation
   - TDEE with activity level multipliers
   - Goal-based calorie adjustments
   - Multiple macro split options (balanced, high-protein, low-carb, etc.)
   - Child-specific calculations

3. **Meal Planning Engine**
   - Automatic 7-day meal plan generation
   - Multi-family member support with individual portions
   - Dietary restriction filtering (vegetarian, vegan, gluten-free)
   - Allergen avoidance
   - Preference matching (cuisine, difficulty, prep time)
   - Recipe variety balancing

4. **Recipe Database**
   - 12 diverse recipes across multiple cuisines
   - Complete nutritional information
   - Meal type categorization (breakfast, lunch, dinner, snack)
   - Tags for dietary preferences and characteristics
   - Per-serving macro calculations

5. **Smart Shopping Lists**
   - Ingredient aggregation across weekly meal plan
   - Store categorization (Costco, Safeway, Asian/Indian markets)
   - Aisle organization within stores
   - Quantity scaling based on family portions
   - Price estimation
   - Checkable items with progress tracking
   - Export to text file

6. **Dashboard**
   - Meal plan status overview
   - Today's meals display
   - Family member summary
   - Quick action buttons

7. **Family Management**
   - Add/edit/delete family members
   - View individual macro targets
   - Dietary preferences display

8. **Weekly Meal View**
   - Calendar-style meal plan display
   - Meal detail modal with portions per family member
   - Recipe information and ingredients

9. **PWA Capabilities**
   - Installable as standalone app
   - Offline functionality
   - Service worker caching
   - App manifest with icons

## Tech Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage for data persistence
- **Architecture**: Modular ES6 classes and singleton patterns
- **Design**: Mobile-first responsive design
- **PWA**: Service Worker, Web App Manifest

## File Structure

```
MealFlow/
├── index.html              # Landing page
├── onboarding.html         # User onboarding flow
├── app.html                # Main application
├── styles.css              # Landing page styles
├── app.css                 # Application styles
├── script.js               # Landing page scripts
├── app.js                  # App state management
├── storage.js              # LocalStorage wrapper
├── macros.js               # Macro calculation logic
├── recipes.js              # Recipe database
├── meal-planner.js         # Meal planning algorithm
├── shopping.js             # Shopping list generation
├── service-worker.js       # PWA service worker
├── manifest.json           # PWA manifest
├── icons/                  # App icons
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## Getting Started

### Installation

1. Clone or download the project files
2. Serve the files using any web server (e.g., Python's `http.server`, Live Server extension)
3. Open `index.html` in a modern web browser

### Using Python's Built-in Server

```bash
cd /path/to/MealFlow
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### First Time Setup

1. Visit the landing page (`index.html`)
2. Click "Get Started Free"
3. Complete the onboarding:
   - Enter household name
   - Add family members with their details
   - Set goals and metrics for each member
   - Configure dietary preferences
   - Review summary
4. Click "Start Planning" to access the app

## Usage Guide

### Generating a Meal Plan

1. Navigate to Dashboard
2. Click "Generate Meal Plan" button
3. Wait for the algorithm to create a 7-day plan
4. View your personalized meal plan in the Meals tab

### Managing Family Members

1. Go to the Family tab
2. Click "+ Add Member" to add new family members
3. Fill in their details (name, age, weight, height, goals)
4. View or delete existing members

### Shopping List

1. Generate a meal plan first
2. Navigate to Shopping tab
3. View items organized by store and aisle
4. Check off items as you shop
5. Export list for printing or sharing

### Viewing Meal Details

1. Go to Meals tab
2. Click on any meal card
3. View recipe details, family portions, and ingredients
4. Option to swap meals (coming soon)

## Data Persistence

All data is stored locally in your browser's LocalStorage:

- Household information
- Family member profiles
- Meal plans
- Shopping lists
- User preferences

**Note**: Clearing browser data will delete all MealFlow data.

## Browser Compatibility

Works best on modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features to Implement (Future)

- [ ] Recipe swap functionality
- [ ] Manual meal editing
- [ ] Custom recipe addition
- [ ] Nutrition tracking (mark meals as consumed)
- [ ] Progress tracking over time
- [ ] Apple Health / Fitbit integration
- [ ] Meal prep scheduling and reminders
- [ ] Budget tracking
- [ ] More recipes (expand database)
- [ ] Recipe search and filtering
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Cloud sync (optional backend)
- [ ] Recipe ratings and favorites
- [ ] Leftover management
- [ ] Batch cooking optimization

## Known Limitations

- Recipe database is limited to 12 recipes (MVP)
- No user authentication (single-device use)
- No cloud backup
- Shopping list prices are estimates only
- Cannot manually edit generated meal plans yet
- No recipe photos (using placeholders)

## Development Notes

### Adding New Recipes

Edit `recipes.js` and add a new recipe object to the `RECIPES_DB` array following this structure:

```javascript
{
    id: 'rec###',
    name: 'Recipe Name',
    cuisine: 'Cuisine Type',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'easy|medium|hard',
    tags: ['tag1', 'tag2'],
    mealType: ['breakfast|lunch|dinner|snack'],
    ingredients: [
        { 
            name: 'Ingredient',
            quantity: 100,
            unit: 'g',
            calories: 100,
            protein: 10,
            carbs: 10,
            fat: 5,
            category: 'produce|meat|dairy|pantry',
            aisle: 'aisle_name'
        }
    ],
    imageUrl: 'https://...'
}
```

### Modifying Macro Calculations

Edit `macros.js` to adjust:
- Activity multipliers
- Goal adjustments (calorie surplus/deficit)
- Macro split ratios
- BMR formulas

### Customizing Meal Planning Algorithm

Edit `meal-planner.js` to modify:
- Meal calorie splits (breakfast/lunch/dinner/snack ratios)
- Recipe scoring logic
- Portion calculations
- Variety balancing

## License

This is a personal project for educational and personal use.

## Support

For issues or questions, please refer to the inline code comments or contact the developer.

---

**Version**: 1.0.0 (MVP)  
**Last Updated**: October 2024  
**Built with**: ❤️ and JavaScript

