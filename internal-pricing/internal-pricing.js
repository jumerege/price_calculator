/**
 * Phoenix Internal Pricing Engine
 * ESA-aligned financial modeling tool for mission pricing analysis
 */

// Default values matching ESA structure
const DEFAULTS = {
    // Section A - NRC (Non-Recurring Costs)
    phaseA: 300000,
    phaseB: 800000,
    phaseC: 1800000,
    phaseD: 2100000,
    phaseE: 300000,
    phaseF: 200000,
    missionCount: 20,
    reusabilityFactor: 3,
    
    // Section B - Recurring Costs (stored in euros internally)
    launchCost: 1500000,
    operationsCost: 150000,
    recoveryCost: 200000,
    integrationCost: 150000,  
    refurbishmentCost: 200000,
    logisticsCost: 100000,
    insuranceCost: 100000,
    
    // Section C - Payload & Revenue
    maxPayloadMass: 100,
    maxVolume: 300,
    utilization: 75,
    volumetricFactor: 2,
    
    // Section E - Pricing
    targetMargin: 30
};

/**
 * Tooltip content for each phase
 */
const TOOLTIP_CONTENT = {
    A: {
        title: "Phase A — Feasibility",
        content: "Feasibility assessment of payload integration within Phoenix architecture.\n\nIt includes:\n\n✅ Compatibility checks with mechanical interfaces (payload plate, mounting grid)\n✅ Electrical interfaces (24–33V unregulated or regulated lines)\n✅ Data protocols (Ethernet, CAN)\n✅ Preliminary evaluation of environmental constraints such as vibration, quasi-static loads, and thermal conditions\n✅ Early assessment of reentry survivability and IAD compatibility for mission concept validation"
    },
    B: {
        title: "Phase B — Preliminary Definition",
        content: "Definition of system architecture and payload integration concept.\n\nIt includes:\n\n✅ Interface Control Document (ICD) development\n✅ Payload layout within pressurized bay\n✅ Definition of thermal, electrical, and communication interfaces\n✅ Preliminary sizing of propulsion (de-orbit), avionics (OBC, GPS, IMU), and power subsystems\n✅ Mission timeline definition: launch, orbital operations, and recovery concept in coordination with ground segment"
    },
    C: {
        title: "Phase C — Detailed Definition",
        content: "Detailed engineering design and subsystem validation.\n\nIt includes:\n\n✅ Structural analysis of payload bay\n✅ Thermal modeling\n✅ Vibration and shock verification\n✅ Avionics integration (redundant OBC, sensors, communication systems)\n✅ Finalization of GNC algorithms for reentry trajectory control and IAD deployment\n✅ Payload verification requirements, including EMC, vibration, and pressure testing prior to integration"
    },
    D: {
        title: "Phase D — Qualification and Production",
        content: "Manufacturing, Assembly, Integration, and Testing (AIT) of Phoenix and payload.\n\nIt includes:\n\n✅ Cleanroom payload integration\n✅ Mechanical mating to rideshare adapter\n✅ Electrical connections and system-level validation\n✅ Qualification campaigns covering vibration, thermal, and functional testing\n✅ Final launch readiness reviews and documentation sign-off\n✅ Transport to launch site with late access procedures\n✅ Coordination with launcher providers (e.g., Falcon 9, RFA One)"
    },
    E: {
        title: "Phase E — Utilisation",
        content: "Operational mission phase from launch to payload data acquisition.\n\nIt includes:\n\n✅ Launch and separation\n✅ Orbital flight (3 hours to 3 months)\n✅ Payload operation with telemetry and command via Iridium/UHF/S-band\n✅ De-orbit maneuver execution and IAD deployment\n✅ Controlled reentry covering hypersonic to subsonic descent phases\n✅ Real-time navigation and payload environmental control throughout mission execution"
    },
    F: {
        title: "Phase F — Disposal",
        content: "Final mission phase covering recovery, transportation, and refurbishment assessment.\n\nIt includes:\n\n✅ Ocean landing stabilization\n✅ Telemetry transmission for localization\n✅ Coordinated recovery using boat and aircraft\n✅ Splashdown and recovery\n✅ Transportation to Lichtenau\n✅ Post-mission inspection and data retrieval\n✅ Refurbishment assessment and preparation for reuse or disposal of subsystems\n✅ Transportation from Lichtenau to customer's address (if applicable)"
    },
    insurance: {
        title: "Insurance",
        content: "This cost represents mission-level risk protection. It is modeled separately because it is not a development cost, but a recurring mission cost that may vary depending on launch conditions, payload value, mission profile, and customer risk allocation.\n\nA percentage-based approach is useful because insurance often scales with the economic value at risk during a mission, rather than remaining strictly fixed.\n\nSuggested formula: Insurance = 10% × (Launch + Ops + Recovery + Payload value)\n\nThis formula is only a recommended modeling approach for internal pricing purposes. This field remains manually adjustable—you may enter any value based on your risk assessment and customer requirements."
    },
    missionCount: {
        title: "Number of Missions for Amortization",
        content: "This defines how many missions are used to spread the development cost of Phoenix. Instead of charging all development cost in one mission, it is distributed across multiple flights. More missions reduce cost per mission, while fewer missions increase it. This reflects expected demand over time."
    },
    reusabilityFactor: {
        title: "Reusability Factor (flights per vehicle)",
        content: "This represents how many times a single Phoenix vehicle can be reused. This improves cost efficiency, but may increase refurbishment needs and operational complexity over time. It is reasonable to presume 1 to 3, but not higher than this."
    }
};

