// Phoenix Experiment Pricing Calculator
// Version 2.0 — with Payload Type Wizard

// Default Pricing Configuration
const DEFAULT_PRICING = {
    basePricePerKg: 45000,
    volumeSurchargePercent: 15,
    mdlFeePerLocker: 3000000,
    powerSurchargePercent: 3,
    powerThreshold: 50,
    payPrepayment: 10,
    payAdvance: 40,
    payInterim: 25,
    payFinal: 25
};

// CubeSat pricing: flat fee per U (45,000 × U)
const CUBESAT_PRICE_PER_U = 45000;

// Wizard state
let selectedPayloadType = null;  // 'cubesat' | 'mdl' | 'other'
let selectedCubesatU = null;     // 1–6
let selectedMDL = null;          // 1–2
let wizardComplete = false;

// Current pricing configuration
let currentPricing = { ...DEFAULT_PRICING };

// Quote data
let currentQuote = null;

// Initialize
// Global mission type variable
let selectedMissionType = 'shared'; // Default: Shared Phoenix Flight

// Global funding source variable
let fundingSource = null; // Default: No selection

document.addEventListener('DOMContentLoaded', () => {
    console.log('📋 DOMContentLoaded fired');
    loadPricingFromStorage();
    console.log('✓ loadPricingFromStorage');
    setupWizard();
    console.log('✓ setupWizard');
    setupSettings();
    console.log('✓ setupSettings');
    setupForm();
    console.log('✓ setupForm');
    setupMissionTypeSelector();
    console.log('✓ setupMissionTypeSelector');
    setupFundingSourceSelector();
    console.log('✓ setupFundingSourceSelector');
    setupModalHandlers();
    console.log('✓ setupModalHandlers');
    setupMissionDurationSlider();
    console.log('✓ setupMissionDurationSlider');
    populateLaunchDate();
    console.log('✓ populateLaunchDate - ALL SETUP COMPLETE');
});

// ─────────────────────────────────────────────// MISSION TYPE SELECTOR
// ─────────────────────────────────────────────────────

function setupMissionTypeSelector() {
    const missionTypeRadios = document.querySelectorAll('input[name="missionType"]');
    
    missionTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                selectedMissionType = this.value;
                console.log('✅ Mission Type selected:', selectedMissionType);
                recalculate(); // Trigger recalculation with new mission type
            }
        });
    });
    
    // Initialize with default selected value
    const defaultRadio = document.querySelector('input[name="missionType"]:checked');
    if (defaultRadio) {
        selectedMissionType = defaultRadio.value;
    }
}

// ─────────────────────────────────────────────────────// WIZARD LOGIC
// ─────────────────────────────────────────────

function setupWizard() {
    // Step 1: payload type buttons
    document.querySelectorAll('.wizard-option[data-type]').forEach(btn => {
        btn.addEventListener('click', () => selectPayloadType(btn.dataset.type));
    });

    // Step 2a: CubeSat size buttons
    document.querySelectorAll('.cubesat-btn').forEach(btn => {
        btn.addEventListener('click', () => selectCubesat(btn));
    });

    // Step 2b: MDL count buttons
    document.querySelectorAll('.mdl-btn').forEach(btn => {
        btn.addEventListener('click', () => selectMDL(btn));
    });

    // Back buttons
    document.getElementById('backToStep1a').addEventListener('click', goToStep1);
    document.getElementById('backToStep1b').addEventListener('click', goToStep1);

    // Change selection
    document.getElementById('wizardChangeBtn').addEventListener('click', resetWizard);
}

function selectPayloadType(type) {
    selectedPayloadType = type;
    document.querySelectorAll('.wizard-option[data-type]').forEach(b => b.classList.remove('selected'));
    document.querySelector(`.wizard-option[data-type="${type}"]`).classList.add('selected');

    if (type === 'cubesat') {
        showStep('step2cubesat');
    } else if (type === 'mdl') {
        showStep('step2mdl');
    } else {
        // 'other' — skip step 2, go straight to form
        completeWizard('Other / Custom', null, null);
    }
}

function selectCubesat(btn) {
    const u = parseInt(btn.dataset.u);
    const mass = parseFloat(btn.dataset.mass);
    const volume = parseFloat(btn.dataset.volume);
    selectedCubesatU = u;

    // Override basePricePerKg so total = 45000 × U (flat CubeSat price)
    // We set mass to the proper value and basePricePerKg so mass×price = 45000×U
    const flatPrice = CUBESAT_PRICE_PER_U * u;
    currentPricing.basePricePerKg = flatPrice / mass;
    document.getElementById('basePricePerKg').value = currentPricing.basePricePerKg.toFixed(2);

    // Pre-fill mass and volume fields
    const massInput = document.getElementById('mass');
    const volumeInput = document.getElementById('volume');
    if (massInput) { massInput.value = mass; massInput.dispatchEvent(new Event('input')); }
    if (volumeInput) { volumeInput.value = volume; volumeInput.dispatchEvent(new Event('input')); }
    document.getElementById('mdl').value = 0;
    document.getElementById('power').value = 5;

    completeWizard(`${u}U CubeSat`, u, null);
}

