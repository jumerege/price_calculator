// Phoenix FAQ Page — Trilingual Q&A
// Covers: Pricing & Costs | Phoenix Capsule & Technical

// ─────────────────────────────────────────────────────
// FAQ DATA (EN / FR / DE)
// ─────────────────────────────────────────────────────

const FAQ_DATA = {
    en: {
        pageTitle: 'Frequently Asked Questions',
        pageSubtitle: 'Everything you need to know about Phoenix mission pricing and capabilities.',
        backLabel: 'Back to Calculator',
        catPricing: '💰 Pricing & Costs',
        catTechnical: '🛰️ Phoenix Capsule & Technical',
        footerNote: 'Still have questions? Contact ATMOS Space Cargo at <a href="mailto:info@atmos-space-cargo.com">info@atmos-space-cargo.com</a>',
        pricing: [
            {
                q: 'How is the base price calculated?',
                a: 'The base price is calculated per kilogram of billable mass at €45,000/kg. Billable mass is the greater of your actual payload mass or the volumetric equivalent (volume ÷ volumetric factor). This model is standard in the space logistics industry.'
            },
            {
                q: 'What is a volumetric factor and why does it matter?',
                a: 'The volumetric factor (default: 2 L/kg) converts your payload volume into an equivalent mass. If your payload is large but light, you are billed based on the volume-equivalent mass rather than the actual mass. This prevents oversized, low-density payloads from underpricing compact, heavy ones.'
            },
            {
                q: 'Is there a minimum price for a Dedicated Phoenix Flight?',
                a: 'Yes. Dedicated missions require a minimum mission value of €4M to be considered. This reflects the exclusive access to the full capsule capacity and dedicated flight operations.'
            },
            {
                q: 'What is the difference between a Dedicated and a Shared Phoenix Flight?',
                a: 'A Dedicated Phoenix Flight gives you full exclusive access to the capsule\'s payload capacity for your experiment. A Shared Flight allows multiple customers to fly on the same mission, with each paying for their allocated share. Shared flights offer more flexible entry for smaller payloads.'
            },
            {
                q: 'Does mission duration affect the price?',
                a: 'Yes, a small duration multiplier is applied: 1.00× for 3–4 weeks, 1.05× for 5–8 weeks, and 1.10× for 9–12 weeks. Longer missions involve increased telemetry throughput, extended operational support, and sustained onboard resource use.'
            },
            {
                q: 'What is the MDL fee?',
                a: 'The Mid Deck Locker (MDL) fee is a flat charge of €3,000,000 per locker. Up to 2 MDL slots are available per mission. The MDL is an ISS standard form factor used for larger, rack-mounted experiments.'
            },
            {
                q: 'How is the power surcharge applied?',
                a: 'Power consumption up to 50 W is included at no extra cost. For every watt above 50 W, a surcharge of 3% of the base cost is added per watt. This reflects the sustained battery and power management load over the mission.'
            },
            {
                q: 'What are the payment milestones?',
                a: 'The default payment structure is: 10% Prepayment upon reservation, 40% Advance Payment at mission confirmation, 25% Interim Payment at integration, and 25% Final Payment upon successful return. All percentages are adjustable in the pricing settings.'
            },
            {
                q: 'Are prices inclusive of taxes?',
                a: 'No. All prices displayed in the calculator are exclusive of applicable taxes and are denominated in EUR (€). Final invoices may be subject to VAT or other applicable taxes depending on the customer\'s jurisdiction.'
            },
            {
                q: 'What is the Reservation Deposit?',
                a: 'The €5,000 Reservation Deposit secures your position in the mission queue. It is conditional and may be refunded or credited toward mission fees depending on the terms agreed at reservation. See the generated PDF for full terms.'
            }
        ],
        technical: [
            {
                q: 'What is the Phoenix capsule?',
                a: 'Phoenix is a reusable space return capsule developed by ATMOS Space Cargo GmbH. It is designed to return payloads safely from Low Earth Orbit (LEO) to Earth, enabling microgravity experiments, in-space manufacturing, and biological research with a physical sample return.'
            },
            {
                q: 'What orbit does Phoenix fly to?',
                a: 'Phoenix missions target Low Earth Orbit (LEO) at approximately 550 km altitude. This orbit is compatible with most launch providers and offers excellent access for scientific and commercial payloads.'
            },
            {
                q: 'What are the payload capacity limits?',
                a: 'The Phoenix capsule supports a maximum payload mass of 100 kg, a maximum volume of 300 L, and up to 2 Mid Deck Lockers (MDL). Power allocation goes up to 135 W total, with the first 50 W included at no surcharge.'
            },
            {
                q: 'What CubeSat sizes are supported?',
                a: 'Phoenix supports CubeSat payloads from 1U to 6U. Pricing for CubeSats is a flat fee per unit: €45,000 per U (e.g., 3U = €135,000). CubeSat mass and volume are pre-configured based on standard form factor specifications.'
            },
            {
                q: 'How long can a mission last?',
                a: 'Missions can last between 3 and 12 weeks in orbit. Week 1 covers launch, deployment, and sun orientation. The final week covers de-orbit, re-entry, splashdown, and transport to ATMOS headquarters in Lichtenau, Germany. All weeks in between are operational mission time.'
            },
            {
                q: 'Which launch vehicles are compatible with Phoenix?',
                a: 'Phoenix is compatible with SpaceX\'s Falcon 9 Bandwagon missions. ATMOS can also accommodate requests for alternative launchers. Late access (L-7 days) is available for flights with SpaceX, allowing payloads to be integrated shortly before launch.'
            },
            {
                q: 'Where does Phoenix land after re-entry?',
                a: 'After splashdown and recovery, the capsule and all samples are transported to ATMOS Space Cargo\'s headquarters in Lichtenau, Germany for inspection, sample extraction, and handover to the customer.'
            },
            {
                q: 'What is Late Access and when is it available?',
                a: 'Late Access allows payload integration as late as 7 days before launch (L-7). This is particularly useful for time-sensitive biological or chemical experiments. It is currently proposed for SpaceX Falcon 9 Bandwagon flights and must be requested in advance.'
            }
        ]
    },
    fr: {
        pageTitle: 'Questions Fréquemment Posées',
        pageSubtitle: 'Tout ce que vous devez savoir sur la tarification et les capacités des missions Phoenix.',
        backLabel: 'Retour au Calculateur',
        catPricing: '💰 Tarification & Coûts',
        catTechnical: '🛰️ Capsule Phoenix & Technique',
        footerNote: 'Encore des questions ? Contactez ATMOS Space Cargo à <a href="mailto:info@atmos-space-cargo.com">info@atmos-space-cargo.com</a>',
        pricing: [
            {
                q: 'Comment le prix de base est-il calculé ?',
                a: 'Le prix de base est calculé par kilogramme de masse facturable à €45 000/kg. La masse facturable est la valeur la plus élevée entre votre masse réelle de charge utile et l\'équivalent volumétrique (volume ÷ facteur volumétrique).'
            },
            {
                q: 'Qu\'est-ce que le facteur volumétrique et pourquoi est-il important ?',
                a: 'Le facteur volumétrique (par défaut : 2 L/kg) convertit le volume de votre charge utile en masse équivalente. Si votre charge est volumineuse mais légère, la facturation se basera sur la masse volumétrique équivalente plutôt que sur la masse réelle.'
            },
            {
                q: 'Y a-t-il un prix minimum pour un vol Phoenix Dédié ?',
                a: 'Oui. Les missions dédiées requièrent une valeur minimale de €4M pour être étudiées. Cela reflète l\'accès exclusif à la capacité totale de la capsule et aux opérations de vol dédiées.'
            },
            {
                q: 'Quelle est la différence entre un vol Dédié et un vol Partagé ?',
                a: 'Un vol Phoenix Dédié vous donne un accès exclusif total à la capacité de la capsule. Un vol Partagé permet à plusieurs clients de voler sur la même mission, chacun payant pour sa part allouée. Les vols partagés offrent une entrée plus flexible pour les charges utiles plus petites.'
            },
            {
                q: 'La durée de la mission affecte-t-elle le prix ?',
                a: 'Oui, un multiplicateur de durée modéré est appliqué : 1,00× pour 3–4 semaines, 1,05× pour 5–8 semaines, et 1,10× pour 9–12 semaines. Les missions plus longues impliquent davantage de télémétrie et un soutien opérationnel prolongé.'
            },
            {
                q: 'Qu\'est-ce que les frais MDL ?',
                a: 'Les frais de Mid Deck Locker (MDL) sont un forfait de €3 000 000 par casier. Jusqu\'à 2 emplacements MDL sont disponibles par mission. Le MDL est un facteur de forme standard ISS utilisé pour les expériences plus importantes.'
            },
            {
                q: 'Comment la surcharge de puissance est-elle appliquée ?',
                a: 'La consommation d\'énergie jusqu\'à 50 W est incluse sans frais supplémentaires. Pour chaque watt au-delà de 50 W, une surcharge de 3 % du coût de base est ajoutée par watt.'
            },
            {
                q: 'Quelles sont les étapes de paiement ?',
                a: 'La structure de paiement par défaut est : 10 % de prépaiement à la réservation, 40 % d\'acompte à la confirmation, 25 % de paiement intermédiaire à l\'intégration, et 25 % de paiement final au retour. Tous les pourcentages sont ajustables.'
            },
            {
                q: 'Les prix incluent-ils les taxes ?',
                a: 'Non. Tous les prix affichés dans le calculateur sont hors taxes applicables et libellés en EUR (€). Les factures finales peuvent être soumises à la TVA ou d\'autres taxes selon la juridiction du client.'
            },
            {
                q: 'Qu\'est-ce que la caution de réservation ?',
                a: 'La caution de réservation de €5 000 sécurise votre position dans la file d\'attente de mission. Elle est conditionnelle et peut être remboursée ou créditée sur les frais de mission selon les conditions convenues.'
            }
        ],
        technical: [
            {
                q: 'Qu\'est-ce que la capsule Phoenix ?',
                a: 'Phoenix est une capsule spatiale réutilisable de retour développée par ATMOS Space Cargo GmbH. Elle est conçue pour ramener des charges utiles en toute sécurité depuis l\'orbite terrestre basse (LEO) vers la Terre.'
            },
            {
                q: 'Sur quelle orbite vole Phoenix ?',
                a: 'Les missions Phoenix ciblent l\'orbite terrestre basse (LEO) à environ 550 km d\'altitude, compatible avec la plupart des lanceurs et offrant un excellent accès pour les charges utiles scientifiques et commerciales.'
            },
            {
                q: 'Quelles sont les limites de capacité de charge utile ?',
                a: 'La capsule Phoenix supporte une masse maximale de 100 kg, un volume maximal de 300 L, jusqu\'à 2 MDL, et une puissance totale allant jusqu\'à 135 W (les 50 premiers W sont inclus sans surcharge).'
            },
            {
                q: 'Quelles tailles de CubeSat sont prises en charge ?',
                a: 'Phoenix prend en charge les CubeSats de 1U à 6U. La tarification est un forfait par unité : €45 000 par U (ex. 3U = €135 000).'
            },
            {
                q: 'Quelle est la durée d\'une mission ?',
                a: 'Les missions durent entre 3 et 12 semaines. La première semaine couvre le lancement et le déploiement. La dernière semaine couvre la désorbitage, la rentrée, l\'amerrissage et le transport vers Lichtenau, Allemagne.'
            },
            {
                q: 'Quels lanceurs sont compatibles avec Phoenix ?',
                a: 'Phoenix est compatible avec les missions Falcon 9 Bandwagon de SpaceX. ATMOS peut également étudier des demandes pour d\'autres lanceurs. Un accès tardif (L-7 jours) est disponible pour les vols SpaceX.'
            },
            {
                q: 'Où atterrit Phoenix après la rentrée ?',
                a: 'Après l\'amerrissage et la récupération, la capsule est transportée au siège d\'ATMOS Space Cargo à Lichtenau, Allemagne, pour l\'inspection, l\'extraction des échantillons et la remise au client.'
            },
            {
                q: 'Qu\'est-ce que l\'accès tardif et quand est-il disponible ?',
                a: 'L\'accès tardif permet l\'intégration de la charge utile jusqu\'à 7 jours avant le lancement (L-7). Particulièrement utile pour les expériences biologiques sensibles au temps. Actuellement proposé pour les vols Falcon 9 Bandwagon de SpaceX.'
            }
        ]
    },
    de: {
        pageTitle: 'Häufig Gestellte Fragen',
        pageSubtitle: 'Alles, was Sie über die Preisgestaltung und Fähigkeiten der Phoenix-Mission wissen müssen.',
        backLabel: 'Zurück zum Rechner',
        catPricing: '💰 Preisgestaltung & Kosten',
        catTechnical: '🛰️ Phoenix-Kapsel & Technik',
        footerNote: 'Noch Fragen? Kontaktieren Sie ATMOS Space Cargo unter <a href="mailto:info@atmos-space-cargo.com">info@atmos-space-cargo.com</a>',
        pricing: [
            {
                q: 'Wie wird der Grundpreis berechnet?',
                a: 'Der Grundpreis wird pro Kilogramm abrechenbarer Masse zu €45.000/kg berechnet. Die abrechenbare Masse ist das Maximum aus tatsächlicher Nutzlastmasse und dem volumetrischen Äquivalent (Volumen ÷ volumetrischer Faktor).'
            },
            {
                q: 'Was ist der volumetrische Faktor und warum ist er wichtig?',
                a: 'Der volumetrische Faktor (Standard: 2 L/kg) wandelt das Volumen Ihrer Nutzlast in eine äquivalente Masse um. Wenn Ihre Nutzlast groß aber leicht ist, wird die Abrechnung auf Basis der volumenäquivalenten Masse statt der tatsächlichen Masse durchgeführt.'
            },
            {
                q: 'Gibt es einen Mindestpreis für einen Dedizierten Phoenix-Flug?',
                a: 'Ja. Dedizierte Missionen erfordern einen Mindest-Missionswert von €4 Mio., um berücksichtigt zu werden. Dies spiegelt den exklusiven Zugang zur vollen Kapselkapazität und dedizierten Flugoperationen wider.'
            },
            {
                q: 'Was ist der Unterschied zwischen einem Dedizierten und einem Geteilten Flug?',
                a: 'Ein Dedizierter Phoenix-Flug bietet exklusiven Vollzugang zur Kapselkapazität. Ein Geteilter Flug ermöglicht mehreren Kunden, auf derselben Mission zu fliegen, wobei jeder für seinen zugeteilten Anteil zahlt.'
            },
            {
                q: 'Beeinflusst die Missionsdauer den Preis?',
                a: 'Ja, ein moderater Dauermultiplikator wird angewendet: 1,00× für 3–4 Wochen, 1,05× für 5–8 Wochen und 1,10× für 9–12 Wochen. Längere Missionen erfordern mehr Telemetrie-Durchsatz und erweiterte Betriebsunterstützung.'
            },
            {
                q: 'Was ist die MDL-Gebühr?',
                a: 'Die Mid Deck Locker (MDL) Gebühr beträgt pauschal €3.000.000 pro Fach. Pro Mission sind bis zu 2 MDL-Plätze verfügbar. Das MDL ist ein ISS-Standard-Formfaktor für größere, rack-montierte Experimente.'
            },
            {
                q: 'Wie wird der Leistungszuschlag berechnet?',
                a: 'Stromverbrauch bis 50 W ist ohne Aufpreis enthalten. Für jeden Watt über 50 W wird ein Zuschlag von 3 % der Grundkosten pro Watt berechnet.'
            },
            {
                q: 'Was sind die Zahlungsmeilensteine?',
                a: 'Die Standard-Zahlungsstruktur ist: 10 % Vorauszahlung bei Reservierung, 40 % Anzahlung bei Missionsbestätigung, 25 % Zwischenzahlung bei Integration und 25 % Abschlusszahlung bei erfolgreicher Rückkehr.'
            },
            {
                q: 'Sind die Preise inklusive Steuern?',
                a: 'Nein. Alle Preise im Rechner sind exklusive anwendbarer Steuern und in EUR (€) denominiert. Endgültige Rechnungen können je nach Steuerdomizil des Kunden der Mehrwertsteuer oder anderen Steuern unterliegen.'
            },
            {
                q: 'Was ist die Reservierungskaution?',
                a: 'Die Reservierungskaution von €5.000 sichert Ihre Position in der Missionswarteschlange. Sie ist bedingt und kann gemäß den bei der Reservierung vereinbarten Bedingungen erstattet oder auf Missionsgebühren angerechnet werden.'
            }
        ],
        technical: [
            {
                q: 'Was ist die Phoenix-Kapsel?',
                a: 'Phoenix ist eine wiederverwendbare Rückkehrkapsel, die von ATMOS Space Cargo GmbH entwickelt wurde. Sie ist darauf ausgelegt, Nutzlasten sicher aus dem niedrigen Erdorbit (LEO) zurückzubringen.'
            },
            {
                q: 'Welchen Orbit befliegt Phoenix?',
                a: 'Phoenix-Missionen zielen auf den niedrigen Erdorbit (LEO) in ca. 550 km Höhe ab – kompatibel mit den meisten Trägern und ideal für wissenschaftliche und kommerzielle Nutzlasten.'
            },
            {
                q: 'Was sind die Nutzlastgrenzen der Kapsel?',
                a: 'Die Phoenix-Kapsel unterstützt eine maximale Nutzlastmasse von 100 kg, ein maximales Volumen von 300 L, bis zu 2 MDL und eine Gesamtleistung von bis zu 135 W (die ersten 50 W ohne Aufpreis).'
            },
            {
                q: 'Welche CubeSat-Größen werden unterstützt?',
                a: 'Phoenix unterstützt CubeSats von 1U bis 6U. Die Preisgestaltung erfolgt als Pauschalgebühr pro Einheit: €45.000 pro U (z.B. 3U = €135.000).'
            },
            {
                q: 'Wie lange kann eine Mission dauern?',
                a: 'Missionen können zwischen 3 und 12 Wochen dauern. Woche 1 umfasst Start, Aussetzen und Sonnenorientierung. Die letzte Woche umfasst Deorbiting, Wiedereintritt, Wasserung und Transport nach Lichtenau, Deutschland.'
            },
            {
                q: 'Welche Trägerraketen sind mit Phoenix kompatibel?',
                a: 'Phoenix ist kompatibel mit SpaceX Falcon 9 Bandwagon-Missionen. ATMOS kann auch Anfragen für alternative Träger prüfen. Spätzugang (L-7 Tage) ist für SpaceX-Flüge verfügbar.'
            },
            {
                q: 'Wo landet Phoenix nach dem Wiedereintritt?',
                a: 'Nach Wasserung und Bergung wird die Kapsel zum ATMOS Space Cargo Hauptsitz in Lichtenau, Deutschland, transportiert — für Inspektion, Probenentnahme und Übergabe an den Kunden.'
            },
            {
                q: 'Was ist Spätzugang und wann ist er verfügbar?',
                a: 'Spätzugang ermöglicht die Integration von Nutzlasten bis zu 7 Tage vor dem Start (L-7). Besonders nützlich für zeitkritische biologische oder chemische Experimente. Derzeit für SpaceX Falcon 9 Bandwagon-Flüge vorgeschlagen.'
            }
        ]
    }
};

