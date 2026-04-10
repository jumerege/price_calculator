// Phoenix Experiment Pricing Calculator
// Version 1.0

// Default Pricing Configuration
const DEFAULT_PRICING = {
    basePricePerKg: 45000,
    volumeSurchargePercent: 15,
    mdlFeePerLocker: 3000000,
    powerSurchargePercent: 3,
    powerThreshold: 50
};

// Current pricing configuration
let currentPricing = { ...DEFAULT_PRICING };

// Quote data
let currentQuote = null;

// DOM Elements
const settingsContent = document.getElementById('settingsContent');
const toggleSettingsBtn = document.getElementById('toggleSettings');
const resetSettingsBtn = document.getElementById('resetSettings');
const quoteForm = document.getElementById('quoteForm');
const resultsPanel = document.getElementById('resultsPanel');
const generateMissionOrderBtn = document.getElementById('generateMissionOrder');
const resetFormBtn = document.getElementById('resetForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPricingFromStorage();
    setupEventListeners();
    populateLaunchDate();
});

// Setup Event Listeners
function setupEventListeners() {
    // Settings
    toggleSettingsBtn.addEventListener('click', toggleSettings);
    resetSettingsBtn.addEventListener('click', resetSettings);
    
    // Pricing inputs
    document.getElementById('basePricePerKg').addEventListener('change', updatePricing);
    document.getElementById('volumeSurchargePercent').addEventListener('change', updatePricing);
    document.getElementById('mdlFeePerLocker').addEventListener('change', updatePricing);
    document.getElementById('powerSurchargePercent').addEventListener('change', updatePricing);
    
    // Form
    quoteForm.addEventListener('submit', handleFormSubmit);
    generateMissionOrderBtn.addEventListener('click', generateMissionOrderFile);
    resetFormBtn.addEventListener('click', resetCalculator);
}

// Toggle Settings Panel
function toggleSettings() {
    settingsContent.classList.toggle('hidden');
    toggleSettingsBtn.textContent = settingsContent.classList.contains('hidden') 
        ? 'Show Settings' 
        : 'Hide Settings';
}

// Update Pricing Configuration
function updatePricing() {
    currentPricing = {
        basePricePerKg: parseFloat(document.getElementById('basePricePerKg').value),
        volumeSurchargePercent: parseFloat(document.getElementById('volumeSurchargePercent').value),
        mdlFeePerLocker: parseFloat(document.getElementById('mdlFeePerLocker').value),
        powerSurchargePercent: parseFloat(document.getElementById('powerSurchargePercent').value),
        powerThreshold: DEFAULT_PRICING.powerThreshold
    };
    savePricingToStorage();
}

// Reset Settings
function resetSettings() {
    currentPricing = { ...DEFAULT_PRICING };
    document.getElementById('basePricePerKg').value = DEFAULT_PRICING.basePricePerKg;
    document.getElementById('volumeSurchargePercent').value = DEFAULT_PRICING.volumeSurchargePercent;
    document.getElementById('mdlFeePerLocker').value = DEFAULT_PRICING.mdlFeePerLocker;
    document.getElementById('powerSurchargePercent').value = DEFAULT_PRICING.powerSurchargePercent;
    savePricingToStorage();
    alert('Pricing parameters reset to defaults');
}

// Save/Load from LocalStorage
function savePricingToStorage() {
    localStorage.setItem('phoenixPricing', JSON.stringify(currentPricing));
}

function loadPricingFromStorage() {
    const stored = localStorage.getItem('phoenixPricing');
    if (stored) {
        currentPricing = JSON.parse(stored);
        document.getElementById('basePricePerKg').value = currentPricing.basePricePerKg;
        document.getElementById('volumeSurchargePercent').value = currentPricing.volumeSurchargePercent;
        document.getElementById('mdlFeePerLocker').value = currentPricing.mdlFeePerLocker;
        document.getElementById('powerSurchargePercent').value = currentPricing.powerSurchargePercent;
    }
}