function selectMDL(btn) {
    const mdlCount = parseInt(btn.dataset.mdl);
    const mass = parseFloat(btn.dataset.mass);
    const volume = parseFloat(btn.dataset.volume);
    selectedMDL = mdlCount;

    // Reset base price to default for MDL
    currentPricing.basePricePerKg = DEFAULT_PRICING.basePricePerKg;
    document.getElementById('basePricePerKg').value = DEFAULT_PRICING.basePricePerKg;

    // Pre-fill fields
    const massInput = document.getElementById('mass');
    const volumeInput = document.getElementById('volume');
    if (massInput) { massInput.value = mass; massInput.dispatchEvent(new Event('input')); }
    if (volumeInput) { volumeInput.value = volume; volumeInput.dispatchEvent(new Event('input')); }
    document.getElementById('mdl').value = mdlCount;
    document.getElementById('mdl').dispatchEvent(new Event('input'));

    completeWizard(`${mdlCount} Mid Deck Locker${mdlCount > 1 ? 's' : ''}`, null, mdlCount);
}

function completeWizard(label, cubesatU, mdlCount) {
    wizardComplete = true;
    const icon = selectedPayloadType === 'cubesat' ? '📦' : selectedPayloadType === 'mdl' ? '🗄️' : '⚗️';
    document.getElementById('wizardSelectedText').textContent = `${icon} ${label} selected`;
    showStep('wizardSelected');
    // Trigger live price recalculation
    recalculate();
}

function goToStep1() {
    showStep('step1');
    selectedPayloadType = null;
}

function resetWizard() {
    selectedPayloadType = null;
    selectedCubesatU = null;
    selectedMDL = null;
    wizardComplete = false;
    currentPricing.basePricePerKg = DEFAULT_PRICING.basePricePerKg;
    document.getElementById('basePricePerKg').value = DEFAULT_PRICING.basePricePerKg;
    showStep('step1');
    document.querySelectorAll('.wizard-option').forEach(b => b.classList.remove('selected'));
    recalculate();
}

function showStep(stepId) {
    // Hide all steps and the selected badge
    ['step1','step2cubesat','step2mdl','wizardSelected'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(stepId);
    if (target) target.classList.remove('hidden');
}

// ─────────────────────────────────────────────
// SETTINGS LOGIC
// ─────────────────────────────────────────────

function setupSettings() {
    const settingsToggleBtn = document.getElementById('settingsToggleBtn');
    const settingsDrawer = document.getElementById('settingsDrawer');
    const resetSettingsBtn = document.getElementById('resetSettings');

    if (settingsToggleBtn) {
        settingsToggleBtn.addEventListener('click', () => {
            settingsDrawer.classList.toggle('open');
            settingsToggleBtn.textContent = settingsDrawer.classList.contains('open')
                ? '✕ Close Settings'
                : '⚙️ Pricing Settings';
        });
    }

    if (resetSettingsBtn) resetSettingsBtn.addEventListener('click', resetSettings);

    ['basePricePerKg','volumeSurchargePercent','mdlFeePerLocker','powerSurchargePercent',
     'payPrepayment','payAdvance','payInterim','payFinal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => { updatePricing(); recalculate(); });
    });
}

function updatePricing() {
    currentPricing = {
        basePricePerKg: parseFloat(document.getElementById('basePricePerKg').value) || DEFAULT_PRICING.basePricePerKg,
        volumeSurchargePercent: parseFloat(document.getElementById('volumeSurchargePercent').value) || 0,
        mdlFeePerLocker: parseFloat(document.getElementById('mdlFeePerLocker').value) || 0,
        powerSurchargePercent: parseFloat(document.getElementById('powerSurchargePercent').value) || 0,
        powerThreshold: DEFAULT_PRICING.powerThreshold,
        payPrepayment: parseFloat(document.getElementById('payPrepayment').value) ?? DEFAULT_PRICING.payPrepayment,
        payAdvance:    parseFloat(document.getElementById('payAdvance').value)    ?? DEFAULT_PRICING.payAdvance,
        payInterim:    parseFloat(document.getElementById('payInterim').value)    ?? DEFAULT_PRICING.payInterim,
        payFinal:      parseFloat(document.getElementById('payFinal').value)      ?? DEFAULT_PRICING.payFinal
    };
    savePricingToStorage();
}

function resetSettings() {
    currentPricing = { ...DEFAULT_PRICING };
    document.getElementById('basePricePerKg').value = DEFAULT_PRICING.basePricePerKg;
    document.getElementById('volumeSurchargePercent').value = DEFAULT_PRICING.volumeSurchargePercent;
    document.getElementById('mdlFeePerLocker').value = DEFAULT_PRICING.mdlFeePerLocker;
    document.getElementById('powerSurchargePercent').value = DEFAULT_PRICING.powerSurchargePercent;
    document.getElementById('payPrepayment').value = DEFAULT_PRICING.payPrepayment;
    document.getElementById('payAdvance').value    = DEFAULT_PRICING.payAdvance;
    document.getElementById('payInterim').value    = DEFAULT_PRICING.payInterim;
    document.getElementById('payFinal').value      = DEFAULT_PRICING.payFinal;
    savePricingToStorage();
    recalculate();
}