/**
 * ============ UNIT CONVERSION SYSTEM ============
 * Allows users to enter values in € or k€
 * Internal calculations always use € (euros)
 */

// Current unit state: 'eur' or 'keur'
let currentInputUnit = 'keur'; // Default: thousands of euros

// List of all monetary field IDs
const monetaryFieldIds = [
    'phaseA', 'phaseB', 'phaseC', 'phaseD',
    'launchCost', 'operationsCost', 'recoveryCost', 'integrationCost',
    'refurbishmentCost', 'logisticsCost', 'insuranceCost'
];

// Map field IDs to tooltip phase keys
const fieldIdToPhase = {
    'phaseA': 'A',
    'phaseB': 'B',
    'phaseC': 'C',
    'phaseD': 'D',
    'phaseE': 'E',
    'phaseF': 'F'
};

// Label map for dynamic field labels
const fieldLabelMap = {
    'phaseA': 'Phase A – Feasibility',
    'phaseB': 'Phase B – Preliminary Design',
    'phaseC': 'Phase C – Detailed Design',
    'phaseD': 'Phase D – Qualification & Manufacturing',
    'phaseE': 'Phase E – Utilisation',
    'phaseF': 'Phase F – Disposal',
    'launchCost': 'Launch Cost (rideshare)',
    'operationsCost': 'Mission Operations',
    'recoveryCost': 'Recovery Operations',
    'integrationCost': 'Payload Integration & AIT',
    'refurbishmentCost': 'Refurbishment Cost',
    'logisticsCost': 'Logistics & Transport',
    'insuranceCost': 'Insurance'
};

/**
 * Convert a display value to euros
 * @param {number} displayValue - The value displayed in the current unit
 * @param {string} unit - The unit ('eur' or 'keur')
 * @returns {number} Value in euros
 */
function convertToEuro(displayValue, unit = currentInputUnit) {
    if (unit === 'keur') {
        return displayValue * 1000;
    }
    return displayValue;
}

/**
 * Convert euros to display value
 * @param {number} euroValue - The value in euros
 * @param {string} unit - The unit ('eur' or 'keur')
 * @returns {number} Value in the target unit
 */
function convertFromEuro(euroValue, unit = currentInputUnit) {
    if (unit === 'keur') {
        return euroValue / 1000;
    }
    return euroValue;
}

/**
 * Setup unit selector functionality
 */
function setupUnitSelector() {
    const unitBtns = document.querySelectorAll('.unit-btn');
    
    unitBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const newUnit = this.getAttribute('data-unit');
            if (newUnit !== currentInputUnit) {
                switchInputUnit(newUnit);
            }
        });
    });

    // Initialize based on default unit
    updateUnitSelectorUI();
    updateFieldLabelsAndValues();
}

/**
 * Switch the input unit and convert all fields
 * @param {string} newUnit - 'eur' or 'keur'
 */
function switchInputUnit(newUnit) {
    if (newUnit === currentInputUnit) return;

    const oldUnit = currentInputUnit;
    currentInputUnit = newUnit;

    // Convert all monetary fields from old unit to new unit
    monetaryFieldIds.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            // Get value in euros first
            const euroValue = convertToEuro(parseFloat(field.value) || 0, oldUnit);
            // Convert to new unit
            const displayValue = convertFromEuro(euroValue, newUnit);
            // Update step attribute based on unit
            field.step = newUnit === 'keur' ? '1' : '10000';
            // Set new value (will be rounded appropriately)
            field.value = Math.round(displayValue);
        }
    });

    // Update UI
    updateUnitSelectorUI();
    updateFieldLabelsAndValues();

    // Recalculate with new values
    calculate();
}

/**
 * Update the unit selector button UI
 */
