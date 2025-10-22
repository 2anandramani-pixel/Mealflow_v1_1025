# MealFlow Deployment & Testing Guide

## 🚀 Deployment Status

### Changes Made
✅ Fixed GitHub Pages deployment issues:
- Updated `manifest.json` to use relative paths (./app.html instead of /app.html)
- Updated `service-worker.js` to use relative paths for all cached files
- Added missing `app.js` to the cache list

### Commit Status
✅ Changes committed locally: `fac0bf0`
⏳ Needs to be pushed to GitHub

---

## 📤 Step 1: Push to GitHub

### Option A: Using GitHub Desktop (Recommended)
1. Open **GitHub Desktop**
2. You should see the commit: "Fix GitHub Pages deployment: Update paths to be relative and add missing app.js to cache"
3. Click **Push origin** button
4. Wait for the push to complete

### Option B: Using Terminal
```bash
cd "/Users/anandramani/Cursor Files/ScratchFiles"
git push origin main
```

---

## 🔍 Step 2: Verify GitHub Pages Deployment

### Check Repository Settings
1. Go to: https://github.com/2anandramani-pixel/Mealflow_v1_1025/settings/pages
2. Verify:
   - ✅ Source is set to "Deploy from a branch"
   - ✅ Branch is "main" and folder is "/ (root)"
   - ✅ "Your site is live at..." message appears

### Check Deployment Status
1. Go to: https://github.com/2anandramani-pixel/Mealflow_v1_1025/actions
2. Look for the latest workflow run
3. Wait for it to complete (usually 1-2 minutes)
4. Status should show green checkmark ✅

---

## 🧪 Step 3: Test Live Application

### 3.1 Landing Page Test
**URL**: https://2anandramani-pixel.github.io/Mealflow_v1_1025/

**Test Checklist:**
- [ ] Page loads without errors
- [ ] Navigation bar appears
- [ ] "Get Started Free" button works
- [ ] Hero section displays correctly
- [ ] Features section is visible
- [ ] Footer loads properly

### 3.2 Onboarding Test
**URL**: https://2anandramani-pixel.github.io/Mealflow_v1_1025/onboarding.html

**Test Checklist:**
- [ ] Step 1 (Household) loads
- [ ] Can proceed to Step 2
- [ ] Can add family members
- [ ] Step 3 shows goal settings
- [ ] Step 4 shows dietary preferences
- [ ] Step 5 summary displays all data
- [ ] Progress bar updates correctly

---

## 🎯 Step 4: Test NEW Features

### Feature 1: Profile Save/Load 💾

**Test Steps:**
1. Complete onboarding (Steps 1-4)
2. Reach Step 5 (Summary page)
3. Look for "💾 Save This Family Profile" section
4. Enter test name: "Test Family 1"
5. Click "Save Profile"
6. Verify success message appears

**Verification:**
7. Refresh the page (go back to Step 1)
8. Look for "📂 Load Saved Profile" section
9. Verify "Test Family 1" button appears
10. Click the button
11. Should jump to Step 5 with all data loaded
12. Verify all family members are present
13. Delete the test profile

✅ **Pass Criteria:** Profile saves, persists after refresh, loads correctly

### Feature 2: Enhanced Dietary Preferences (Phase 1.1) 🍗