// ─────────────────────────────────────────────────────
// STORAGE
// ─────────────────────────────────────────────────────

function savePricingToStorage() {
    localStorage.setItem('phoenixPricing', JSON.stringify(currentPricing));
}

function loadPricingFromStorage() {
    const stored = localStorage.getItem('phoenixPricing');
    if (stored) {
        try {
            const p = JSON.parse(stored);
            currentPricing = { ...DEFAULT_PRICING, ...p };
            document.getElementById('basePricePerKg').value = currentPricing.basePricePerKg;
            document.getElementById('volumeSurchargePercent').value = currentPricing.volumeSurchargePercent;
            document.getElementById('mdlFeePerLocker').value = currentPricing.mdlFeePerLocker;
            document.getElementById('powerSurchargePercent').value = currentPricing.powerSurchargePercent;
        } catch (e) { /* ignore corrupt storage */ }
    }
}

// ─────────────────────────────────────────────────────
// FORM SETUP (live recalculation)
// ─────────────────────────────────────────────────────

function setupForm() {
    // Live recalculate on every input change
    ['mass','volume','mdl','power','customerName','missionName','launchDate','lateAccessRequired','launcherType','missionDurationSlider'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', recalculate);
        if (el) el.addEventListener('change', recalculate);
    });

    // Auto-set launch date based on mission name
    const missionSelect = document.getElementById('missionName');
    if (missionSelect) {
        missionSelect.addEventListener('change', function() {
            updateLaunchDateFromMission(this.value);
        });
    }

    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => applyPreset(btn));
    });

    // Generate Mission Order button
    document.getElementById('generateMissionOrder').addEventListener('click', generateMissionOrderFile);
}

// ─────────────────────────────────────────────────────
// MODAL HANDLERS - Payload Integration Details
// ─────────────────────────────────────────────────────

function setupModalHandlers() {
    console.log('🪟 setupModalHandlers called');
    const modal = document.getElementById('payloadModal');
    const openBtn = document.getElementById('payloadDetailsBtn');
    const closeBtn = document.getElementById('modalCloseBtn');
    const confirmBtn = document.getElementById('modalConfirmBtn');
    
    console.log('   - payloadModal element:', modal);
    console.log('   - payloadDetailsBtn element:', openBtn);
    console.log('   - modalCloseBtn element:', closeBtn);
    console.log('   - modalConfirmBtn element:', confirmBtn);

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            console.log('   📋 Open button clicked');
            openPayloadModal();
        });
        console.log('   ✓ Open button listener attached');
    } else {
        console.error('   ❌ ERROR: payloadDetailsBtn not found');
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('   ✓ Close button clicked');
            closePayloadModal();
        });
        console.log('   ✓ Close button listener attached');
    }
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            console.log('   ✓ Confirm button clicked');
            closePayloadModal();
        });
        console.log('   ✓ Confirm button listener attached');
    }
    
    // Close modal when clicking outside the panel
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                console.log('   ✓ Clicked outside modal');
                closePayloadModal();
            }
        });
        console.log('   ✓ Outside click listener attached');
    }
}

function openPayloadModal() {
    console.log('🪟 openPayloadModal called');
    const modal = document.getElementById('payloadModal');
    console.log('   - modal element:', modal);
    if (modal) {
        console.log('   - adding active class');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('   ✓ Modal should now be visible');
    } else {
        console.error('   ❌ ERROR: Modal element not found!');
    }
}

function closePayloadModal() {
    console.log('🪟 closePayloadModal called');
    const modal = document.getElementById('payloadModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        console.log('   ✓ Modal closed');
    } else {
        console.error('   ❌ ERROR: Modal element not found!');
    }
}

// ─────────────────────────────────────────────────────
// MISSION DURATION SLIDER
// ─────────────────────────────────────────────────────

function setupMissionDurationSlider() {
    console.log('🎚️ setupMissionDurationSlider called');
    const slider = document.getElementById('missionDurationSlider');
    const durationValue = document.getElementById('durationValue');
    const midPhaseTitle = document.getElementById('midPhaseTitle');
    
    console.log('   - slider element:', slider);
    console.log('   - durationValue element:', durationValue);
    console.log('   - midPhaseTitle element:', midPhaseTitle);
    
    if (!slider) {
        console.error('   ❌ ERROR: missionDurationSlider element not found!');
        return;
    }
    
    // Update on input
    slider.addEventListener('input', function() {
        console.log('   🎚️ Slider input event fired, value:', this.value);
        updateMissionDuration(parseInt(this.value), durationValue, midPhaseTitle);
        recalculate();
    });
    
    console.log('   ✓ Slider input listener attached');
    
    // Initial setup
    updateMissionDuration(3, durationValue, midPhaseTitle);
    console.log('   ✓ Initial duration set to 3 weeks');
}

