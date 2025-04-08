/**
 * Component Loader
 * 
 * This script dynamically loads HTML components into the main page.
 * Each component is loaded into a designated container div.
 */

// Keep track of loaded components
const loadedComponents = new Set();
const TOTAL_COMPONENTS = 14; // Update this if components change

document.addEventListener('DOMContentLoaded', function() {
    // List of components to load with their container IDs
    const components = [
        { name: 'navbar', containerId: 'navbar-container' },
        { name: 'hero-alt', containerId: 'hero-container' },
        { name: 'brands', containerId: 'brands-container' },
        { name: 'api', containerId: 'api-container' },
        { name: 'benefits', containerId: 'benefits-container' },
        { name: 'tools', containerId: 'tools-container' },
        { name: 'features', containerId: 'features-container' },
        { name: 'testimonials', containerId: 'testimonials-container' },
        { name: 'pricing', containerId: 'pricing-container' },
        { name: 'blog', containerId: 'blog-container' },
        { name: 'faq', containerId: 'faq-container' },
        { name: 'cta', containerId: 'cta-container' },
        { name: 'newsletter', containerId: 'newsletter-container' },
        { name: 'footer', containerId: 'footer-container' }
    ];

    // Load each component
    components.forEach(component => {
        loadComponent(component.name, component.containerId);
    });
});

/**
 * Loads a component HTML file and inserts it into the specified container
 * @param {string} componentName - Name of the component (corresponds to filename)
 * @param {string} containerId - ID of the container element
 */
function loadComponent(componentName, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container #${containerId} not found for component ${componentName}`);
        return;
    }

    fetch(`components/${componentName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${componentName} component (${response.status}: ${response.statusText})`);
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            
            // Execute any inline scripts in the component
            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                
                // Copy all attributes
                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                // Copy the content
                newScript.textContent = script.textContent;
                
                // Replace the old script with the new one
                script.parentNode.replaceChild(newScript, script);
            });
            
            // Track this component as loaded
            loadedComponents.add(componentName);
            
            // Dispatch event to notify that component is loaded
            const event = new CustomEvent('componentLoaded', { 
                detail: { 
                    componentName: componentName,
                    container: container
                } 
            });
            document.dispatchEvent(event);
            
            console.log(`Component ${componentName} loaded successfully`);
            
            // Check if all components are loaded
            if (loadedComponents.size === TOTAL_COMPONENTS) {
                console.log("All components loaded, initializing site-wide features");
                setTimeout(initializeAfterAllComponentsLoaded, 100);
            }
            
            // Handle specific component initializations
            if (componentName === 'faq') {
                setTimeout(initializeFAQ, 100);
            }
            
            if (componentName === 'navbar') {
                setTimeout(updateThemeIcons, 100);
            }
        })
        .catch(error => {
            console.error(`Error loading ${componentName} component:`, error);
        });
}

/**
 * Initialize site-wide features after all components are loaded
 */
function initializeAfterAllComponentsLoaded() {
    initializeAnimations();
    initializeTyped();
    initializeTheme();
}

/**
 * Initialize animations
 */
function initializeAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Set initial state for reveal elements
        gsap.set(".reveal-up", { 
            opacity: 0,
            y: "50px"
        });

        // Apply animations to each section
        const sections = document.querySelectorAll("section");
        
        sections.forEach(section => {
            const revealElements = section.querySelectorAll(".reveal-up");
            
            if (revealElements.length > 0) {
                gsap.to(revealElements, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none none"
                    }
                });
            }
        });

        // Dashboard animation
        const dashboard = document.getElementById("dashboard");
        if (dashboard) {
            gsap.to(dashboard, {
                rotateX: "0deg",
                scale: 1,
                translateY: 0,
                scrollTrigger: {
                    trigger: "#hero-section",
                    start: window.innerWidth > 1024 ? "top 95%" : "top 70%",
                    end: "bottom bottom",
                    scrub: 1
                }
            });
        }

        console.log("Animations initialized successfully");
    } else {
        console.warn("GSAP or ScrollTrigger not loaded, animations not initialized");
    }
}

/**
 * Initialize FAQ accordions
 */