function updateUnitSelectorUI() {
    document.querySelectorAll('.unit-btn').forEach(btn => {
        const unit = btn.getAttribute('data-unit');
        if (unit === currentInputUnit) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * Update all field labels and values to reflect current unit
 */
function updateFieldLabelsAndValues() {
    const unitSymbol = currentInputUnit === 'keur' ? 'k€' : '€';

    monetaryFieldIds.forEach(fieldId => {
        const label = document.querySelector(`label[for="${fieldId}"]`);
        if (label) {
            const baseName = fieldLabelMap[fieldId] || fieldId;
            // Get the correct tooltip phase (convert phaseA -> A, or keep as-is for recurring costs)
            const tooltipPhase = fieldIdToPhase[fieldId] || fieldId;
            
            // Update label with unit symbol, preserving tooltip icon
            label.innerHTML = `${baseName} (${unitSymbol})<span class="tooltip-icon" data-phase="${tooltipPhase}">?</span>`;
        }
    });
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // All calculation inputs
    document.querySelectorAll('.calc-input').forEach(input => {
        input.addEventListener('input', calculate);
    });

    // Reusability Factor validation (clamp to 1-3)
    const reusabilityField = document.getElementById('reusabilityFactor');
    if (reusabilityField) {
        reusabilityField.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value)) value = 3; // default
            if (value < 1) value = 1;
            if (value > 3) value = 3;
            this.value = value;
            calculate(); // recalculate with valid value
        });
        
        // Also validate on blur
        reusabilityField.addEventListener('blur', function() {
            let value = parseInt(this.value);
            if (isNaN(value)) value = 3;
            if (value < 1) value = 1;
            if (value > 3) value = 3;
            this.value = value;
            calculate();
        });
    }

    // Action buttons
    document.getElementById('resetBtn').addEventListener('click', reset);
    document.getElementById('exportBtn').addEventListener('click', exportAnalysis);
    
    // Sensitivity Analysis Toggle
    setupSensitivityAnalysis();

    // Use event delegation for tooltip icons (works even after DOM updates)
    document.addEventListener('click', function(e) {
        const tooltipIcon = e.target.closest('.tooltip-icon');
        if (tooltipIcon) {
            e.preventDefault();
            e.stopPropagation();
            const phase = tooltipIcon.getAttribute('data-phase');
            console.log('Clicked tooltip icon for phase:', phase);
            if (TOOLTIP_CONTENT[phase]) {
                showPhaseTooltip(phase);
            } else {
                console.warn('No tooltip content for phase:', phase);
            }
        }
    });

    // Tooltip modal close button
    document.getElementById('tooltipCloseBtn').addEventListener('click', closePhaseTooltip);

    // Close tooltip when clicking outside the content
    document.getElementById('phaseTooltipModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closePhaseTooltip();
        }
    });

    // Close tooltip with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('phaseTooltipModal');
            if (modal && modal.classList.contains('active')) {
                closePhaseTooltip();
            }
        }
    });

    // Calculation Engine Modal
    const modal = document.getElementById('calcEngineModal');
    const calcEngineBtn = document.getElementById('calcEngineBtn');
    const calcEngineClose = document.getElementById('calcEngineClose');

    calcEngineBtn.addEventListener('click', function() {
        modal.classList.add('active');
    });

    calcEngineClose.addEventListener('click', function() {
        modal.classList.remove('active');
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}

/**
 * Show phase tooltip modal
 */
function showPhaseTooltip(phase) {
    const content = TOOLTIP_CONTENT[phase];
    if (!content) {
        console.warn('No tooltip content for phase:', phase);
        return;
    }
    
    console.log('Showing tooltip for phase:', phase);
    document.getElementById('tooltipTitle').textContent = content.title;
    // Use innerHTML to preserve line breaks and formatting
    const bodyDiv = document.getElementById('tooltipBody');
    bodyDiv.innerHTML = content.content
        .split('\n')
        .map(line => line.trim() ? `<p>${line}</p>` : '<br>')
        .join('');
    const modal = document.getElementById('phaseTooltipModal');
    modal.classList.add('active');
    console.log('Tooltip modal should now be visible');
}

/**
 * Close phase tooltip modal
 */
function closePhaseTooltip() {
    document.getElementById('phaseTooltipModal').classList.remove('active');
}

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupUnitSelector();
    calculate();
});

/**
 * Main calculation engine - ESA-aligned
 */