function updateMissionDuration(weeks, durationValue, midPhaseTitle) {
    console.log('📊 updateMissionDuration called with weeks:', weeks);
    
    // Update the duration display
    if (durationValue) {
        durationValue.textContent = weeks;
        console.log('   ✓ Updated durationValue to:', weeks);
    } else {
        console.error('   ❌ durationValue element is null');
    }
    
    // Calculate middle weeks
    const middleWeeks = weeks - 2; // Subtract week 1 and final week
    
    // Update the middle phase title
    if (midPhaseTitle) {
        midPhaseTitle.textContent = `🚀 Operations (${middleWeeks} ${middleWeeks === 1 ? 'week' : 'weeks'})`;
        console.log('   ✓ Updated midPhaseTitle');
    } else {
        console.error('   ❌ midPhaseTitle element is null');
    }
    
    // Show/hide the middle phase container based on duration
    const midPhaseContainer = document.getElementById('midPhaseContainer');
    if (midPhaseContainer) {
        if (weeks === 3) {
            // For 3 weeks, show the middle phase but with minimal content
            midPhaseContainer.style.display = 'block';
        } else {
            midPhaseContainer.style.display = 'block';
        }
        console.log('   ✓ Updated midPhaseContainer display');
    } else {
        console.error('   ❌ midPhaseContainer element not found');
    }
}

// Mission name to launch date mapping
const missionDates = {
    'Phoenix 2.1': '2026-12',  // Dec/2026
    'Phoenix 2.2': '2027-04',  // Apr/2027
    'Phoenix 2.3': '2027-08',  // Aug/2027
    'Phoenix 2.4': '2028-01'   // Jan/2028
};

// Auto-update launch date when mission changes
function updateLaunchDateFromMission(missionName) {
    const launchDateInput = document.getElementById('launchDate');
    if (missionDates[missionName]) {
        launchDateInput.value = missionDates[missionName];
        recalculate(); // Trigger recalculation with new date
    }
}

function populateLaunchDate() {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);
    const launchEl = document.getElementById('launchDate');
    launchEl.min = new Date().toISOString().split('T')[0];
    launchEl.value = date.toISOString().split('T')[0];
}

function applyPreset(btn) {
    document.getElementById('mass').value   = btn.dataset.mass;
    document.getElementById('volume').value = btn.dataset.volume;
    document.getElementById('mdl').value    = btn.dataset.mdl;
    document.getElementById('power').value  = btn.dataset.power;
    if (btn.dataset.name) {
        const missionName = btn.dataset.name;
        document.getElementById('missionName').value = missionName;
        updateLaunchDateFromMission(missionName); // Auto-set launch date
    }
    recalculate();
}

// ─────────────────────────────────────────────────────
// PRICING CALCULATION
// ─────────────────────────────────────────────────────

function calculatePricing(mass, volume, mdl, power, payloadType) {
    const isMDL = payloadType === 'mdl';

    // MDL: flat fee only — no mass or volume cost
    const baseCost       = isMDL ? 0 : mass * currentPricing.basePricePerKg;
    const volumeSurcharge = isMDL ? 0 : baseCost * (volume * (currentPricing.volumeSurchargePercent / 100));
    const mdlCost        = mdl * currentPricing.mdlFeePerLocker;

    // Power surcharge base: MDL fee when MDL, otherwise mass-based cost
    const powerBase = isMDL ? mdlCost : baseCost;
    let powerCost = 0;
    if (power > currentPricing.powerThreshold) {
        const excess = power - currentPricing.powerThreshold;
        powerCost = powerBase * (excess * (currentPricing.powerSurchargePercent / 100));
    }

    const totalCost = baseCost + volumeSurcharge + mdlCost + powerCost;
    return {
        baseCost,
        volumeSurcharge,
        mdlCost,
        powerCost,
        totalCost,
        isMDL,
        density: volume > 0 ? mass / volume : 0,
        costPerLiter: volume > 0 ? totalCost / volume : 0
    };
}

// ─────────────────────────────────────────────────────
// LIVE RECALCULATE (called on every input change)
// ─────────────────────────────────────────────────────

