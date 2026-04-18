/**
 * Phoenix Internal Pricing Engine
 * Sophisticated financial modeling tool for mission pricing analysis
 */

// Scenario presets
const SCENARIOS = {
    conservative: {
        fillRate: 50,
        marginTarget: 40,
        pricingBuffer: 15,
        riskPremium: 12,
        discountReserve: 8
    },
    base: {
        fillRate: 70,
        marginTarget: 35,
        pricingBuffer: 10,
        riskPremium: 8,
        discountReserve: 5
    },
    aggressive: {
        fillRate: 85,
        marginTarget: 30,
        pricingBuffer: 5,
        riskPremium: 5,
        discountReserve: 2
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    calculate();
});

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Scenario preset buttons
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            loadScenario(this.dataset.scenario);
        });
    });

    // All calculation inputs
    document.querySelectorAll('.calc-input').forEach(input => {
        input.addEventListener('input', calculate);
    });

    // Action buttons
    document.getElementById('resetBtn').addEventListener('click', reset);
    document.getElementById('exportBtn').addEventListener('click', exportAnalysis);

    // Mark base scenario as active on load
    document.querySelector('[data-scenario="base"]').classList.add('active');
}

/**
 * Load scenario preset
 */
function loadScenario(scenarioName) {
    const scenario = SCENARIOS[scenarioName];
    
    // Update UI
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-scenario="${scenarioName}"]`).classList.add('active');

    // Apply scenario values
    document.getElementById('fillRate').value = scenario.fillRate;
    document.getElementById('marginTarget').value = scenario.marginTarget;
    document.getElementById('pricingBuffer').value = scenario.pricingBuffer;
    document.getElementById('riskPremium').value = scenario.riskPremium;
    document.getElementById('discountReserve').value = scenario.discountReserve;

    calculate();
}

/**
 * Main calculation engine
 */
function calculate() {
    // ============ STEP 1: Get Input Values ============
    
    // Development Costs
    const phaseA = parseFloat(document.getElementById('phaseA').value) || 0;
    const phaseB = parseFloat(document.getElementById('phaseB').value) || 0;
    const phaseC = parseFloat(document.getElementById('phaseC').value) || 0;
    const phaseD = parseFloat(document.getElementById('phaseD').value) || 0;
    const missionCount = Math.max(1, parseInt(document.getElementById('missionCount').value) || 1);

    // Recurring Mission Costs
    const launchCost = parseFloat(document.getElementById('launchCost').value) || 0;
    const operationsCost = parseFloat(document.getElementById('operationsCost').value) || 0;
    const recoveryCost = parseFloat(document.getElementById('recoveryCost').value) || 0;
    const logisticsCost = parseFloat(document.getElementById('logisticsCost').value) || 0;
    const groundSegmentCost = parseFloat(document.getElementById('groundSegmentCost').value) || 0;
    const teamCost = parseFloat(document.getElementById('teamCost').value) || 0;
    const insuranceCost = parseFloat(document.getElementById('insuranceCost').value) || 0;

    // Capacity & Utilization
    const maxMass = Math.max(0.1, parseFloat(document.getElementById('maxMass').value) || 100);
    const capacityLoss = Math.max(0, Math.min(100, parseFloat(document.getElementById('capacityLoss').value) || 10));
    const fillRate = Math.max(0, Math.min(100, parseFloat(document.getElementById('fillRate').value) || 70));

    // Commercial Assumptions
    const marginTarget = parseFloat(document.getElementById('marginTarget').value) || 35;
    const pricingBuffer = parseFloat(document.getElementById('pricingBuffer').value) || 10;
    const riskPremium = parseFloat(document.getElementById('riskPremium').value) || 8;
    const discountReserve = parseFloat(document.getElementById('discountReserve').value) || 5;

    // ============ STEP 2: Calculate Development Costs ============
    const totalDevCost = phaseA + phaseB + phaseC + phaseD;
    const devCostPerMission = totalDevCost / missionCount;

    // ============ STEP 3: Calculate Total Mission OPEX ============
    const totalOpex = launchCost + operationsCost + recoveryCost + logisticsCost + 
                     groundSegmentCost + teamCost + insuranceCost;

    // ============ STEP 4: Total Cost per Mission ============
    const totalCostPerMission = devCostPerMission + totalOpex;

    // ============ STEP 5: Capacity Calculations ============
    const netSellableMass = maxMass * (1 - capacityLoss / 100);
    const effectiveSoldMass = Math.max(0.1, netSellableMass * (fillRate / 100));

    // ============ STEP 6: Cost per kg ============
    const costPerKg = totalCostPerMission / effectiveSoldMass;

    // ============ STEP 7: Commercial Uplift Factor ============
    const totalUplift = marginTarget + pricingBuffer + riskPremium + discountReserve;
    const upliftFactor = 1 + (totalUplift / 100);

    // ============ STEP 8: Recommended Base Price ============
    const recommendedPrice = costPerKg * upliftFactor;

    // ============ STEP 9: Margin Framework ============
    
    // Per-kg margins
    const baseCostPerKg = costPerKg;
    const loadedPricePerKg = recommendedPrice;
    const marginPerKg = loadedPricePerKg - baseCostPerKg;
    const marginPercent = (marginPerKg / loadedPricePerKg) * 100;

    // Mission-level margins
    const missionRevenue = recommendedPrice * effectiveSoldMass;
    const missionMarginAbs = missionRevenue - totalCostPerMission;
    const missionMarginPercent = (missionMarginAbs / missionRevenue) * 100;

    // ============ UPDATE UI - Development Costs ============
    document.getElementById('totalDevCost').textContent = formatEuro(totalDevCost);
    document.getElementById('devCostPerMission').textContent = formatEuro(devCostPerMission);

    // ============ UPDATE UI - Mission OPEX ============
    document.getElementById('totalOpex').textContent = formatEuro(totalOpex);

    // ============ UPDATE UI - Capacity ============
    document.getElementById('netSellableMass').textContent = `${formatNumber(netSellableMass)} kg`;
    document.getElementById('effectiveSoldMass').textContent = `${formatNumber(effectiveSoldMass)} kg`;

    // ============ UPDATE UI - Commercial Assumptions ============
    document.getElementById('liftFactor').textContent = `${upliftFactor.toFixed(2)}x`;

    // ============ UPDATE UI - PRIMARY PRICE OUTPUT ============
    document.getElementById('recommendedPrice').textContent = formatEuro(recommendedPrice);

    // ============ UPDATE UI - MARGIN FRAMEWORK ============
    document.getElementById('baseCostPerKg').textContent = formatEuro(baseCostPerKg);
    document.getElementById('loadedPricePerKg').textContent = formatEuro(loadedPricePerKg);
    document.getElementById('marginPerKg').textContent = formatEuro(marginPerKg);
    document.getElementById('marginPercent').textContent = `${marginPercent.toFixed(1)}%`;

    document.getElementById('missionCost').textContent = formatEuro(totalCostPerMission);
    document.getElementById('missionRevenue').textContent = formatEuro(missionRevenue);
    document.getElementById('missionMarginAbs').textContent = formatEuro(missionMarginAbs);
    document.getElementById('missionMarginPercent').textContent = `${missionMarginPercent.toFixed(1)}%`;

    // ============ UPDATE UI - SENSITIVITY ANALYSIS ============
    updateSensitivityAnalysis(totalDevCost, totalOpex, devCostPerMission, 
                             netSellableMass, capacityLoss, upliftFactor, 
                             missionCount, totalCostPerMission);
}

/**
 * Update sensitivity analysis
 */
function updateSensitivityAnalysis(totalDevCost, totalOpex, devCostPerMission, 
                                   netSellableMass, capacityLoss, upliftFactor, 
                                   missionCount, totalCostPerMission) {
    // Fill Rate Sensitivity (50%, 70%, 90%)
    [50, 70, 90].forEach(fillRate => {
        const effectiveSoldMass = Math.max(0.1, netSellableMass * (fillRate / 100));
        const costPerKg = totalCostPerMission / effectiveSoldMass;
        const price = costPerKg * upliftFactor;
        document.getElementById(`sens-fillrate-${fillRate}`).textContent = formatEuro(price);
    });

    // Mission Count Sensitivity (10, 20, 50)
    [10, 20, 50].forEach(count => {
        const newDevCostPerMission = totalDevCost / count;
        const newTotalCostPerMission = newDevCostPerMission + totalOpex;
        const effectiveSoldMass = Math.max(0.1, netSellableMass * (parseFloat(document.getElementById('fillRate').value) || 70) / 100);
        const costPerKg = newTotalCostPerMission / effectiveSoldMass;
        const price = costPerKg * upliftFactor;
        document.getElementById(`sens-missions-${count}`).textContent = formatEuro(price);
    });

    // Mission Cost Sensitivity (-10%, base, +10%)
    const variations = { 'minus': 0.9, 'base': 1.0, 'plus': 1.1 };
    Object.entries(variations).forEach(([key, factor]) => {
        const adjustedTotalCost = totalCostPerMission * factor;
        const effectiveSoldMass = Math.max(0.1, netSellableMass * (parseFloat(document.getElementById('fillRate').value) || 70) / 100);
        const costPerKg = adjustedTotalCost / effectiveSoldMass;
        const price = costPerKg * upliftFactor;
        document.getElementById(`sens-cost-${key}`).textContent = formatEuro(price);
    });
}

/**
 * Reset to default values
 */
function reset() {
    document.getElementById('phaseA').value = 500000;
    document.getElementById('phaseB').value = 1500000;
    document.getElementById('phaseC').value = 4000000;
    document.getElementById('phaseD').value = 12000000;
    document.getElementById('missionCount').value = 20;

    document.getElementById('launchCost').value = 3500000;
    document.getElementById('operationsCost').value = 750000;
    document.getElementById('recoveryCost').value = 600000;
    document.getElementById('logisticsCost').value = 250000;
    document.getElementById('groundSegmentCost').value = 300000;
    document.getElementById('teamCost').value = 450000;
    document.getElementById('insuranceCost').value = 400000;

    document.getElementById('maxMass').value = 100;
    document.getElementById('maxVolume').value = 500;
    document.getElementById('maxMdl').value = 10;
    document.getElementById('fillRate').value = 70;
    document.getElementById('capacityLoss').value = 10;

    document.getElementById('marginTarget').value = 35;
    document.getElementById('pricingBuffer').value = 10;
    document.getElementById('riskPremium').value = 8;
    document.getElementById('discountReserve').value = 5;

    loadScenario('base');
    calculate();
}

/**
 * Export analysis as text/JSON
 */
function exportAnalysis() {
    // Collect all current values
    const analysis = {
        timestamp: new Date().toISOString(),
        developmentCosts: {
            phaseA: parseFloat(document.getElementById('phaseA').value),
            phaseB: parseFloat(document.getElementById('phaseB').value),
            phaseC: parseFloat(document.getElementById('phaseC').value),
            phaseD: parseFloat(document.getElementById('phaseD').value),
            total: document.getElementById('totalDevCost').textContent,
            perMission: document.getElementById('devCostPerMission').textContent,
            missionCount: parseInt(document.getElementById('missionCount').value)
        },
        recurringCosts: {
            launch: parseFloat(document.getElementById('launchCost').value),
            operations: parseFloat(document.getElementById('operationsCost').value),
            recovery: parseFloat(document.getElementById('recoveryCost').value),
            logistics: parseFloat(document.getElementById('logisticsCost').value),
            groundSegment: parseFloat(document.getElementById('groundSegmentCost').value),
            team: parseFloat(document.getElementById('teamCost').value),
            insurance: parseFloat(document.getElementById('insuranceCost').value),
            total: document.getElementById('totalOpex').textContent
        },
        capacity: {
            maxMass: parseFloat(document.getElementById('maxMass').value),
            maxVolume: parseFloat(document.getElementById('maxVolume').value),
            maxMdl: parseFloat(document.getElementById('maxMdl').value),
            capacityLoss: parseFloat(document.getElementById('capacityLoss').value),
            fillRate: parseFloat(document.getElementById('fillRate').value),
            netSellableMass: document.getElementById('netSellableMass').textContent,
            effectiveSoldMass: document.getElementById('effectiveSoldMass').textContent
        },
        commercial: {
            marginTarget: parseFloat(document.getElementById('marginTarget').value),
            pricingBuffer: parseFloat(document.getElementById('pricingBuffer').value),
            riskPremium: parseFloat(document.getElementById('riskPremium').value),
            discountReserve: parseFloat(document.getElementById('discountReserve').value),
            upliftFactor: document.getElementById('liftFactor').textContent
        },
        outputs: {
            recommendedPrice: document.getElementById('recommendedPrice').textContent,
            baseCostPerKg: document.getElementById('baseCostPerKg').textContent,
            marginPerKg: document.getElementById('marginPerKg').textContent,
            marginPercent: document.getElementById('marginPercent').textContent,
            missionCost: document.getElementById('missionCost').textContent,
            missionRevenue: document.getElementById('missionRevenue').textContent,
            missionMarginAbs: document.getElementById('missionMarginAbs').textContent,
            missionMarginPercent: document.getElementById('missionMarginPercent').textContent
        }
    };

    // Create download
    const dataStr = JSON.stringify(analysis, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Phoenix-Internal-Pricing-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Format value as Euro currency
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
 * Format number with thousand separators
 */
function formatNumber(value) {
    if (!isFinite(value)) return '0';
    return value.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