function calculate() {
    // ============ SECTION A: NON-RECURRING COSTS (NRC) ============
    
    // Read display values and convert to euros for calculation
    const phaseA = convertToEuro(parseFloat(document.getElementById('phaseA').value) || convertFromEuro(DEFAULTS.phaseA));
    const phaseB = convertToEuro(parseFloat(document.getElementById('phaseB').value) || convertFromEuro(DEFAULTS.phaseB));
    const phaseC = convertToEuro(parseFloat(document.getElementById('phaseC').value) || convertFromEuro(DEFAULTS.phaseC));
    const phaseD = convertToEuro(parseFloat(document.getElementById('phaseD').value) || convertFromEuro(DEFAULTS.phaseD));
    const missionCount = Math.max(1, parseInt(document.getElementById('missionCount').value) || DEFAULTS.missionCount);
    const reusabilityFactor = Math.max(1, parseFloat(document.getElementById('reusabilityFactor').value) || DEFAULTS.reusabilityFactor);

    // Calculate total NRC (Phases A-D only - development costs)
    const totalNrc = phaseA + phaseB + phaseC + phaseD;
    const devCostPerMission = totalNrc / missionCount;

    // Update Section A outputs
    document.getElementById('totalNrc').textContent = formatEuro(totalNrc);
    document.getElementById('devCostPerMission').textContent = formatEuro(devCostPerMission);

    // ============ SECTION B: RECURRING COST PER MISSION ============
    
    // Read display values and convert to euros for calculation
    const launchCost = convertToEuro(parseFloat(document.getElementById('launchCost').value) || convertFromEuro(DEFAULTS.launchCost));
    const operationsCost = convertToEuro(parseFloat(document.getElementById('operationsCost').value) || convertFromEuro(DEFAULTS.operationsCost));
    const recoveryCost = convertToEuro(parseFloat(document.getElementById('recoveryCost').value) || convertFromEuro(DEFAULTS.recoveryCost));
    const integrationCost = convertToEuro(parseFloat(document.getElementById('integrationCost').value) || convertFromEuro(DEFAULTS.integrationCost));
    const refurbishmentCost = convertToEuro(parseFloat(document.getElementById('refurbishmentCost').value) || convertFromEuro(DEFAULTS.refurbishmentCost));
    const logisticsCost = convertToEuro(parseFloat(document.getElementById('logisticsCost').value) || convertFromEuro(DEFAULTS.logisticsCost));
    const insuranceCost = convertToEuro(parseFloat(document.getElementById('insuranceCost').value) || convertFromEuro(DEFAULTS.insuranceCost));

    // Calculate Phase E (Utilisation) = Launch + Insurance + Integration + Operations
    const phaseE = launchCost + insuranceCost + integrationCost + operationsCost;
    
    // Calculate Phase F (Disposal) = Recovery + Refurbishment + Logistics
    const phaseF = recoveryCost + refurbishmentCost + logisticsCost;
    
    // Calculate Total Recurring Cost = Phase E + Phase F
    const totalRecurringCost = phaseE + phaseF;

    // Update Section B outputs: Phase subtotals (display only, not editable)
    document.getElementById('phaseESubtotal').textContent = formatEuro(phaseE);
    document.getElementById('phaseFSubtotal').textContent = formatEuro(phaseF);
    document.getElementById('totalRecurringCost').textContent = formatEuro(totalRecurringCost);

    // ============ SECTION C: PAYLOAD & REVENUE ASSUMPTIONS ============
    
    const maxPayloadMass = Math.max(0.1, parseFloat(document.getElementById('maxPayloadMass').value) || DEFAULTS.maxPayloadMass);
    const maxVolume = Math.max(0.1, parseFloat(document.getElementById('maxVolume').value) || DEFAULTS.maxVolume);
    const utilization = Math.max(1, Math.min(100, parseFloat(document.getElementById('utilization').value) || DEFAULTS.utilization));
    const volumetricFactor = Math.max(0.1, parseFloat(document.getElementById('volumetricFactor').value) || DEFAULTS.volumetricFactor);

    // Calculate corrected mass (mass-limited vs volume-limited)
    const maxSellableMass = maxPayloadMass;
    const avgSoldMass = Math.max(0.1, maxSellableMass * (utilization / 100));

    // Update Section C outputs
    document.getElementById('maxSellableMass').textContent = `${formatNumber(maxSellableMass)} kg`;
    document.getElementById('avgSoldMass').textContent = `${formatNumber(avgSoldMass)} kg`;

    // ============ SECTION D: COST MODEL ============
    
    const totalCostPerMission = devCostPerMission + totalRecurringCost;
    const breakEvenPricePerKg = totalCostPerMission / avgSoldMass;

    // Update Section D outputs
    document.getElementById('model-devCost').textContent = formatEuro(devCostPerMission);
    document.getElementById('model-recurringCost').textContent = formatEuro(totalRecurringCost);
    document.getElementById('totalCostPerMission').textContent = formatEuro(totalCostPerMission);
    document.getElementById('breakEvenPrice').textContent = `€ ${formatNumber(breakEvenPricePerKg)}/kg`;

    // ============ SECTION E: PRICING & MARGIN TARGETS ============
    
    const targetMargin = Math.max(0, Math.min(100, parseFloat(document.getElementById('targetMargin').value) || DEFAULTS.targetMargin));

    // Calculate recommended price (break-even × (1 + margin))
    const recommendedPricePerKg = breakEvenPricePerKg * (1 + targetMargin / 100);
    const revenuePerMission = recommendedPricePerKg * avgSoldMass;
    const missionMarginAbs = revenuePerMission - totalCostPerMission;
    const operationalMarginPercent = (missionMarginAbs / revenuePerMission) * 100;

    // Update Section E outputs
    document.getElementById('output-breakeven').textContent = `€ ${formatNumber(breakEvenPricePerKg)}/kg`;
    document.getElementById('revenuePerMission').textContent = formatEuro(revenuePerMission);
    document.getElementById('operationalMarginPercent').textContent = `${operationalMarginPercent.toFixed(1)}%`;

    // ============ PRIMARY OUTPUT: RECOMMENDED PRICE (GREEN CARD) ============
    
    document.getElementById('recommendedPrice').textContent = `€ ${formatNumber(recommendedPricePerKg)}/kg`;

    // ============ LEGACY SECTIONS (backward compatibility) ============
    updateLegacySections(devCostPerMission, totalRecurringCost, totalCostPerMission, 
                        avgSoldMass, recommendedPricePerKg, revenuePerMission);
    
    // Update Sensitivity Analysis if visible
    updateSensitivityIfVisible();
}

/**
 * Update legacy sections (for backward compatibility with old HTML)
 */
function updateLegacySections(devCost, recurringCost, totalCost, soldMass, recommendedPrice, revenue) {
    const legacy = document.getElementById('baseCostPerKg');
    if (!legacy) return;
    
    const baseCostPerKg = totalCost / soldMass;
    const marginPerKg = recommendedPrice - baseCostPerKg;
    const marginPercent = (marginPerKg / recommendedPrice) * 100;
    const missionMarginAbs = revenue - totalCost;
    const missionMarginPercent = (missionMarginAbs / revenue) * 100;

    try {
        document.getElementById('baseCostPerKg').textContent = formatEuro(baseCostPerKg);
        document.getElementById('loadedPricePerKg').textContent = formatEuro(recommendedPrice);
        document.getElementById('marginPerKg').textContent = formatEuro(marginPerKg);
        document.getElementById('marginPercent').textContent = `${marginPercent.toFixed(1)}%`;
        document.getElementById('missionCost').textContent = formatEuro(totalCost);
        document.getElementById('missionRevenue').textContent = formatEuro(revenue);
        document.getElementById('missionMarginAbs').textContent = formatEuro(missionMarginAbs);
        document.getElementById('missionMarginPercent').textContent = `${missionMarginPercent.toFixed(1)}%`;
    } catch (e) {
        // Silently fail if elements don't exist
    }
}

/**
 * Reset to default values
 */