function recalculate() {
    const mass   = parseFloat(document.getElementById('mass').value)   || 0;
    const volume = parseFloat(document.getElementById('volume').value) || 0;
    const mdl    = parseInt(document.getElementById('mdl').value)      || 0;
    const power  = parseFloat(document.getElementById('power').value)  || 0;
    const customerName = document.getElementById('customerName').value.trim();

    updateCapacityBars(mass, volume, mdl, power);

    const isMDL = selectedPayloadType === 'mdl';

    // For MDL, only MDL count and power are needed — mass/volume not required
    if (!isMDL && (!mass || !volume)) {
        document.getElementById('liveTotalCost').textContent = '€ 0';
        document.getElementById('readinessLabel').textContent = 'Fill in mass & volume to calculate';
        document.getElementById('generateMissionOrder').disabled = true;
        updateBreakdown(null);
        return;
    }
    if (isMDL && !mdl) {
        document.getElementById('liveTotalCost').textContent = '€ 0';
        document.getElementById('readinessLabel').textContent = 'Select number of MDL lockers';
        document.getElementById('generateMissionOrder').disabled = true;
        updateBreakdown(null);
        return;
    }

    const pricing = calculatePricing(mass, volume, mdl, power, selectedPayloadType);

    // Live total
    document.getElementById('liveTotalCost').textContent = formatEuro(pricing.totalCost);

    // Readiness label
    const ready = customerName && document.getElementById('launchDate').value;
    document.getElementById('readinessLabel').textContent = ready
        ? '✅ Ready to generate mission order'
        : 'Add customer name to generate mission order';
    document.getElementById('generateMissionOrder').disabled = !ready;

    updateBreakdown(pricing, mass, volume, mdl, power);
    updateMetrics(pricing, mass, volume);

    // Store current quote
    currentQuote = {
        missionType: selectedMissionType,
        fundingSource: fundingSource,
        customerName,
        mass, volume, mdl, power,
        missionName: document.getElementById('missionName').value.trim() || `Phoenix Mission — ${new Date().toLocaleDateString()}`,
        launchDate: document.getElementById('launchDate').value,
        lateAccessRequired: document.getElementById('lateAccessRequired').value,
        launcherType: document.getElementById('launcherType').value,
        missionDuration: parseInt(document.getElementById('missionDurationSlider').value) || 3,
        pricing,
        pricingConfig: { ...currentPricing },
        payloadType: selectedPayloadType,
        cubesatU: selectedCubesatU,
        timestamp: new Date().toISOString()
    };
}

function updateBreakdown(pricing, mass, volume, mdl, power) {
    if (!pricing) {
        ['baseCost','volumeCost','mdlCost','powerCost'].forEach(id => {
            document.getElementById(id).textContent = '€ 0';
        });
        document.getElementById('baseCostSub').textContent   = '-- kg × €/kg';
        document.getElementById('volumeCostSub').textContent = '-- L × 15%';
        document.getElementById('mdlCostSub').textContent    = '0 lockers × €3M';
        document.getElementById('powerCostSub').textContent  = '≤50W — no surcharge';
        return;
    }

    const isMDL = pricing.isMDL;

    document.getElementById('baseCost').textContent   = isMDL ? 'N/A' : formatEuro(pricing.baseCost);
    document.getElementById('volumeCost').textContent = isMDL ? 'N/A' : formatEuro(pricing.volumeSurcharge);
    document.getElementById('mdlCost').textContent    = formatEuro(pricing.mdlCost);
    document.getElementById('powerCost').textContent  = formatEuro(pricing.powerCost);

    document.getElementById('baseCostSub').textContent   = isMDL ? 'Included in MDL flat fee' : `${mass} kg × ${formatEuro(currentPricing.basePricePerKg)}/kg`;
    document.getElementById('volumeCostSub').textContent = isMDL ? 'Included in MDL flat fee' : `${volume} L × ${currentPricing.volumeSurchargePercent}%`;
    document.getElementById('mdlCostSub').textContent    = `${mdl} locker(s) × ${formatEuro(currentPricing.mdlFeePerLocker)} flat`;
    document.getElementById('powerCostSub').textContent  = power > currentPricing.powerThreshold
        ? `${power - currentPricing.powerThreshold}W excess × ${currentPricing.powerSurchargePercent}%`
        : `≤${currentPricing.powerThreshold}W — no surcharge`;
}

function updateMetrics(pricing, mass, volume) {
    document.getElementById('metricDensity').textContent = volume > 0 ? (mass / volume).toFixed(3) : '—';
    document.getElementById('metricPerKg').textContent   = mass > 0 ? formatEuro(pricing.totalCost / mass) : '—';
    document.getElementById('metricPerL').textContent    = volume > 0 ? formatEuro(pricing.costPerLiter) : '—';
}

function updateCapacityBars(mass, volume, mdl, power) {
    setBar('massBar',   'massLabel',   mass,   100,  `${mass} / 100 kg`);
    setBar('volumeBar', 'volumeLabel', volume, 300,  `${volume} / 300 L`);
    setBar('mdlBar',    'mdlLabel',    mdl,    2,    `${mdl} / 2 lockers`);
    setBar('powerBar',  'powerLabel',  power,  135,  `${power} / 135 W`);
}

function setBar(barId, labelId, value, max, labelText) {
    const pct = Math.min(100, (value / max) * 100);
    const bar = document.getElementById(barId);
    bar.style.width = pct + '%';
    bar.style.background = pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#22c55e';
    document.getElementById(labelId).textContent = labelText;
}

// ─────────────────────────────────────────────────────
// FORMAT HELPER
// ─────────────────────────────────────────────────────

