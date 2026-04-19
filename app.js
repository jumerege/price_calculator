// Phoenix Experiment Pricing Calculator
// Version 2.0 — with Payload Type Wizard

// Default Pricing Configuration
const DEFAULT_PRICING = {
    basePricePerKg: 45000,
    volumetricFactor: 2,           // L/kg - converts volume to equivalent billable mass
    mdlFeePerLocker: 3000000,
    powerSurchargePercent: 3,
    powerThreshold: 50,
    exclusiveFlightDiscount: 10,   // % discount for Dedicated Phoenix Flight
    payPrepayment: 10,
    payAdvance: 40,
    payInterim: 25,
    payFinal: 25
};

// CubeSat pricing: flat fee per U (45,000 × U)
const CUBESAT_PRICE_PER_U = 45000;

// ─────────────────────────────────────────────────────
// TRANSLATIONS / LOCALIZATION
// ─────────────────────────────────────────────────────

const TRANSLATIONS = {
    en: {
        // Header & Navigation
        'header.title': 'Phoenix Pricing Calculator',
        'header.subtitle': 'Describe your experiment. Reserve your Phoenix flight slot instantly.',
        'header.settings': '⚙️ Pricing Settings',
        
        // Payload Wizard
        'wizard.step1.title': 'What type of payload are you flying?',
        'wizard.step1.cubesat': 'CubeSat',
        'wizard.step1.cubesat_desc': 'Standard 1U–6U format',
        'wizard.step1.mdl': 'Mid Deck Locker',
        'wizard.step1.mdl_desc': 'ISS MDL form factor',
        'wizard.step1.other': 'Other / Custom',
        'wizard.step1.other_desc': 'Define by mass & volume',
        
        'wizard.step2a.label': 'Step 2 of 2 — CubeSat Size',
        'wizard.step2a.title': 'Select your CubeSat unit size',
        'wizard.step2b.label': 'Step 2 of 2 — MDL Count',
        'wizard.step2b.title': 'How many Mid Deck Lockers?',
        
        'wizard.back': '← Back',
        'wizard.change': 'Change selection',
        
        // Experiment Parameters
        'params.title': '🚀 Experiment Parameters',
        'params.help': 'Help me choose',
        'params.mass': 'Mass (kg)',
        'params.volume': 'Volume (L)',
        'params.mdl': 'Mid Deck Lockers (MDL)',
        'params.power': 'Power (W)',
        'params.customer': 'Customer Name',
        'params.customer_placeholder': 'e.g., Dr. Jane Smith',
        
        // Mission Duration
        'duration.title': '⏳ Mission Duration',
        'duration.label': 'Mission duration:',
        'duration.unit': 'weeks',
        'duration.info': 'The mission duration affects resource allocation and crew scheduling. Standard missions range from 3 to 12 weeks on-orbit.',
        
        // Funding Source
        'funding.title': '💰 Funding Source',
        'funding.question': 'How do you expect to fund this mission?',
        'funding.commercial': 'Commercial Budget',
        'funding.commercial_desc': 'Privately funded mission (internal budget or private investment)',
        'funding.esa': 'ESA-Funded Project',
        'funding.esa_desc': 'Mission supported through a European Space Agency program',
        'funding.national': 'National Grant or Public Funding',
        'funding.national_desc': 'Funded by national agencies (e.g., CNES, DLR, ASI, etc.)',
        'funding.undecided': 'Not Decided Yet',
        'funding.undecided_desc': 'Funding source is still being defined',
        
        // Pricing Display
        'pricing.title': '💵 Live Pricing',
        'pricing.cost': 'Mission Cost:',
        'pricing.estimated_cost': 'ESTIMATED MISSION COST',
        'pricing.fill_form': 'Fill in the form to calculate',
        'pricing.status': 'Ready for quote',
        'pricing.breakdown': 'Pricing breakdown:',
        'pricing.base_cost': 'Base Cost',
        'pricing.billable_mass': 'Billable Mass',
        'pricing.mdl_premium': 'MDL',
        'pricing.power_surcharge': 'Power Surcharge',
        'pricing.exclusive_discount': 'Exclusive Flight Discount',
        'pricing.density': 'kg/L density',
        'pricing.per_kg': '€ per kg',
        'pricing.per_liter': '€ per L',
        'pricing.total': 'Total',
        'pricing.note': '* Prices exclude applicable taxes and are in EUR (€)',
        
        // Buttons
        'btn.generate_mission_order': '📄 Generate Mission Order',
        'btn.join_waiting_list': '⏳ Join Mission Waiting List',
        'btn.generate_reservation': 'Generate Reservation PDF',
        'btn.cancel': 'Cancel',
        'btn.generate': 'Generate',
        
        // Settings
        'settings.title': 'Pricing Parameters (Advanced)',
        'settings.base_price': 'Base Price (€ / kg)',
        'settings.volumetric_factor': 'Volumetric Factor (L/kg)',
        'settings.volumetric_factor_desc': 'If volume/mass ratio exceeds this threshold, you pay based on volume. Default: 2 L/kg (industry standard).',
        'settings.volumetric_factor_range': 'Range: 1–4 L/kg',
        'settings.show_examples': 'Show Examples',
        'settings.mdl_fee': 'MDL Fee (€ per locker)',
        'settings.power_surcharge': 'Power Surcharge (% per W over 50W)',
        'settings.exclusive_flight_discount': 'Discount for Exclusive Flights (%)',
        'settings.exclusive_flight_discount_desc': 'Percentage discount applied to final mission price when selecting Dedicated Phoenix Flight',
        'settings.payment_milestones': '💳 Payment Milestones (%)',
        'settings.prepayment': 'Prepayment %',
        'settings.advance': 'Advance %',
        'settings.interim': 'Interim %',
        'settings.final': 'Final %',
        'settings.reset': 'Reset to Defaults',
        
        // Capsule Info
        'capsule.limits': '🛰️ Phoenix Capsule Limits',
        'capsule.max_payload': 'Max payload: 100 kg',
        'capsule.max_volume': 'Max volume: 300 L',
        'capsule.max_mdl': 'Max MDL: 2',
        'capsule.orbit': 'Orbit: LEO 550 km',
        
        // Modals
        'modal.payload_title': '📋 Payload Integration Details',
        'modal.volumetric_title': '💡 Understanding Volumetric Billing',
        'modal.reservation_title': '🎫 Reserve Mission Slot',
        'modal.details': '📋 Payload Integration Details',
        'modal.volumetric_help': 'Volumetric Billing Explanation',
        'modal.close': '×',
        'btn.close': 'Close',
        
        // Reservation
        'reservation.title': '🎫 Reserve Mission Slot',
        'reservation.subtitle': 'You\'re about to reserve a position in the Phoenix mission queue with a EUR 5,000 Reservation Deposit (subject to refund and credit terms - see PDF for details).',
        'reservation.deposit': 'Reservation Deposit: €5,000',
        'reservation.status': 'Conditional (refundable/creditable)',
        'reservation.purpose': 'Secure priority mission queue position',
        'reservation.company': 'Company / Organization',
        'reservation.company_placeholder': 'e.g., Exobiosphere Inc.',
        'reservation.email': 'Contact Email',
        'reservation.email_placeholder': 'contact@company.com',
        'reservation.phone': 'Contact Phone',
        'reservation.phone_placeholder': '+49 123 456789',
        'reservation.agreement': 'I understand this is a Reservation Deposit with conditional refund and credit terms as outlined in the PDF',
    },
    fr: {
        // Header & Navigation
        'header.title': 'Calculatrice de Prix Phoenix',
        'header.subtitle': 'Décrivez votre expérience. Réservez votre créneau de vol Phoenix instantanément.',
        'header.settings': '⚙️ Paramètres de Prix',
        
        // Payload Wizard
        'wizard.step1.title': 'Quel type de payload volez-vous?',
        'wizard.step1.cubesat': 'CubeSat',
        'wizard.step1.cubesat_desc': 'Format standard 1U–6U',
        'wizard.step1.mdl': 'Mid Deck Locker',
        'wizard.step1.mdl_desc': 'Facteur de forme ISS MDL',
        'wizard.step1.other': 'Autre / Personnalisé',
        'wizard.step1.other_desc': 'Définir par masse et volume',
        
        'wizard.step2a.label': 'Étape 2 sur 2 — Taille CubeSat',
        'wizard.step2a.title': 'Sélectionnez la taille de votre CubeSat',
        'wizard.step2b.label': 'Étape 2 sur 2 — Nombre de MDL',
        'wizard.step2b.title': 'Combien de Mid Deck Lockers?',
        
        'wizard.back': '← Retour',
        'wizard.change': 'Modifier la sélection',
        
        // Experiment Parameters
        'params.title': '🚀 Paramètres de l\'Expérience',
        'params.help': 'Aide pour choisir',
        'params.mass': 'Masse (kg)',
        'params.volume': 'Volume (L)',
        'params.mdl': 'Mid Deck Lockers (MDL)',
        'params.power': 'Puissance (W)',
        'params.customer': 'Nom du Client',
        'params.customer_placeholder': 'par ex., Dr. Jane Smith',
        
        // Mission Duration
        'duration.title': '⏳ Durée de la Mission',
        'duration.label': 'Durée de la mission :',
        'duration.unit': 'semaines',
        'duration.info': 'La durée de la mission affecte l\'allocation des ressources et la planification de l\'équipage. Les missions standard durent de 3 à 12 semaines en orbite.',
        
        // Funding Source
        'funding.title': '💰 Source de Financement',
        'funding.question': 'Comment prévoyez-vous de financer cette mission?',
        'funding.commercial': 'Budget Commercial',
        'funding.commercial_desc': 'Mission financée en privé (budget interne ou investissement privé)',
        'funding.esa': 'Projet Financé par l\'ESA',
        'funding.esa_desc': 'Mission soutenue par un programme de l\'Agence Spatiale Européenne',
        'funding.national': 'Subvention Nationale ou Financement Public',
        'funding.national_desc': 'Financé par des agences nationales (p. ex., CNES, DLR, ASI, etc.)',
        'funding.undecided': 'Pas Encore Décidé',
        'funding.undecided_desc': 'La source de financement est encore en cours de définition',
        
        // Pricing Display
        'pricing.title': '💵 Prix en Direct',
        'pricing.cost': 'Coût de la Mission :',
        'pricing.estimated_cost': 'COÛT ESTIMÉ DE LA MISSION',
        'pricing.fill_form': 'Remplissez le formulaire pour calculer',
        'pricing.status': 'Prêt pour devis',
        'pricing.breakdown': 'Détail du prix :',
        'pricing.base_cost': 'Coût de Base',
        'pricing.billable_mass': 'Masse Facturable',
        'pricing.mdl_premium': 'MDL',
        'pricing.power_surcharge': 'Surcharge Puissance',
        'pricing.exclusive_discount': 'Remise Vol Exclusif',
        'pricing.density': 'densité kg/L',
        'pricing.per_kg': '€ par kg',
        'pricing.per_liter': '€ par L',
        'pricing.total': 'Total',
        'pricing.note': '* Les prix n\'incluent pas les taxes applicables et sont en EUR (€)',
        
        // Buttons
        'btn.generate_mission_order': '📄 Générer Commande de Mission',
        'btn.join_waiting_list': '⏳ Rejoindre la Liste d\'Attente',
        'btn.generate_reservation': 'Générer PDF de Réservation',
        'btn.cancel': 'Annuler',
        'btn.generate': 'Générer',
        
        // Settings
        'settings.title': 'Paramètres de Prix (Avancé)',
        'settings.base_price': 'Prix de Base (€ / kg)',
        'settings.volumetric_factor': 'Facteur Volumétrique (L/kg)',
        'settings.volumetric_factor_desc': 'Si le rapport volume/masse dépasse ce seuil, vous payez en fonction du volume. Par défaut : 2 L/kg (norme industrielle).',
        'settings.volumetric_factor_range': 'Plage : 1-4 L/kg',
        'settings.show_examples': 'Afficher les Exemples',
        'settings.mdl_fee': 'Frais MDL (€ par casier)',
        'settings.power_surcharge': 'Surcharge Puissance (% par W au-delà de 50W)',
        'settings.exclusive_flight_discount': 'Remise pour Vols Exclusifs (%)',
        'settings.exclusive_flight_discount_desc': 'Pourcentage de réduction appliqué au prix final de la mission lors de la sélection d\'un vol Phoenix dédié',
        'settings.payment_milestones': '💳 Étapes de Paiement (%)',
        'settings.prepayment': 'Prépaiement %',
        'settings.advance': 'Acompte %',
        'settings.interim': 'Intermédiaire %',
        'settings.final': 'Final %',
        'settings.reset': 'Réinitialiser aux Valeurs par Défaut',
        
        // Capsule Info
        'capsule.limits': '🛰️ Limites de la Capsule Phoenix',
        'capsule.max_payload': 'Charge maximale : 100 kg',
        'capsule.max_volume': 'Volume max : 300 L',
        'capsule.max_mdl': 'MDL max : 2',
        'capsule.orbit': 'Orbite : LEO 550 km',
        
        // Modals
        'modal.payload_title': '📋 Détails d\'Intégration du Payload',
        'modal.volumetric_title': '💡 Comprendre la Facturation Volumétrique',
        'modal.reservation_title': '🎫 Réserver un Créneau de Mission',
        'modal.details': '📋 Détails d\'Intégration du Payload',
        'modal.volumetric_help': 'Explication de la Facturation Volumétrique',
        'modal.close': '×',
        'btn.close': 'Fermer',
        
        // Reservation
        'reservation.title': '🎫 Réserver un Créneau de Mission',
        'reservation.subtitle': 'Vous êtes sur le point de réserver une position dans la file d\'attente de mission Phoenix avec une Caution de Réservation de 5 000 € (sujette aux conditions de remboursement et de crédit - voir le PDF pour les détails).',
        'reservation.deposit': 'Caution de Réservation : 5 000 €',
        'reservation.status': 'Conditionnelle (remboursable/créditée)',
        'reservation.purpose': 'Sécuriser une position prioritaire dans la file d\'attente de mission',
        'reservation.company': 'Entreprise / Organisation',
        'reservation.company_placeholder': 'par ex., Exobiosphere Inc.',
        'reservation.email': 'E-mail de Contact',
        'reservation.email_placeholder': 'contact@company.com',
        'reservation.phone': 'Téléphone de Contact',
        'reservation.phone_placeholder': '+33 123 456 789',
        'reservation.agreement': 'Je comprends qu\'il s\'agit d\'une Caution de Réservation avec conditions de remboursement et de crédit conditionnelles telles que décrites dans le PDF',
    },
    de: {
        // Header & Navigation
        'header.title': 'Phoenix Preisrechner',
        'header.subtitle': 'Beschreiben Sie Ihr Experiment. Reservieren Sie Ihren Phoenix-Flugplatz sofort.',
        'header.settings': '⚙️ Preisparameter',
        
        // Payload Wizard
        'wizard.step1.title': 'Welche Art von Payload fliegen Sie?',
        'wizard.step1.cubesat': 'CubeSat',
        'wizard.step1.cubesat_desc': 'Standard-Format 1U–6U',
        'wizard.step1.mdl': 'Mid Deck Locker',
        'wizard.step1.mdl_desc': 'ISS MDL Formfaktor',
        'wizard.step1.other': 'Sonstiges / Benutzerdefiniert',
        'wizard.step1.other_desc': 'Nach Masse und Volumen definieren',
        
        'wizard.step2a.label': 'Schritt 2 von 2 — CubeSat-Größe',
        'wizard.step2a.title': 'Wählen Sie Ihre CubeSat-Einheitsgröße',
        'wizard.step2b.label': 'Schritt 2 von 2 — MDL-Anzahl',
        'wizard.step2b.title': 'Wie viele Mid Deck Lockers?',
        
        'wizard.back': '← Zurück',
        'wizard.change': 'Auswahl ändern',
        
        // Experiment Parameters
        'params.title': '🚀 Experiment-Parameter',
        'params.help': 'Hilfe beim Auswählen',
        'params.mass': 'Masse (kg)',
        'params.volume': 'Volumen (L)',
        'params.mdl': 'Mid Deck Lockers (MDL)',
        'params.power': 'Leistung (W)',
        'params.customer': 'Kundenname',
        'params.customer_placeholder': 'z.B. Dr. Jane Smith',
        
        // Mission Duration
        'duration.title': '⏳ Missionsdauer',
        'duration.label': 'Missionsdauer:',
        'duration.unit': 'Wochen',
        'duration.info': 'Die Missionsdauer beeinflusst die Ressourcenallokation und Crew-Planung. Standardmissionen dauern 3 bis 12 Wochen im Orbit.',
        
        // Funding Source
        'funding.title': '💰 Finanzierungsquelle',
        'funding.question': 'Wie planen Sie diese Mission zu finanzieren?',
        'funding.commercial': 'Kommerzielles Budget',
        'funding.commercial_desc': 'Privat finanzierte Mission (internes Budget oder private Finanzierung)',
        'funding.esa': 'ESA-finanziertes Projekt',
        'funding.esa_desc': 'Mission unterstützt durch ein Programm der Europäischen Weltraumbehörde',
        'funding.national': 'Nationale Förderung oder öffentliche Finanzierung',
        'funding.national_desc': 'Finanziert durch nationale Behörden (z.B. CNES, DLR, ASI, etc.)',
        'funding.undecided': 'Noch nicht Entschieden',
        'funding.undecided_desc': 'Finanzierungsquelle wird noch definiert',
        
        // Pricing Display
        'pricing.title': '💵 Live-Preisgestaltung',
        'pricing.cost': 'Missionskosten:',
        'pricing.estimated_cost': 'GESCHÄTZTE MISSIONSKOSTEN',
        'pricing.fill_form': 'Füllen Sie das Formular aus zum Berechnen',
        'pricing.status': 'Bereit für Angebot',
        'pricing.breakdown': 'Preisaufschlüsselung:',
        'pricing.base_cost': 'Grundkosten',
        'pricing.billable_mass': 'Abrechenbare Masse',
        'pricing.mdl_premium': 'MDL',
        'pricing.power_surcharge': 'Leistungszuschlag',
        'pricing.exclusive_discount': 'Rabatt Exklusivflug',
        'pricing.density': 'kg/L Dichte',
        'pricing.per_kg': '€ pro kg',
        'pricing.per_liter': '€ pro L',
        'pricing.total': 'Gesamt',
        'pricing.note': '* Preise ohne Steuern und in EUR (€)',
        
        // Buttons
        'btn.generate_mission_order': '📄 Missionsauftrag Generieren',
        'btn.join_waiting_list': '⏳ Auf Warteliste Beitreten',
        'btn.generate_reservation': 'Reservierungs-PDF Generieren',
        'btn.cancel': 'Abbrechen',
        'btn.generate': 'Generieren',
        
        // Settings
        'settings.title': 'Preisparameter (Erweitert)',
        'settings.base_price': 'Grundpreis (€ / kg)',
        'settings.volumetric_factor': 'Volumetrischer Faktor (L/kg)',
        'settings.volumetric_factor_desc': 'Wenn das Verhältnis Volumen/Masse diese Schwelle überschreitet, zahlen Sie basierend auf dem Volumen. Standard: 2 L/kg (Industriestandard).',
        'settings.volumetric_factor_range': 'Bereich: 1–4 L/kg',
        'settings.show_examples': 'Beispiele Anzeigen',
        'settings.mdl_fee': 'MDL-Gebühr (€ pro Fach)',
        'settings.power_surcharge': 'Leistungszuschlag (% pro W über 50W)',
        'settings.exclusive_flight_discount': 'Rabatt für Exklusive Flüge (%)',
        'settings.exclusive_flight_discount_desc': 'Prozentsatz-Rabatt auf den endgültigen Missionspreisen bei Auswahl eines dedizierten Phoenix-Flugs',
        'settings.payment_milestones': '💳 Zahlungsmeilensteine (%)',
        'settings.prepayment': 'Vorauszahlung %',
        'settings.advance': 'Anzahlung %',
        'settings.interim': 'Zwischenfinanzierung %',
        'settings.final': 'Abschließend %',
        'settings.reset': 'Auf Standard Zurücksetzen',
        
        // Capsule Info
        'capsule.limits': '🛰️ Phoenix-Kapsel-Grenzen',
        'capsule.max_payload': 'Max. Nutzlast: 100 kg',
        'capsule.max_volume': 'Max. Volumen: 300 L',
        'capsule.max_mdl': 'Max. MDL: 2',
        'capsule.orbit': 'Umlaufbahn: LEO 550 km',
        
        // Modals
        'modal.payload_title': '📋 Payload-Integrationsdetails',
        'modal.volumetric_title': '💡 Erklärung zur Volumetrischen Abrechnung',
        'modal.reservation_title': '🎫 Missionsplatz Reservieren',
        'modal.details': '📋 Payload-Integrationsdetails',
        'modal.volumetric_help': 'Erklärung der Volumetrischen Abrechnung',
        'modal.close': '×',
        'btn.close': 'Schließen',
        
        // Reservation
        'reservation.title': '🎫 Missionsplatz Reservieren',
        'reservation.subtitle': 'Sie sind dabei, einen Platz in der Phoenix-Missionswarteschlange mit einer 5.000-€-Reservierungskaution zu reservieren (unterliegt Rückerstattungs- und Gutschriftbedingungen - siehe PDF für Details).',
        'reservation.deposit': 'Reservierungskaution: 5.000 €',
        'reservation.status': 'Bedingt (rückerstattbar/gutgeschrieben)',
        'reservation.purpose': 'Vorrangige Missionsschlangposition sichern',
        'reservation.company': 'Unternehmen / Organisation',
        'reservation.company_placeholder': 'z.B. Exobiosphere Inc.',
        'reservation.email': 'Kontakte-Mail',
        'reservation.email_placeholder': 'contact@company.com',
        'reservation.phone': 'Kontakttelefon',
        'reservation.phone_placeholder': '+49 123 456 789',
        'reservation.agreement': 'Ich verstehe, dass dies eine Reservierungskaution mit bedingten Rückerstattungs- und Gutschriftbedingungen ist, wie im PDF dargelegt',
    }
};