// Populate launch date with default (6 months ahead)
function populateLaunchDate() {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);
    document.getElementById('launchDate').min = new Date().toISOString().split('T')[0];
    document.getElementById('launchDate').value = date.toISOString().split('T')[0];
}

// Calculate Pricing
function calculatePricing(mass, volume, mdl, power) {
    // 1. Base cost (kg × €45,000/kg)
    const baseCost = mass * currentPricing.basePricePerKg;

    // 2. Volume surcharge (% per liter on base cost)
    const volumeSurcharge = baseCost * (volume * (currentPricing.volumeSurchargePercent / 100));

    // 3. MDL premium (€3,000,000 per MDL)
    const mdlCost = mdl * currentPricing.mdlFeePerLocker;

    // 4. Power surcharge (3% per watt if over 50W)
    let powerCost = 0;
    if (power > currentPricing.powerThreshold) {
        const excessPower = power - currentPricing.powerThreshold;
        powerCost = baseCost * (excessPower * (currentPricing.powerSurchargePercent / 100));
    }

    const totalCost = baseCost + volumeSurcharge + mdlCost + powerCost;

    return {
        baseCost,
        volumeSurcharge,
        mdlCost,
        powerCost,
        totalCost,
        costPerLiter: volume > 0 ? baseCost / volume : 0,
        density: volume > 0 ? mass / volume : 0
    };
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();

    // Get form values
    const customerName = document.getElementById('customerName').value.trim();
    const mass = parseFloat(document.getElementById('mass').value);
    const volume = parseFloat(document.getElementById('volume').value);
    const mdl = parseInt(document.getElementById('mdl').value) || 0;
    const power = parseFloat(document.getElementById('power').value) || 0;
    const missionName = document.getElementById('missionName').value.trim();
    const launchDate = document.getElementById('launchDate').value;

    // Validate
    if (!customerName || !mass || !volume) {
        alert('Please fill in all required fields');
        return;
    }

    // Calculate
    const pricing = calculatePricing(mass, volume, mdl, power);

    // Store quote
    currentQuote = {
        customerName,
        mass,
        volume,
        mdl,
        power,
        missionName: missionName || `Phoenix Mission - ${new Date().toLocaleDateString()}`,
        launchDate,
        pricing,
        timestamp: new Date().toISOString(),
        currentPricing
    };

    // Display results
    displayResults();
}

