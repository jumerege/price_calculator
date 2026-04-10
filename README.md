# 🚀 Phoenix Experiment Pricing Calculator

A professional web-based pricing calculator for ATMOS Space Cargo's Phoenix mission return capsule.

## 📁 Project Structure

```
pricing-calculator/
├── index.html       # Main HTML interface
├── style.css        # Space-themed styling
├── app.js           # Calculator logic & functionality
└── README.md        # This file
```

## ✨ Features

✅ **Flexible Pricing Parameters**
- Base price: €45,000/kg (editable)
- Volume surcharge: 15% per liter (editable)
- MDL fee: €3,000,000 per locker (editable)
- Power surcharge: 3% per watt over 50W (editable)

✅ **Professional Interface**
- Space-themed design with glassmorphism effects
- Real-time price calculations
- Detailed breakdown of all costs
- Responsive design for all devices

✅ **Mission Order Generation**
- Generate professional `.txt` mission order files
- Automatic quote numbering
- Download with unique identifiers
- Complete pricing breakdown included

✅ **Persistent Settings**
- Pricing parameters saved to browser storage
- Settings persist across sessions
- One-click reset to defaults

## 🚀 How to Use

### Option 1: Direct Browser (Simplest)

1. **Navigate to the folder:**
   ```
   c:\Users\jumer\Downloads\challenge\pricing-calculator\
   ```

2. **Open `index.html`:**
   - Double-click `index.html`, OR
   - Right-click → Open with → Your browser (Chrome, Firefox, Safari, Edge)

3. **Hard refresh if needed** (Ctrl+F5 or Cmd+Shift+R)

### Option 2: Local Web Server (Recommended)

If you encounter any loading issues, use a local server:

**Windows - Using Python:**
```powershell
cd c:\Users\jumer\Downloads\challenge\pricing-calculator
python -m http.server 8000
```

Then open: `http://localhost:8000`

**Windows - Using Node.js:**
```powershell
npm install -g http-server
cd c:\Users\jumer\Downloads\challenge\pricing-calculator
http-server
```

## 📊 Using the Calculator

### Step 1: Adjust Pricing Parameters (Optional)
- Click the settings panel to customize pricing
- Change multipliers as needed
- Click "Reset to Defaults" to restore original values
- Settings are automatically saved

### Step 2: Fill in Customer Information
- **Customer Name** (required): e.g., "Space Cargo Unlimited"
- **Mass** (required): kg of payload
- **Volume** (required): Liters needed
- **MDL**: Number of Mid Deck Lockers (0-2)
- **Power**: Watts required
- **Mission Name**: Custom name (optional)
- **Launch Date**: Target date

### Step 3: Calculate & Generate Quote
- Click "Calculate & Generate Quote"
- View pricing breakdown
- See cost per liter and density metrics

### Step 4: Generate Mission Order
- Click "📄 Generate Mission Order File"
- A `.txt` file downloads automatically
- Contains complete quote details and terms

## 💰 Pricing Formula

```
TOTAL COST = BASE + VOLUME + MDL + POWER

BASE COST          = Mass (kg) × €45,000/kg
VOLUME SURCHARGE   = Base × (Volume (L) × 15%)
MDL PREMIUM        = MDL Count × €3,000,000
POWER SURCHARGE    = Base × ((Power - 50W) × 3%) [if Power > 50W]
```

## 📋 Example Calculation

**Input:**
- Customer: Space Cargo Unlimited
- Mass: 30 kg
- Volume: 50 L
- MDL: 1 locker
- Power: 100 W

**Output:**
- Base Cost: €1,350,000
- Volume Surcharge: €202,500 (€1.35M × 50L × 15%)
- MDL Premium: €3,000,000
- Power Surcharge: €67,500 (50W over threshold × 3%)
- **Total: €4,620,000**

## 🔧 Customizing Pricing

To change default pricing values, edit `app.js`:

```javascript
const DEFAULT_PRICING = {
    basePricePerKg: 45000,           // Change base price
    volumeSurchargePercent: 15,      // Change volume %
    mdlFeePerLocker: 3000000,        // Change MDL fee
    powerSurchargePercent: 3,        // Change power %
    powerThreshold: 50               // Change power threshold
};
```

## 📱 Browser Compatibility

- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📄 Generated Mission Order Format

The downloaded `.txt` file includes:
- Quote number and date
- Customer information
- Experiment parameters
- Complete pricing breakdown
- Terms & conditions
- ATMOS contact information

## 🐛 Troubleshooting

**App not loading:**
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
- Use local web server (see Option 2 above)
- Check browser console for errors (F12)

**Pricing not updating:**
- Click "Reset to Defaults" button
- Clear LocalStorage: Open DevTools → Application → Clear Site Data
- Refresh page (Ctrl+F5)

**Files not found:**
- Ensure all 3 files (HTML, CSS, JS) are in the same folder
- Check file names match exactly (case-sensitive on some systems)

## 📚 Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks or dependencies
- **LocalStorage** - Browser data persistence
- **Responsive Design** - Mobile-friendly interface
- **File Downloads** - Uses Blob API for file generation

## 🔐 Data Privacy

- ✅ All calculations done locally in your browser
- ✅ No data sent to external servers
- ✅ No tracking or analytics
- ✅ Downloaded files saved to your computer only

## 📞 Support

For issues or feature requests:
- ATMOS Space Cargo: info@atmos-space-cargo.com
- Location: Lichtenau, Germany

## 📄 License

Phoenix Experiment Pricing Calculator © 2026 ATMOS Space Cargo GmbH

---

**Version:** 1.0  
**Last Updated:** April 10, 2026  
**Status:** Ready for production use ✅
