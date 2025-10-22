# MealFlow Quick Test Checklist ✅

## 1️⃣ Push to GitHub (2 minutes)
```bash
# Open GitHub Desktop and click "Push origin"
# OR use terminal:
git push origin main
```

## 2️⃣ Wait for Deployment (2 minutes)
- Visit: https://github.com/2anandramani-pixel/Mealflow_v1_1025/actions
- Wait for green checkmark ✅

## 3️⃣ Quick Smoke Test (5 minutes)

### Test Profile Save/Load
1. Go to: https://2anandramani-pixel.github.io/Mealflow_v1_1025/onboarding.html
2. Create test family:
   - Household: "Test Family"
   - Adult: John, 35, male, 180lbs, 5'10", muscle gain
   - Kid: Emma, 7, female, 60lbs, 4'2"
3. At Step 4, set preferences:
   - John: Exclude fish, prefer chicken/beef, spice: medium
   - Emma: Kid dislikes: "mushrooms, broccoli", spice: mild
4. At Step 5, save profile as "QuickTest"
5. Refresh page
6. Click "QuickTest" button
7. ✅ Should load all data instantly

### Test Meal Plan with Restrictions
1. Click "Start Planning"
2. Click "Generate Meal Plan"
3. View meals
4. ✅ Verify: NO fish recipes
5. ✅ Verify: NO spicy recipes (Emma = mild)
6. ✅ Verify: Emma's meals have NO mushrooms/broccoli

### Test Shopping List
1. Go to Shopping tab
2. ✅ Verify: Ingredients grouped by store
3. ✅ Check off 2-3 items
4. ✅ Verify: Progress bar updates

## 4️⃣ Mobile Test (2 minutes)
1. Open DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M)
3. Select iPhone 12
4. ✅ Verify: Site looks good on mobile
5. ✅ Verify: No horizontal scroll

## ✅ Done!
If all 4 sections pass, deployment is successful! 🎉

---

## 🐛 If Something Breaks

**Site doesn't load?**
- Wait 2 more minutes
- Hard refresh (Cmd+Shift+R)
- Check: https://github.com/2anandramani-pixel/Mealflow_v1_1025/actions

**Profile doesn't save?**
- Open Console (F12)
- Look for errors
- Check LocalStorage is enabled
- Not in Private/Incognito mode

**Meal plan has wrong recipes?**
- Regenerate plan (try 2-3 times)
- Check that restrictions were saved in Step 5
- Look for console errors

**Need detailed testing?**
See: DEPLOYMENT_TEST_GUIDE.md