function formatEuro(value) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// ─────────────────────────────────────────────────────
// MISSION ORDER FILE DOWNLOAD
// ─────────────────────────────────────────────────────

function generateMissionOrderFile() {
    if (!currentQuote) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });

    const PW = 210, PH = 297, L = 20, R = 190;
    const CW = R - L;
    let cy = 0;

    const { customerName, mass, volume, mdl, power, missionName, launchDate,
            pricing, pricingConfig, payloadType, cubesatU } = currentQuote;

    const quoteNo    = `PHOENIX-${Date.now()}`;
    const today      = new Date().toISOString().split('T')[0];
    const validUntil = (() => { const d = new Date(); d.setDate(d.getDate() + 30); return d.toISOString().split('T')[0]; })();
    const payloadLabel = payloadType === 'cubesat'
        ? `${cubesatU}U CubeSat (${formatEuro(cubesatU * 45000)} flat rate)`
        : payloadType === 'mdl' ? `Mid Deck Locker × ${mdl}` : 'Custom / Other';

    // ── helpers ───────────────────────────────────────────────────────
    const font = (s, sz, c) => {
        doc.setFont('helvetica', s || 'normal');
        doc.setFontSize(sz || 9.5);
        doc.setTextColor(...(c || [50, 50, 50]));
    };
    const at    = (str, x, y, o) => doc.text(str, x, y, o || {});
    const gap   = d  => { cy += d || 5; };
    const block = (str, x, w, sz, style, col) => {
        font(style, sz, col);
        const lines = doc.splitTextToSize(str, w || CW);
        doc.text(lines, x || L, cy);
        cy += lines.length * ((sz || 9.5) * 0.42) + 2;
    };
    const rule = (col, lw) => {
        doc.setDrawColor(...(col || [190, 200, 215]));
        doc.setLineWidth(lw || 0.25);
        doc.line(L, cy, R, cy);
    };
    const artTitle = (num, title) => {
        font('bold', 9.5, [5, 15, 50]);
        at(num, L, cy); at(title, L + 32, cy); cy += 7;
    };
    const checkSpace = needed => {
        if (cy + (needed || 25) > PH - 18) {
            doc.addPage(); cy = 15;
            font('italic', 7.5, [160, 160, 160]);
            at(`Mission Order — ${missionName} — CONFIDENTIAL`, L, cy);
            at(quoteNo, R, cy, { align: 'right' });
            cy += 3;
            doc.setDrawColor(205, 210, 220); doc.setLineWidth(0.15);
            doc.line(L, cy, R, cy);
            cy += 5;
        }
    };

    // ── navy header bar ───────────────────────────────────────────────
    doc.setFillColor(5, 15, 50);
    doc.rect(0, 0, PW, 20, 'F');
    font('bold', 16, [255, 255, 255]);   at('ATMOS·', L, 13);
    font('normal', 7, [160, 200, 255]);  at('SPACE CARGO', L, 18);
    font('normal', 8, [200, 220, 255]);
    at(quoteNo, R, 10, { align: 'right' });
    at(`${today} (UTC)   ·   Valid until: ${validUntil}`, R, 15, { align: 'right' });
    cy = 28;

    // ── title block ───────────────────────────────────────────────────
    font('bold', 18, [5, 15, 50]);
    at('MISSION ORDER', PW / 2, cy, { align: 'center' }); cy += 7;
    font('normal', 9, [120, 120, 120]);
    at(`No. ${quoteNo}`, PW / 2, cy, { align: 'center' }); cy += 5;
    font('italic', 9.5, [90, 90, 90]);
    at('Under Phoenix Service Agreement', PW / 2, cy, { align: 'center' }); cy += 6;
    font('bold', 13, [0, 51, 153]);
    at(missionName, PW / 2, cy, { align: 'center' }); cy += 9;
    doc.setDrawColor(0, 51, 153); doc.setLineWidth(0.6);
    doc.line(L, cy, R, cy); cy += 8;

    // ── parties ───────────────────────────────────────────────────────
    font('italic', 9.5, [110, 110, 110]); at('between', L, cy); cy += 7;

    font('bold', 9.5, [5, 15, 50]); at('Atmos Space Cargo GmbH,', L, cy); cy += 5;
    block(
        'a company established at Im Gewerbegebiet 3, 77839 Lichtenau, Germany, ' +
        'registered at the trade register Mannheim under registration number HRB 741961, ' +
        'represented by Mr. Sebastian Klaus, acting as CEO ("Atmos"),',
        L, CW, 9.5, 'normal', [65, 65, 65]
    );
    cy += 2;

    font('italic', 9.5, [110, 110, 110]); at('and', L, cy); cy += 7;

    font('bold', 9.5, [5, 15, 50]); at(`${customerName},`, L, cy); cy += 5;
    font('normal', 9.5, [65, 65, 65]); at('(the "Customer")', L, cy); cy += 7;

    block(
        'together referred to as "Parties" and individually also as "Party"',
        L, CW, 9.5, 'italic', [110, 110, 110]
    );
    cy += 3;
    rule(); cy += 7;

    // ── article 1: subject matter ─────────────────────────────────────
    checkSpace(40);
    artTitle('ARTICLE 1', 'SUBJECT MATTER');

    font('bold', 9, [5, 15, 50]); at('1.1', L, cy);
    block(
        `This Mission Order covers the following Mission: "${missionName}", utilizing SpaceX's ` +
        `Falcon 9 Bandwagon rideshare service at 53 \u00b1 0.1\u00b0 inclination, 500\u2013600 km orbit, ` +
        `scheduled for launch on ${launchDate}.`,
        L + 10, CW - 10, 9.5, 'normal', [65, 65, 65]
    );
    cy += 2;

    checkSpace(15);
    font('bold', 9, [5, 15, 50]); at('1.2', L, cy);
    block(
        `Payload specification: ${payloadLabel}. ` +
        `Mass: ${mass} kg. Volume: ${volume} L. Mid Deck Lockers (MDL): ${mdl}. Power: ${power} W.`,
        L + 10, CW - 10, 9.5, 'normal', [65, 65, 65]
    );
    cy += 4;
    rule(); cy += 7;

    // ── article 2: price and payments ────────────────────────────────
    checkSpace(90);
    artTitle('ARTICLE 2', 'PRICE AND PAYMENTS');

    font('normal', 9.5, [65, 65, 65]);
    at('2.1   The service fee for the present Mission Order amounts to:', L, cy); cy += 9;

    font('bold', 20, [5, 15, 50]);
    at(formatEuro(pricing.totalCost), PW / 2, cy, { align: 'center' }); cy += 11;

    // Pricing breakdown table
    doc.autoTable({
        startY: cy,
        head: [['Cost Component', 'Calculation', 'Amount (EUR)']],
        body: [
            ['Base Cost',
             `${mass} kg \u00d7 ${formatEuro(pricingConfig.basePricePerKg)}/kg`,
             formatEuro(pricing.baseCost)],
            ['Volume Surcharge',
             `${volume} L \u00d7 ${pricingConfig.volumeSurchargePercent}% on base`,
             formatEuro(pricing.volumeSurcharge)],
            ['MDL Premium',
             `${mdl} locker(s) \u00d7 ${formatEuro(pricingConfig.mdlFeePerLocker)}`,
             formatEuro(pricing.mdlCost)],
            ['Power Surcharge',
             power > pricingConfig.powerThreshold
                ? `${power - pricingConfig.powerThreshold} W excess \u00d7 ${pricingConfig.powerSurchargePercent}%`
                : `\u226450 W \u2014 no surcharge`,
             formatEuro(pricing.powerCost)],
        ],
        foot: [['TOTAL MISSION COST', '', formatEuro(pricing.totalCost)]],
        margin: { left: L, right: PW - R },
        headStyles: { fillColor: [5, 15, 50], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8.5 },
        bodyStyles: { fontSize: 8.5, textColor: [60, 60, 60] },
        footStyles: { fillColor: [225, 235, 255], textColor: [5, 15, 50], fontStyle: 'bold', fontSize: 10 },
        columnStyles: {
            0: { cellWidth: 46, fontStyle: 'bold' },
            2: { cellWidth: 44, halign: 'right', fontStyle: 'bold' }
        },
        alternateRowStyles: { fillColor: [248, 250, 255] },
        theme: 'grid',
    });
    cy = doc.lastAutoTable.finalY + 5;

    checkSpace(20);
    block(
        '2.2   Additional services: Mechanical interface design / structural simulations: \u20ac110/hour. ' +
        'External antenna mounting: \u20ac110/hour. ' +
        'If payload mass exceeds 100 kg: \u20ac50,000/kg (before L\u22128 months), ' +
        '\u20ac65,000/kg (after L\u22128 months), \u20ac80,000/kg (at launch site).',
        L, CW, 8.5, 'normal', [110, 110, 110]
    );
    cy += 3;

    checkSpace(42);
    font('normal', 9.5, [65, 65, 65]);
    at('2.3   Payment milestones:', L, cy); cy += 6;
    doc.autoTable({
        startY: cy,
        head: [['Payment Type', 'Date / Milestone', '% of Total Fee']],
        body: [
            ['Prepayment',       'At contract signature',            `${pricingConfig.payPrepayment}%`],
            ['Advance Payment',  'Signature of this Mission Order',  `${pricingConfig.payAdvance}%`],
            ['Interim Payment',  'Payload FM handover',              `${pricingConfig.payInterim}%`],
            ['Final Payment',    'Payload launch',                   `${pricingConfig.payFinal}%`],
        ],
        margin: { left: L, right: PW - R + 35 },
        headStyles: { fillColor: [5, 15, 50], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8.5 },
        bodyStyles: { fontSize: 8.5, textColor: [60, 60, 60] },
        alternateRowStyles: { fillColor: [248, 250, 255] },
        theme: 'grid',
    });
    cy = doc.lastAutoTable.finalY + 6;
    rule(); cy += 7;

    // ── article 3: contact persons ────────────────────────────────────
    checkSpace(60);
    artTitle('ARTICLE 3', 'CONTACT PERSONS');

    font('normal', 9.5, [65, 65, 65]);
    at('3.1   For the purpose of this Mission Order, the relevant contact persons are:', L, cy); cy += 7;

    // Two-column: ATMOS left, Customer right
    const C2   = L + CW / 2 + 5;
    const ySave = cy;

    // LEFT — ATMOS
    font('bold', 9, [5, 15, 50]);    at('Atmos Space Cargo GmbH:', L, cy);  cy += 5;
    font('italic', 8.5, [90, 90, 90]); at('Mission Manager:', L, cy);        cy += 4.5;
    font('bold', 9, [40, 40, 40]);     at('Juliana Merege', L, cy);          cy += 4.5;
    font('normal', 8.5, [80, 80, 80]);
    at('Im Gewerbegebiet 3-5', L, cy);                                        cy += 4;
    at('77839 Lichtenau, Germany', L, cy);                                    cy += 4;
    at('juliana.merege@atmos-space-cargo.com', L, cy);                        cy += 4;
    at('+33 6 09 13 50 25', L, cy);
    const yAfterLeft = cy + 6;

    cy = ySave;

    // RIGHT — Customer
    font('bold', 9, [5, 15, 50]);       at('Customer:', C2, cy);              cy += 5;
    font('bold', 9, [40, 40, 40]);      at(customerName, C2, cy);             cy += 4.5;
    font('italic', 8.5, [120, 120, 120]); at('(Contact details as provided)', C2, cy);

    cy = yAfterLeft;
    rule(); cy += 7;

    // ── article 4: entry into force ───────────────────────────────────
    checkSpace(35);
    artTitle('ARTICLE 4', 'ENTRY INTO FORCE, DURATION');

    font('bold', 9, [5, 15, 50]); at('4.1', L, cy);
    block(
        'This Mission Order enters into force on the date on which the last Party has signed it.',
        L + 10, CW - 10, 9.5, 'normal', [65, 65, 65]
    );
    cy += 2;

    font('bold', 9, [5, 15, 50]); at('4.2', L, cy);
    block(
        'The period of provision of the services is foreseen to start from the date of signature ' +
        'and to last until the conclusion of the Post-Mission Review Meeting.',
        L + 10, CW - 10, 9.5, 'normal', [65, 65, 65]
    );
    cy += 6;

    doc.setDrawColor(0, 51, 153); doc.setLineWidth(0.5);
    doc.line(L, cy, R, cy); cy += 11;

    // ── signatures ────────────────────────────────────────────────────
    checkSpace(58);
    font('bold', 10.5, [5, 15, 50]);
    at('SIGNATURES', PW / 2, cy, { align: 'center' }); cy += 10;

    const halfW  = (CW - 12) / 2;
    const sigR   = L + halfW + 12;
    const sigSave = cy;

    // LEFT: ATMOS signed block
    font('bold', 9, [5, 15, 50]);    at('For Atmos Space Cargo GmbH', L, cy);     cy += 5;
    font('normal', 8.5, [100, 100, 100]);
    at(`Lichtenau, Germany, ________ ${new Date().getFullYear()}`, L, cy);           cy += 16;
    doc.setDrawColor(100, 100, 100); doc.setLineWidth(0.3);
    doc.line(L, cy, L + halfW, cy);                                                  cy += 5;
    font('bold', 9, [40, 40, 40]);   at('Sebastian Klaus, CEO', L, cy);             cy += 4;
    font('normal', 8, [100, 100, 100]); at('Atmos Space Cargo GmbH', L, cy);
    const yAfterSigLeft = cy + 5;

    cy = sigSave;

    // RIGHT: Customer blank signature block
    font('bold', 9, [5, 15, 50]);    at('For Customer', sigR, cy);                  cy += 5;
    font('normal', 8.5, [100, 100, 100]);
    at(`_________________, ${new Date().getFullYear()}`, sigR, cy);                 cy += 16;
    doc.setDrawColor(100, 100, 100); doc.setLineWidth(0.3);
    doc.line(sigR, cy, sigR + halfW, cy);                                           cy += 5;
    font('bold', 9, [40, 40, 40]);   at(customerName, sigR, cy);                   cy += 4;
    font('italic', 8, [100, 100, 100]); at('Authorized Representative', sigR, cy);

    cy = yAfterSigLeft;

    // ── footer on every page ──────────────────────────────────────────
    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        doc.setDrawColor(190, 200, 215); doc.setLineWidth(0.2);
        doc.line(L, PH - 13, R, PH - 13);
        font('normal', 7.5, [155, 155, 155]);
        at(`Mission Order \u2014 ${missionName} \u2014 CONFIDENTIAL`, L, PH - 8);
        at(`Page ${p} of ${pageCount}`, R, PH - 8, { align: 'right' });
    }

    doc.save(`mission-order-${quoteNo}.pdf`);
}