// Current language
let currentLanguage = localStorage.getItem('phoenix_language') || 'en';

// Translation helper function
function t(key) {
    return TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS['en']?.[key] || key;
}

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

// ─────────────────────────────────────────────────────
// LANGUAGE SETUP
// ─────────────────────────────────────────────────────

function setupLanguageSelector() {
    const langBtns = document.querySelectorAll('[data-lang]');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
        });
        
        // Highlight active language
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        }
    });
}

function switchLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('phoenix_language', lang);
    
    // Update active button
    document.querySelectorAll('[data-lang]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all translatable text
    updatePageTranslations();
}

function updatePageTranslations() {
    // Update header
    document.querySelector('h1').textContent = t('header.title');
    document.querySelector('header p').textContent = t('header.subtitle');
    document.getElementById('settingsToggleBtn').textContent = t('header.settings');
    
    // Update wizard titles and buttons
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (el.tagName === 'INPUT' && el.type === 'button' || el.tagName === 'BUTTON') {
            el.textContent = t(key);
        } else if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'email' || el.type === 'tel')) {
            el.placeholder = t(key);
        } else {
            el.textContent = t(key);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('📋 DOMContentLoaded fired');
    setupLanguageSelector();
    console.log('✓ setupLanguageSelector');
    updatePageTranslations();
    console.log('✓ updatePageTranslations');
    loadPricingFromStorage();
    console.log('✓ loadPricingFromStorage');
    setupWizard();
    console.log('✓ setupWizard');
    setupSettings();
    console.log('✓ setupSettings');
    setupNavigationMenu();
    console.log('✓ setupNavigationMenu');
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

function setupFundingSourceSelector() {
    console.log('💰 setupFundingSourceSelector called');
    const fundingRadios = document.querySelectorAll('input[name="fundingSource"]');
    const esaInfoNote = document.getElementById('esaInfoNote');
    
    console.log('   - Found', fundingRadios.length, 'funding source radios');
    console.log('   - esaInfoNote element:', esaInfoNote);
    
    fundingRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                fundingSource = this.value;
                console.log('✅ Funding Source selected:', fundingSource);
                
                // Show/hide ESA info note
                if (esaInfoNote) {
                    if (fundingSource === 'esa') {
                        esaInfoNote.style.display = 'block';
                        console.log('   ℹ️ ESA info note shown');
                    } else {
                        esaInfoNote.style.display = 'none';
                        console.log('   ℹ️ ESA info note hidden');
                    }
                }
                
                recalculate(); // Trigger recalculation with new funding source
            }
        });
    });
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
        // Scroll to Experiment Parameters section (centered for better framing)
        setTimeout(() => {
            const experimentParams = document.getElementById('experimentParams');
            if (experimentParams) {
                experimentParams.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
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
    const settingsDrawer = document.getElementById('settingsDrawer');
    const resetSettingsBtn = document.getElementById('resetSettings');

    if (resetSettingsBtn) resetSettingsBtn.addEventListener('click', resetSettings);

    ['basePricePerKg','volumetricFactor','mdlFeePerLocker','powerSurchargePercent','exclusiveFlightDiscount',
     'payPrepayment','payAdvance','payInterim','payFinal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => { updatePricing(); recalculate(); });
    });
}

// ─────────────────────────────────────────────
// NAVIGATION MENU LOGIC
// ─────────────────────────────────────────────

function setupNavigationMenu() {
    const navMenuBtn = document.getElementById('navMenuBtn');
    const navMenuDropdown = document.getElementById('navMenuDropdown');
    const settingsMenuItem = document.getElementById('settingsMenuItem');

    // Toggle menu on button click
    if (navMenuBtn) {
        navMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenuDropdown.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenuDropdown && !navMenuDropdown.contains(e.target) && e.target !== navMenuBtn) {
            navMenuDropdown.classList.remove('active');
        }
    });

    // Settings menu item opens settings drawer
    if (settingsMenuItem) {
        settingsMenuItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const settingsDrawer = document.getElementById('settingsDrawer');
            navMenuDropdown.classList.remove('active');
            settingsDrawer.classList.add('open');
        });
    }
}