// ─────────────────────────────────────────────────────
// LANGUAGE
// ─────────────────────────────────────────────────────

let currentLang = localStorage.getItem('phoenix_language') || 'en';

function setLanguage(lang) {
    if (!FAQ_DATA[lang]) return;
    currentLang = lang;
    localStorage.setItem('phoenix_language', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    render();
}

// ─────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────

function render() {
    const data = FAQ_DATA[currentLang];

    document.getElementById('faq-title').textContent   = data.pageTitle;
    document.getElementById('faq-subtitle').textContent = data.pageSubtitle;
    document.getElementById('back-label').textContent   = data.backLabel;
    document.getElementById('cat-pricing').textContent  = data.catPricing;
    document.getElementById('cat-technical').textContent = data.catTechnical;
    document.getElementById('faq-footer-note').innerHTML = data.footerNote;

    renderList('faq-pricing',   data.pricing);
    renderList('faq-technical', data.technical);
}

function renderList(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach((item, idx) => {
        const el = document.createElement('div');
        el.className = 'faq-item';
        el.innerHTML = `
            <button class="faq-question" aria-expanded="false" aria-controls="${containerId}-answer-${idx}">
                <span>${item.q}</span>
                <span class="faq-chevron">▼</span>
            </button>
            <div class="faq-answer" id="${containerId}-answer-${idx}" role="region">
                ${item.a}
            </div>`;
        el.querySelector('.faq-question').addEventListener('click', () => toggleItem(el));
        container.appendChild(el);
    });
}

function toggleItem(el) {
    const isOpen = el.classList.contains('open');
    el.classList.toggle('open', !isOpen);
    el.querySelector('.faq-question').setAttribute('aria-expanded', String(!isOpen));
}

// ─────────────────────────────────────────────────────
// NAV MENU
// ─────────────────────────────────────────────────────

function setupNav() {
    const btn      = document.getElementById('navMenuBtn');
    const dropdown = document.getElementById('navMenuDropdown');
    if (!btn || !dropdown) return;
    btn.addEventListener('click', e => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
    document.addEventListener('click', () => dropdown.classList.remove('active'));
}

// ─────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    setupNav();
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
    render();
});