function reset() {
    // Reset monetary fields to defaults in current display unit
    document.getElementById('phaseA').value = Math.round(convertFromEuro(DEFAULTS.phaseA));
    document.getElementById('phaseB').value = Math.round(convertFromEuro(DEFAULTS.phaseB));
    document.getElementById('phaseC').value = Math.round(convertFromEuro(DEFAULTS.phaseC));
    document.getElementById('phaseD').value = Math.round(convertFromEuro(DEFAULTS.phaseD));
    document.getElementById('phaseE').value = Math.round(convertFromEuro(DEFAULTS.phaseE));
    document.getElementById('phaseF').value = Math.round(convertFromEuro(DEFAULTS.phaseF));
    document.getElementById('missionCount').value = DEFAULTS.missionCount;
    document.getElementById('reusabilityFactor').value = DEFAULTS.reusabilityFactor;

    // Recurring costs in current display unit
    document.getElementById('launchCost').value = Math.round(convertFromEuro(DEFAULTS.launchCost));
    document.getElementById('operationsCost').value = Math.round(convertFromEuro(DEFAULTS.operationsCost));
    document.getElementById('recoveryCost').value = Math.round(convertFromEuro(DEFAULTS.recoveryCost));
    document.getElementById('integrationCost').value = Math.round(convertFromEuro(DEFAULTS.integrationCost));
    document.getElementById('refurbishmentCost').value = Math.round(convertFromEuro(DEFAULTS.refurbishmentCost));
    document.getElementById('logisticsCost').value = Math.round(convertFromEuro(DEFAULTS.logisticsCost));
    document.getElementById('insuranceCost').value = Math.round(convertFromEuro(DEFAULTS.insuranceCost));

    document.getElementById('maxPayloadMass').value = DEFAULTS.maxPayloadMass;
    document.getElementById('maxVolume').value = DEFAULTS.maxVolume;
    document.getElementById('utilization').value = DEFAULTS.utilization;
    document.getElementById('volumetricFactor').value = DEFAULTS.volumetricFactor;

    document.getElementById('targetMargin').value = DEFAULTS.targetMargin;

    calculate();
}

/**
 * Export analysis as PDF with detailed calculation breakdown
 */