function updatePricing() {
    currentPricing = {
        basePricePerKg: parseFloat(document.getElementById('basePricePerKg').value) || DEFAULT_PRICING.basePricePerKg,
        volumetricFactor: parseFloat(document.getElementById('volumetricFactor').value) || DEFAULT_PRICING.volumetricFactor,
        mdlFeePerLocker: parseFloat(document.getElementById('mdlFeePerLocker').value) ||0,
        powerSurchargePercent: parseFloat(document.getElementById('powerSurchargePercent').value) || 0,
        exclusiveFlightDiscount: parseFloat(document.getElementById('exclusiveFlightDiscount').value) || DEFAULT_PRICING.exclusiveFlightDiscount,
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
    document.getElementById('volumetricFactor').value = DEFAULT_PRICING.volumetricFactor;
    document.getElementById('mdlFeePerLocker').value = DEFAULT_PRICING.mdlFeePerLocker;
    document.getElementById('powerSurchargePercent').value = DEFAULT_PRICING.powerSurchargePercent;
    document.getElementById('exclusiveFlightDiscount').value = DEFAULT_PRICING.exclusiveFlightDiscount;
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
            document.getElementById('volumetricFactor').value = currentPricing.volumetricFactor;
            document.getElementById('mdlFeePerLocker').value = currentPricing.mdlFeePerLocker;
            document.getElementById('powerSurchargePercent').value = currentPricing.powerSurchargePercent;
            document.getElementById('exclusiveFlightDiscount').value = currentPricing.exclusiveFlightDiscount;
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

    // ─── Reservation Modal Setup ─────────────────────────────────────
    console.log('🎫 Setting up mission reservation flow');
    const joinWaitingListBtn = document.getElementById('joinWaitingListBtn');
    const reservationModal = document.getElementById('reservationModal');
    const reservationModalCloseBtn = document.getElementById('reservationModalCloseBtn');
    const reservationModalCancelBtn = document.getElementById('reservationModalCancelBtn');
    const reservationConfirmBtn = document.getElementById('reservationConfirmBtn');
    const reservationCompanyInput = document.getElementById('reservationCompany');
    const reservationEmailInput = document.getElementById('reservationEmail');
    const reservationPhoneInput = document.getElementById('reservationPhone');
    const reservationAgreementCheckbox = document.getElementById('reservationAgreement');

    if (joinWaitingListBtn) {
        joinWaitingListBtn.addEventListener('click', () => {
            console.log('   🎫 Open reservation modal');
            // Pre-fill company if customer name exists
            if (!reservationCompanyInput.value && currentQuote?.customerName) {
                reservationCompanyInput.value = currentQuote.customerName;
            }
            reservationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            reservationAgreementCheckbox.checked = false;
        });
    }

    if (reservationModalCloseBtn || reservationModalCancelBtn) {
        const closeReservationModal = () => {
            console.log('   ✓ Close reservation modal');
            reservationModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        if (reservationModalCloseBtn) reservationModalCloseBtn.addEventListener('click', closeReservationModal);
        if (reservationModalCancelBtn) reservationModalCancelBtn.addEventListener('click', closeReservationModal);
    }

    if (reservationConfirmBtn) {
        reservationConfirmBtn.addEventListener('click', () => {
            console.log('   🎫 Reservation confirm clicked');
            
            const company = reservationCompanyInput.value.trim();
            const email = reservationEmailInput.value.trim();
            const phone = reservationPhoneInput.value.trim();
            const agreed = reservationAgreementCheckbox.checked;

            // Validation
            if (!company) {
                alert('Please enter your Company / Organization name');
                reservationCompanyInput.focus();
                return;
            }
            if (!email) {
                alert('Please enter your Contact Email');
                reservationEmailInput.focus();
                return;
            }
            if (!email.includes('@')) {
                alert('Please enter a valid email address');
                reservationEmailInput.focus();
                return;
            }
            if (!agreed) {
                alert('Please confirm you understand this is a non-refundable reservation');
                reservationAgreementCheckbox.focus();
                return;
            }

            console.log('   ✓ Reservation validated, generating PDF');
            generateMissionReservationPDF(currentQuote?.customerName || '', company, email, phone);
            
            // Close modal after generation
            reservationModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Show success message
            alert('✓ Mission Slot Reservation PDF has been generated and downloaded!\n\nPlease review the document and submit payment of EUR 5,000 as instructed.');
        });
    }

    // Close modal when clicking outside
    if (reservationModal) {
        reservationModal.addEventListener('click', (e) => {
            if (e.target === reservationModal) {
                reservationModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
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
    
    // ─── VOLUMETRIC FACTOR HELP MODAL ───────────────────────────
    console.log('💡 Setting up volumetric factor help modal');
    const volumetricFactorModal = document.getElementById('volumetricFactorModal');
    const volumetricFactorHelpBtn = document.getElementById('volumetricFactorHelpBtn');
    const volumetricFactorCloseBtn = document.getElementById('volumetricFactorCloseBtn');
    const volumetricFactorConfirmBtn = document.getElementById('volumetricFactorConfirmBtn');
    
    if (volumetricFactorHelpBtn) {
        volumetricFactorHelpBtn.addEventListener('click', () => {
            console.log('   💡 Help button clicked');
            volumetricFactorModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        console.log('   ✓ Help button listener attached');
    }
    
    if (volumetricFactorCloseBtn) {
        volumetricFactorCloseBtn.addEventListener('click', () => {
            console.log('   ✓ Help close button clicked');
            volumetricFactorModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (volumetricFactorConfirmBtn) {
        volumetricFactorConfirmBtn.addEventListener('click', () => {
            console.log('   ✓ Help confirm button clicked');
            volumetricFactorModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (volumetricFactorModal) {
        volumetricFactorModal.addEventListener('click', (e) => {
            if (e.target === volumetricFactorModal) {
                console.log('   ✓ Clicked outside help modal');
                volumetricFactorModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ─── HELP CHOOSE PARAMETERS BUTTON ───────────────────────────
    console.log('🆘 Setting up help choose parameters button');
    const helpChooseBtn = document.getElementById('helpChooseParamsBtn');
    const presetsDrawerWrapper = document.getElementById('presetsDrawerWrapper');
    const closePresetsDrawerBtn = document.getElementById('closePresetsDrawerBtn');
    const presetsDrawerOverlay = document.getElementById('presetsDrawerOverlay');
    
    if (helpChooseBtn) {
        helpChooseBtn.addEventListener('click', () => {
            console.log('   🆘 Help choose button clicked');
            presetsDrawerWrapper.classList.toggle('open');
            console.log('   ✓ Toggled presets drawer');
        });
        console.log('   ✓ Help choose button listener attached');
    }
    
    if (closePresetsDrawerBtn) {
        closePresetsDrawerBtn.addEventListener('click', () => {
            console.log('   ✓ Close presets drawer button clicked');
            presetsDrawerWrapper.classList.remove('open');
        });
        console.log('   ✓ Close presets drawer button listener attached');
    }
    
    if (presetsDrawerOverlay) {
        presetsDrawerOverlay.addEventListener('click', () => {
            console.log('   ✓ Clicked presets drawer overlay');
            presetsDrawerWrapper.classList.remove('open');
        });
        console.log('   ✓ Overlay click listener attached');
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
    // Close presets drawer after selection
    const presetsDrawerWrapper = document.getElementById('presetsDrawerWrapper');
    if (presetsDrawerWrapper) {
        presetsDrawerWrapper.classList.remove('open');
    }
    recalculate();
}

// ─────────────────────────────────────────────────────
// PRICING CALCULATION
// ─────────────────────────────────────────────────────

function calculatePricing(mass, volume, mdl, power, payloadType) {
    const isMDL = payloadType === 'mdl';

    // ─── VOLUMETRIC BILLING MODEL ───────────────────────────────
    // Calculate billable mass based on volumetric factor
    const volumetricMass = volume / currentPricing.volumetricFactor;
    const billableMass = Math.max(mass, volumetricMass);
    const usesVolumetricMass = billableMass === volumetricMass && billableMass > mass;

    // Base cost calculation using billable mass
    const baseCost = isMDL ? 0 : billableMass * currentPricing.basePricePerKg;
    const mdlCost  = mdl * currentPricing.mdlFeePerLocker;

    // Power surcharge base: MDL fee when MDL, otherwise mass-based cost
    const powerBase = isMDL ? mdlCost : baseCost;
    let powerCost = 0;
    if (power > currentPricing.powerThreshold) {
        const excess = power - currentPricing.powerThreshold;
        powerCost = powerBase * (excess * (currentPricing.powerSurchargePercent / 100));
    }

    // Subtotal before discount
    const subtotal = baseCost + mdlCost + powerCost;

    // ─── EXCLUSIVE FLIGHT DISCOUNT ───────────────────────────────
    // Apply discount only if mission type is "dedicated"
    let discountAmount = 0;
    if (selectedMissionType === 'dedicated') {
        discountAmount = subtotal * (currentPricing.exclusiveFlightDiscount / 100);
    }

    const totalCost = subtotal - discountAmount;
    
    return {
        // Original inputs
        actualMass: mass,
        volume: volume,
        mdl: mdl,
        power: power,
        
        // Volumetric calculations
        volumetricFactor: currentPricing.volumetricFactor,
        volumetricMass: volumetricMass,
        billableMass: billableMass,
        usesVolumetricMass: usesVolumetricMass,
        
        // Costs
        baseCost: baseCost,
        mdlCost: mdlCost,
        powerCost: powerCost,
        subtotal: subtotal,
        discountAmount: discountAmount,
        exclusiveFlightDiscount: currentPricing.exclusiveFlightDiscount,
        totalCost: totalCost,
        
        // Metrics
        isMDL: isMDL,
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
    document.getElementById('joinWaitingListBtn').disabled = !ready;

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
        ['baseCost','billableMassValue','mdlCost','powerCost','discountCost'].forEach(id => {
            if (document.getElementById(id)) {
                document.getElementById(id).textContent = '€ 0';
            }
        });
        document.getElementById('baseCostSub').textContent      = '-- kg (billable) × €45,000/kg';
        document.getElementById('billableMassSub').textContent  = 'Actual: -- kg | Volumetric: -- kg';
        document.getElementById('mdlCostSub').textContent       = '0 lockers × €3M';
        document.getElementById('powerCostSub').textContent     = '≤50W — no surcharge';
        // Hide discount row if exists
        const discountRow = document.getElementById('discountRow');
        if (discountRow) discountRow.style.display = 'none';
        return;
    }

    const isMDL = pricing.isMDL;

    // Display base cost using billable mass
    document.getElementById('baseCost').textContent = isMDL ? 'N/A' : formatEuro(pricing.baseCost);
    
    // Display billable mass calculation
    if (isMDL) {
        document.getElementById('billableMassValue').textContent = 'N/A';
        document.getElementById('billableMassSub').textContent = 'Included in MDL flat fee';
    } else {
        const volumetricMassStr = pricing.volumetricMass.toFixed(2);
        const billableMassStr = pricing.billableMass.toFixed(2);
        
        document.getElementById('billableMassValue').textContent = `${billableMassStr} kg`;
        document.getElementById('billableMassSub').textContent = 
            `Actual: ${pricing.actualMass.toFixed(2)} kg | Volumetric: ${volumetricMassStr} kg (${pricing.volume.toFixed(1)} L ÷ ${pricing.volumetricFactor} L/kg)`;
    }
    
    // MDL and Power costs
    document.getElementById('mdlCost').textContent = formatEuro(pricing.mdlCost);
    document.getElementById('powerCost').textContent = formatEuro(pricing.powerCost);

    document.getElementById('baseCostSub').textContent = isMDL ? 'Included in MDL flat fee' : 
        `${pricing.billableMass.toFixed(2)} kg (billable) × ${formatEuro(currentPricing.basePricePerKg)}/kg`;
    
    document.getElementById('mdlCostSub').textContent = `${mdl} locker(s) × ${formatEuro(currentPricing.mdlFeePerLocker)} flat`;
    
    document.getElementById('powerCostSub').textContent = power > currentPricing.powerThreshold
        ? `${power - currentPricing.powerThreshold}W excess × ${currentPricing.powerSurchargePercent}%`
        : `≤${currentPricing.powerThreshold}W — no surcharge`;

    // ─── EXCLUSIVE FLIGHT DISCOUNT ───────────────────────────────
    // Show/hide discount row based on mission type
    const discountRow = document.getElementById('discountRow');
    if (selectedMissionType === 'dedicated' && pricing.discountAmount > 0) {
        if (discountRow) {
            discountRow.style.display = 'block';
            document.getElementById('discountCost').textContent = '-' + formatEuro(pricing.discountAmount);
            document.getElementById('discountCostSub').textContent = `${pricing.exclusiveFlightDiscount}% discount`;
        }
    } else {
        if (discountRow) discountRow.style.display = 'none';
    }
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
    bar.style.background = value > max ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#22c55e';
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
// FUNDING SOURCE HELPER
// ─────────────────────────────────────────────────────

function getFundingSourceDescription(fundingSource) {
    const fundingMap = {
        'commercial': 'Commercially funded mission (internal or private funding)',
        'esa': 'Mission supported through a European Space Agency (ESA) program',
        'national': 'Mission supported through national public funding (e.g., CNES, DLR, ASI, etc.)',
        'undecided': 'Funding source to be determined'
    };
    return fundingMap[fundingSource] || 'Funding source not specified';
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

    checkSpace(15);
    font('bold', 9, [5, 15, 50]); at('1.3', L, cy);
    block(
        `Funding Source: ${getFundingSourceDescription(fundingSource)}`,
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
             `${pricing.billableMass.toFixed(2)} kg (billable) \u00d7 ${formatEuro(pricingConfig.basePricePerKg)}/kg`,
             formatEuro(pricing.baseCost)],
            ['Billable Mass',
             `max(${mass} kg, ${pricing.volumetricMass.toFixed(2)} kg volumetric)`,
             `${pricing.billableMass.toFixed(2)} kg`],
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

// ─────────────────────────────────────────────────────
// GENERATE MISSION SLOT RESERVATION PDF
// ─────────────────────────────────────────────────────

function generateMissionReservationPDF(customerNameArg, customerCompany, customerEmail, customerPhone) {
    if (!currentQuote) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });

    const PW = 210, PH = 297, L = 20, R = 190;
    const CW = R - L;
    let cy = 0;

    const { mass, volume, mdl, power, missionName, launchDate,
            pricing, pricingConfig, payloadType } = currentQuote;

    const reservationNo = `RESV-${new Date().toISOString().split('T')[0].replace(/-/g,'')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    const validUntil = (() => { const d = new Date(); d.setDate(d.getDate() + 30); return d.toISOString().split('T')[0]; })();

    // ── Helper functions ───────────────────────────────────────────────
    const font = (s, sz, c) => {
        doc.setFont('helvetica', s || 'normal');
        doc.setFontSize(sz || 9.5);
        doc.setTextColor(...(c || [50, 50, 50]));
    };
    const at = (str, x, y, o) => { doc.text(str, x, y, o || {}); };
    const gap = (d) => { cy += d || 5; };
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
        font('bold', 10, [5, 15, 50]);
        at(num, L, cy); at(title, L + 36, cy); cy += 7;
    };
    const checkSpace = (needed) => {
        if (cy + (needed || 25) > PH - 18) {
            doc.addPage(); cy = 15;
            font('italic', 7.5, [160, 160, 160]);
            at(`Mission Slot Reservation — CONFIDENTIAL`, L, cy);
            at(reservationNo, R, cy, { align: 'right' });
            cy += 3;
            doc.setDrawColor(205, 210, 220); doc.setLineWidth(0.15);
            doc.line(L, cy, R, cy); cy += 5;
        }
    };

    // ── HEADER with ATMOS Logo ─────────────────────────────────────────
    // Load logo from HTML img tag that's already on page
    const logoImg = document.querySelector('.atmos-logo-img');
    let logoAdded = false;
    
    if (logoImg && logoImg.src) {
        try {
            // Use the already-loaded image from the page
            const canvas = document.createElement('canvas');
            canvas.width = logoImg.naturalWidth || 300;
            canvas.height = logoImg.naturalHeight || 100;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(logoImg, 0, 0);
            const imgData = canvas.toDataURL('image/png');
            
            // Add logo to PDF (60mm width, maintaining aspect ratio)
            const logoWidth = 60;
            const logoHeight = (logoWidth * canvas.height) / canvas.width;
            doc.addImage(imgData, 'PNG', L, 8, logoWidth, logoHeight);
            cy = 8 + logoHeight + 3;
            logoAdded = true;
            console.log('✓ Logo added to PDF');
        } catch (e) {
            console.warn('Could not embed logo from image:', e);
        }
    }

    // Fallback if logo couldn't be added
    if (!logoAdded) {
        console.warn('Logo not available, using text header');
        font('bold', 18, [10, 24, 80]);
        at('ATMOS', L, cy); cy += 8;
        at('SPACE CARGO', L, cy); cy += 1;
        cy += 5;
    }

    at(reservationNo, R, 12, { align: 'right' });
    font('normal', 8.5, [120, 120, 120]);
    at(today + ' (UTC)', R, 16, { align: 'right' });
    at(`Valid until: ${validUntil}`, R, 20, { align: 'right' }); 

    rule([0, 170, 220], 1.5); gap(8);

    font('bold', 14, [0, 180, 255]);
    at('MISSION SLOT RESERVATION', L + CW/2, cy, { align: 'center' }); cy += 9;

    font('normal', 9, [80, 80, 100]);
    at(`No. ${reservationNo}`, L, cy);
    at('Under Phoenix Service Agreement', L, cy + 4); cy += 10;

    gap(3);

    // ── PARTIES ───────────────────────────────────────────────────────
    checkSpace(35);
    font('bold', 9.5, [20, 30, 60]);
    at('between', L, cy); cy += 5;

    font('bold', 9.5, [5, 15, 50]);
    at('Atmos Space Cargo GmbH,', L, cy); cy += 4;
    font('normal', 8, [100, 100, 100]);
    block('a company established at Im Gewerbegebiet 3, 77839 Lichtenau, Germany, registered at the trade register Mannheim under registration number HRB 741961, represented by Mr. Sebastian Klaus ("Atmos")', L, CW, 8);
    gap(3);

    font('bold', 9.5, [20, 30, 60]);
    at('and', L, cy); cy += 5;

    font('bold', 9.5, [5, 15, 50]);
    at(customerNameArg || customerCompany || 'Customer', L, cy); cy += 4;
    if (customerCompany) block(customerCompany, L, CW, 8);
    font('normal', 8.5, [100, 100, 100]);
    if (customerEmail) at(customerEmail, L, cy), cy += 4;
    if (customerPhone) at(customerPhone, L, cy), cy += 4;
    gap(3);

    font('normal', 9, [80, 80, 100]);
    at('together referred to as "Parties" and individually also as "Party"', L, cy); cy += 6;

    rule([100, 150, 200], 1);
    gap(6);

    // ── ARTICLE 1: SUBJECT MATTER ─────────────────────────────────────
    checkSpace(30);
    artTitle('ARTICLE 1', 'MISSION SLOT RESERVATION');
    gap(2);

    block(`1.1 This document constitutes a non-binding reservation request for a position in the waiting list / scheduled queue for the Phoenix mission service. The selected Phoenix mission is "${missionName}", scheduled for launch on ${launchDate || 'TBD'}.`, L, CW, 9, 'normal', [30, 30, 50]);
    gap(3);

    block('1.2 This Mission Slot Reservation is subject to technical compatibility review, mission manifest constraints, and final execution of a separate definitive Mission Order by both Parties. Acceptance of this reservation does not constitute acceptance of the Customer\'s payload for flight or guarantee of mission execution.', L, CW, 9, 'normal', [30, 30, 50]);
    gap(3);

    // ── ARTICLE 2: PAYLOAD SPECIFICATION ──────────────────────────────
    checkSpace(40);
    artTitle('ARTICLE 2', 'PAYLOAD SPECIFICATION');
    gap(2);

    const payloadData = [
        ['Parameter', 'Value'],
        ['Mass (kg)', mass.toFixed(2)],
        ['Volume (L)', volume.toFixed(2)],
        ['Power (W)', power.toString()],
        ['Mid Deck Lockers', mdl.toString()],
        ['Mission Type', currentQuote.missionType === 'dedicated' ? 'Dedicated' : 'Shared'],
    ];

    doc.setFillColor(15, 30, 80);
    font('bold', 9, [255, 255, 255]);
    doc.rect(L, cy, CW/2, 5, 'F');
    at('Parameter', L + 2, cy + 3.5);
    doc.rect(L + CW/2, cy, CW/2, 5, 'F');
    at('Value', L + CW/2 + 2, cy + 3.5);
    cy += 5;

    font('normal', 8.5, [50, 50, 80]);
    payloadData.slice(1).forEach((row, idx) => {
        if (idx % 2 === 0) doc.setFillColor(240, 245, 255);
        else doc.setFillColor(255, 255, 255);
        doc.rect(L, cy, CW/2, 4.5, 'F');
        doc.rect(L + CW/2, cy, CW/2, 4.5, 'F');
        at(row[0], L + 2, cy + 2.8);
        at(row[1], L + CW/2 + 2, cy + 2.8);
        cy += 4.5;
    });
    gap(3);

    // – Funding Source –
    font('bold', 9, [5, 15, 50]);
    at('Funding Source:', L, cy); cy += 4;
    font('normal', 8.5, [80, 80, 100]);
    block(getFundingSourceDescription(fundingSource), L + 3, CW - 3, 8.5, 'normal', [80, 80, 100]);
    gap(2);

    // ── ARTICLE 3: PRICING & RESERVATION FEE ──────────────────────────
    checkSpace(50);
    artTitle('ARTICLE 3', 'ESTIMATED MISSION PRICING & RESERVATION FEE');
    gap(2);

    font('normal', 9, [80, 100, 120]);
    at('3.1 Estimated Mission Pricing (subject to final technical review and confirmation):', L, cy); cy += 6;

    // Pricing table
    const pricingRows = [
        ['Cost Component', 'Calculation', 'Amount (EUR)'],
        ['Base Cost', `${pricing.billableMass.toFixed(2)} kg × ${formatEuro(pricingConfig.basePricePerKg)}/kg`, formatEuro(pricing.baseCost)],
        ['MDL Premium', `${mdl} locker(s) × ${formatEuro(pricingConfig.mdlFeePerLocker)}`, formatEuro(pricing.mdlCost)],
        ['Power Surcharge', pricing.powerCost > 0 ? `${(power - pricingConfig.powerThreshold)} W excess × ${pricingConfig.powerSurchargePercent}%` : 'None', formatEuro(pricing.powerCost)],
    ];

    doc.setFillColor(15, 30, 80);
    font('bold', 8.5, [255, 255, 255]);
    let colW = [CW * 0.35, CW * 0.4, CW * 0.25];
    doc.rect(L, cy, colW[0], 5, 'F');
    at(pricingRows[0][0], L + 2, cy + 3.5);
    doc.rect(L + colW[0], cy, colW[1], 5, 'F');
    at(pricingRows[0][1], L + colW[0] + 2, cy + 3.5);
    doc.rect(L + colW[0] + colW[1], cy, colW[2], 5, 'F');
    at(pricingRows[0][2], L + colW[0] + colW[1] + 2, cy + 3.5);
    cy += 5;

    font('normal', 8, [50, 50, 80]);
    pricingRows.slice(1).forEach((row, idx) => {
        if (idx % 2 === 0) doc.setFillColor(245, 248, 255);
        else doc.setFillColor(255, 255, 255);
        doc.rect(L, cy, colW[0], 4, 'F');
        doc.rect(L + colW[0], cy, colW[1], 4, 'F');
        doc.rect(L + colW[0] + colW[1], cy, colW[2], 4, 'F');
        at(row[0], L + 2, cy + 2.3);
        at(row[1], L + colW[0] + 2, cy + 2.3);
        at(row[2], L + colW[0] + colW[1] + 2, cy + 2.3, { align: 'right' });
        cy += 4;
    });
    cy += 2;

    // Total estimated mission cost
    doc.setFillColor(30, 60, 130);
    doc.rect(L, cy, CW, 5, 'F');
    font('bold', 9.5, [255, 255, 255]);
    at('Estimated Total Mission Cost (subject to change)', L + 2, cy + 3.5);
    at(formatEuro(pricing.totalCost), R - 2, cy + 3.5, { align: 'right' });
    cy += 7;

    gap(2);

    // RESERVATION DEPOSIT - PROMINENT
    checkSpace(35);
    doc.setFillColor(0, 212, 255);
    doc.rect(L, cy, CW, 35, 'F');
    
    font('bold', 11, [10, 20, 60]);
    at('RESERVATION DEPOSIT', L + CW/2, cy + 5, { align: 'center' });
    
    font('bold', 16, [10, 20, 60]);
    at('EUR 5,000', L + CW/2, cy + 12, { align: 'center' });
    
    font('normal', 8.5, [10, 20, 60]);
    at('Secures priority position in the Phoenix mission queue', L + CW/2, cy + 20, { align: 'center' });
    
    font('bold', 9, [10, 20, 60]);
    at('Refundable / Creditable per deposit terms below', L + CW/2, cy + 27, { align: 'center' });
    
    cy += 38;
    gap(2);

    font('bold', 9.5, [30, 30, 80]);
    at('3.2 Reservation Deposit Terms:', L, cy); cy += 5;
    
    font('bold', 8.5, [40, 40, 80]);
    at('A. If Atmos cannot accommodate the Customer\'s experiment:', L + 4, cy); cy += 3.5;
    font('normal', 8, [60, 60, 100]);
    at('Full refund of the EUR 5,000 deposit', L + 8, cy); cy += 4;
    
    font('bold', 8.5, [40, 40, 80]);
    at('B. If Customer proceeds with full mission contract and completes payment:', L + 4, cy); cy += 3.5;
    font('normal', 8, [60, 60, 100]);
    at('EUR 5,000 deposit is credited toward the total mission price', L + 8, cy); cy += 4;
    
    font('bold', 8.5, [40, 40, 80]);
    at('C. If Customer withdraws voluntarily:', L + 4, cy); cy += 3.5;
    font('normal', 8, [60, 60, 100]);
    at('• Withdrawal >8 months before launch (L-8): 50% of deposit refunded', L + 8, cy); cy += 3.5;
    at('• Withdrawal shorter than 8 months before launch (L-7 or closer to launch day): Not-refundable', L + 8, cy); cy += 4;

    gap(3);

    // ── ARTICLE 4: RESERVATION TERMS ──────────────────────────────────
    checkSpace(60);
    artTitle('ARTICLE 4', 'RESERVATION TERMS & CONDITIONS');
    gap(2);

    const terms = [
        { num: '4.1', title: 'Nature of Reservation', text: 'This document reserves a priority position in the Phoenix mission queue/waiting list for the selected mission and parameters specified above. The Reservation confirms that Atmos will allocate a provisional slot to the Customer contingent on successful technical and commercial review.' },
        { num: '4.2', title: 'Reservation Deposit Purpose', text: 'The EUR 5,000 Reservation Deposit secures the Customer\'s priority position in the mission queue and demonstrates serious commercial intent. The deposit is NOT the final mission contract and does NOT constitute payment for the full mission service.' },
        { num: '4.3', title: 'Deposit Refund & Credit Rules', text: 'The EUR 5,000 Reservation Deposit shall be treated as follows:\n\n(a) If Atmos Space Cargo determines following technical or operational review that the Customer\'s experiment cannot be accommodated on the Phoenix mission, the Reservation Deposit shall be fully refunded.\n\n(b) If the Customer proceeds to execute a definitive Mission Order and completes full payment of the mission price, the EUR 5,000 Reservation Deposit shall be credited toward the total mission price.\n\n(c) If the Customer withdraws voluntarily prior to execution of a definitive Mission Order: (i) withdrawal more than 8 months prior to scheduled launch (L-8): 50% of the deposit shall be refunded; (ii) withdrawal at or within 8 months of scheduled launch: the deposit shall be non-refundable.' },
        { num: '4.4', title: 'No Final Commitment', text: 'This reservation does NOT constitute a final Mission Order or final service contract. A separate, definitive Mission Order Agreement must be mutually executed in writing before any commitment to integrate, prepare, or launch the Customer\'s payload.' },
        { num: '4.5', title: 'Technical Review', text: 'Atmos will conduct a comprehensive technical and compatibility review of the payload, including mass distribution analysis, power budget verification, thermal analysis, structural compatibility, and integration feasibility. This review may require additional information or clarifications from the Customer.' },
        { num: '4.6', title: 'Vehicle & Schedule Subject to Change', text: 'Final mission allocation is subject to flight vehicle availability, launch manifest constraints, schedule changes, and weather delays. Atmos makes no guarantees regarding specific launch dates or flight assignment.' },
        { num: '4.7', title: 'Future Pricing & Terms', text: 'Final pricing, payment schedule, launch date, mission parameters, and commercial terms will be confirmed only in a separate written definitive Mission Order. The estimated pricing shown in this document is for budgeting purposes only and is subject to change based on final technical review and market conditions.' },
    ];

    terms.forEach(term => {
        checkSpace(25);
        font('bold', 9, [10, 30, 80]);
        at(`${term.num} ${term.title}`, L, cy); cy += 4;
        block(term.text, L + 2, CW - 2, 8.5, 'normal', [40, 40, 70]); gap(2);
    });

    // ── Additional Terms
    checkSpace(30);
    font('bold', 9, [10, 30, 80]);
    at('4.8 No Guarantee of Execution', L, cy); cy += 4;
    block('Payment of the EUR 5,000 Reservation Deposit does NOT guarantee technical acceptance, payload integration, launch execution, mission success, or any other outcome. Atmos retains full discretion to review, approve, delay, postpone, or decline the mission based on technical, operational, contractual, or regulatory grounds.', L + 2, CW - 2, 8.5, 'normal', [40, 40, 70]); gap(2);

    checkSpace(25);
    font('bold', 9, [10, 30, 80]);
    at('4.9 Atmos Reservation of Rights', L, cy); cy += 4;
    block('Atmos reserves the right to: (a) decline acceptance if technical review reveals incompatibility; (b) request additional information or modifications to the payload; (c) adjust mission allocation based on manifest optimization; (d) reschedule or cancel the mission for safety, operational, or regulatory reasons; (e) require separate agreements on insurance, liability, and indemnification before final acceptance.', L + 2, CW - 2, 8.5, 'normal', [40, 40, 70]); gap(2);

    // ── ARTICLE 5: NEXT STEPS ─────────────────────────────────────────
    checkSpace(25);
    artTitle('ARTICLE 5', 'NEXT STEPS & PROCESS');
    gap(2);
    block('5.1 Upon payment of the EUR 5,000 Reservation Deposit, Atmos will contact the Customer within 3–5 business days to initiate the technical review process.\n\n5.2 Atmos will provide a preliminary technical assessment within 10 business days and discuss any required modifications or clarifications.\n\n5.3 If technical review is successful and both Parties agree in principle on mission scope, Atmos will propose a definitive Mission Order for execution within 15 business days.', L, CW, 8.5, 'normal', [40, 40, 70]); gap(3);

    // ── SIGNATURES ────────────────────────────────────────────────────
    checkSpace(45);
    rule([100, 150, 200], 1);
    gap(8);

    font('bold', 10, [10, 30, 80]);
    at('SIGNATURES', L + CW/2, cy, { align: 'center' }); cy += 10;

    font('normal', 9, [60, 60, 100]);
    at('For Atmos Space Cargo GmbH', L, cy); cy += 8;
    at('____________________________________', L, cy); cy += 5;
    at('Signature', L, cy); cy += 3;
    at('Date', L, cy); cy += 8;

    at(`For ${customerCompany || customerName || 'Customer'}`, R - 70, cy - 16); 
    at('____________________________________', R - 70, cy - 8);
    at('Signature', R - 70, cy - 3);
    at('Date', R - 70, cy + 2);

    cy = PH - 13;
    rule([100, 120, 150], 0.5);
    font('italic', 7, [140, 140, 140]);
    at('Mission Slot Reservation — CONFIDENTIAL', L, PH - 8);
    at(`Page 1 of 1`, R, PH - 8, { align: 'right' });

    doc.save(`mission-reservation-${reservationNo}.pdf`);
    console.log(`✓ Reservation PDF generated: ${reservationNo}`);
}

