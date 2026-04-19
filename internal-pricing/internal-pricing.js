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
    'phaseA', 'phaseB', 'phaseC', 'phaseD', 'phaseE', 'phaseF',
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
    const phaseE = convertToEuro(parseFloat(document.getElementById('phaseE').value) || convertFromEuro(DEFAULTS.phaseE));
    const phaseF = convertToEuro(parseFloat(document.getElementById('phaseF').value) || convertFromEuro(DEFAULTS.phaseF));
    const missionCount = Math.max(1, parseInt(document.getElementById('missionCount').value) || DEFAULTS.missionCount);
    const reusabilityFactor = Math.max(1, parseFloat(document.getElementById('reusabilityFactor').value) || DEFAULTS.reusabilityFactor);

    // Calculate total NRC
    const totalNrc = phaseA + phaseB + phaseC + phaseD + phaseE + phaseF;
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

    const totalRecurringCost = launchCost + operationsCost + recoveryCost + integrationCost + refurbishmentCost + logisticsCost + insuranceCost;

    // Update Section B outputs
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
    // Gather all current input values
    const phaseA = parseFloat(document.getElementById('phaseA').value) || DEFAULTS.phaseA;
    const phaseB = parseFloat(document.getElementById('phaseB').value) || DEFAULTS.phaseB;
    const phaseC = parseFloat(document.getElementById('phaseC').value) || DEFAULTS.phaseC;
    const phaseD = parseFloat(document.getElementById('phaseD').value) || DEFAULTS.phaseD;
    const phaseE = parseFloat(document.getElementById('phaseE').value) || DEFAULTS.phaseE;
    const phaseF = parseFloat(document.getElementById('phaseF').value) || DEFAULTS.phaseF;
    const missionCount = Math.max(1, parseInt(document.getElementById('missionCount').value) || DEFAULTS.missionCount);
    
    const launchCost = parseFloat(document.getElementById('launchCost').value) || DEFAULTS.launchCost;
    const operationsCost = parseFloat(document.getElementById('operationsCost').value) || DEFAULTS.operationsCost;
    const recoveryCost = parseFloat(document.getElementById('recoveryCost').value) || DEFAULTS.recoveryCost;
    const integrationCost = parseFloat(document.getElementById('integrationCost').value) || DEFAULTS.integrationCost;
    const refurbishmentCost = parseFloat(document.getElementById('refurbishmentCost').value) || DEFAULTS.refurbishmentCost;
    const logisticsCost = parseFloat(document.getElementById('logisticsCost').value) || DEFAULTS.logisticsCost;
    const insuranceCost = parseFloat(document.getElementById('insuranceCost').value) || DEFAULTS.insuranceCost;
    
    const maxPayloadMass = Math.max(0.1, parseFloat(document.getElementById('maxPayloadMass').value) || DEFAULTS.maxPayloadMass);
    const utilization = Math.max(1, Math.min(100, parseFloat(document.getElementById('utilization').value) || DEFAULTS.utilization));
    const targetMargin = Math.max(0, Math.min(100, parseFloat(document.getElementById('targetMargin').value) || DEFAULTS.targetMargin));
    
    // Perform calculations
    const totalNrc = phaseA + phaseB + phaseC + phaseD + phaseE + phaseF;
    const devCostPerMission = totalNrc / missionCount;
    const totalRecurringCost = launchCost + operationsCost + recoveryCost + integrationCost + refurbishmentCost + logisticsCost + insuranceCost;
    const avgSoldMass = Math.max(0.1, maxPayloadMass * (utilization / 100));
    const totalCostPerMission = devCostPerMission + totalRecurringCost;
    const breakEvenPricePerKg = totalCostPerMission / avgSoldMass;
    const recommendedPricePerKg = breakEvenPricePerKg * (1 + targetMargin / 100);
    const revenuePerMission = recommendedPricePerKg * avgSoldMass;
    const operationalMarginAmount = revenuePerMission - totalCostPerMission;
    const operationalMarginPercent = (operationalMarginAmount / revenuePerMission) * 100;
    
    // Load logo asynchronously
    const logoUrl = '../atmos_logo.webp';
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
            const logoBase64 = reader.result;
            createAndDownloadPDF(logoBase64, phaseA, phaseB, phaseC, phaseD, phaseE, phaseF, missionCount, 
                                launchCost, operationsCost, recoveryCost, integrationCost, refurbishmentCost, logisticsCost, insuranceCost,
                                maxPayloadMass, utilization, targetMargin, totalNrc, devCostPerMission, totalRecurringCost,
                                avgSoldMass, totalCostPerMission, breakEvenPricePerKg, recommendedPricePerKg, revenuePerMission,
                                operationalMarginAmount, operationalMarginPercent);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = function() {
        // Fallback if logo fails to load
        createAndDownloadPDF('', phaseA, phaseB, phaseC, phaseD, phaseE, phaseF, missionCount, 
                            launchCost, operationsCost, recoveryCost, integrationCost, refurbishmentCost, logisticsCost, insuranceCost,
                            maxPayloadMass, utilization, targetMargin, totalNrc, devCostPerMission, totalRecurringCost,
                            avgSoldMass, totalCostPerMission, breakEvenPricePerKg, recommendedPricePerKg, revenuePerMission,
                            operationalMarginAmount, operationalMarginPercent);
    };
    xhr.open('GET', logoUrl);
    xhr.send();
}

