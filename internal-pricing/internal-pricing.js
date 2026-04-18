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
    missionCount: 20,
    reusabilityFactor: 3,
    
    // Section B - Recurring Costs
    launchCost: 1500000,
    operationsCost: 150000,
    recoveryCost: 200000,
    integrationCost: 150000,  
    refurbishmentCost: 200000,
    logisticsCost: 100000,
    
    // Section C - Payload & Revenue
    maxPayloadMass: 100,
    maxVolume: 300,
    utilization: 75,
    volumetricFactor: 2,
    
    // Section E - Pricing
    targetMargin: 30
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
    // All calculation inputs
    document.querySelectorAll('.calc-input').forEach(input => {
        input.addEventListener('input', calculate);
    });

    // Action buttons
    document.getElementById('resetBtn').addEventListener('click', reset);
    document.getElementById('exportBtn').addEventListener('click', exportAnalysis);

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
 * Main calculation engine - ESA-aligned
 */
function calculate() {
    // ============ SECTION A: NON-RECURRING COSTS (NRC) ============
    
    const phaseA = parseFloat(document.getElementById('phaseA').value) || DEFAULTS.phaseA;
    const phaseB = parseFloat(document.getElementById('phaseB').value) || DEFAULTS.phaseB;
    const phaseC = parseFloat(document.getElementById('phaseC').value) || DEFAULTS.phaseC;
    const phaseD = parseFloat(document.getElementById('phaseD').value) || DEFAULTS.phaseD;
    const missionCount = Math.max(1, parseInt(document.getElementById('missionCount').value) || DEFAULTS.missionCount);
    const reusabilityFactor = Math.max(1, parseFloat(document.getElementById('reusabilityFactor').value) || DEFAULTS.reusabilityFactor);

    // Calculate total NRC
    const totalNrc = phaseA + phaseB + phaseC + phaseD;
    const devCostPerMission = totalNrc / missionCount;

    // Update Section A outputs
    document.getElementById('totalNrc').textContent = formatEuro(totalNrc);
    document.getElementById('devCostPerMission').textContent = formatEuro(devCostPerMission);

    // ============ SECTION B: RECURRING COST PER MISSION ============
    
    const launchCost = parseFloat(document.getElementById('launchCost').value) || DEFAULTS.launchCost;
    const operationsCost = parseFloat(document.getElementById('operationsCost').value) || DEFAULTS.operationsCost;
    const recoveryCost = parseFloat(document.getElementById('recoveryCost').value) || DEFAULTS.recoveryCost;
    const integrationCost = parseFloat(document.getElementById('integrationCost').value) || DEFAULTS.integrationCost;
    const refurbishmentCost = parseFloat(document.getElementById('refurbishmentCost').value) || DEFAULTS.refurbishmentCost;
    const logisticsCost = parseFloat(document.getElementById('logisticsCost').value) || DEFAULTS.logisticsCost;

    const totalRecurringCost = launchCost + operationsCost + recoveryCost + integrationCost + refurbishmentCost + logisticsCost;

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
    document.getElementById('phaseA').value = DEFAULTS.phaseA;
    document.getElementById('phaseB').value = DEFAULTS.phaseB;
    document.getElementById('phaseC').value = DEFAULTS.phaseC;
    document.getElementById('phaseD').value = DEFAULTS.phaseD;
    document.getElementById('missionCount').value = DEFAULTS.missionCount;
    document.getElementById('reusabilityFactor').value = DEFAULTS.reusabilityFactor;

    document.getElementById('launchCost').value = DEFAULTS.launchCost;
    document.getElementById('operationsCost').value = DEFAULTS.operationsCost;
    document.getElementById('recoveryCost').value = DEFAULTS.recoveryCost;
    document.getElementById('integrationCost').value = DEFAULTS.integrationCost;
    document.getElementById('refurbishmentCost').value = DEFAULTS.refurbishmentCost;
    document.getElementById('logisticsCost').value = DEFAULTS.logisticsCost;

    document.getElementById('maxPayloadMass').value = DEFAULTS.maxPayloadMass;
    document.getElementById('maxVolume').value = DEFAULTS.maxVolume;
    document.getElementById('utilization').value = DEFAULTS.utilization;
    document.getElementById('volumetricFactor').value = DEFAULTS.volumetricFactor;

    document.getElementById('targetMargin').value = DEFAULTS.targetMargin;

    calculate();
}

/**
 * Export analysis as JSON
 */
function exportAnalysis() {
    const analysis = {
        timestamp: new Date().toISOString(),
        title: "Phoenix ESA-Aligned Internal Pricing Analysis",
        sections: {
            A_nrc: {
                inputs: {
                    phaseA: parseFloat(document.getElementById('phaseA').value),
                    phaseB: parseFloat(document.getElementById('phaseB').value),
                    phaseC: parseFloat(document.getElementById('phaseC').value),
                    phaseD: parseFloat(document.getElementById('phaseD').value),
                    missionCount: parseInt(document.getElementById('missionCount').value),
                    reusabilityFactor: parseFloat(document.getElementById('reusabilityFactor').value)
                },
                outputs: {
                    totalNrc: document.getElementById('totalNrc').textContent,
                    devCostPerMission: document.getElementById('devCostPerMission').textContent
                }
            },
            B_recurring: {
                inputs: {
                    launchCost: parseFloat(document.getElementById('launchCost').value),
                    operationsCost: parseFloat(document.getElementById('operationsCost').value),
                    recoveryCost: parseFloat(document.getElementById('recoveryCost').value),
                    integrationCost: parseFloat(document.getElementById('integrationCost').value),
                    refurbishmentCost: parseFloat(document.getElementById('refurbishmentCost').value),
                    logisticsCost: parseFloat(document.getElementById('logisticsCost').value)
                },
                outputs: {
                    totalRecurringCost: document.getElementById('totalRecurringCost').textContent
                }
            },
            C_payload: {
                inputs: {
                    maxPayloadMass: parseFloat(document.getElementById('maxPayloadMass').value),
                    maxVolume: parseFloat(document.getElementById('maxVolume').value),
                    utilization: parseFloat(document.getElementById('utilization').value),
                    volumetricFactor: parseFloat(document.getElementById('volumetricFactor').value)
                },
                outputs: {
                    maxSellableMass: document.getElementById('maxSellableMass').textContent,
                    avgSoldMass: document.getElementById('avgSoldMass').textContent
                }
            },
            D_costModel: {
                outputs: {
                    totalCostPerMission: document.getElementById('totalCostPerMission').textContent,
                    breakEvenPrice: document.getElementById('breakEvenPrice').textContent
                }
            },
            E_pricing: {
                inputs: {
                    targetMargin: parseFloat(document.getElementById('targetMargin').value)
                },
                outputs: {
                    recommendedPrice: document.getElementById('recommendedPrice').textContent,
                    revenuePerMission: document.getElementById('revenuePerMission').textContent,
                    operationalMarginPercent: document.getElementById('operationalMarginPercent').textContent
                }
            }
        }
    };

    const dataStr = JSON.stringify(analysis, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Phoenix-Pricing-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
