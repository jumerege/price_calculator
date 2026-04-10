// Phoenix Experiment Pricing Calculator
// Version 2.0 — with Payload Type Wizard

// Default Pricing Configuration
const DEFAULT_PRICING = {
    basePricePerKg: 45000,
    volumeSurchargePercent: 15,
    mdlFeePerLocker: 3000000,
    powerSurchargePercent: 3,
    powerThreshold: 50
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
document.addEventListener('DOMContentLoaded', () => {
    loadPricingFromStorage();
    setupWizard();
    setupSettings();
    setupForm();
    populateLaunchDate();
});

// ─────────────────────────────────────────────
// WIZARD LOGIC
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

    ['basePricePerKg','volumeSurchargePercent','mdlFeePerLocker','powerSurchargePercent'].forEach(id => {
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
        powerThreshold: DEFAULT_PRICING.powerThreshold
    };
    savePricingToStorage();
}

function resetSettings() {
    currentPricing = { ...DEFAULT_PRICING };
    document.getElementById('basePricePerKg').value = DEFAULT_PRICING.basePricePerKg;
    document.getElementById('volumeSurchargePercent').value = DEFAULT_PRICING.volumeSurchargePercent;
    document.getElementById('mdlFeePerLocker').value = DEFAULT_PRICING.mdlFeePerLocker;
    document.getElementById('powerSurchargePercent').value = DEFAULT_PRICING.powerSurchargePercent;
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
    ['mass','volume','mdl','power','customerName','missionName','launchDate'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', recalculate);
    });

    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => applyPreset(btn));
    });

    // Generate Mission Order button
    document.getElementById('generateMissionOrder').addEventListener('click', generateMissionOrderFile);
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
        document.getElementById('missionName').value = btn.dataset.name;
    }
    recalculate();
}

// ─────────────────────────────────────────────────────
// PRICING CALCULATION
// ─────────────────────────────────────────────────────

function calculatePricing(mass, volume, mdl, power) {
    const baseCost = mass * currentPricing.basePricePerKg;
    const volumeSurcharge = baseCost * (volume * (currentPricing.volumeSurchargePercent / 100));
    const mdlCost = mdl * currentPricing.mdlFeePerLocker;

    let powerCost = 0;
    if (power > currentPricing.powerThreshold) {
        const excess = power - currentPricing.powerThreshold;
        powerCost = baseCost * (excess * (currentPricing.powerSurchargePercent / 100));
    }

    const totalCost = baseCost + volumeSurcharge + mdlCost + powerCost;
    return {
        baseCost,
        volumeSurcharge,
        mdlCost,
        powerCost,
        totalCost,
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

    if (!mass || !volume) {
        document.getElementById('liveTotalCost').textContent = '€ 0';
        document.getElementById('readinessLabel').textContent = 'Fill in mass & volume to calculate';
        document.getElementById('generateMissionOrder').disabled = true;
        updateBreakdown(null);
        return;
    }

    const pricing = calculatePricing(mass, volume, mdl, power);

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
        customerName,
        mass, volume, mdl, power,
        missionName: document.getElementById('missionName').value.trim() || `Phoenix Mission — ${new Date().toLocaleDateString()}`,
        launchDate: document.getElementById('launchDate').value,
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

    document.getElementById('baseCost').textContent   = formatEuro(pricing.baseCost);
    document.getElementById('volumeCost').textContent = formatEuro(pricing.volumeSurcharge);
    document.getElementById('mdlCost').textContent    = formatEuro(pricing.mdlCost);
    document.getElementById('powerCost').textContent  = formatEuro(pricing.powerCost);

    document.getElementById('baseCostSub').textContent   = `${mass} kg × ${formatEuro(currentPricing.basePricePerKg)}/kg`;
    document.getElementById('volumeCostSub').textContent = `${volume} L × ${currentPricing.volumeSurchargePercent}%`;
    document.getElementById('mdlCostSub').textContent    = `${mdl} locker(s) × ${formatEuro(currentPricing.mdlFeePerLocker)}`;
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
    setBar('powerBar',  'powerLabel',  power,  200,  `${power} W`);
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
    const { customerName, mass, volume, mdl, power, missionName, launchDate, pricing, pricingConfig, payloadType, cubesatU } = currentQuote;

    const quoteNumber = `PHOENIX-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const validUntil = (() => { const d = new Date(); d.setDate(d.getDate() + 30); return d.toISOString().split('T')[0]; })();

    const payloadLine = payloadType === 'cubesat'
        ? `Payload Type: ${cubesatU}U CubeSat (flat rate: ${formatEuro(cubesatU * 45000)})`
        : payloadType === 'mdl'
            ? `Payload Type: Mid Deck Locker × ${mdl}`
            : 'Payload Type: Custom / Other';

    const content =
`PHOENIX EXPERIMENT — MISSION ORDER
================================================================================
Quote Number : ${quoteNumber}
Date         : ${today}  (UTC)
Valid Until  : ${validUntil}
================================================================================
CUSTOMER INFORMATION
================================================================================
Customer Name : ${customerName}
Mission Name  : ${missionName}
Target Launch : ${launchDate}
${payloadLine}
================================================================================
EXPERIMENT PARAMETERS
================================================================================
Mass        : ${mass} kg
Volume      : ${volume} L
MDL         : ${mdl} locker(s)
Power       : ${power} W
Density     : ${pricing.density.toFixed(3)} kg/L
================================================================================
PRICING BREAKDOWN
================================================================================
Base Cost          : ${formatEuro(pricing.baseCost)}
  ${mass} kg × ${formatEuro(pricingConfig.basePricePerKg)}/kg
Volume Surcharge   : ${formatEuro(pricing.volumeSurcharge)}
  ${volume} L × ${pricingConfig.volumeSurchargePercent}% on base
MDL Premium        : ${formatEuro(pricing.mdlCost)}
  ${mdl} × ${formatEuro(pricingConfig.mdlFeePerLocker)}
Power Surcharge    : ${formatEuro(pricing.powerCost)}
  ${power > pricingConfig.powerThreshold ? `${power - pricingConfig.powerThreshold}W excess × ${pricingConfig.powerSurchargePercent}%` : `≤${pricingConfig.powerThreshold}W — no surcharge`}
--------------------------------------------------------------------------------
TOTAL MISSION COST : ${formatEuro(pricing.totalCost)}
================================================================================
Cost per kg  : ${formatEuro(pricing.totalCost / mass)}
Cost per L   : ${formatEuro(pricing.costPerLiter)}
================================================================================
TERMS
================================================================================
1. Quote valid 30 days from date above.
2. Includes launch (SpaceX Bandwagon rideshare), orbital operations,
   Phoenix IAD re-entry, recovery, and payload return.
3. All dates subject to SpaceX launch schedule.
4. Additional charges may apply for mechanical interface or antenna work.
================================================================================
ATMOS SPACE CARGO GMBH · Im Gewerbegebiet 3-5 · 77839 Lichtenau, Germany
info@atmos-space-cargo.com · https://www.atmos-space-cargo.com
================================================================================
Generated : ${new Date().toLocaleString()} (local time)
Calculator : Phoenix Pricing Calculator v2.0
================================================================================
`;

    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
    link.download = `mission-order-${quoteNumber}.txt`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
