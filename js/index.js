/**
 * Main JavaScript file that coordinates functionality after components are loaded
 */

// Global variables and state
let isNavbarInitialized = false;
let isFaqInitialized = false;
let isHeroInitialized = false;

// Initialize theme mode based on localStorage or system preference
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    // Make theme toggle function available globally
    window.toggleMode = toggleMode;
    
    // Setup video modal functions
    window.openVideo = openVideo;
    window.closeVideo = closeVideo;
    
    // Setup navigation functions
    window.toggleHeader = toggleHeader;
});

/**
 * Initialize theme based on stored preference
 */
function initTheme() {
    if (localStorage.getItem('color-mode') === 'dark' || 
        (!('color-mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('tw-dark');
    } else {
        document.documentElement.classList.remove('tw-dark');
    }
    updateThemeIcons();
}

/**
 * Toggle between light and dark theme
 */
function toggleMode() {
    document.documentElement.classList.toggle('tw-dark');
    
    // Update localStorage with the current theme
    if (document.documentElement.classList.contains('tw-dark')) {
        localStorage.setItem('color-mode', 'dark');
    } else {
        localStorage.setItem('color-mode', 'light');
    }
    
    updateThemeIcons();
}

/**
 * Update theme icons to show correct icon based on current theme
 */
function updateThemeIcons() {
    const lightModeIcon = document.getElementById('light-mode-icon');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    
    if (!lightModeIcon || !darkModeIcon) return;
    
    if (document.documentElement.classList.contains('tw-dark')) {
        lightModeIcon.classList.add('tw-hidden');
        darkModeIcon.classList.remove('tw-hidden');
    } else {
        lightModeIcon.classList.remove('tw-hidden');
        darkModeIcon.classList.add('tw-hidden');
    }
}

/**
 * Toggle header menu for mobile
 */
function toggleHeader() {
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
}

/**
 * Open video modal
 */
function openVideo() {
    const videoBg = document.getElementById('video-container-bg');
    const videoContainer = document.getElementById('video-container');
    
    if (!videoBg || !videoContainer) return;
    
    videoBg.classList.remove('tw-scale-0', 'tw-opacity-0');
    videoBg.classList.add('tw-scale-100', 'tw-opacity-100');
    videoContainer.classList.remove('tw-scale-0');
    videoContainer.classList.add('tw-scale-100');
    document.body.classList.add('modal-open');
}

/**
 * Close video modal
 */
function closeVideo() {
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
}

// Listen for component loaded events
document.addEventListener('componentLoaded', function(e) {
    const { componentName, container } = e.detail;
    
    switch(componentName) {
        case 'navbar':
            if (!isNavbarInitialized) {
                updateThemeIcons();
                isNavbarInitialized = true;
            }
            break;
        case 'faq':
            if (!isFaqInitialized) {
                // FAQ initialization is handled by component-loader.js
                isFaqInitialized = true;
            }
            break;
        case 'hero':
            if (!isHeroInitialized) {
                initializeTyped();
                isHeroInitialized = true;
            }
            break;
    }
});

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
    }
}