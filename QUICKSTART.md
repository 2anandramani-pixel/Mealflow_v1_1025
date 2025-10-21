# MealFlow MVP - Quick Start Guide

## 🚀 Getting Started in 3 Minutes

### Step 1: Start a Local Server

**Option A - Using Python (Recommended)**
```bash
cd "/Users/anandramani/Cursor Files/ScratchFiles"
python3 -m http.server 8000
```

**Option B - Using Node.js**
```bash
npx http-server -p 8000
```

**Option C - Using VS Code Live Server**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

### Step 2: Open in Browser

Navigate to: `http://localhost:8000`

### Step 3: Complete Onboarding

1. Click **"Get Started Free"** on landing page
2. Enter your household name (e.g., "The Smith Family")
3. Add family members:
   - **Example Dad**: 35 years, Male, 80kg, 175cm
   - **Example Mom**: 33 years, Female, 65kg, 165cm
   - **Example Kid**: 8 years, Male, 30kg, 130cm
4. Set goals for each member
5. Add dietary preferences if needed
6. Review and click **"Start Planning"**

### Step 4: Generate Your First Meal Plan

1. On the dashboard, click **"Generate Meal Plan"**
2. Wait 1-2 seconds for the algorithm to work
3. Navigate to **"Meals"** tab to see your 7-day plan
4. Check **"Shopping"** tab for your auto-generated shopping list

## 📱 Testing as PWA

### On Desktop (Chrome/Edge)
1. Click the install icon (⊕) in the address bar
2. Click "Install"
3. App opens as standalone window

### On Mobile
1. Open site in Safari (iOS) or Chrome (Android)
2. **iOS**: Tap Share → Add to Home Screen
3. **Android**: Tap menu → Install App

## 🧪 Test the Features

### Test Meal Planning
- Generate a plan and view different meals
- Click on a meal card to see details and portions

### Test Shopping List
- View items organized by store
- Check off items as you "shop"
- Export the list to a text file

### Test Family Management
- Add a new family member
- Delete a member (then regenerate plan)
- View macro targets for each person

## 🎯 Sample Test Data

Use these if you want realistic test data:

**Family Profile 1 - Fitness Focused**
- Dad: 35, M, 85kg, 180cm, Active, Muscle Gain, High Protein
- Mom: 32, F, 62kg, 168cm, Moderate, Weight Loss, Balanced
- Teen: 15, M, 65kg, 170cm, Very Active, Maintenance, Balanced

**Family Profile 2 - Mixed Diet**
- Dad: 40, M, 90kg, 178cm, Light, Weight Loss, Low Carb
- Mom: 38, F, 70kg, 165cm, Sedentary, Maintenance, Vegetarian
- Kid: 6, F, 22kg, 115cm

## 🐛 Troubleshooting

### Blank page after onboarding?
- Check browser console (F12) for errors
- Ensure all JavaScript files are loaded
- Try clearing localStorage: `localStorage.clear()`

### Meal plan not generating?
- Ensure you have at least 1 family member
- Check that family members have valid weight/height
- Look at console for error messages

### Shopping list empty?
- You must generate a meal plan first
- Refresh the page after generating a plan

### Icons not showing?
- Ensure the `/icons/` directory exists
- SVG files should be in `/icons/icon-192.svg` and `/icons/icon-512.svg`

## 💾 Data Management

### Clear All Data
Open browser console and run:
```javascript
localStorage.clear();
location.reload();
```

### View Stored Data
```javascript
console.log(localStorage);
```

### Export Data (Manual)
```javascript
const data = {
  household: localStorage.getItem('mealflow_household'),
  members: localStorage.getItem('mealflow_family_members'),
  plans: localStorage.getItem('mealflow_meal_plans'),
  shopping: localStorage.getItem('mealflow_shopping_lists')
};
console.log(JSON.stringify(data, null, 2));
```

## 🔍 Key Features to Test

- [ ] Onboarding flow (5 steps)
- [ ] Macro calculation for adults
- [ ] Macro calculation for children
- [ ] Meal plan generation
- [ ] Today's meals display
- [ ] Weekly meal calendar view
- [ ] Meal detail modal
- [ ] Shopping list by store
- [ ] Shopping list item checking
- [ ] Shopping list export
- [ ] Add family member
- [ ] Delete family member
- [ ] Regenerate meal plan
- [ ] PWA installation
- [ ] Offline functionality

## 📊 Understanding the Data

### Macro Calculations
- **BMR**: Base metabolic rate (calories at rest)
- **TDEE**: Total daily energy expenditure (BMR × activity)
- **Target**: TDEE adjusted for goal (+/- 500 cal)

### Meal Plan Algorithm
- Filters recipes by dietary restrictions
- Scores recipes based on macro fit and preferences
- Calculates portions per family member
- Balances variety across the week

### Shopping List Logic
- Aggregates all ingredients from 7 days
- Scales quantities by family portions
- Groups by optimal store (Costco/Safeway/Asian/Indian)
- Organizes by aisle within each store

## 🎨 Customization Tips

### Add Your Own Recipes
Edit `recipes.js` and add to the `RECIPES_DB` array. Include:
- Complete nutritional info per ingredient
- Accurate serving sizes
- Relevant tags for filtering

### Adjust Macro Ratios
Edit `macros.js` → `MACRO_SPLITS` object to add custom ratios

### Change Meal Calorie Distribution
Edit `meal-planner.js` → `MEAL_CALORIE_SPLIT` object:
- Default: 25% breakfast, 35% lunch, 30% dinner, 10% snack

## 🤝 Next Steps

1. Test the core flow end-to-end
2. Add more recipes to `recipes.js`
3. Customize for your actual family
4. Consider adding features from the roadmap
5. Deploy to a hosting service (Netlify, Vercel, GitHub Pages)

## 📝 Notes

- All data stays on your device (privacy-first)
- Works offline after first load
- No backend required for MVP
- Mobile-optimized design

---

**Need Help?** Check the main README.md or inspect browser console for errors.

**Ready to Deploy?** See deployment instructions in README.md