function initializeFAQ() {
    const faqAccordions = document.querySelectorAll('.faq-accordion');
    
    faqAccordions.forEach(function(btn) {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            let content = this.nextElementSibling;
            let icon = this.querySelector(".bi-plus");
            
            if (content.style.maxHeight === '240px') {
                content.style.maxHeight = '0px';
                content.style.padding = '0px 18px';
                icon.style.transform = "rotate(0deg)";
            } else {
                content.style.maxHeight = '240px';
                content.style.padding = '20px 18px';
                icon.style.transform = "rotate(45deg)";
            }
        });
    });
    
    console.log("FAQ accordions initialized");
}

/**
 * Initialize typed.js for hero section
 */
function initializeTyped() {
    const promptSample = document.getElementById('prompts-sample');
    if (promptSample && typeof Typed !== 'undefined') {
        new Typed('#prompts-sample', {
            strings: [
                "How to solve a rubik's cube? Step by step guide", 
                "What's Tobeez playground?", 
                "How to build an AI SaaS App?", 
                "How to integrate Tobeez API?"
            ],
            typeSpeed: 80,
            smartBackspace: true, 
            loop: true,
            backDelay: 2000,
        });
        console.log("Typed.js initialized");
    }
}

/**
 * Initialize theme
 */
function initializeTheme() {
    updateThemeIcons();
    console.log("Theme initialized");
}

/**
 * Update theme icons based on current theme
 */
function updateThemeIcons() {
    const lightModeIcon = document.getElementById('light-mode-icon');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    
    if (!lightModeIcon || !darkModeIcon) {
        console.warn("Theme icons not found");
        return;
    }
    
    if (document.documentElement.classList.contains('tw-dark')) {
        lightModeIcon.classList.add('tw-hidden');
        darkModeIcon.classList.remove('tw-hidden');
    } else {
        lightModeIcon.classList.remove('tw-hidden');
        darkModeIcon.classList.add('tw-hidden');
    }
}

// Make functions available globally
window.toggleMode = function() {
    document.documentElement.classList.toggle('tw-dark');
    
    // Update localStorage with the current theme
    if (document.documentElement.classList.contains('tw-dark')) {
        localStorage.setItem('color-mode', 'dark');
    } else {
        localStorage.setItem('color-mode', 'light');
    }
    
    updateThemeIcons();
};

window.toggleHeader = function() {
    const collapseBtn = document.getElementById('collapse-btn');
    const collapseHeaderItems = document.getElementById('collapsed-header-items');
    
    if (!collapseBtn || !collapseHeaderItems) return;
    
    if (collapseHeaderItems.classList.contains('max-lg:!tw-opacity-100')) {
        // Close menu
        collapseHeaderItems.classList.remove('max-lg:!tw-opacity-100', 'tw-min-h-[90vh]');
        collapseHeaderItems.style.height = '0vh';
        collapseBtn.classList.remove('bi-x', 'max-lg:tw-fixed');
        collapseBtn.classList.add('bi-list');
        document.body.classList.remove('modal-open');
    } else {
        // Open menu
        collapseHeaderItems.classList.add('max-lg:!tw-opacity-100', 'tw-min-h-[90vh]');
        collapseHeaderItems.style.height = '90vh';
        collapseBtn.classList.remove('bi-list');
        collapseBtn.classList.add('bi-x', 'max-lg:tw-fixed');
        document.body.classList.add('modal-open');
    }
};

window.openVideo = function() {
    const videoBg = document.getElementById('video-container-bg');
    const videoContainer = document.getElementById('video-container');
    
    if (!videoBg || !videoContainer) return;
    
    videoBg.classList.remove('tw-scale-0', 'tw-opacity-0');
    videoBg.classList.add('tw-scale-100', 'tw-opacity-100');
    videoContainer.classList.remove('tw-scale-0');
    videoContainer.classList.add('tw-scale-100');
    document.body.classList.add('modal-open');
};

window.closeVideo = function() {
    const videoBg = document.getElementById('video-container-bg');
    const videoContainer = document.getElementById('video-container');
    
    if (!videoBg || !videoContainer) return;
    
    videoContainer.classList.add('tw-scale-0');
    videoContainer.classList.remove('tw-scale-100');
    
    setTimeout(() => {
        videoBg.classList.remove('tw-scale-100', 'tw-opacity-100');
        videoBg.classList.add('tw-scale-0', 'tw-opacity-0');
    }, 400);
    
    document.body.classList.remove('modal-open');
};