// Display Results
function displayResults() {
    if (!currentQuote) return;

    const { pricing, mass, volume, mdl, power, customerName } = currentQuote;

    // Update breakdown
    document.getElementById('baseCost').textContent = formatEuro(pricing.baseCost);
    document.getElementById('volumeCost').textContent = formatEuro(pricing.volumeSurcharge);
    document.getElementById('mdlCost').textContent = formatEuro(pricing.mdlCost);
    document.getElementById('powerCost').textContent = formatEuro(pricing.powerCost);
    document.getElementById('totalCost').textContent = formatEuro(pricing.totalCost);

    // Update details
    document.getElementById('displayCustomer').textContent = customerName;
    document.getElementById('displayMass').textContent = mass.toFixed(1);
    document.getElementById('displayVolume').textContent = volume.toFixed(1);
    document.getElementById('costPerLiter').textContent = formatEuro(pricing.costPerLiter);
    document.getElementById('displayMDL').textContent = mdl > 0 ? `${mdl} locker(s)` : 'None';
    document.getElementById('displayPower').textContent = power.toFixed(0);
    document.getElementById('displayDensity').textContent = pricing.density.toFixed(3);

    // Show results panel
    resultsPanel.style.display = 'block';
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Format as Euro currency
function formatEuro(value) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// Generate Mission Order File
function generateMissionOrderFile() {
    if (!currentQuote) return;

    const { 
        customerName, 
        mass, 
        volume, 
        mdl, 
        power, 
        missionName,
        launchDate,
        pricing,
        currentPricing
    } = currentQuote;

    // Generate quote number
    const quoteNumber = `PHOENIX-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    // Create mission order content
    const missionOrderContent = `PHOENIX EXPERIMENT - MISSION ORDER
================================================================================

Quote Number: ${quoteNumber}
Date: ${today}
Valid Until: ${addDays(new Date(), 30).toISOString().split('T')[0]}

================================================================================
CUSTOMER INFORMATION
================================================================================

Customer Name: ${customerName}
Mission Name: ${missionName}
Target Launch Date: ${launchDate}

================================================================================
EXPERIMENT PARAMETERS
================================================================================

Mass: ${mass} kg
Volume: ${volume} L
Mid Deck Lockers (MDL): ${mdl}
Power Requirement: ${power} W
Density: ${pricing.density.toFixed(3)} kg/L

================================================================================
PRICING BREAKDOWN
================================================================================

Base Price per kg: ${formatEuro(currentPricing.basePricePerKg)}
Volume Surcharge: ${currentPricing.volumeSurchargePercent}% per liter
MDL Fee per Locker: ${formatEuro(currentPricing.mdlFeePerLocker)}
Power Surcharge: ${currentPricing.powerSurchargePercent}% per watt (over ${currentPricing.powerThreshold}W)

QUOTE CALCULATION:
------------------

1. Base Cost (${mass} kg × ${formatEuro(currentPricing.basePricePerKg)}/kg):
   ${formatEuro(pricing.baseCost)}

2. Volume Surcharge (${volume} L × ${currentPricing.volumeSurchargePercent}%):
   ${formatEuro(pricing.volumeSurcharge)}

3. MDL Premium (${mdl} MDL × ${formatEuro(currentPricing.mdlFeePerLocker)}):
   ${formatEuro(pricing.mdlCost)}

4. Power Surcharge (${power}W, ${currentPricing.powerSurchargePercent}% over ${currentPricing.powerThreshold}W):
   ${formatEuro(pricing.powerCost)}

================================================================================
TOTAL MISSION COST: ${formatEuro(pricing.totalCost)}
================================================================================

Cost per Liter: ${formatEuro(pricing.costPerLiter)}
Cost per kg: ${formatEuro(pricing.baseCost / mass)}

================================================================================
TERMS & CONDITIONS
================================================================================

1. This quote is valid for 30 days from the date above.
2. Phoenix mission includes:
   - Launch on SpaceX Bandwagon-5 or equivalent rideshare service
   - 3-hour to 3-month orbital operation (configurable)
   - Safe atmospheric re-entry using Inflatable Atmospheric Decelerator
   - Recovery and return of payload
   - Post-mission analysis

3. All dates are subject to SpaceX launch schedule availability.

4. Additional services and modifications may incur extra charges:
   - Mechanical interface design: €110/hour
   - External antenna mounting: €110/hour
   - Mass exceeding 100kg: Price adjustment per agreement

================================================================================
ATMOS SPACE CARGO GMBH
Im Gewerbegebiet 3-5
77839 Lichtenau, Germany

Phone: +49 (0) XXX XXXX-XXXX
Email: info@atmos-space-cargo.com
Web: https://www.atmos-space-cargo.com

================================================================================
Generated on: ${new Date().toLocaleString()}
Calculator Version: 1.0
================================================================================
`;

    // Create and download file
    downloadFile(missionOrderContent, `mission-order-${quoteNumber}.txt`);
    
    alert(`Mission Order Generated!\n\nQuote: ${quoteNumber}\nTotal Cost: ${formatEuro(pricing.totalCost)}`);
}

// Add days to date
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// Download file
function downloadFile(content, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Reset Calculator
function resetCalculator() {
    quoteForm.reset();
    resultsPanel.style.display = 'none';
    currentQuote = null;
    populateLaunchDate();
    quoteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