function exportAnalysis() {
    // Gather all current input values (convert from display unit to euros)
    const phaseA = convertToEuro(parseFloat(document.getElementById('phaseA').value)) || DEFAULTS.phaseA;
    const phaseB = convertToEuro(parseFloat(document.getElementById('phaseB').value)) || DEFAULTS.phaseB;
    const phaseC = convertToEuro(parseFloat(document.getElementById('phaseC').value)) || DEFAULTS.phaseC;
    const phaseD = convertToEuro(parseFloat(document.getElementById('phaseD').value)) || DEFAULTS.phaseD;
    const missionCount = Math.max(1, parseInt(document.getElementById('missionCount').value) || DEFAULTS.missionCount);
    
    const launchCost = convertToEuro(parseFloat(document.getElementById('launchCost').value)) || DEFAULTS.launchCost;
    const operationsCost = convertToEuro(parseFloat(document.getElementById('operationsCost').value)) || DEFAULTS.operationsCost;
    const recoveryCost = convertToEuro(parseFloat(document.getElementById('recoveryCost').value)) || DEFAULTS.recoveryCost;
    const integrationCost = convertToEuro(parseFloat(document.getElementById('integrationCost').value)) || DEFAULTS.integrationCost;
    const refurbishmentCost = convertToEuro(parseFloat(document.getElementById('refurbishmentCost').value)) || DEFAULTS.refurbishmentCost;
    const logisticsCost = convertToEuro(parseFloat(document.getElementById('logisticsCost').value)) || DEFAULTS.logisticsCost;
    const insuranceCost = convertToEuro(parseFloat(document.getElementById('insuranceCost').value)) || DEFAULTS.insuranceCost;
    
    const maxPayloadMass = Math.max(0.1, parseFloat(document.getElementById('maxPayloadMass').value) || DEFAULTS.maxPayloadMass);
    const utilization = Math.max(1, Math.min(100, parseFloat(document.getElementById('utilization').value) || DEFAULTS.utilization));
    const targetMargin = Math.max(0, Math.min(100, parseFloat(document.getElementById('targetMargin').value) || DEFAULTS.targetMargin));
    
    // Perform calculations
    const totalNrc = phaseA + phaseB + phaseC + phaseD;
    const devCostPerMission = totalNrc / missionCount;
    
    // Calculate Phase E and Phase F (automatic subtotals)
    const phaseE = launchCost + insuranceCost + integrationCost + operationsCost;
    const phaseF = recoveryCost + refurbishmentCost + logisticsCost;
    const totalRecurringCost = phaseE + phaseF;
    
    const avgSoldMass = Math.max(0.1, maxPayloadMass * (utilization / 100));
    const totalCostPerMission = devCostPerMission + totalRecurringCost;
    const breakEvenPricePerKg = totalCostPerMission / avgSoldMass;
    const recommendedPricePerKg = breakEvenPricePerKg * (1 + targetMargin / 100);
    const revenuePerMission = recommendedPricePerKg * avgSoldMass;
    const operationalMarginAmount = revenuePerMission - totalCostPerMission;
    const operationalMarginPercent = (operationalMarginAmount / revenuePerMission) * 100;
    
    try {
        console.log('PDF Export initiated');
        console.log('Phase E:', phaseE);
        console.log('Phase F:', phaseF);
        console.log('Total Recurring:', totalRecurringCost);
        
        // Create simple HTML for PDF
        const pdfHtml = `
<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; color: #333; margin: 20px; }
h1 { font-size: 18px; margin: 10px 0; color: #1a3a52; }
h2 { font-size: 14px; margin: 15px 0 8px 0; color: #1a3a52; border-bottom: 2px solid #1a3a52; padding-bottom: 4px; }
h3 { font-size: 12px; margin: 12px 0 6px 0; color: #1a3a52; }
table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
td, th { border: 1px solid #ddd; padding: 6px; text-align: right; }
th { background: #f0f0f0; text-align: left; font-weight: bold; }
td:first-child { text-align: left; }
.label { font-weight: bold; color: #1a3a52; }
.value { font-weight: bold; }
.formula { background: #f9f9f9; padding: 8px; margin: 8px 0; border-left: 3px solid #1a3a52; font-family: monospace; font-size: 11px; }
.result { background: #d4edda; border: 2px solid #28a745; padding: 12px; margin: 15px 0; text-align: center; }
.result-label { font-size: 12px; font-weight: bold; color: #155724; margin-bottom: 6px; }
.result-value { font-size: 16px; font-weight: bold; color: #28a745; }
.header-logo { position: absolute; top: 15px; right: 20px; width: 100px; height: auto; }
.page-header { position: relative; margin-bottom: 20px; }
</style>
</head>
<body>
<div class="page-header">
  <img src="../atmos_logo.webp" class="header-logo" alt="ATMOS Logo">
</div>
<h1>Base Price Definition</h1>
<p>ESA-Aligned Financial Model — Calculation Breakdown</p>
<p style="background: #fff3cd; padding: 8px; margin: 10px 0; border-left: 3px solid #ffc107;">INTERNAL USE ONLY — For Finance and Business Development Team</p>
<p style="font-size: 10px; color: #666;">Generated: ${new Date().toLocaleString()}</p>

<h2>SECTION A: NON-RECURRING COSTS (NRC)</h2>
<p>Phases A–D development costs amortized across mission portfolio</p>
<table>
<tr><th>Development Phase</th><th>Amount (€)</th></tr>
<tr><td>Phase A – Feasibility</td><td>${numberToEuro(phaseA)}</td></tr>
<tr><td>Phase B – Preliminary Design</td><td>${numberToEuro(phaseB)}</td></tr>
<tr><td>Phase C – Detailed Design</td><td>${numberToEuro(phaseC)}</td></tr>
<tr><td>Phase D – Qualification & Manufacturing</td><td>${numberToEuro(phaseD)}</td></tr>
<tr style="background: #e8f4f8;"><td class="label">Total NRC (Phases A–D)</td><td class="value">${numberToEuro(totalNrc)}</td></tr>
</table>

<div class="formula">
<strong>Dev Cost per Mission = Total NRC ÷ Mission Count</strong><br>
= €${numberToEuro(totalNrc)} ÷ ${missionCount} missions<br>
= €${numberToEuro(devCostPerMission)} per mission
</div>

<h2>SECTION B: RECURRING COST PER MISSION</h2>
<p>Mission execution and recovery costs organized into operational phases</p>

<h3>Phase E – Utilisation</h3>
<table>
<tr><th>Cost Component</th><th>Amount (€)</th></tr>
<tr><td>Launch Cost (rideshare)</td><td>${numberToEuro(launchCost)}</td></tr>
<tr><td>Insurance</td><td>${numberToEuro(insuranceCost)}</td></tr>
<tr><td>Payload Integration & AIT</td><td>${numberToEuro(integrationCost)}</td></tr>
<tr><td>Mission Operations</td><td>${numberToEuro(operationsCost)}</td></tr>
<tr style="background: #d4edda;"><td class="label">Phase E Subtotal</td><td class="value">${numberToEuro(phaseE)}</td></tr>
</table>

<h3>Phase F – Disposal</h3>
<table>
<tr><th>Cost Component</th><th>Amount (€)</th></tr>
<tr><td>Recovery Operations</td><td>${numberToEuro(recoveryCost)}</td></tr>
<tr><td>Refurbishment Cost</td><td>${numberToEuro(refurbishmentCost)}</td></tr>
<tr><td>Logistics & Transport</td><td>${numberToEuro(logisticsCost)}</td></tr>
<tr style="background: #d4edda;"><td class="label">Phase F Subtotal</td><td class="value">${numberToEuro(phaseF)}</td></tr>
</table>

<table style="background: #e8f4f8;">
<tr><td class="label" style="font-size: 13px;">Total Recurring Cost per Mission (Phase E + Phase F)</td><td class="value" style="font-size: 13px;">${numberToEuro(totalRecurringCost)}</td></tr>
</table>

<div style="height: 150px;"></div>

<h2>SECTION C: PAYLOAD & REVENUE ASSUMPTIONS</h2>
<table>
<tr><th>Parameter</th><th>Value</th></tr>
<tr><td>Max Payload Capacity</td><td>${maxPayloadMass} kg</td></tr>
<tr><td>Utilization Rate</td><td>${utilization}%</td></tr>
<tr style="background: #e8f4f8;"><td class="label">Avg Sold Payload Mass</td><td class="value">${avgSoldMass.toFixed(1)} kg</td></tr>
</table>

<h2>SECTION D: COST MODEL</h2>
<div class="formula">
<strong>Total Cost per Mission = Dev Cost + Recurring Cost</strong><br>
= €${numberToEuro(devCostPerMission)} + €${numberToEuro(totalRecurringCost)}<br>
= €${numberToEuro(totalCostPerMission)}
</div>

<div class="formula">
<strong>Break-even Price per kg = Total Cost ÷ Avg Sold Mass</strong><br>
= €${numberToEuro(totalCostPerMission)} ÷ ${avgSoldMass.toFixed(2)} kg<br>
= €${numberToEuro(breakEvenPricePerKg)} / kg
</div>

<h2>SECTION E: PRICING & MARGIN TARGETS</h2>
<table>
<tr><th>Parameter</th><th>Value</th></tr>
<tr><td>Break-even Price per kg</td><td>€${numberToEuro(breakEvenPricePerKg)} / kg</td></tr>
<tr><td>Target Operational Margin</td><td>${targetMargin}%</td></tr>
<tr><td>Revenue per Mission</td><td>€${numberToEuro(revenuePerMission)}</td></tr>
<tr style="background: #e8f4f8;"><td class="label">Operational Margin (%)</td><td class="value">${operationalMarginPercent.toFixed(1)}%</td></tr>
</table>

<div class="formula">
<strong>Recommended Price per kg = Break-even × (1 + Target Margin)</strong><br>
= €${numberToEuro(breakEvenPricePerKg)} × (1 + ${targetMargin}% ÷ 100)<br>
= €${numberToEuro(recommendedPricePerKg)} / kg
</div>

<div class="result">
<div class="result-label">RECOMMENDED BASE PRICE PER KG</div>
<div class="result-value">€${numberToEuro(recommendedPricePerKg)} / kg</div>
<p style="font-size: 10px; margin: 10px 0 0 0;">This price ensures €${numberToEuro(revenuePerMission)} in revenue per mission, covering €${numberToEuro(totalCostPerMission)} in costs with ${operationalMarginPercent.toFixed(1)}% operational margin.</p>
</div>

<p style="font-size: 9px; color: #666; margin-top: 20px; border-top: 1px solid #ccc; padding-top: 10px;">
This document is automatically generated based on current calculator parameters. CONFIDENTIAL — INTERNAL USE ONLY
</p>
</body>
</html>
        `;
        
        // Generate PDF directly from HTML string
        const opt = {
            margin: 10,
            filename: `Base-Price-Definition-${new Date().toISOString().split('T')[0]}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        };
        
        // Create element from string
        const element = document.createElement('div');
        element.innerHTML = pdfHtml;
        
        console.log('HTML content created, length:', element.innerHTML.length);
        console.log('Calling html2pdf...');
        
        html2pdf().set(opt).from(element).save().then(() => {
            console.log('PDF export successful');
        }).catch(err => {
            console.error('PDF generation failed:', err);
            alert('Failed to generate PDF. Check console for details.');
        });
        
    } catch (error) {
        console.error('Export error:', error);
        alert('Error: ' + error.message);
    }
}

/**
 * Format number as EUR with K/M abbreviation
 */
function numberToEuro(value) {
    if (!isFinite(value)) return '0';
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(2).replace(/\.?0+$/, '')}M`;
    } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1).replace(/\.?0+$/, '')}k`;
    }
    return value.toFixed(2);
}

/**
 * Format value as Euro currency with k/M abbreviation
 */
function formatEuro(value) {
    if (!isFinite(value)) return '€ 0';
    
    if (value >= 1000000) {
        return `€ ${(value / 1000000).toFixed(2).replace(/\.?0+$/, '')}M`;
    } else if (value >= 1000) {
        return `€ ${(value / 1000).toFixed(1).replace(/\.?0+$/, '')}k`;
    } else {
        return `€ ${value.toFixed(2)}`;
    }
}

/**
 * Format number with standard precision
 */
function formatNumber(value) {
    if (!isFinite(value)) return '0';
    if (value >= 1000) {
        return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return value.toFixed(1);
}

/**
 * Setup Sensitivity Analysis toggle and calculations
 */
function setupSensitivityAnalysis() {
    const toggleBtn = document.getElementById('sensitivityToggleBtn');
    const section = document.getElementById('sensitivityAnalysisSection');
    
    if (!toggleBtn || !section) return;
    
    let isOpen = false;
    
    toggleBtn.addEventListener('click', function() {
        isOpen = !isOpen;
        section.style.display = isOpen ? 'block' : 'none';
        toggleBtn.textContent = isOpen 
            ? '👈 Hide Sensitivity Analysis chart' 
            : '👉 View Sensitivity Analysis chart';
        
        if (isOpen) {
            updateSensitivityAnalysis();
        }
    });
}

/**
 * Calculate and update Sensitivity Analysis table
 */
function calculateSensitivityAnalysis() {
    // Get current values (convert from display unit to euros)
    const phaseA = convertToEuro(parseFloat(document.getElementById('phaseA').value)) || DEFAULTS.phaseA;
    const phaseB = convertToEuro(parseFloat(document.getElementById('phaseB').value)) || DEFAULTS.phaseB;
    const phaseC = convertToEuro(parseFloat(document.getElementById('phaseC').value)) || DEFAULTS.phaseC;
    const phaseD = convertToEuro(parseFloat(document.getElementById('phaseD').value)) || DEFAULTS.phaseD;
    
    const launchCost = convertToEuro(parseFloat(document.getElementById('launchCost').value)) || DEFAULTS.launchCost;
    const operationsCost = convertToEuro(parseFloat(document.getElementById('operationsCost').value)) || DEFAULTS.operationsCost;
    const recoveryCost = convertToEuro(parseFloat(document.getElementById('recoveryCost').value)) || DEFAULTS.recoveryCost;
    const integrationCost = convertToEuro(parseFloat(document.getElementById('integrationCost').value)) || DEFAULTS.integrationCost;
    const refurbishmentCost = convertToEuro(parseFloat(document.getElementById('refurbishmentCost').value)) || DEFAULTS.refurbishmentCost;
    const logisticsCost = convertToEuro(parseFloat(document.getElementById('logisticsCost').value)) || DEFAULTS.logisticsCost;
    const insuranceCost = convertToEuro(parseFloat(document.getElementById('insuranceCost').value)) || DEFAULTS.insuranceCost;
    
    const maxPayloadMass = Math.max(0.1, parseFloat(document.getElementById('maxPayloadMass').value) || DEFAULTS.maxPayloadMass);
    const utilization = Math.max(1, Math.min(100, parseFloat(document.getElementById('utilization').value) || DEFAULTS.utilization));
    const targetMargin = Math.max(0, Math.min(100, parseFloat(document.getElementById('targetMargin').value) || DEFAULTS.targetMargin));
    const currentMissionCount = Math.max(1, parseInt(document.getElementById('missionCount').value) || DEFAULTS.missionCount);
    
    // Calculate totals
    const totalNrc = phaseA + phaseB + phaseC + phaseD;
    const phaseE = launchCost + insuranceCost + integrationCost + operationsCost;
    const phaseF = recoveryCost + refurbishmentCost + logisticsCost;
    const totalRecurringCost = phaseE + phaseF;
    
    const avgSoldMass = Math.max(0.1, maxPayloadMass * (utilization / 100));
    
    // Generate data for 5 to 50 missions, step of 5
    const sensitivityData = [];
    for (let missions = 5; missions <= 50; missions += 5) {
        const devCostPerMission = totalNrc / missions;
        const totalCostPerMission = devCostPerMission + totalRecurringCost;
        const breakEvenPricePerKg = totalCostPerMission / avgSoldMass;
        const recommendedPricePerKg = breakEvenPricePerKg * (1 + targetMargin / 100);
        
        sensitivityData.push({
            missions: missions,
            pricePerKg: recommendedPricePerKg,
            isCurrent: missions === currentMissionCount
        });
    }
    
    return { data: sensitivityData, currentMissionCount };
}

/**
 * Update Sensitivity Analysis table with current calculations
 */
function updateSensitivityAnalysis() {
    const result = calculateSensitivityAnalysis();
    const tbody = document.getElementById('sensitivityTableBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    result.data.forEach(row => {
        const tr = document.createElement('tr');
        if (row.isCurrent) {
            tr.className = 'current-missions';
        }
        tr.innerHTML = `
            <td>${row.missions}</td>
            <td>${numberToEuro(row.pricePerKg)}/kg</td>
        `;
        tbody.appendChild(tr);
    });
    
    // Draw chart
    drawSensitivityChart(result.data, result.currentMissionCount);
}

/**
 * Draw sensitivity analysis chart using Canvas
 */
function drawSensitivityChart(data, currentMissionCount) {
    const canvas = document.getElementById('sensitivityChart');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context');
        return;
    }
    
    // Clear canvas with background
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, 400, 300);
    
    // Chart dimensions - reframed to use more space
    const padding = 40;
    const chartWidth = 330;
    const chartHeight = 220;
    const startX = padding;
    const startY = 15;
    
    // Find price range
    const prices = data.map(d => d.pricePerKg);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;
    
    // Draw axes
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, startY + chartHeight);
    ctx.lineTo(startX + chartWidth, startY + chartHeight);
    ctx.stroke();
    
    // Draw grid lines (Y axis)
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.font = '10px Arial';
    ctx.fillStyle = 'rgba(0, 212, 255, 0.7)';
    
    for (let i = 0; i <= 5; i++) {
        const y = startY + (chartHeight / 5) * i;
        const price = maxPrice - (priceRange / 5) * i;
        
        // Grid line
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(startX + chartWidth, y);
        ctx.stroke();
        
        // Price label - formatted as plain number with comma separator
        const priceLabel = Math.round(price).toLocaleString('en-US');
        ctx.fillText(priceLabel, 3, y + 3);
    }
    
    // Draw X-axis labels (missions)
    for (let i = 0; i < data.length; i++) {
        if (i % 2 === 0) {
            const x = startX + (chartWidth / (data.length - 1)) * i;
            ctx.fillText(data[i].missions, x - 8, startY + chartHeight + 18);
        }
    }
    
    // Draw the line chart
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Plot points on the line
    for (let i = 0; i < data.length; i++) {
        const x = startX + (chartWidth / (data.length - 1)) * i;
        const yPercent = (maxPrice - data[i].pricePerKg) / priceRange;
        const y = startY + yPercent * chartHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    
    // Draw data points
    for (let i = 0; i < data.length; i++) {
        const x = startX + (chartWidth / (data.length - 1)) * i;
        const yPercent = (maxPrice - data[i].pricePerKg) / priceRange;
        const y = startY + yPercent * chartHeight;
        
        if (data[i].missions === currentMissionCount) {
            // Current point - gold/yellow
            ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
            
            // Circle outline
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.9)';
            ctx.lineWidth = 2;
            ctx.stroke();
        } else {
            // Regular point - cyan
            ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Labels
    ctx.font = 'bold 11px Arial';
    ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
    ctx.fillText('Number of Missions', 200, 295);
    ctx.save();
    ctx.translate(10, 120);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('€/kg', 0, 0);
    ctx.restore();
}

/**
 * Update sensitivity analysis when parameters change
 */
function updateSensitivityIfVisible() {
    const section = document.getElementById('sensitivityAnalysisSection');
    if (section && section.style.display !== 'none') {
        updateSensitivityAnalysis();
    }
}
