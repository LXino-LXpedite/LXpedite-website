// Theme Toggle
function initializeThemeToggle() {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const mobileThemeCheckbox = document.getElementById('theme-checkbox-mobile');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeCheckbox.checked = savedTheme === 'dark';
    if (mobileThemeCheckbox) {
        mobileThemeCheckbox.checked = savedTheme === 'dark';
    }
    
    function updateTheme(checkbox) {
        const newTheme = checkbox.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Sync checkboxes
        themeCheckbox.checked = checkbox.checked;
        if (mobileThemeCheckbox) {
            mobileThemeCheckbox.checked = checkbox.checked;
        }
    }
    
    themeCheckbox.addEventListener('change', () => updateTheme(themeCheckbox));
    if (mobileThemeCheckbox) {
        mobileThemeCheckbox.addEventListener('change', () => updateTheme(mobileThemeCheckbox));
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    closeMenu?.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay?.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Reviews System
function initializeReviews() {
    const addReviewBtn = document.querySelector('.add-review-btn');
    const prevButton = document.getElementById('prevReview');
    const nextButton = document.getElementById('nextReview');
    
    if (addReviewBtn) {
        addReviewBtn.addEventListener('click', () => {
            // This will be replaced with actual review submission functionality
            alert('Review submission will be implemented soon!');
        });
    }

    // Initialize review navigation
    let currentReviewIndex = 0;
    let reviews = [];

    function updateReviewNavigation() {
        if (prevButton && nextButton) {
            prevButton.disabled = reviews.length === 0 || currentReviewIndex === 0;
            nextButton.disabled = reviews.length === 0 || currentReviewIndex === reviews.length - 1;
        }
    }

    function showReview(index) {
        const reviewsWrapper = document.getElementById('reviewsWrapper');
        if (!reviewsWrapper || reviews.length === 0) return;

        // Remove existing review cards
        const existingCards = reviewsWrapper.querySelectorAll('.review-card');
        existingCards.forEach(card => card.remove());

        // Show the current review
        const review = reviews[index];
        const reviewCard = createReviewCard(review);
        reviewsWrapper.appendChild(reviewCard);

        // Trigger animation
        setTimeout(() => {
            reviewCard.classList.add('active');
        }, 50);

        updateReviewNavigation();
    }

    function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-name">${review.name}</div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-rating">
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                </div>
            </div>
            <div class="review-content">${review.content}</div>
        `;
        return card;
    }

    // Event listeners for navigation
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentReviewIndex > 0) {
                currentReviewIndex--;
                showReview(currentReviewIndex);
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentReviewIndex < reviews.length - 1) {
                currentReviewIndex++;
                showReview(currentReviewIndex);
            }
        });
    }

    // Initialize the reviews display
    updateReviewNavigation();
}

// FAQ Accordion
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const toggle = question.querySelector('.faq-toggle');
            const isActive = answer.classList.contains('active');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(a => {
                if (a !== answer) {
                    a.classList.remove('active');
                    a.previousElementSibling.querySelector('.faq-toggle').classList.remove('active');
                }
            });
            
            // Toggle current answer
            answer.classList.toggle('active');
            toggle.classList.toggle('active');
            
            // Smooth scroll to the question if it's not visible
            if (!isActive) {
                const rect = question.getBoundingClientRect();
                const isVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);
                
                if (!isVisible) {
                    question.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
}

// Language Translations
const translations = {
    en: {
        nav: {
            home: 'Home',
            services: 'Services',
            about: 'About',
            contact: 'Contact',
            callNow: 'Call Now'
        },
        hero: {
            title: 'Fast & Affordable\nDelivery Service in\nLaredo!',
            highlights: {
                fast: 'Fast & Cheaper Than Other Movers',
                noHidden: 'No Hidden Fees - Transparent Pricing',
                afterHours: 'After Hours Available: 6PM-10PM'
            },
            cta: {
                call: 'Call Now',
                text: 'Text for FREE Quote'
            }
        },
        services: {
            title: 'SERVICES',
            local: {
                title: 'Local Deliveries',
                subtitle: '(Short Trips - Under 20 Miles)'
            },
            longDistance: {
                title: 'Long - Distance',
                subtitle: 'Pickup & Delivery'
            },
            flatRate: {
                title: 'Flat - Rate Pricing (For Common Jobs)',
                items: [
                    'Furniture & Appliance Delivery',
                    'Small Moves (Light Items,No Heavy Lifting)',
                    'Junk Removal & Haul - Away:',
                    '(Based on size/Disposal fee)(Trailer not Van)',
                    'Package & Grocery Delivery'
                ]
            },
            hours: {
                title: 'Hours of Operation:',
                subtitle: 'Mon-Sat: 7AM-6PM',
                emergency: ['Emergency/', 'After-Hour', 'Service', 'Available!']
            },
            payments: {
                title: 'Payments Accepted:',
                methods: ['Cash', 'Zelle', 'Venmo', 'Cash App'],
                note: '*Delay Fees ask for more information'
            }
        },
        vehicle: {
            title: 'Our Vehicle',
            name: '2018 Freightliner Sprinter 2500',
            specs: [
                'High Roof Cargo Van',
                'Extended Length for Maximum Capacity',
                'Professional-Grade Cargo Space',
                'Well-Maintained & Reliable'
            ],
            description: 'Our Freightliner Sprinter Van is specially equipped to handle all your delivery needs with care and efficiency. Whether it\'s furniture, appliances, or sensitive items, we ensure safe and secure transportation.'
        },
        faq: {
            title: 'Frequently Asked Questions',
            questions: [
                {
                    q: 'What areas do you serve?',
                    a: 'We primarily serve the greater Laredo area and surrounding regions. For long-distance deliveries, we offer custom quotes based on distance and requirements.'
                },
                {
                    q: 'What are your rates?',
                    a: 'Our rates are based on distance, item size, and service type. We offer flat rates for common jobs and custom quotes for specific needs. Contact us for a free quote!'
                },
                {
                    q: 'Do you offer same-day delivery?',
                    a: 'Yes! We offer same-day delivery services during our regular hours (7AM-6PM) and emergency services after hours (6PM-10PM), subject to availability.'
                },
                {
                    q: 'What items can you transport?',
                    a: 'We can transport furniture, appliances, packages, groceries, and most household items. For special items or heavy lifting requirements, please contact us for details.'
                },
                {
                    q: 'How do I schedule a delivery?',
                    a: 'You can schedule a delivery by calling or texting us at (956) 999-2944. We\'ll discuss your needs and provide a quote. For immediate service, call us directly.'
                },
                {
                    q: 'What payment methods do you accept?',
                    a: 'We accept Cash, Zelle, Venmo, and Cash App. Payment is typically required upon delivery completion unless otherwise arranged.'
                }
            ]
        },
        reviews: {
            title: 'Customer Reviews',
            noReviews: 'Be the first to leave a review!',
            writeReview: 'Write a Review'
        },
        contact: {
            title: 'Contact Us',
            phone: {
                title: 'Call or Text',
                note: 'After Hours Available: 6PM-10PM'
            },
            hours: {
                title: 'Business Hours',
                regular: 'Monday - Saturday: 7AM - 6PM',
                after: 'After Hours: 6PM - 10PM'
            },
            payment: {
                title: 'Payment Methods'
            }
        },
        footer: {
            description: 'Fast, reliable, and affordable delivery services in Laredo, TX.',
            quickLinks: 'Quick Links',
            rights: '© 2024 LXPedite. All rights reserved.'
        }
    },
    es: {
        nav: {
            home: 'Inicio',
            services: 'Servicios',
            about: 'Nosotros',
            contact: 'Contacto',
            callNow: 'Llamar Ahora'
        },
        hero: {
            title: '¡Servicio de Entrega\nRápido y Económico\nen Laredo!',
            highlights: {
                fast: 'Más Rápido y Económico que Otros',
                noHidden: 'Sin Cargos Ocultos - Precios Transparentes',
                afterHours: 'Disponible Después de Horas: 6PM-10PM'
            },
            cta: {
                call: 'Llamar Ahora',
                text: 'Mensaje para Cotización GRATIS'
            }
        },
        services: {
            title: 'SERVICIOS',
            local: {
                title: 'Entregas Locales',
                subtitle: '(Viajes Cortos - Menos de 20 Millas)'
            },
            longDistance: {
                title: 'Larga Distancia',
                subtitle: 'Recolección y Entrega'
            },
            flatRate: {
                title: 'Precios Fijos (Para Trabajos Comunes)',
                items: [
                    'Entrega de Muebles y Electrodomésticos',
                    'Mudanzas Pequeñas (Artículos Ligeros)',
                    'Remoción de Basura:',
                    '(Basado en tamaño/Cargo por disposición)(Remolque)',
                    'Entrega de Paquetes y Comestibles'
                ]
            },
            hours: {
                title: 'Horario de Operación:',
                subtitle: 'Lun-Sáb: 7AM-6PM',
                emergency: ['Servicio de', 'Emergencia/', 'Después de', 'Horas!']
            },
            payments: {
                title: 'Métodos de Pago:',
                methods: ['Efectivo', 'Zelle', 'Venmo', 'Cash App'],
                note: '*Cargos por retraso, solicite más información'
            }
        },
        vehicle: {
            title: 'Nuestro Vehículo',
            name: '2018 Freightliner Sprinter 2500',
            specs: [
                'Van de Carga con Techo Alto',
                'Longitud Extendida para Máxima Capacidad',
                'Espacio de Carga Profesional',
                'Bien Mantenida y Confiable'
            ],
            description: 'Nuestra Van Freightliner Sprinter está especialmente equipada para manejar todas sus necesidades de entrega con cuidado y eficiencia. Ya sean muebles, electrodomésticos o artículos delicados, garantizamos un transporte seguro.'
        },
        faq: {
            title: 'Preguntas Frecuentes',
            questions: [
                {
                    q: '¿Qué áreas cubren?',
                    a: 'Principalmente servimos el área metropolitana de Laredo y regiones circundantes. Para entregas de larga distancia, ofrecemos cotizaciones personalizadas según la distancia y requisitos.'
                },
                {
                    q: '¿Cuáles son sus tarifas?',
                    a: 'Nuestras tarifas se basan en la distancia, tamaño del artículo y tipo de servicio. Ofrecemos tarifas fijas para trabajos comunes y cotizaciones personalizadas para necesidades específicas. ¡Contáctenos para una cotización gratuita!'
                },
                {
                    q: '¿Ofrecen entrega el mismo día?',
                    a: '¡Sí! Ofrecemos servicios de entrega el mismo día durante nuestro horario regular (7AM-6PM) y servicios de emergencia después de horas (6PM-10PM), sujeto a disponibilidad.'
                },
                {
                    q: '¿Qué artículos pueden transportar?',
                    a: 'Podemos transportar muebles, electrodomésticos, paquetes, comestibles y la mayoría de artículos del hogar. Para artículos especiales o requisitos de carga pesada, contáctenos para más detalles.'
                },
                {
                    q: '¿Cómo programo una entrega?',
                    a: 'Puede programar una entrega llamando o enviando un mensaje de texto al (956) 999-2944. Discutiremos sus necesidades y proporcionaremos una cotización. Para servicio inmediato, llámenos directamente.'
                },
                {
                    q: '¿Qué métodos de pago aceptan?',
                    a: 'Aceptamos Efectivo, Zelle, Venmo y Cash App. El pago generalmente se requiere al completar la entrega, a menos que se acuerde lo contrario.'
                }
            ]
        },
        reviews: {
            title: 'Reseñas de Clientes',
            noReviews: '¡Sé el primero en dejar una reseña!',
            writeReview: 'Escribir Reseña'
        },
        contact: {
            title: 'Contáctenos',
            phone: {
                title: 'Llamar o Texto',
                note: 'Disponible Después de Horas: 6PM-10PM'
            },
            hours: {
                title: 'Horario',
                regular: 'Lunes - Sábado: 7AM - 6PM',
                after: 'Después de Horas: 6PM - 10PM'
            },
            payment: {
                title: 'Métodos de Pago'
            }
        },
        footer: {
            description: 'Servicios de entrega rápidos, confiables y económicos en Laredo, TX.',
            quickLinks: 'Enlaces Rápidos',
            rights: '© 2024 LXPedite. Todos los derechos reservados.'
        }
    }
};

// Language Toggle
function initializeLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');
    const langButtons = [langToggle, langToggleMobile];
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('language') || 'en';
    document.documentElement.setAttribute('data-lang', savedLang);
    updateLanguageButtons(savedLang);
    updateContent(savedLang);
    
    langButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                const currentLang = document.documentElement.getAttribute('data-lang');
                const newLang = currentLang === 'en' ? 'es' : 'en';
                
                document.documentElement.setAttribute('data-lang', newLang);
                localStorage.setItem('language', newLang);
                updateLanguageButtons(newLang);
                updateContent(newLang);
            });
        }
    });
}

function updateLanguageButtons(lang) {
    const langButtons = document.querySelectorAll('.lang-toggle, .lang-toggle-mobile');
    langButtons.forEach(button => {
        const langText = button.querySelector('.lang-text');
        if (langText) {
            langText.textContent = lang.toUpperCase();
        }
    });
}

function updateContent(lang) {
    const content = translations[lang];
    if (!content) return;

    // Update navigation
    updateNavigation(content.nav);
    
    // Update hero section
    updateHero(content.hero);
    
    // Update services section
    updateServices(content.services);
    
    // Update vehicle section
    updateVehicle(content.vehicle);
    
    // Update FAQ section
    updateFAQ(content.faq);
    
    // Update reviews section
    updateReviews(content.reviews);
    
    // Update contact section
    updateContact(content.contact);
    
    // Update footer
    updateFooter(content.footer);
}

function updateNavigation(nav) {
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#home') link.textContent = nav.home;
        if (href === '#services') link.textContent = nav.services;
        if (href === '#about') link.textContent = nav.about;
        if (href === '#contact') link.textContent = nav.contact;
        if (link.classList.contains('nav-cta') || link.classList.contains('mobile-cta')) {
            const icon = link.querySelector('i');
            link.textContent = nav.callNow;
            if (icon) link.prepend(icon);
        }
    });
}

function updateHero(hero) {
    const title = document.querySelector('#hero h1');
    if (title) title.innerHTML = hero.title;

    const highlights = document.querySelectorAll('.hero-highlights .glass p');
    if (highlights.length >= 3) {
        highlights[0].innerHTML = `<i class="fas fa-bolt"></i> ${hero.highlights.fast}`;
        highlights[1].innerHTML = `<i class="fas fa-check-circle"></i> ${hero.highlights.noHidden}`;
        highlights[2].innerHTML = `<i class="fas fa-clock"></i> ${hero.highlights.afterHours}`;
    }

    const ctaButtons = document.querySelectorAll('.cta-buttons .button');
    if (ctaButtons.length >= 2) {
        const callBtn = ctaButtons[0];
        const textBtn = ctaButtons[1];
        
        const callIcon = callBtn.querySelector('i');
        const textIcon = textBtn.querySelector('i');
        
        callBtn.textContent = hero.cta.call;
        textBtn.textContent = hero.cta.text;
        
        if (callIcon) callBtn.prepend(callIcon);
        if (textIcon) textBtn.prepend(textIcon);
    }
}

function updateServices(services) {
    // Update services title
    const title = document.querySelector('#services h2');
    if (title) title.textContent = services.title;

    // Update service cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        const heading = card.querySelector('h3');
        const subtitle = card.querySelector('.service-subtitle');
        
        if (heading) {
            if (heading.textContent.includes('Local')) {
                heading.textContent = services.local.title;
                if (subtitle) subtitle.textContent = services.local.subtitle;
            } else if (heading.textContent.includes('Long')) {
                heading.textContent = services.longDistance.title;
                if (subtitle) subtitle.textContent = services.longDistance.subtitle;
            }
            // Continue updating other service cards...
        }
    });
}

function updateVehicle(vehicle) {
    const title = document.querySelector('.vehicle-showcase h2');
    if (title) title.textContent = vehicle.title;

    const name = document.querySelector('.vehicle-info h3');
    if (name) name.textContent = vehicle.name;

    const specs = document.querySelectorAll('.vehicle-specs li');
    specs.forEach((spec, index) => {
        if (index < vehicle.specs.length) {
            const icon = spec.querySelector('i');
            spec.textContent = vehicle.specs[index];
            if (icon) spec.prepend(icon);
        }
    });

    const description = document.querySelector('.vehicle-description');
    if (description) description.textContent = vehicle.description;
}

function updateFAQ(faq) {
    const title = document.querySelector('.faq-section h2');
    if (title) title.textContent = faq.title;

    const questions = document.querySelectorAll('.faq-item');
    questions.forEach((item, index) => {
        if (index < faq.questions.length) {
            const questionText = item.querySelector('.faq-question h3');
            const answerText = item.querySelector('.faq-answer p');
            
            if (questionText) questionText.textContent = faq.questions[index].q;
            if (answerText) answerText.textContent = faq.questions[index].a;
        }
    });
}

function updateReviews(reviews) {
    const title = document.querySelector('.reviews-section h2');
    if (title) title.textContent = reviews.title;

    const noReviews = document.querySelector('.no-reviews-message p');
    if (noReviews) noReviews.textContent = reviews.noReviews;

    const writeReviewBtn = document.querySelector('.add-review-btn');
    if (writeReviewBtn) {
        const icon = writeReviewBtn.querySelector('i');
        writeReviewBtn.textContent = reviews.writeReview;
        if (icon) writeReviewBtn.prepend(icon);
    }
}

function updateContact(contact) {
    const title = document.querySelector('#contact h2');
    if (title) title.textContent = contact.title;

    const sections = document.querySelectorAll('.contact-item');
    sections.forEach(section => {
        const heading = section.querySelector('h3');
        if (heading) {
            if (heading.textContent.includes('Call')) {
                heading.textContent = contact.phone.title;
                const note = section.querySelector('.contact-note');
                if (note) note.textContent = contact.phone.note;
            } else if (heading.textContent.includes('Business')) {
                heading.textContent = contact.hours.title;
                const hours = section.querySelectorAll('.contact-list li');
                if (hours.length >= 2) {
                    hours[0].textContent = contact.hours.regular;
                    hours[1].textContent = contact.hours.after;
                }
            } else if (heading.textContent.includes('Payment')) {
                heading.textContent = contact.payment.title;
            }
        }
    });
}

function updateFooter(footer) {
    const description = document.querySelector('.footer-section p');
    if (description) description.textContent = footer.description;

    const quickLinks = document.querySelector('.footer-section h3:nth-of-type(2)');
    if (quickLinks) quickLinks.textContent = footer.quickLinks;

    const rights = document.querySelector('.footer-bottom p');
    if (rights) rights.textContent = footer.rights;
}

// Service Area Map
function initializeServiceMap() {
    // Laredo coordinates
    const laredoCenter = { lat: 27.5306, lng: -99.4803 };
    
    // Create map centered on Laredo
    const map = new google.maps.Map(document.getElementById('serviceMap'), {
        center: { lat: 30.9686, lng: -99.9018 }, // Center of Texas
        zoom: 6, // Wider view to show more of Texas
        styles: getMapStyles(),
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    });

    // Define service zones
    const zones = [
        {
            center: laredoCenter,
            radius: 32186.9, // 20 miles in meters
            color: '#4CAF50',
            opacity: 0.2
        },
        {
            center: laredoCenter,
            radius: 80467.2, // 50 miles in meters
            color: '#2196F3',
            opacity: 0.15
        },
        {
            center: laredoCenter,
            radius: 160934, // 100 miles in meters
            color: '#FFC107',
            opacity: 0.1
        }
    ];

    // Add circles for each zone (from largest to smallest)
    zones.reverse().forEach(zone => {
        new google.maps.Circle({
            strokeColor: zone.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: zone.color,
            fillOpacity: zone.opacity,
            map,
            center: zone.center,
            radius: zone.radius,
        });
    });

    // Add marker for Laredo
    new google.maps.Marker({
        position: laredoCenter,
        map,
        title: 'LXpedite - Laredo',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#e63946',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
        }
    });

    // Add a subtle highlight for Texas
    const texasCoordinates = [
        { lat: 36.5007, lng: -103.0430 }, // Northeast corner
        { lat: 36.5007, lng: -100.0000 }, // North
        { lat: 34.5790, lng: -96.5000 },  // Northeast curve
        { lat: 33.6415, lng: -94.0000 },  // East curve
        { lat: 31.8457, lng: -93.8500 },  // East
        { lat: 29.7633, lng: -93.8500 },  // Southeast
        { lat: 29.3000, lng: -94.8000 },  // Gulf Coast
        { lat: 27.8400, lng: -97.0200 },  // Gulf Coast
        { lat: 25.8371, lng: -97.1500 },  // Southmost point
        { lat: 25.8371, lng: -99.2500 },  // South border
        { lat: 29.7633, lng: -103.7500 }, // Southwest curve
        { lat: 31.8457, lng: -106.6250 }, // West
        { lat: 36.5007, lng: -103.0430 }  // Back to start
    ];

    // Create a polygon for Texas
    new google.maps.Polygon({
        paths: texasCoordinates,
        strokeColor: '#9C27B0',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#9C27B0',
        fillOpacity: 0.05,
        map: map
    });
}

function getMapStyles() {
    return [
        {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6c757d' }]
        },
        {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }, { weight: 2 }]
        },
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#dee2e6' }]
        },
        {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f8f9fa' }]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#dee2e6' }]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#a8dadc' }]
        }
    ];
}

// Update map styles for dark mode
function updateMapStyles(isDark) {
    const map = document.getElementById('serviceMap');
    if (!map) return;

    const darkStyles = [
        {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#a0a0a0' }]
        },
        {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#242424' }, { weight: 2 }]
        },
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#333333' }]
        },
        {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#242424' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#333333' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1a1a1a' }]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#1a1a1a' }]
        }
    ];

    const mapInstance = google.maps.Map.getMap(map);
    if (mapInstance) {
        mapInstance.setOptions({
            styles: isDark ? darkStyles : getMapStyles()
        });
    }
}

function initializeQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    const pickupDateInput = document.getElementById('pickupDate');
    const pickupTimeInput = document.getElementById('pickupTime');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.min = today;

    // Form submission handler
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(quoteForm);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        // Basic form validation
        const requiredFields = ['fullName', 'phone', 'email', 'pickupLocation', 'deliveryLocation'];
        let isValid = true;
        let firstInvalidField = null;

        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('invalid');
                if (!firstInvalidField) firstInvalidField = input;
            } else {
                input.classList.remove('invalid');
            }
        });

        // Email validation
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('invalid');
            if (!firstInvalidField) firstInvalidField = emailInput;
        }

        // Phone validation
        const phoneInput = document.getElementById('phone');
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneRegex.test(phoneInput.value)) {
            isValid = false;
            phoneInput.classList.add('invalid');
            if (!firstInvalidField) firstInvalidField = phoneInput;
        }

        if (!isValid) {
            firstInvalidField.focus();
            return;
        }

        // Show loading state
        const submitButton = quoteForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            // Here you would typically send the form data to your backend
            // For now, we'll simulate a server response
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            quoteForm.reset();
            showNotification('Quote request sent successfully! We\'ll contact you shortly.', 'success');
        } catch (error) {
            showNotification('There was an error sending your request. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // Add input event listeners for real-time validation
    document.querySelectorAll('.quote-form input, .quote-form textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('invalid');
        });
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .notification.success {
        border-left: 4px solid #4CAF50;
    }

    .notification.error {
        border-left: 4px solid #f44336;
    }

    .notification i {
        font-size: 1.2rem;
    }

    .notification.success i {
        color: #4CAF50;
    }

    .notification.error i {
        color: #f44336;
    }

    [data-theme="dark"] .notification {
        background: #1a1a1a;
        color: #e0e0e0;
    }

    .quote-form input.invalid,
    .quote-form textarea.invalid {
        border-color: #f44336;
        background-color: rgba(244, 67, 54, 0.05);
    }
`;
document.head.appendChild(style);

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeReviews();
    initializeFAQ();
    initializeLanguageToggle();
    initializeServiceMap();
    initializeQuoteForm();
}); 