/**
 * Navbar Module
 * This module handles the navbar functionality including collapsible menu and dropdown navigation.
 */

// Constants
const RESPONSIVE_WIDTH = 1024;

// State variables
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH;

/**
 * Initialize the navbar
 * @param {HTMLElement} container - The navbar container
 */
export function initNavbar(container) {
    const collapseBtn = container.querySelector("#collapse-btn");
    const collapseHeaderItems = container.querySelector("#collapsed-header-items");
    const navToggle = container.querySelector("#nav-dropdown-toggle-0");
    const navDropdown = container.querySelector("#nav-dropdown-list-0");

    /**
     * Handle click outside the header to close it
     * @param {Event} e - Click event
     */
    function onHeaderClickOutside(e) {
        if (!collapseHeaderItems.contains(e.target)) {
            toggleHeader();
        }
    }

    /**
     * Toggle header menu visibility
     */
    function toggleHeader() {
        if (isHeaderCollapsed) {
            collapseHeaderItems.classList.add("max-lg:!tw-opacity-100", "tw-min-h-[90vh]");
            collapseHeaderItems.style.height = "90vh";
            collapseBtn.classList.remove("bi-list");
            collapseBtn.classList.add("bi-x", "max-lg:tw-fixed");
            isHeaderCollapsed = false;
            document.body.classList.add("modal-open");
            setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1);
        } else {
            collapseHeaderItems.classList.remove("max-lg:!tw-opacity-100", "tw-min-h-[90vh]");
            collapseHeaderItems.style.height = "0vh";
            collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed");
            collapseBtn.classList.add("bi-list");
            document.body.classList.remove("modal-open");
            isHeaderCollapsed = true;
            window.removeEventListener("click", onHeaderClickOutside);
        }
    }

    /**
     * Handle responsive layout changes
     */
    function responsive() {
        if (!isHeaderCollapsed) {
            toggleHeader();
        }

        if (window.innerWidth > RESPONSIVE_WIDTH) {
            collapseHeaderItems.style.height = "";
            navToggle.addEventListener("mouseenter", openNavDropdown);
            navToggle.addEventListener("mouseleave", navMouseLeave);
        } else {
            isHeaderCollapsed = true;
            navToggle.removeEventListener("mouseenter", openNavDropdown);
            navToggle.removeEventListener("mouseleave", navMouseLeave);
        }
    }

    /**
     * Toggle navigation dropdown menu
     */
    function toggleNavDropdown() {
        if (navDropdown.getAttribute("data-open") === "true") {
            closeNavDropdown();
        } else {
            openNavDropdown();
        }
    }

    /**
     * Handle mouse leave for nav dropdown
     */
    function navMouseLeave() {
        setTimeout(closeNavDropdown, 100);
    }

    /**
     * Open navigation dropdown
     */
    function openNavDropdown() {
        navDropdown.classList.add("tw-opacity-100", "tw-scale-100",
            "max-lg:tw-min-h-[450px]", "max-lg:!tw-h-fit", "tw-min-w-[320px]");
        navDropdown.setAttribute("data-open", true);
    }

    /**
     * Close navigation dropdown
     */
    function closeNavDropdown() {
        if (navDropdown && navDropdown.matches(":hover")) {
            return;
        }

        navDropdown.classList.remove("tw-opacity-100", "tw-scale-100",
            "max-lg:tw-min-h-[450px]", "tw-min-w-[320px]", "max-lg:!tw-h-fit");
        navDropdown.setAttribute("data-open", false);
    }

    // Expose functions to window for event handlers in HTML
    window.toggleHeader = toggleHeader;

    // Bind event listeners
    if (collapseBtn) {
        collapseBtn.addEventListener("click", toggleHeader);
    }
    
    if (navToggle) {
        navToggle.addEventListener("click", toggleNavDropdown);
    }
    
    if (navDropdown) {
        navDropdown.addEventListener("mouseleave", closeNavDropdown);
    }

    // Initialize responsive behavior
    responsive();
    window.addEventListener("resize", responsive);
}

/**
 * Initialize theme toggle functionality
 */
export function initThemeToggle() {
    // Set initial theme based on localStorage or system preference
    if (localStorage.getItem('color-mode') === 'dark' || 
        (!('color-mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('tw-dark');
        updateToggleModeBtn();
    } else {
        document.documentElement.classList.remove('tw-dark');
        updateToggleModeBtn();
    }
}

/**
 * Toggle between light and dark mode
 */
export function toggleMode() {
    document.documentElement.classList.toggle("tw-dark");
    updateToggleModeBtn();
}

/**
 * Update the toggle mode button icon based on the current theme
 */
export function updateToggleModeBtn() {
    const toggleIcon = document.querySelector("#toggle-mode-icon");
    
    if (document.documentElement.classList.contains("tw-dark")) {
        // Dark mode
        toggleIcon.classList.remove("bi-sun");
        toggleIcon.classList.add("bi-moon");
        localStorage.setItem("color-mode", "dark");
    } else {
        // Light mode
        toggleIcon.classList.add("bi-sun");
        toggleIcon.classList.remove("bi-moon");
        localStorage.setItem("color-mode", "light");
    }
}

// Expose theme toggle functions to window for event handlers in HTML
window.toggleMode = toggleMode;