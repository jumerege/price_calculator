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
                a: 'Phoenix is a reusable space return capsule developed by ATMOS Space Cargo GmbH. It is designed to return payloads safely from Low Earth Orbit (LEO) to Earth, enabling microgravity experiments, biological research, and other applications that require physical sample return. Phoenix 1 successfully completed its first mission in April 2025, and Phoenix 2 is operational with additional flights scheduled through 2027 and beyond.'
            },
            {
                q: 'What orbit does Phoenix fly to?',
                a: 'Phoenix missions target Low Earth Orbit (LEO) at approximately 550 km altitude. This orbit is well-established for microgravity research and is compatible with current launch providers, offering excellent access for scientific and commercial payloads.'
            },
            {
                q: 'What are the payload capacity limits?',
                a: 'The Phoenix capsule supports a maximum payload mass of 100 kg, a maximum volume of 280 L, and up to 2 Mid Deck Lockers (MDL). Power allocation goes up to 135 W total, with the first 50 W continuous power included at no surcharge and an additional 100 W peak available.'
            },
            {
                q: 'What CubeSat sizes are supported?',
                a: 'Phoenix supports CubeSat payloads from 1U to 6U. Pricing for CubeSats is a flat fee per unit: €45,000 per U (e.g., 3U = €135,000). For pricing purposes, 1U is considered equivalent to 1.33 kg. CubeSat mass and volume are pre-configured based on standard form factor specifications.'
            },
            {
                q: 'How long can a mission last?',
                a: 'Missions can last between 3 weeks and 3 months (up to 12 weeks) total duration. The first week covers launch, deployment, and sun orientation. The final week covers deorbit, re-entry, splashdown, and transport to Lichtenau, Germany. All weeks in between are operational mission time, with microgravity sustained for 1 week to 3 months depending on your mission profile.'
            },
            {
                q: 'Which launch vehicles are compatible with Phoenix?',
                a: 'Phoenix currently flies on SpaceX Falcon 9 Bandwagon missions at 53° inclination. Phoenix is flight-agnostic and can accommodate multiple launchers available on the market; alternative launcher options can be discussed with ATMOS for future missions.'
            },
            {
                q: 'What is the microgravity quality during the mission?',
                a: 'Phoenix sustains a microgravity environment of 10^-5 g (one hundred-thousandth Earth gravity) throughout the entire in-orbit phase. This level of microgravity is suitable for sensitive biological, materials science, and pharmaceutical experiments.'
            },
            {
                q: 'Where does Phoenix land after re-entry?',
                a: 'The nominal splashdown site is near Santa Maria in the Azores, Portugal. After splashdown, the capsule is recovered by dedicated recovery teams and transported to ATMOS headquarters in Lichtenau, Germany for inspection, sample extraction, and handover to the customer. Payload recovery typically takes approximately 5 hours from splashdown to secure onboard recovery.'
            },
            {
                q: 'How quickly is my payload returned after landing?',
                a: 'Payload recovery from splashdown typically takes 4 to 5 hours. The capsule is designed to float for several hours after landing, maintaining payload viability and transmitting status until recovery. Once recovered and transported to Lichtenau, further processing depends on your specific requirements. Return to your location in the UK or elsewhere can be arranged and expedited upon request.'
            },
            {
                q: 'What is Late Access?',
                a: 'Late Access allows your payload to be integrated very close to launch, minimizing time between payload preparation and liftoff. Two late-access concepts are available: (1) Launcher Late Access via SpaceX provides a 10-day integration window prior to launch vehicle mating, and (2) Phoenix Operational Late Access via ATMOS supports 5-hour integration for the top payload and 24-hour integration for middle/bottom payload rack positions during biological or time-sensitive procedures.'
            },
            {
                q: 'Can I integrate my payload at the launch site rather than in Germany?',
                a: 'Yes. If your payload has time-sensitive requirements, ATMOS supports late-access integration directly at the SpaceX facility via the dedicated Phoenix hatch. This is particularly useful for biological samples requiring installation shortly before launch. Major hardware and core payload components are typically integrated earlier at ATMOS facilities in Germany (or potentially Strasbourg in the future) to ensure full system-level testing and qualification prior to shipment to the launch provider.'
            },
            {
                q: 'What environmental conditions will my payload experience?',
                a: 'Your payload will be maintained in a continuously pressurized environment at 1 atmosphere with ground air composition throughout all mission phases (integration, launch, on-orbit, reentry, and landing). Standard temperature control maintains 18–30°C. If your experiment requires colder conditions, ATMOS can achieve down to –5°C during on-orbit phases using its fluid-based thermal control system. ATMOS provides fluidic cooling via radiators, multilayer insulation (MLI), and controlled thermal management tailored to your mission.'
            },
            {
                q: 'How stable is the temperature control?',
                a: 'ATMOS maintains tight thermal control throughout all mission phases. The payload drum is a sealed 1-atmosphere compartment with carefully managed thermal interfaces, active fluid-loop cooling during orbit, passive radiators, heater systems, and multilayer insulation. Temperature excursions beyond your operational limits (18–30°C standard, or lower if requested) are not expected during any mission phase, from ground integration through payload removal after landing.'
            },
            {
                q: 'What is the re-entry acceleration environment?',
                a: 'During descent and splashdown, your payload will experience peak axial deceleration of approximately 4 g ±1 g (where g is Earth\'s gravitational acceleration). ATMOS will provide detailed re-entry landing load profiles covering both thermal and mechanical acceleration environments following mission signature. Final contractual load ranges are established through detailed mission-specific simulations and Monte Carlo analyses.'
            },
            {
                q: 'How much electrical power is available for my payload?',
                a: 'Phoenix provides 50 W continuous power throughout all mission phases (integration, launch, on-orbit, and reentry), with the first 50 W included at no surcharge. If your payload requires more, Phoenix can supply up to 100 W peak power (intervals and duty cycle TBD based on mission). Power is supplied via 28 V unregulated (24–33 V range) with optional regulated 3 V, 5 V, and 12 V supplies. Flexible connector pinout and harness design are provided based on your final specifications.'
            },
            {
                q: 'If my payload needs cooling or heating in orbit, can Phoenix support it?',
                a: 'Yes. ATMOS uses a fluid-based thermal control system with pumped fluid loops, radiators, controlled heaters, and multilayer insulation to maintain your desired temperature. Standard operation maintains 18–30°C; cold operation down to –5°C is achievable during in-orbit phases using active and passive thermal control. Detailed thermal interface definitions, boundary conditions, and thermal control operational logic are provided pre-mission.'
            },
            {
                q: 'What data interfaces does Phoenix provide?',
                a: 'Phoenix provides industry-standard data interfaces: S-band RF (up to 3 Mbps downlink / 2 Mbps uplink) and X-band roadmap (up to 75 Mbps downlink). All communications are fully CCSDS-compliant, using CCSDS 232.0-B-4 and 132.0-B-3 with Virtual Channels, CLCW, and configurable security. Physical interfaces are defined in the Mission Interface Control Document (ICD) and typically include Ethernet (primary) and RS422 (backup) connections via a redundant Raspberry Pi CM5 payload interface board.'
            },
            {
                q: 'How much data can I downlink to the ground?',
                a: 'Phoenix supports sustained downlink via S-band up to 3 Mbps with configurable modulation and coding. The X-band roadmap enables up to 75 Mbps peak downlink. A minimum of 500 GB per mission can be achieved through a combination of in-flight RF downlink and high-rate configurable downlink profiles. Additionally, on-board mass storage allows retrieval of large datasets after landing. Exact rates and windowing are software-configurable and defined per mission in the ICD.'
            },
            {
                q: 'Can I send commands to my payload during the mission?',
                a: 'Yes. Phoenix supports payload uplink via S-band up to 2 Mbps, compliant with CCSDS standards. If multiple payloads are on the mission, uplink allocation is configurable at the software level using Virtual Channels. You will have command capability throughout the mission via ATMOS ground segment API.'
            },
            {
                q: 'Can multiple payloads fly on the same Phoenix mission?',
                a: 'Yes. Phoenix is capable of supporting multiple customer payloads on a single mission. Each payload can occupy space within the 280 L volume and up to 100 kg total mass envelope. You have the option to share a flight with other payloads or reserve a Dedicated Phoenix Flight for exclusive access to full capsule capacity.'
            },
            {
                q: 'If my payload is very small, do I have to pay for the full 100 kg?',
                a: 'Not necessarily. On shared missions, you pay only for your payload\'s mass. The pricing is €45,000 per kilogram of billable mass. If you want exclusive access to the full Phoenix capacity on a dedicated flight, the €4 million minimum applies to ensure mission viability. Small payloads benefit from shared flight options where costs are distributed among multiple customers.'
            },
            {
                q: 'How does ATMOS handle multiple payloads in terms of power and data?',
                a: 'Multiple payloads can share the 50 W continuous power and 100 W peak power budget. Power allocation is configured per mission. Data downlink and uplink are managed via CCSDS Virtual Channels, allowing each payload to have its own independent communication paths at software level. Detailed allocation and scheduling are defined in the Mission ICD for each flight.'
            },
            {
                q: 'What mechanical interfaces are available for payload mounting?',
                a: 'Payloads mount on a defined drum interface with 6 mounting brackets using 18× M8 screws (3 per bracket). Load constraints are provided (including Falcon 9 quasi-static loads and estimated splashdown loads). Keep-out zones and detailed CAD interfaces are coordinated with ATMOS. Custom mounting solutions can be discussed for payloads with specific structural requirements.'
            },
            {
                q: 'How are vibration and mechanical shock managed?',
                a: 'ATMOS provides detailed thermal interfaces and mechanical specifications with strictly defined boundary conditions for each mission phase (LEO hot and cold cases). Monitoring locations and correlation points are established, and conductive/radiative interface parameters are defined. Your payload must meet standalone qualification per industry standards (eigenfrequency >40 Hz, vibration testing per SpaceX RPUG §6.5, and EMC compliance).'
            },
            {
                q: 'What cleanroom facilities are available for payload integration?',
                a: 'Most payload integration activities are performed at ATMOS facilities in Germany, with potential future capability in Strasbourg. ATMOS is presently upgrading its cleanroom infrastructure toward ISO Class 5 capability in line with future mission requirements (meeting 2028 deadlines). For biological samples requiring installation close to launch, late-access integration is supported directly at the SpaceX facility via the dedicated Phoenix hatch.'
            },
            {
                q: 'What engineering models or testing does my payload need for qualification?',
                a: 'Typical requirements include: (1) an Engineering Model (EM) at L–9 months for interface testing and vehicle EM development, (2) a qualified Flight Model (FM) plus Ground Support Equipment (GSE) at L–8 months for integration, and (3) FM pre-integration criteria verification (mass, dimensions, mounting pattern, temperature 4–40°C, power ranges, data protocol, connector compliance, and Interface Requirements Document submission). The FM must also be fully qualified standalone per industry standards (vibration, power-inhibit, leak tests, eigenfrequency >40 Hz, EMC, mass budget, vacuum advisory) with documentation due L–3.5 months before launch.'
            },
            {
                q: 'How is payload custody and chain of custody managed?',
                a: 'ATMOS maintains a continuous, auditable chain of custody for your payload throughout all mission phases, from integration through payload removal and return. Details of custody ownership, access control, and records provided to you are defined upon mission order signature in accordance with the agreed mission-specific payload handling and operational procedures. Formal custody transfer records are provided post-recovery as per contract.'
            },
            {
                q: 'What environmental data will I receive from the mission?',
                a: 'ATMOS provides payload-relevant environmental data for all stages of flight, including thermal profiles, pressure, and acceleration data across each mission phase. Data resolution, time-stamping, and delivery timeline are specified in the Mission ICD. You receive a reduced global thermal model (TMM) for your mission along with time-dependent dissipation data and predicted interface temperatures.'
            },
            {
                q: 'Is there a guarantee about landing location and timing?',
                a: 'Phoenix nominally targets splashdown near the Azores, with re-entry initiated based on launcher inclination (53° baseline for SpaceX Falcon 9). Landing location accuracy and update cadence are defined per mission, with final confirmation provided pre-reentry in coordination with regulatory licensing (FAA) and launcher constraints. Exact landing predictions improve over time as the mission nears reentry.'
            },
            {
                q: 'What are the environmental requirements for payload hardware?',
                a: 'Your payload must be qualified to operate in the defined Phoenix environment: pressure 1 atm, temperature 18–30°C standard (−5 to +40°C extended range possible), vacuum flight phases, and launch/reentry loads per SpaceX RPUG standards. All materials and components must comply with space handling requirements, outgassing standards, and electromagnetic compatibility specifications detailed in the Mission ICD.'
            },
            {
                q: 'Is Phoenix compliant with space debris and environmental regulations?',
                a: 'Yes. Phoenix is designed and operated in full compliance with the ESA-led Zero Debris Charter (Paragraphs 1 and 2). All payloads, consumables, and mission materials remain fully contained throughout all mission phases with no intentional release of objects or substances. Phoenix performs controlled end-of-mission deorbit and reentry, ensuring no long-lived orbital objects remain and preventing post-mission debris generation.'
            },
            {
                q: 'Can my mission be licensed in the UK?',
                a: 'Phoenix is mission-governable under multiple space licensing regimes. Although UK jurisdiction is not engaged in the baseline concept, the mission governance, safety case structure, and liability framework are compatible with UK Space Industry Act requirements should UK jurisdiction apply. The primary licensing regimes currently applicable are those of Germany (operator state) and Portugal (planned reentry state), with launcher-dependent requirements.'
            },
            {
                q: 'What is included in the base €45,000/kg price?',
                a: 'The base price includes: payload integration, transport to the launch site, end-to-end testing, launch and in-orbit operations, re-entry, recovery, and return to ATMOS headquarters in Lichtenau, Germany. Engineering information and documentation deliverables (interface definition L–10m, EM L–9m, qualified FM+GSE L–8m, SpaceX verification docs L–3.5m) are required from you according to mission timelines.'
            },
            {
                q: 'Are there any extra costs beyond the €45,000/kg base price?',
                a: 'Possible additional costs include: (1) Interface/structures engineering support at €110/hour, (2) external antenna mounting fees, and (3) surcharge for payloads exceeding 100 kg (€50–80k per kg, depending on mission timing). All optional and contingent costs are detailed and agreed upon at mission signature.'
            },
            {
                q: 'What software is used for payload communications?',
                a: 'Payload communications and operations are managed via the Phoenix payload interface board (Raspberry Pi Compute Module 5, dual-redundant system) using onboard flight software developed and hardware-in-the-loop tested by ATMOS. Communication supports Ethernet (primary), RS422 (backup), CFDP Class 2 for file transfer, and CCSDS-compliant S-band telecommand/telemetry processing. ATMOS provides a ground segment API for payload data and telecommand operations.'
            },
            {
                q: 'Are the data formats industry standard?',
                a: 'Yes. All payload data formats are fully CCSDS-compliant. Primary payload data transfer uses CFDP Class 2 over Ethernet (RJ45) with RS422 as backup. Telemetry and telecommand processing follow CCSDS TC/TM encoding/decoding, including CADU framing via onboard CCSDS processors. This ensures conformity with recognized international space communication standards and interoperability with ground systems.'
            },
            {
                q: 'What if my payload has hazardous materials?',
                a: 'ATMOS follows all regulatory requirements for hazardous payload disclosure and handling. Hazardous materials must be declared and documented per SpaceX RPUG and international space regulations. Handling, integration, and safety procedures are defined in mission-specific documentation. Early communication about hazardous material content is essential for mission planning.'
            },
            {
                q: 'When is the next Phoenix mission opportunity?',
                a: 'Phoenix missions are available throughout 2028 and beyond, with launches planned for Q3 2028 (June–December 2028 window) as baseline. Additional flights are confirmed for late 2026 and April 2027. Mission-specific launch dates are negotiated based on payload readiness and mission requirements.'
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
                a: 'Phoenix est une capsule spatiale réutilisable de retour développée par ATMOS Space Cargo GmbH. Elle est conçue pour ramener des charges utiles en toute sécurité depuis l\'orbite terrestre basse (LEO) vers la Terre, permettant des expériences en microgravité, de la recherche biologique et d\'autres applications nécessitant le retour physique d\'échantillons. Phoenix 1 a réussi sa première mission en avril 2025, et Phoenix 2 est opérationnel avec des vols supplémentaires prévus jusqu\'en 2027 et au-delà.'
            },
            {
                q: 'Sur quelle orbite vole Phoenix ?',
                a: 'Les missions Phoenix ciblent l\'orbite terrestre basse (LEO) à environ 550 km d\'altitude. Cette orbite est bien établie pour la recherche en microgravité et compatible avec les fournisseurs de lancement actuels, offrant un excellent accès pour les charges utiles scientifiques et commerciales.'
            },
            {
                q: 'Quelles sont les limites de capacité de charge utile ?',
                a: 'La capsule Phoenix supporte une masse maximale de 100 kg, un volume maximal de 280 L et jusqu\'à 2 Mid Deck Lockers (MDL). L\'allocation de puissance monte jusqu\'à 135 W total, avec les premiers 50 W de puissance continue inclus sans surcharge et 100 W supplémentaires en pointe disponibles.'
            },
            {
                q: 'Quelles tailles de CubeSat sont prises en charge ?',
                a: 'Phoenix prend en charge les charges utiles CubeSat de 1U à 6U. La tarification pour les CubeSats est un forfait par unité : €45 000 par U (ex. 3U = €135 000). Aux fins de tarification, 1U est considéré comme équivalent à 1,33 kg. La masse et le volume des CubeSats sont prédéfinis selon les spécifications standard du facteur de forme.'
            },
            {
                q: 'Quelle est la durée d\'une mission ?',
                a: 'Les missions peuvent durer entre 3 semaines et 3 mois (jusqu\'à 12 semaines) de durée totale. La première semaine couvre le lancement, le déploiement et l\'orientation vers le soleil. La dernière semaine couvre la désorbitage, la rentrée, l\'amerrissage et le transport vers Lichtenau, Allemagne. Toutes les semaines intermédiaires constituent le temps opérationnel de la mission, avec une microgravité soutenue de 1 semaine à 3 mois selon votre profil de mission.'
            },
            {
                q: 'Quels lanceurs sont compatibles avec Phoenix ?',
                a: 'Phoenix vole actuellement sur les missions Falcon 9 Bandwagon de SpaceX à inclinaison 53°. Phoenix est agnostique aux lanceurs et peut accueillir plusieurs lanceurs disponibles sur le marché ; les options de lanceurs alternatifs peuvent être discutées avec ATMOS pour les missions futures.'
            },
            {
                q: 'Quelle est la qualité de la microgravité pendant la mission ?',
                a: 'Phoenix maintient un environnement de microgravité de 10^-5 g (un cent-millième de la gravité terrestre) tout au long de la phase en orbite. Ce niveau de microgravité convient aux expériences biologiques, de science des matériaux et pharmaceutiques sensibles.'
            },
            {
                q: 'Où atterrit Phoenix après la rentrée ?',
                a: 'Le site d\'amerrissage nominal est près de Santa Maria aux Açores, Portugal. Après l\'amerrissage, la capsule est récupérée par des équipes de récupération dédiées et transportée au siège d\'ATMOS à Lichtenau, Allemagne pour l\'inspection, l\'extraction des échantillons et la remise au client. La récupération de la charge utile prend généralement environ 5 heures depuis l\'amerrissage jusqu\'à la récupération d\'à bord sécurisée.'
            },
            {
                q: 'À quelle vitesse ma charge utile est-elle retournée après l\'atterrissage ?',
                a: 'La récupération de la charge utile après l\'amerrissage prend généralement 4 à 5 heures. La capsule est conçue pour flotter pendant plusieurs heures après l\'atterrissage, conservant la viabilité de la charge utile et transmettant le statut jusqu\'à la récupération. Une fois récupérée et transportée à Lichtenau, le traitement supplémentaire dépend de vos exigences spécifiques. Le retour à votre emplacement au Royaume-Uni ou ailleurs peut être arrangé et accéléré sur demande.'
            },
            {
                q: 'Qu\'est-ce que l\'accès tardif ?',
                a: 'L\'accès tardif permet à votre charge utile d\'être intégrée très près du lancement, minimisant le temps entre la préparation de la charge utile et le décollage. Deux concepts d\'accès tardif sont disponibles : (1) L\'accès tardif du lanceur via SpaceX offre une fenêtre d\'intégration de 10 jours avant l\'accouplement du véhicule de lancement, et (2) L\'accès tardif opérationnel Phoenix via ATMOS supporte l\'intégration de 5 heures pour la charge utile supérieure et l\'intégration de 24 heures pour les positions intermédiaires/inférieures du rack de charge utile lors de procédures biologiques sensibles au temps.'
            },
            {
                q: 'Puis-je intégrer ma charge utile au site de lancement plutôt qu\'en Allemagne ?',
                a: 'Oui. Si votre charge utile a des exigences sensibles au temps, ATMOS supporte l\'intégration d\'accès tardif directement aux installations SpaceX via le écoutille Phoenix dédiée. C\'est particulièrement utile pour les échantillons biologiques nécessitant une installation peu de temps avant le lancement. Les équipements majeurs et les composants de charge utile essentiels sont généralement intégrés plus tôt aux installations ATMOS en Allemagne (ou potentiellement Strasbourg à l\'avenir) pour assurer des tests et une qualification complets au niveau du système avant l\'expédition au fournisseur de lancement.'
            },
            {
                q: 'Quelles conditions environnementales ma charge utile subira-t-elle ?',
                a: 'Votre charge utile sera maintenue dans un environnement pressurisé en continu à 1 atmosphère avec composition de l\'air au sol tout au long de toutes les phases de mission (intégration, lancement, en orbite, rentrée et atterrissage). Le contrôle de température standard maintient 18–30°C. Si votre expérience nécessite des conditions plus froides, ATMOS peut atteindre jusqu\'à –5°C pendant les phases en orbite en utilisant son système de contrôle thermique à fluide. ATMOS fournit un refroidissement fluidique via des radiateurs, une isolation multicouche (MLI) et une gestion thermique contrôlée adaptée à votre mission.'
            },
            {
                q: 'Quelle est la stabilité du contrôle de température ?',
                a: 'ATMOS maintient un contrôle thermique strict tout au long de toutes les phases de mission. Le tambour de charge utile est un compartiment scellé à 1 atmosphère avec interfaces thermiques soigneusement gérées, refroidissement par boucle fluide active en orbite, radiateurs passifs, systèmes de chauffage et isolation multicouche. Les excursions de température au-delà de vos limites opérationnelles (18–30°C standard, ou inférieur si demandé) ne sont pas attendues pendant aucune phase de mission, de l\'intégration au sol jusqu\'à l\'enlèvement de la charge utile après l\'atterrissage.'
            },
            {
                q: 'Quel est l\'environnement de décélération à la rentrée ?',
                a: 'Lors de la descente et de l\'amerrissage, votre charge utile subira une décélération axiale maximale d\'environ 4 g ±1 g (où g est l\'accélération gravitationnelle terrestre). ATMOS fournira des profils d\'atterrissage de rentrée détaillés couvrant les environnements d\'accélération thermique et mécanique après la signature de la mission. Les plages de charge contractuelles finales sont établies via des simulations spécifiques à la mission détaillées et des analyses Monte Carlo.'
            },
            {
                q: 'Quelle puissance électrique est disponible pour ma charge utile ?',
                a: 'Phoenix fournit 50 W de puissance continue tout au long de toutes les phases de mission (intégration, lancement, en orbite et rentrée), avec les premiers 50 W inclus sans surcharge. Si votre charge utile nécessite davantage, Phoenix peut fournir jusqu\'à 100 W de puissance en pointe (intervalles et cycle de service à déterminer selon la mission). L\'alimentation est fournie via 28 V non régulée (plage 24–33 V) avec alimentation régulée optionnelle 3 V, 5 V et 12 V. Une disposition de broche de connecteur flexible et un harnais sont fournis selon vos spécifications finales.'
            },
            {
                q: 'Si ma charge utile a besoin de refroidissement ou de chauffage en orbite, Phoenix peut-il le supporter ?',
                a: 'Oui. ATMOS utilise un système de contrôle thermique à fluide avec boucles fluidiques pompées, radiateurs, éléments chauffants contrôlés et isolation multicouche pour maintenir votre température souhaitée. Le fonctionnement standard maintient 18–30°C ; le fonctionnement à froid jusqu\'à –5°C est réalisable pendant les phases en orbite en utilisant un contrôle thermique actif et passif. Les définitions d\'interface thermique détaillées, les conditions aux limites et la logique de fonctionnement du contrôle thermique sont fournies avant la mission.'
            },
            {
                q: 'Quelles interfaces de données Phoenix fournit-il ?',
                a: 'Phoenix fournit des interfaces de données standard de l\'industrie : S-band RF (jusqu\'à 3 Mbps en descente / 2 Mbps en montée) et feuille de route X-band (jusqu\'à 75 Mbps en descente). Toutes les communications sont entièrement conformes CCSDS, en utilisant CCSDS 232.0-B-4 et 132.0-B-3 avec canaux virtuels, CLCW et sécurité configurable. Les interfaces physiques sont définies dans le document de contrôle d\'interface de mission (ICD) et incluent généralement des connexions Ethernet (primaire) et RS422 (sauvegarde) via une carte d\'interface de charge utile Raspberry Pi CM5 redondante.'
            },
            {
                q: 'Combien de données puis-je télécharger vers le sol ?',
                a: 'Phoenix supporte la descente soutenue via S-band jusqu\'à 3 Mbps avec modulation et codage configurables. La feuille de route X-band permet une descente maximale até 75 Mbps. Au minimum 500 GB par mission peuvent être atteints grâce à une combinaison de descente RF en vol et de profils de descente configurables à haut débit. De plus, le stockage de masse à bord permet la récupération de grands ensembles de données après l\'atterrissage. Les débits exacts et les fenêtrages sont configurables par logiciel et définis par mission dans l\'ICD.'
            },
            {
                q: 'Puis-je envoyer des commandes à ma charge utile pendant la mission ?',
                a: 'Oui. Phoenix supporte la montée de charge utile via S-band jusqu\'à 2 Mbps, conforme aux normes CCSDS. Si plusieurs charges utiles sont sur la mission, l\'allocation de montée est configurable au niveau du logiciel en utilisant les canaux virtuels. Vous aurez la capacité de commande tout au long de la mission via l\'API du segment sol ATMOS.'
            },
            {
                q: 'Plusieurs charges utiles peuvent-elles voler sur la même mission Phoenix ?',
                a: 'Oui. Phoenix est capable de prendre en charge plusieurs charges utiles de clients sur une seule mission. Chaque charge utilité peut occuper de l\'espace dans l\'enveloppe de volume de 280 L et de masse totale de 100 kg. Vous avez la possibilité de partager un vol avec d\'autres charges utiles ou de réserver un vol Phoenix dédié pour un accès exclusif à la capacité totale de la capsule.'
            },
            {
                q: 'Si ma charge utile est très petite, dois-je payer pour les 100 kg complets ?',
                a: 'Pas nécessairement. Sur les missions partagées, vous ne payez que pour la masse de votre charge utile. La tarification est de €45 000 par kilogramme de masse facturable. Si vous voulez un accès exclusif à la capacité complète de Phoenix sur un vol dédié, le minimum de €4 millions s\'applique pour assurer la viabilité de la mission. Les petites charges utiles bénéficient des options de vol partagé où les coûts sont répartis entre plusieurs clients.'
            },
            {
                q: 'Comment ATMOS gère-t-il les charges utiles multiples en termes de puissance et de données ?',
                a: 'Plusieurs charges utiles peuvent partager le budget de 50 W de puissance continue et 100 W de puissance en pointe. L\'allocation de puissance est configurée par mission. La descente et la montée de données sont gérées via les canaux virtuels CCSDS, permettant à chaque charge utile d\'avoir ses propres chemins de communication indépendants au niveau du logiciel. L\'allocation détaillée et la planification sont définies dans l\'ICD de mission pour chaque vol.'
            },
            {
                q: 'Quelles interfaces mécaniques sont disponibles pour le montage de charge utile ?',
                a: 'Les charges utiles se montent sur une interface de tambour définie avec 6 supports de montage utilisant 18× vis M8 (3 par support). Les contraintes de charge sont fournies (incluant les charges quasi-statiques Falcon 9 et les charges d\'amerrissage estimées). Les zones de non-interférence et les interfaces CAO détaillées sont coordonnées avec ATMOS. Des solutions de montage personnalisées peuvent être discutées pour les charges utiles avec des exigences structurelles spécifiques.'
            },
            {
                q: 'Comment sont gérées les vibrations et les chocs mécaniques ?',
                a: 'ATMOS fournit des interfaces thermiques détaillées et des spécifications mécaniques avec des conditions aux limites strictement définies pour chaque phase de mission (cas chaud et froid LEO). Les sites de surveillance et les points de corrélation sont établis, et les paramètres d\'interface conductifs/radiatifs sont définis. Votre charge utile doit satisfaire la qualification autonome selon les normes de l\'industrie (fréquence propre >40 Hz, essais de vibration selon SpaceX RPUG §6.5 et conformité EMC).'
            },
            {
                q: 'Quelles installations de salle blanche sont disponibles pour l\'intégration de charge utile ?',
                a: 'La plupart des activités d\'intégration de charge utile sont réalisées aux installations ATMOS en Allemagne, avec une capacité future potentielle à Strasbourg. ATMOS améliore actuellement son infrastructure de salle blanche vers la capacité Classe ISO 5 en ligne avec les exigences futures (répondant aux délais 2028). Pour les échantillons biologiques nécessitant une installation près du lancement, l\'intégration d\'accès tardif est prise en charge directement au installations SpaceX via l\'écoutille Phoenix dédiée.'
            },
            {
                q: 'Quels modèles d\'ingénierie ou tests ma charge utile a-t-elle besoin pour la qualification ?',
                a: 'Les exigences typiques incluent : (1) un modèle d\'ingénierie (EM) à L–9 mois pour les essais d\'interface et le développement de l\'EM du véhicule, (2) un modèle de vol (FM) qualifié plus équipement de support au sol (GSE) à L–8 mois pour l\'intégration, et (3) vérification des critères de pré-intégration FM (masse, dimensions, motif de montage, température 4–40°C, plages de puissance, protocole de données, conformité des connecteurs et soumission du document des exigences d\'interface). Le FM doit également être entièrement qualifié de manière autonome selon les normes de l\'industrie (vibration, inhibition de puissance, essais d\'étanchéité, fréquence propre >40 Hz, EMC, budget de masse, avis de vide) avec documentation due L–3,5 mois avant le lancement.'
            },
            {
                q: 'Comment la garde de charge utile et la chaîne de garde sont-elles gérées ?',
                a: 'ATMOS maintient une chaîne de garde continue et vérifiable pour votre charge utile tout au long de toutes les phases de mission, de l\'intégration à l\'enlèvement et au retour de la charge utile. Les détails de la propriété de la garde, du contrôle d\'accès et des dossiers qui vous sont fournis sont définis lors de la signature de la commande de mission conformément aux procédures de manipulation et opérationnelles de charge utile spécifiques à la mission convenus. Les dossiers de transfert de garde formels sont fournis après la récupération selon le contrat.'
            },
            {
                q: 'Quelles données environnementales recevrai-je de la mission ?',
                a: 'ATMOS fournit les données environnementales pertinentes de la charge utile pour tous les stades du vol, y compris les profils thermiques, la pression et les données d\'accélération à travers chaque phase de mission. La résolution des données, l\'horodatage et le calendrier de livraison sont spécifiés dans l\'ICD de mission. Vous recevez un modèle thermique global réduit (TMM) pour votre mission avec des données de dissipation dépendant du temps et les températures d\'interface prédites.'
            },
            {
                q: 'Y a-t-il une garantie sur l\'emplacement et l\'heure d\'atterrissage ?',
                a: 'Phoenix cible nominalement l\'amerrissage près des Açores, avec désorbitage initié selon l\'inclinaison du lanceur (53° de base pour Falcon 9 SpaceX). La précision de l\'emplacement d\'atterrissage et la cadence de mise à jour sont définies par mission, avec confirmation finale fournie avant la rentrée en coordination avec les licences réglementaires (FAA) et les contraintes du lanceur. Les prédictions d\'atterrissage exactes s\'améliorent avec le temps à mesure que la mission s\'approche de la rentrée.'
            },
            {
                q: 'Quelles sont les exigences environnementales pour le matériel de charge utile ?',
                a: 'Votre charge utile doit être qualifiée pour fonctionner dans l\'environnement Phoenix défini : pression 1 atm, température 18–30°C standard (gamme étendue −5 à +40°C possible), phases de vol sous vide et charges de lancement/rentrée selon les normes SpaceX RPUG. Tous les matériaux et composants doivent être conformes aux exigences de manipulation spatiale, aux normes de dégazage et aux spécifications de compatibilité électromagnétique détaillées dans l\'ICD de mission.'
            },
            {
                q: 'Phoenix est-il conforme aux réglementations d\'débris spatial et environnementales ?',
                a: 'Oui. Phoenix est conçu et exploité en conformité complète avec la Charte Zéro Débris dirigée par l\'ESA (Paragraphes 1 et 2). Toutes les charges utiles, consommables et matériaux de mission restent entièrement contenus tout au long de toutes les phases de mission sans libération intentionnelle d\'objets ou de substances. Phoenix effectue un désorbitage et une rentrée fin de mission contrôlés, assurant qu\'aucun objet orbital long-terme ne reste et empêchant la génération de débris post-mission.'
            },
            {
                q: 'Ma mission peut-elle être autorisée au Royaume-Uni ?',
                a: 'Phoenix est gouvernable par mission selon plusieurs régimes de licenses spatiales. Bien que la juridiction britannique ne soit pas engagée dans le concept de base, la gouvernance de mission, la structure du dossier de sécurité et le cadre de responsabilité sont compatibles avec les exigences de la loi sur l\'industrie spatiale du Royaume-Uni au cas où la juridiction britannique s\'appliquerait. Les régimes de licenses principalement applicables actuellement sont ceux de l\'Allemagne (état opérateur) et du Portugal (état de rentrée prévu), avec des exigences dépendantes du lanceur.'
            },
            {
                q: 'Qu\'est-ce qui est inclus dans le prix de base de €45 000/kg ?',
                a: 'Le prix de base inclut : l\'intégration de charge utile, le transport vers le site de lancement, les essais de bout en bout, les opérations de lancement et en orbite, la rentrée, la récupération et le retour au siège d\'ATMOS à Lichtenau, Allemagne. Les informations d\'ingénierie et les livrables de documentation (définition d\'interface L–10m, EM L–9m, FM+GSE qualifiés L–8m, documents de vérification SpaceX L–3,5m) sont requis de votre part selon les calendriers de mission.'
            },
            {
                q: 'Y a-t-il des coûts supplémentaires au-delà du prix de base de €45 000/kg ?',
                a: 'Les coûts supplémentaires possibles incluent : (1) Support d\'ingénierie d\'interface/structures à €110/heure, (2) frais de montage d\'antenne externe, et (3) surcharge pour les charges utiles dépassant 100 kg (€50–80k par kg, selon le calendrier de mission). Tous les coûts optionnels et contingents sont détaillés et acceptés à la signature de mission.'
            },
            {
                q: 'Quel logiciel est utilisé pour les communications de charge utile ?',
                a: 'Les communications et les opérations de charge utile sont gérées via la carte d\'interface de charge utile Phoenix (Raspberry Pi Compute Module 5, système dual-redondant) en utilisant le logiciel de vol à bord développé et testé en boucle matérielle-logicielle par ATMOS. La communication supporte Ethernet (primaire), RS422 (sauvegarde), CFDP Classe 2 pour le transfert de fichiers, et traitement S-band télécommande/télémétrie conforme CCSDS. ATMOS fournit une API de segment sol pour les données de charge utile et les opérations de télécommande.'
            },
            {
                q: 'Les formats de données sont-ils normes de l\'industrie ?',
                a: 'Oui. Tous les formats de données de charge utile sont entièrement conformes CCSDS. Le transfert de données de charge utile primaire utilise CFDP Classe 2 sur Ethernet (RJ45) avec RS422 en sauvegarde. Le traitement télémétrie et télécommande suivent l\'encodage/décodage TC/TM CCSDS, y compris l\'encadrement CADU via les processeurs CCSDS embarqués. Cela assure la conformité avec les normes spatiales de communication reconnues et la prise en charge internationale et l\'interopérabilité avec les systèmes sol.'
            },
            {
                q: 'Et si ma charge utile contient des matières dangereuses ?',
                a: 'ATMOS suit tous les exigences réglementaires pour la divulgation et la manipulation des charges utiles dangereuses. Les matières dangereuses doivent être déclarées et documentées selon SpaceX RPUG et les réglementations spatiales internationales. Les procédures de manipulation, d\'intégration et de sécurité sont définies dans la documentation spécifique à la mission. La communication précoce sur le contenu en matières dangereuses est essentielle pour la planification de mission.'
            },
            {
                q: 'Quelle est la prochaine opportunité de mission Phoenix ?',
                a: 'Les missions Phoenix sont disponibles tout au long de 2028 et au-delà, avec des lancements prévus pour la fenêtre Q3 2028 (juin–décembre 2028) comme référence. Des vols supplémentaires sont confirmés pour fin 2026 et avril 2027. Les dates de lancement spécifiques à la mission sont négociées selon la disponibilité de la charge utile et les exigences de mission.'
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
                a: 'Phoenix ist eine wiederverwendbare Rückkehrkapsel, die von ATMOS Space Cargo GmbH entwickelt wurde. Sie wurde entwickelt, um Nutzlasten sicher aus einer niedrigen Erdumlaufbahn (LEO) zur Erde zurückzubringen und Mikrogravitationsexperimente, biologische Forschung und andere Anwendungen zu ermöglichen, die eine physische Probenrückgabe erfordern. Phoenix 1 hat seine erste Mission im April 2025 erfolgreich abgeschlossen, und Phoenix 2 ist operativ mit zusätzlichen Flügen bis 2027 und darüber hinaus geplant.'
            },
            {
                q: 'Welchen Orbit befliegt Phoenix?',
                a: 'Phoenix-Missionen zielen auf eine niedrige Erdumlaufbahn (LEO) in einer Höhe von etwa 550 km ab. Dieser Orbit ist gut etabliert für die Mikrogravitationsforschung und kompatibel mit aktuellen Startanbietern und bietet hervorragenden Zugang für wissenschaftliche und kommerzielle Nutzlasten.'
            },
            {
                q: 'Was sind die Nutzlastgrenzen der Kapsel?',
                a: 'Die Phoenix-Kapsel unterstützt eine maximale Nutzlastmasse von 100 kg, ein maximales Volumen von 280 L und bis zu 2 Mid Deck Locker (MDL). Die Leistungszuweisung beträgt bis zu 135 W insgesamt, wobei die ersten 50 W kontinuierliche Leistung ohne Aufpreis enthalten sind und zusätzliche 100 W Spitzenleistung verfügbar sind.'
            },
            {
                q: 'Welche CubeSat-Größen werden unterstützt?',
                a: 'Phoenix unterstützt CubeSat-Nutzlasten von 1U bis 6U. Die Preisgestaltung für CubeSats erfolgt als Pauschalgebühr pro Einheit: €45.000 pro U (z.B. 3U = €135.000). Für Preiszwecke wird 1U als äquivalent zu 1,33 kg behandelt. CubeSat-Masse und -Volumen sind basierend auf standardisierten Formfaktor-Spezifikationen vorkonfiguriert.'
            },
            {
                q: 'Wie lange kann eine Mission dauern?',
                a: 'Missionen können zwischen 3 Wochen und 3 Monaten (bis zu 12 Wochen) insgesamt dauern. Die erste Woche umfasst Start, Aussetzen und Sonnenorientierung. Die letzte Woche umfasst Deorbiting, Wiedereintritt, Wasserung und Transport nach Lichtenau, Deutschland. Alle dazwischenliegenden Wochen sind operative Missionszeit mit aufrechterhalrener Mikrogravität von 1 Woche bis 3 Monaten je nach Ihrem Missionsprofil.'
            },
            {
                q: 'Welche Trägerraketen sind mit Phoenix kompatibel?',
                a: 'Phoenix fliegt derzeit auf SpaceX Falcon 9 Bandwagon-Missionen mit 53° Neigung. Phoenix ist startträgerunabhängig und kann mehrere verfügbare Starter auf dem Markt unterbringen; alternative Startoptionen können mit ATMOS für zukünftige Missionen diskutiert werden.'
            },
            {
                q: 'Welche Mikrogravitätsqualität wird während der Mission erreicht?',
                a: 'Phoenix erhält eine Mikrogravitätsumgebung von 10^-5 g (ein hundertmillionentel der Erdschwerkraft) während der gesamten Orbitalphase. Dieses Mikrogravitationsniveau ist für empfindliche biologische, Materialwissenschafts- und pharmazeutische Experimente geeignet.'
            },
            {
                q: 'Wo landet Phoenix nach dem Wiedereintritt?',
                a: 'Die nominale Wasserlandungsstelle befindet sich in der Nähe von Santa Maria auf den Azoren, Portugal. Nach der Wasserung wird die Kapsel durch spezialisierte Bergungsteams geborgen und zur ATMOS-Zentrale in Lichtenau, Deutschland, transportiert, um inspiziert, Proben entnommen und an den Kunden übergeben zu werden. Die Nutzlastbergung dauert in der Regel etwa 5 Stunden von der Wasserung bis zur sicheren Bergung an Bord.'
            },
            {
                q: 'Wie schnell wird meine Nutzlast nach der Landung zurückgebracht?',
                a: 'Die Nutzlastbergung nach der Wasserung dauert normalerweise 4 bis 5 Stunden. Die Kapsel ist darauf ausgelegt, mehrere Stunden nach der Landung zu schwimmen und dabei die Lebensfähigkeit der Nutzlast zu bewahren und den Status bis zur Bergung zu übermitteln. Sobald geborgen und nach Lichtenau transportiert, hängt die weitere Bearbeitung von Ihren spezifischen Anforderungen ab. Die Rückgabe an Ihren Standort im Vereinigten Königreich oder anderswo kann angefordert und auf Wunsch beschleunigt werden.'
            },
            {
                q: 'Was ist Spätzugang?',
                a: 'Spätzugang ermöglicht die Integration Ihrer Nutzlast sehr kurz vor dem Start und minimiert die Zeit zwischen Nutzlastvorbereitung und Abheben. Zwei Spätzugangskonzepte sind verfügbar: (1) Träger-Spätzugang über SpaceX bietet ein 10-Tage-Integrationsfenster vor der Kopplung des Startfahrzeugs, und (2) Phoenix Operational Late Access über ATMOS unterstützt 5-Stunden-Integration für die obere Nutzlast und 24-Stunden-Integration für mittlere/untere Nutzlast-Rackpositionen während zeitkritischer biologischer Verfahren.'
            },
            {
                q: 'Kann ich meine Nutzlast am Startplatz anstelle von Deutschland integrieren?',
                a: 'Ja. Wenn Ihre Nutzlast zeitkritische Anforderungen hat, unterstützt ATMOS die Spätzugangsintegration direkt an der SpaceX-Einrichtung über die dedizierte Phoenix-Luke. Dies ist besonders nützlich für biologische Proben, die kurz vor dem Start installiert werden müssen. Große Hardware und Kernnutzlastkomponenten werden normalerweise früher in ATMOS-Einrichtungen in Deutschland (oder potenziell Strasbourg in Zukunft) integriert, um vollständige Systemtestung und Qualifizierung vor dem Versand an den Startanbieter sicherzustellen.'
            },
            {
                q: 'Welche Umgebungsbedingungen wird meine Nutzlast erfahren?',
                a: 'Ihre Nutzlast wird in einer kontinuierlich unter Druck stehenden Umgebung von 1 Atmosphäre mit Bodenluft-Zusammensetzung während aller Missionsphasen (Integration, Start, in der Umlaufbahn, Wiedereintritt und Landung) beibehalten. Die Standard-Temperaturkontrolle hält 18–30°C. Falls Ihr Experiment kältere Bedingungen erfordert, kann ATMOS während der Orbitalphase bis zu –5°C erreichen, indem es sein flüssigkeitsgestütztes Thermalkontrollsystem nutzt. ATMOS bietet flüssiges Kühlen über Strahler, mehrlagige Isolierung (MLI) und kontrolliertes Thermomanagement, das auf Ihre Mission zugeschnitten ist.'
            },
            {
                q: 'Wie stabil ist die Temperaturkontrolle?',
                a: 'ATMOS behält während aller Missionsphasen eine enge Thermalkontrolle. Die Nutzlasttrommel ist ein versiegeltes Fach mit 1 Atmosphäre mit sorgfältig verwalteten Thermaliniterschnittstellen, aktiver Flüssigbahn-Kühlung in der Umlaufbahn, passiven Strahlern, Heizsystemen und mehrlagiger Isolierung. Temperaturabweichungen außerhalb Ihrer Betriebsgrenzen (18–30°C Standard, oder niedriger bei Anforderung) werden während keiner Missionsphasen von der Bodenintegration bis zur Nutzlastentfernung nach der Landung erwartet.'
            },
            {
                q: 'Wie ist die Rückkehrbeschleunigungsumgebung?',
                a: 'Beim Abstieg und bei der Wasserung wird Ihre Nutzlast eine maximale axiale Verzögerung von etwa 4 g ±1 g erfahren (wobei g die Erdschwerkraft ist). ATMOS wird detaillierte Rückkehrbeschleunigungslastprofile bereitsstellen, die sowohl thermische als auch mechanische Beschleunigungsumgebungen nach Missionssignatur abdecken. Letzte vertragliche Lastbereiche werden durch detaillierte missionsspezifische Simulationen und Monte-Carlo-Analysen festgestellt.'
            },
            {
                q: 'Wie viel elektrische Leistung ist für meine Nutzlast verfügbar?',
                a: 'Phoenix bietet 50 W kontinuierliche Leistung während aller Missionsphasen (Integration, Start, in der Umlaufbahn und Rückkehr), wobei die ersten 50 W ohne Aufpreis enthalten sind. Falls Ihre Nutzlast mehr benötigt, kann Phoenix bis zu 100 W Spitzenleistung liefern (Intervalle und Arbeitszyklus basierend auf Mission zu bestimmen). Die Leistung wird über 28 V ungeregeltr (Bereich 24–33 V) mit optionaler geregelter Versorgung 3 V, 5 V und 12 V bereitgestellt. Flexible Steckverbinder-Anordnung und Kabelverbindung werden basierend auf Ihren endgültigen Spezifikationen bereitgestellt.'
            },
            {
                q: 'Falls meine Nutzlast Kühlung oder Heizung in der Umlaufbahn benötigt, kann Phoenix das unterstützen?',
                a: 'Ja. ATMOS nutzt ein flüssigkeitsgestütztes Thermalkontrollsystem mit gepumpten Flüssigkeitsstromkreisen, Strahlern, gesteuerten Heizelementen und mehrlagiger Isolierung, um Ihre gewünschte Temperatur zu halten. Der Standard-Betrieb hält 18–30°C; Kaltbetrieb bis zu –5°C ist während der Orbitalphase durch aktive und passive Thermalkontrolle erreichbar. Detaillierte Thermaloberflächendefinitionen, Randbedingungen und Thermalsteuerlogik werden vor der Mission bereitgestellt.'
            },
            {
                q: 'Welche Datenschnittstellen bietet Phoenix?',
                a: 'Phoenix bietet industriestandardisierte Datenschnittstellen: S-Band-HF (bis zu 3 Mbps Abstieg / 2 Mbps Aufstieg) und X-Band-Roadmap (bis zu 75 Mbps Abstieg). Alle Kommunikationen sind vollständig CCSDS-konform mit CCSDS 232.0-B-4 und 132.0-B-3 mit virtuellen Kanälen, CLCW und erweiterbarer Sicherheit. Physische Schnittstellen sind im Missions-Interface-Kontroll-Dokument (ICD) definiert und umfassen normalerweise Ethernet (primär) und RS422 (Sicherung) Verbindungen über ein redundantes Raspberry Pi CM5 Nutzlast-Interface-Board.'
            },
            {
                q: 'Wie viele Daten kann ich zum Boden übertragen?',
                a: 'Phoenix unterstützt kontinuierliche Aufstiegsübertragung über S-Band bis zu 3 Mbps mit konfigurierbarer Modulation und Codierung. Die X-Band-Roadmap ermöglicht bis zu 75 Mbps Spitzenabstieg. Mindestens 500 GB pro Mission können durch eine Kombination von In-Flight-RF-Abstieg und hochratigen konfigurierbaren Abstiegsprofilen erreicht werden. Zusätzlich ermöglicht der an-Bord-Massenspeicher die Abfrage großer Datensätze nach der Landung. Genaue Raten und Fenster sind softwarekonfigurierbar und pro Mission in der ICD definiert.'
            },
            {
                q: 'Kann ich während der Mission Befehle an meine Nutzlast senden?',
                a: 'Ja. Phoenix unterstützt Nutzlast-Aufstieg über S-Band bis zu 2 Mbps, konform mit CCSDS-Standards. Falls mehrere Nutzlasten auf der Mission sind, ist die Aufstiegszuweisung auf Softwareebene durch virtuelle Kanäle konfigurierbar. Sie werden während der gesamten Mission Befehlsfähigkeit über ATMOS Ground-Segment-API haben.'
            },
            {
                q: 'Können mehrere Nutzlasten auf derselben Phoenix-Mission fliegen?',
                a: 'Ja. Phoenix ist fähig, mehrere Kundennutzlasten auf einer einzigen Mission zu unterstützen. Jede Nutzlast kann im 280 L Volumenbereich und bis 100 kg Gesamtmasse untergebracht werden. Sie haben die Möglichkeit, einen Flug mit anderen Nutzlasten zu teilen oder einen dedizierten Phoenix-Flug für exklusiven Zugang zur vollständigen Kapselkapazität zu reservieren.'
            },
            {
                q: 'Muss ich für die vollen 100 kg bezahlen, falls meine Nutzlast sehr klein ist?',
                a: 'Nicht unbedingt. Bei geteilten Missionen bezahlen Sie nur für die Masse Ihrer Nutzlast. Die Preisgestaltung beträgt €45.000 pro Kilogramm abrechenbarer Masse. Falls Sie exklusiven Zugang zur vollständigen Phoenix-Kapazität bei einem dedizierten Flug wollen, wird das €4-Millionen-Minimum angewendet, um die Missionsfähigkeit zu sichern. Kleine Nutzlasten profitieren von geteilten Flugoptionen, bei denen Kosten unter mehreren Kunden verteilt werden.'
            },
            {
                q: 'Wie handhabt ATMOS mehrere Nutzlasten in Bezug auf Leistung und Daten?',
                a: 'Mehrere Nutzlasten können das 50-W-Kontinuierleistungs- und 100-W-Spitzenleistungsbudget teilen. Die Leistungszuweisung wird pro Mission konfiguriert. Datenabstieg und -aufstieg werden durch CCSDS-Virtualkanäle gehandhabt, die es jeder Nutzlast ermöglichen, unabhängige Kommunikationswege auf Softwareebene zu haben. Detaillierte Zuweisung und Zeitplan werden in der Missions-ICD für jeden Flug definiert.'
            },
            {
                q: 'Welche mechanischen Schnittstellen sind für die Nutzlastmontage verfügbar?',
                a: 'Nutzlasten werden auf einer definierten Trommelschnittstelle mit 6 Montageclips mit je 18× M8-Schrauben (3 pro Clip) montiert. Lastbeschränkungen werden bereitgestellt (einschließlich quasi-statischer Falcon 9-Lasten und geschätzter Wasserlandungslasten). Sperrbereiche und detaillierte CAD-Schnittstellen werden mit ATMOS koordiniert. Für Nutzlasten mit spezifischen strukturellen Anforderungen können benutzerdefinierte Montagelösungen diskutiert werden.'
            },
            {
                q: 'Wie werden Vibrationen und mechanische Schocks gehandhabt?',
                a: 'ATMOS bietet detaillierte Thermaliniterschnittstellen und mechanische Spezifikationen mit streng definierten Randbedingungen für jede Missionsphase (LEO warm- und Kaltetfälle). Überwachungsorte und Korrelationspunkte werden festgestellt, und konduktive/strahlende Oberflächenparameter werden definiert. Ihre Nutzlast muss autonom qualifiziert nach Industrienormen (Eigenfrequenz >40 Hz, Vibrationstester nach SpaceX RPUG §6.5 und EMK-Konformität).'
            },
            {
                q: 'Welche Reinraumeinrichtungen sind für die Nutzlast-Integrationen verfügbar?',
                a: 'Die meisten Nutzlast-Integrationsaktivitäten werden an ATMOS-Einrichtungen in Deutschland durchgeführt, mit potenzieller zukünftiger Fähigkeit in Strasbourg. ATMOS rüstet derzeit die Reinrauminfrastruktur bis zur ISO Klasse 5-Kapazität in Einklang mit zukünftigen Anforderungen auf (Einhaltung von 2028-Fristen). Für biologische Proben, die Montage in der Nähe des Starts erfordern, wird die Spätzugangsintegrationen direkten an der SpaceX-Einrichtung über die dedizierte Phoenix-Luke unterstützt.'
            },
            {
                q: 'Welche Ingenieurmodelle oder Tests benötigt meine Nutzlast für die Qualifizierung?',
                a: 'Typische Anforderungen umfassen: (1) ein Ingenieurmodell (EM) bei L–9 Monaten für Interface-Tests und Fahrzeug-EM-Entwicklung, (2) ein qualifiziertes Flugmodell (FM) plus Bodenunterstützungsausrüstung (GSE) bei L–8 Monaten für Integration und (3) FM-Pre-Integrations-Kriterium-Verifizierung (Masse, Abmessungen, Montagetyp, Temperatur 4–40°C, Leistungsbereiche, Datenprotokoll, Steckverbinder-Konformität und Interface-Anforderungsdokument-Einreichung). Die FM muss auch vollständig autonom nach Industrienormen qualifiziert sein (Vibration, Leistungs-Inhibierung, Lecktests, Eigenfrequenz >40 Hz, EMK, Massenetat, Vakuumberatung) mit Dokumentation fällig L–3,5 Monaten vor dem Start.'
            },
            {
                q: 'Wie wird die Nutzlastobsorption und Verwahrkette gehandhabt?',
                a: 'ATMOS behält eine kontinuierliche, überprüfbare Verwahrkette für Ihre Nutzlast während aller Missionsphasen ist, von der Integration bis zum Mitnahmen und der Rückgabe der Nutzlast. Einzelheiten der Obsorptionseigenschaften, Zugriffskontrolle und Aufzeichnungen, die Ihnen bereitgestellt werden, werden bei der Missionssignatur in Übereinstimmung mit der vereinbarten missionsspezifischen Nutzlastbehandlungs- und Bedienungsverfahren definiert. Formale Obsorbtungswechselunterlagen werden nach der Bergung gemäß Vertrag bereitgestellt.'
            },
            {
                q: 'Welche Umgebungsdaten erhalte ich von der Mission?',
                a: 'ATMOS bietet nutzlastrelevante Umgebungsdaten für alle Flugstadien, einschließlich Thermalprofile, Druck und Beschleunigungsdaten über jede Missionsphase hinweg. Datenauflösung, Zeitstempel und Lieferkalender werden in der Missions-ICD angegeben. Sie erhalten ein reduziertes globales Thermalmodell (TMM) für Ihre Mission zusammen mit zeitabhängigen Dissipationsdaten und vorhergesagten Interface-Temperaturen.'
            },
            {
                q: 'Gibt es eine Garantie für Landungsort und -zeit?',
                a: 'Phoenix zielt nominal auf Wasserlandung in der Nähe der Azoren ab, mit Deorbiting basierend auf Trägerneigung (53° Baseline für SpaceX Falcon 9). Landungsort-Genauigkeit und Aktualisierungshäufigkeit werden pro Mission definiert, mit Schlussbestätigung vor dem Wiedereintritt in Koordination mit Behördengenehmigungen (FAA) und Trägerbeschränkungen bereitgestellt. Genaue Landungsvorhersagen verbessern sich mit der Zeit, wenn sich die Mission dem Wiedereintritt nähert.'
            },
            {
                q: 'Was sind die Umgebungsanforderungen für Nutzlast-Hardware?',
                a: 'Ihre Nutzlast muss qualifiziert sein für den Betrieb in der definierten Phoenix-Umgebung: Druck 1 atm, Temperatur 18–30°C Standard (Bereich −5 bis +40°C möglich), Vakuumflugphasen und Start-/Wiedereintrittslasten nach SpaceX RPUG-Normen. Alle Materialien und Komponenten müssen mit Handhabungsanforderungen für Raum, Ausgasungsnormen und Elektromagnetischer Verträglichkeitsspezifikationen konform sein, die in der Missions-ICD aufgelistet sind.'
            },
            {
                q: 'Ist Phoenix konform mit Weltraummüll- und Umweltregeln?',
                a: 'Ja. Phoenix ist konzipiert und betrieben in vollständiger Einhaltung mit der ESA-geführten Zero Debris Charter (Abschnitte 1 und 2). Alle Nutzlasten, Verbrauchsmaterialien und Missionsmaterialien bleiben während aller Missionsphasen vollständig enthalten ohne absichtliche Freisetzung von Objekten oder Substanzen. Phoenix führt gesteuerte Missions-Ende-Deorbiting und Wiedereintritt durch, um sicherzustellen, dass keine langlebigen Orbitalgebilde zurückbleiben und Post-Missionsschutt-Entstehung verhindert wird.'
            },
            {
                q: 'Kann meine Mission im Vereinigten Königreich genehmigt werden?',
                a: 'Phoenix kann unter mehreren Raumfahrt-Genehmigungsystemen regiert werden. Obwohl die britische Gerichtsbarkeit nicht im Basiskonzept beteiligt ist, sind die Negativ-Regierung, Sicherheitsfallstruktur und Haftungsrahmen kompatibel mit britischen Raumfahrt-Gesetzes-Anforderungen, falls britische Gerichtsbarkeit anzuwenden ist. Die primär anwendbaren Bahn-Regime sind derzeit diejenigen von Deutschland (Betreiberlands) und Portugal (geplantes Rückkehrland), mit trägerabhängigen Anforderungen.'
            },
            {
                q: 'Was ist im Basispreis von €45.000/kg enthalten?',
                a: 'Der Basispreis umfasst: Nutzlastintegration, Transport zur Startanlage, End-zu-End-Tests, Start- und Orbitaloperationen, Wiedereintritt, Bergung und Rückgabe zur ATMOS-Zentrale in Lichtenau, Deutschland. Ingenieurinformationen und Dokumentationslieferungen (Interfacedefinition L–10m, EM L–9m, qualifizierte FM+GSE L–8m, SpaceX-Verifizierungsdocs L–3,5m) werden von Ihnen nach Missionskalender verlangt.'
            },
            {
                q: 'Gibt es Zusatzkosten über dem Basispreis von €45.000/kg hinaus?',
                a: 'Mögliche Zusatzkosten umfassen: (1) Interface-/Strukturingenieur-Unterstützung zu €110/Stunde, (2) externe Antennen-Montagegebühren und (3) Aufschlag für Nutzlasten über 100 kg (€50–80k pro kg, je nach Missionskalender). Alle optionalen und bedingten Kosten werden bei Missionssignatur detailliert und vereinbart.'
            },
            {
                q: 'Welche Software wird für Nutzlastkommunikationen benutzt?',
                a: 'Nutzlastkommunikation und -betrieb werden durch das Phoenix-Nutzlast-Interface-Board (Raspberry Pi Compute Module 5, dual-redundantes System) unter Verwendung von an-Bord-Flugsoftware, die von ATMOS entwickelt und Hardware-in-the-Loop-getestet wurde, gehandhabt. Die Kommunikation unterstützt Ethernet (primär), RS422 (Sicherung), CFDP Klasse 2 für Dateiübetragung und CCSDS-konforme S-Band-Tele-Befehl/Telemetrie-Verarbeitung. ATMOS bietet eine Ground-Segment-API für Nutzlastdaten und Tele-Befehlsbetrieb.'
            },
            {
                q: 'Sind die Datenformate Industriestandards?',
                a: 'Ja. Alle Nutzlastdatenformate sind vollständig CCSDS-konform. Die primäre Nutzlastdatenübertragung benutzt CFDP Klasse 2 über Ethernet (RJ45) mit RS422 als Sicherung. Telemetrie- und Tele-Befehlsverarbeitung folgt CCSDS TC/TM Kodierung/Dekodierung, einschließlich CADU-Rahmen über an-Bord-CCSDS-Prozessoren. Dies sichert Übereinstimmung mit anerkannten internationalen Raumfahrtkommunikationsstandards und Interoperabilität mit Bodensystemen.'
            },
            {
                q: 'Was ist, wenn meine Nutzlast gefährliche Materialien enthält?',
                a: 'ATMOS befolgt alle behördlichen Anforderungen zur Offenlegung und Handhabung gefährlicher Nutzlasten. Gefährliche Materialien müssen nach SpaceX RPUG und internationalem Raumfahrtsrecht erklärt und dokumentiert werden. Handhabungs-, Integrations- und Sicherheitsverfahren werden in missionsspezifischen Dokumenten definiert. Frühe Mitteilung über gefährliche Materialinhalte ist für Missionsplanung wesentlich.'
            },
            {
                q: 'Wann ist die nächste Phoenix-Missionsopportunität?',
                a: 'Phoenix-Missionen sind während 2028 und darüber hinaus verfügbar, mit Starts geplant für Q3 2028 (Juni–Dezember 2028 Fenster) als Basis. Zusätzliche Flüge sind für Ende 2026 und April 2027 bestätigt. Missionsspezifische Startdaten werden basierend auf Nutzlast-Bereitschaft und Missionsanforderungen verhandelt.'
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