**Create Test Family:**
- Adult 1: "John" (35, male, 180lbs, 5'10")
  - Goal: Muscle gain
  - Protein Preferences: ✅ Chicken, ✅ Beef
  - Protein Exclusions: ❌ Fish/Seafood
  - Spice Level: Medium

- Adult 2: "Sarah" (32, female, 140lbs, 5'6")
  - Goal: Weight loss
  - Dietary: Vegetarian
  - Protein Preferences: ✅ Tofu, ✅ Beans/Legumes
  - Spice Level: Spicy

- Kid: "Emma" (7, female, 60lbs, 4'2")
  - Dietary: None
  - Protein Preferences: ✅ Chicken
  - Spice Level: Mild
  - Kid Dislikes: "mushrooms, broccoli, onions"

**Test Checklist:**
- [ ] Protein preferences checkboxes appear (Step 4)
- [ ] Protein exclusions checkboxes appear
- [ ] Spice level dropdown shows 3 options
- [ ] Kid section appears for Emma (age < 13)
- [ ] "Ingredient Dislikes" field shows for Emma
- [ ] Blue highlight appears on kid section
- [ ] All preferences save to summary

### Feature 3: Meal Plan Generation with Restrictions

**Test Steps:**
1. Complete onboarding with test family above
2. Click "Start Planning" to go to app
3. Click "Generate Meal Plan"
4. Wait for generation (should take 1-2 seconds)
5. View the 7-day meal plan

**Verification Checklist:**
- [ ] ❌ NO fish recipes appear (John's exclusion)
- [ ] ✅ Sarah only gets vegetarian meals
- [ ] ❌ Emma's meals have NO mushrooms, broccoli, or onions
- [ ] ❌ NO spicy recipes appear (Emma prefers mild)
- [ ] ✅ Chicken appears frequently (preferred by John & Emma)
- [ ] ✅ Tofu/beans appear in Sarah's portions
- [ ] Each meal shows portions per family member
- [ ] Macro totals are calculated

**Pass Criteria:** 
- All restrictions are respected
- No excluded proteins appear
- Kid dislikes are avoided
- Spice level matches preferences
- Preferred proteins appear more often

---

## 🛒 Step 5: Shopping List Test

**Test Steps:**
1. With meal plan generated, go to "Shopping" tab
2. Review the shopping list

**Checklist:**
- [ ] Ingredients grouped by store (Costco, Safeway, etc.)
- [ ] Items organized by aisle within each store
- [ ] Quantities are scaled for family size
- [ ] Can check off items
- [ ] Progress bar updates when items checked
- [ ] Total cost estimate appears
- [ ] Export button works
- [ ] Ingredient quantities make sense (not too much/little)

---

## 📱 Step 6: Mobile Responsiveness Test

### iPhone/Android Test
1. Open on mobile device or use browser DevTools
2. Test viewport: 375px x 667px (iPhone SE)
3. Test viewport: 390px x 844px (iPhone 12)

**Checklist:**
- [ ] Landing page responsive
- [ ] Onboarding forms fit screen
- [ ] No horizontal scroll
- [ ] Buttons are tappable (not too small)
- [ ] Checkboxes work on touch
- [ ] Meal cards stack properly
- [ ] Shopping list readable on mobile

---

## 🔌 Step 7: PWA & Offline Test

### Install as PWA
1. On Chrome: Look for install prompt (⊕ in address bar)
2. Click to install as app
3. Open installed app

**Checklist:**
- [ ] App installs successfully
- [ ] Opens as standalone window (no browser UI)
- [ ] Icon appears in app drawer/desktop
- [ ] App name is "MealFlow"

### Offline Test
1. With app open, generate a meal plan
2. Open DevTools → Network tab
3. Check "Offline" mode
4. Navigate between Dashboard, Meals, Shopping tabs
5. Refresh the page

**Checklist:**
- [ ] App still works offline
- [ ] Cached pages load
- [ ] LocalStorage data persists
- [ ] Can view existing meal plan
- [ ] Can check shopping items
- [ ] No network errors prevent usage

---

## 🐛 Step 8: Error & Edge Cases

### Test Edge Cases:
1. **Many Restrictions**: Create family with 5+ protein exclusions
   - [ ] Meal plan still generates
   - [ ] Shows variety within restrictions

2. **All Kids**: Create family of only children (ages 5-12)
   - [ ] Macro calculations use child formulas
   - [ ] Kid-friendly recipes prioritized

3. **Empty Preferences**: Don't select any cuisine preferences
   - [ ] All cuisines considered equally
   - [ ] Meal plan generates normally

4. **Conflicting Preferences**: 
   - [ ] One member excludes all proteins except chicken
   - [ ] Another member excludes chicken
   - [ ] Algorithm handles gracefully

### Test Data Persistence:
1. Complete full onboarding
2. Generate meal plan
3. Close browser completely
4. Reopen site
5. [ ] Household data persists
6. [ ] Meal plan still visible
7. [ ] Shopping list intact

---

## ✅ Acceptance Criteria

### Must Pass:
- ✅ Site deploys to GitHub Pages without errors
- ✅ All pages load correctly
- ✅ Profile save/load works
- ✅ Phase 1.1 preferences appear in onboarding
- ✅ Dietary restrictions are enforced in meal plans
- ✅ Shopping list generates correctly
- ✅ PWA installs and works offline
- ✅ Data persists across sessions

### Performance:
- ✅ Pages load in < 2 seconds
- ✅ Meal plan generates in < 3 seconds
- ✅ No console errors
- ✅ Mobile responsive on all screen sizes

---

## 📊 Testing Results Template

```markdown
## Test Results - [Date]

### Environment
- Browser: [Chrome/Safari/Firefox]
- OS: [macOS/Windows/iOS/Android]
- Screen Size: [Desktop/Mobile]

### Feature Tests
- [ ] Landing Page: PASS / FAIL
- [ ] Onboarding Flow: PASS / FAIL
- [ ] Profile Save/Load: PASS / FAIL
- [ ] Dietary Preferences: PASS / FAIL
- [ ] Meal Plan Generation: PASS / FAIL
- [ ] Shopping List: PASS / FAIL
- [ ] Mobile Responsive: PASS / FAIL
- [ ] PWA Install: PASS / FAIL
- [ ] Offline Mode: PASS / FAIL

### Issues Found
1. [Issue description]
2. [Issue description]

### Notes
- [Any observations]
```

---

## 🎉 Next Steps After Testing

If all tests pass:
1. ✅ Mark deployment as successful
2. 📝 Document any minor issues
3. 🎯 Plan Phase 2 features
4. 📈 Consider adding more recipes
5. 🔄 Set up regular backups

If tests fail:
1. 🐛 Document specific failures
2. 🔍 Check browser console for errors
3. 📝 Note which features don't work
4. 💬 Report issues for fixing

---

## 🆘 Troubleshooting

### Issue: Site doesn't load
- Check GitHub Pages is enabled
- Verify deployment action completed
- Wait 2-3 minutes after push
- Clear browser cache

### Issue: Service worker errors
- Check browser console (F12)
- Unregister old service worker
- Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### Issue: Data not persisting
- Check LocalStorage is enabled
- Verify not in Private/Incognito mode
- Check storage quota not exceeded

### Issue: Meal plan has wrong recipes
- Verify preferences saved correctly (Step 5)
- Check console for filtering errors
- Try regenerating plan
- Check recipe database has variety

---

## 📞 Support Resources

- **Repository**: https://github.com/2anandramani-pixel/Mealflow_v1_1025
- **Live Site**: https://2anandramani-pixel.github.io/Mealflow_v1_1025/
- **Documentation**: See README.md, IMPLEMENTATION_SUMMARY.md

---

**Happy Testing! 🧪✨**