/**
 * Create and download PDF with all parameters
 */
function createAndDownloadPDF(logoBase64, phaseA, phaseB, phaseC, phaseD, phaseE, phaseF, missionCount,
                               launchCost, operationsCost, recoveryCost, integrationCost, refurbishmentCost, logisticsCost, insuranceCost,
                               maxPayloadMass, utilization, targetMargin, totalNrc, devCostPerMission, totalRecurringCost,
                               avgSoldMass, totalCostPerMission, breakEvenPricePerKg, recommendedPricePerKg, revenuePerMission,
                               operationalMarginAmount, operationalMarginPercent) {
    
    // Create HTML content for PDF
    const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.5;
                    color: #0a0e27;
                    margin: 0;
                    padding: 20px;
                }
                .header-section {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    border-bottom: 3px solid #1a3a52;
                    padding-bottom: 15px;
                }
                .logo {
                    width: 60px;
                    height: 60px;
                    margin-right: 20px;
                    flex-shrink: 0;
                }
                .header-text h1 {
                    margin: 0;
                    color: #1a3a52;
                    font-size: 24px;
                }
                .header-text p {
                    margin: 5px 0 0 0;
                    color: #666;
                    font-size: 12px;
                    font-weight: bold;
                }
                .internal-use {
                    background: #fff3cd;
                    border: 2px solid #ffc107;
                    padding: 12px;
                    margin-bottom: 20px;
                    border-radius: 6px;
                    text-align: center;
                    font-weight: bold;
                    color: #856404;
                    font-size: 12px;
                }
                .section-title {
                    background: #1a3a52;
                    color: white;
                    padding: 10px 15px;
                    margin-top: 20px;
                    margin-bottom: 12px;
                    border-radius: 4px;
                    font-weight: bold;
                    font-size: 13px;
                }
                .section-title.success {
                    background: #28a745;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 15px;
                    font-size: 11px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: right;
                }
                th {
                    background: #f0f0f0;
                    font-weight: bold;
                    text-align: left;
                }
                td:first-child {
                    text-align: left;
                }
                .formula-box {
                    background: #f9f9f9;
                    border-left: 4px solid #1a3a52;
                    padding: 12px;
                    margin: 12px 0;
                    font-family: 'Courier New', monospace;
                    font-size: 10px;
                    line-height: 1.6;
                }
                .highlight {
                    background: #e8f4f8;
                    font-weight: bold;
                    color: #1a3a52;
                }
                .result-box {
                    background: #d4edda;
                    border: 2px solid #28a745;
                    padding: 15px;
                    margin: 15px 0;
                    border-radius: 6px;
                    text-align: center;
                }
                .result-box-title {
                    font-size: 12px;
                    font-weight: bold;
                    color: #155724;
                    margin-bottom: 8px;
                }
                .result-box-value {
                    font-size: 18px;
                    font-weight: bold;
                    color: #28a745;
                }
                .footer {
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 2px solid #1a3a52;
                    font-size: 9px;
                    color: #666;
                    text-align: center;
                }
                .page-break {
                    page-break-after: always;
                    margin-bottom: 20px;
                }
                .spacing-b-c {
                    height: 30px;
                }
                .spacing-c-d {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <!-- Header with Logo -->
            <div class="header-section">
                ${logoBase64 ? `<img src="${logoBase64}" class="logo" alt="ATMOS Logo">` : ''}
                <div class="header-text">
                    <h1>Base Price Definition</h1>
                    <p>ESA-Aligned Financial Model — Calculation Breakdown</p>
                </div>
            </div>
            
            <!-- Internal Use Warning -->
            <div class="internal-use">
                ⚠️ INTERNAL USE ONLY — STRATEGIC DECISION DOCUMENT<br>
                For Finance and Business Development Team — Confidential
            </div>
            
            <!-- Document Info -->
            <p style="font-size: 10px; color: #666; margin-bottom: 20px;">
                Generated: ${new Date().toLocaleString()} | Document Version: Base Price Definition Report
            </p>
            
            <!-- SECTION A: NON-RECURRING COSTS -->
            <div class="section-title">SECTION A: NON-RECURRING COSTS (NRC)</div>
            <p style="font-size: 11px; margin: 10px 0;">Phases A–F development costs amortized across mission portfolio</p>
            
            <table>
                <tr>
                    <th>Development Phase</th>
                    <th>Amount (€)</th>
                </tr>
                <tr>
                    <td>Phase A – Feasibility</td>
                    <td>${numberToEuro(phaseA)}</td>
                </tr>
                <tr>
                    <td>Phase B – Preliminary Design</td>
                    <td>${numberToEuro(phaseB)}</td>
                </tr>
                <tr>
                    <td>Phase C – Detailed Design</td>
                    <td>${numberToEuro(phaseC)}</td>
                </tr>
                <tr>
                    <td>Phase D – Qualification & Manufacturing</td>
                    <td>${numberToEuro(phaseD)}</td>
                </tr>
                <tr>
                    <td>Phase E – Utilisation</td>
                    <td>${numberToEuro(phaseE)}</td>
                </tr>
                <tr>
                    <td>Phase F – Disposal</td>
                    <td>${numberToEuro(phaseF)}</td>
                </tr>
                <tr class="highlight">
                    <td><strong>Total NRC (Phases A–F)</strong></td>
                    <td>${numberToEuro(totalNrc)}</td>
                </tr>
            </table>
            
            <div class="formula-box">
                <strong>Dev Cost per Mission = Total NRC ÷ Mission Count</strong><br>
                = €${numberToEuro(totalNrc)} ÷ ${missionCount} missions<br>
                = <span style="color: #1a3a52; font-weight: bold;">${numberToEuro(devCostPerMission)}</span> per mission
            </div>
            
            <!-- SECTION B: RECURRING COST PER MISSION -->
            <div class="section-title">SECTION B: RECURRING COST PER MISSION</div>
            <p style="font-size: 11px; margin: 10px 0;">Direct and indirect operational costs for one Phoenix flight</p>
            
            <table>
                <tr>
                    <th>Cost Category</th>
                    <th>Amount (€)</th>
                </tr>
                <tr>
                    <td>Launch Cost (rideshare)</td>
                    <td>${numberToEuro(launchCost)}</td>
                </tr>
                <tr>
                    <td>Mission Operations</td>
                    <td>${numberToEuro(operationsCost)}</td>
                </tr>
                <tr>
                    <td>Recovery Operations</td>
                    <td>${numberToEuro(recoveryCost)}</td>
                </tr>
                <tr>
                    <td>Payload Integration & AIT</td>
                    <td>${numberToEuro(integrationCost)}</td>
                </tr>
                <tr>
                    <td>Refurbishment</td>
                    <td>${numberToEuro(refurbishmentCost)}</td>
                </tr>
                <tr>
                    <td>Logistics & Transport</td>
                    <td>${numberToEuro(logisticsCost)}</td>
                </tr>
                <tr>
                    <td>Insurance</td>
                    <td>${numberToEuro(insuranceCost)}</td>
                </tr>
                <tr class="highlight">
                    <td><strong>Total Recurring Cost</strong></td>
                    <td>${numberToEuro(totalRecurringCost)}</td>
                </tr>
            </table>
            
            <!-- Extra spacing between B and C -->
            <div class="spacing-b-c"></div>
            
            <!-- SECTION C: PAYLOAD ASSUMPTIONS -->
            <div class="section-title">SECTION C: PAYLOAD & REVENUE ASSUMPTIONS</div>
            
            <table>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Max Payload Capacity</td>
                    <td>${maxPayloadMass} kg</td>
                </tr>
                <tr>
                    <td>Utilization Rate</td>
                    <td>${utilization}%</td>
                </tr>
                <tr class="highlight">
                    <td><strong>Avg Sold Payload Mass</strong></td>
                    <td><strong>${avgSoldMass.toFixed(1)} kg</strong></td>
                </tr>
            </table>
            
            <div class="formula-box">
                <strong>Avg Sold Mass = Max Payload × Utilization Rate</strong><br>
                = ${maxPayloadMass} kg × (${utilization}% ÷ 100)<br>
                = <span style="color: #1a3a52; font-weight: bold;">${avgSoldMass.toFixed(2)} kg</span>
            </div>
            
            <!-- Reduced spacing between C and D -->
            <div class="spacing-c-d"></div>
            
            <!-- PAGE BREAK -->
            <div class="page-break"></div>
            
            <!-- SECTION D: COST MODEL -->
            <div class="section-title">SECTION D: COST MODEL</div>
            <p style="font-size: 11px; margin: 10px 0;">Mission economics and total cost per mission</p>
            
            <div class="formula-box">
                <strong>Total Cost per Mission = Dev Cost + Recurring Cost</strong><br>
                = €${numberToEuro(devCostPerMission)} + €${numberToEuro(totalRecurringCost)}<br>
                = <span style="color: #1a3a52; font-weight: bold;">€${numberToEuro(totalCostPerMission)}</span>
            </div>
            
            <div class="formula-box">
                <strong>Break-even Price per kg = Total Cost ÷ Avg Sold Mass</strong><br>
                = €${numberToEuro(totalCostPerMission)} ÷ ${avgSoldMass.toFixed(2)} kg<br>
                = <span style="color: #1a3a52; font-weight: bold;">€${numberToEuro(breakEvenPricePerKg)} / kg</span>
            </div>
            
            <!-- SECTION E: PRICING & MARGIN TARGETS -->
            <div class="section-title success">SECTION E: PRICING & MARGIN TARGETS</div>
            <p style="font-size: 11px; margin: 10px 0;">Calculate recommended commercial price with target operational margin</p>
            
            <table>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Break-even Price per kg</td>
                    <td>€${numberToEuro(breakEvenPricePerKg)} / kg</td>
                </tr>
                <tr>
                    <td>Target Operational Margin</td>
                    <td>${targetMargin}%</td>
                </tr>
                <tr>
                    <td>Revenue per Mission</td>
                    <td>€${numberToEuro(revenuePerMission)}</td>
                </tr>
                <tr>
                    <td>Operational Margin (€)</td>
                    <td>€${numberToEuro(operationalMarginAmount)}</td>
                </tr>
                <tr class="highlight">
                    <td><strong>Operational Margin (%)</strong></td>
                    <td><strong>${operationalMarginPercent.toFixed(1)}%</strong></td>
                </tr>
            </table>
            
            <div class="formula-box">
                <strong>Recommended Price per kg = Break-even × (1 + Target Margin)</strong><br>
                = €${numberToEuro(breakEvenPricePerKg)} × (1 + ${targetMargin}% ÷ 100)<br>
                = €${numberToEuro(breakEvenPricePerKg)} × ${(1 + targetMargin / 100).toFixed(2)}<br>
                = <span style="color: #1a3a52; font-weight: bold;">€${numberToEuro(recommendedPricePerKg)} / kg</span>
            </div>
            
            <!-- FINAL RESULT -->
            <div class="result-box">
                <div class="result-box-title">RECOMMENDED BASE PRICE PER KG</div>
                <div class="result-box-value">€${numberToEuro(recommendedPricePerKg)} / kg</div>
                <p style="font-size: 10px; margin-top: 10px; color: #155724;">
                    This price ensures €${numberToEuro(revenuePerMission)} in revenue per mission,<br>
                    covering €${numberToEuro(totalCostPerMission)} in costs with ${operationalMarginPercent.toFixed(1)}% operational margin.
                </p>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <p>This document is automatically generated based on current calculator parameters.</p>
                <p>For questions, contact the Finance or Business Development team.</p>
                <p style="margin-top: 10px; font-weight: bold;">CONFIDENTIAL — INTERNAL USE ONLY</p>
            </div>
        </body>
        </html>
    `;
    
    // Generate PDF
    const element = document.createElement('div');
    element.innerHTML = pdfContent;
    
    const opt = {
        margin: 10,
        filename: `Base-Price-Definition-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    html2pdf().set(opt).from(element).save();
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
