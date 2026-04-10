# ⚡ Quick Start Guide - Phoenix Pricing Calculator

## 🎯 Get Started in 30 Seconds

### Step 1: Open the App
Navigate to and open this file in your web browser:
```
c:\Users\jumer\Downloads\challenge\pricing-calculator\index.html
```

**Simply:**
- Double-click `index.html` OR
- Right-click → "Open with" → Choose your browser

### Step 2: Test with Sample Data

Fill in these values to test:

| Field | Value |
|-------|-------|
| Customer Name | **Space Cargo Unlimited** |
| Mass | **30** |
| Volume | **50** |
| MDL | **1** |
| Power | **100** |
| Mission | **BioLab Flight 001** |

### Step 3: Click Calculate
Press "Calculate & Generate Quote" button

**Expected Result:**
```
💰 Total Mission Cost: €4,620,000

Breakdown:
- Base Cost: €1,350,000 (30kg × €45k/kg)
- Volume Surcharge: €202,500 (15% × 50L)
- MDL Premium: €3,000,000 (1 × €3M)
- Power Surcharge: €67,500 (over 50W)
```

### Step 4: Download Mission Order
Click "📄 Generate Mission Order File" 

A `.txt` file will download automatically!

---

## 🚨 If It's Not Working

### Issue: Page shows blank
**Solution:** 
1. Hard refresh: Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
2. Try a different browser

### Issue: Styling looks broken
**Solution:**
1. Make sure all 3 files are in the SAME folder:
   - index.html ✓
   - style.css ✓
   - app.js ✓

### Issue: Still not working?
**Use a Local Server:**

**Windows PowerShell:**
```powershell
cd "c:\Users\jumer\Downloads\challenge\pricing-calculator"
python -m http.server 8000
```
Then open: `http://localhost:8000`

**Windows Command Prompt:**
```cmd
cd c:\Users\jumer\Downloads\challenge\pricing-calculator
python -m http.server 8000
```

---

## 💡 Tips

✅ **Customize Pricing** - Click "⚙️ Pricing Parameters" to adjust multipliers

✅ **Save Settings** - Your pricing adjustments are automatically saved

✅ **Export Quotes** - Each mission order gets a unique quote number

✅ **Mobile Friendly** - Works on phones and tablets too!

---

## 📊 Your Data is Safe

- ✅ All calculations happen in YOUR browser
- ✅ Nothing sent to the internet
- ✅ No tracking or data collection
- ✅ Files saved only to your computer

---

## 🎓 What the Calculator Does

```
Input Your Experiment Details
           ↓
Calculate Costs:
  • Base (kg × 45k)
  • Volume (15% surcharge)
  • MDL (€3M per locker)
  • Power (3% if >50W)
           ↓
Display Price Breakdown
           ↓
Generate Mission Order File (.txt)
           ↓
Download to Your Computer
```

---

**Ready?** Open `index.html` now and try the sample data! 🚀
