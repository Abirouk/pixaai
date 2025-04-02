/**
 * FAQ Module
 * This module handles the FAQ accordion functionality.
 */

/**
 * Initialize the FAQ section
 * @param {HTMLElement} container - The FAQ section container
 */
export function initFaq(container) {
    const faqAccordion = container.querySelectorAll('.faq-accordion');

    faqAccordion.forEach(function (btn) {
        btn.addEventListener('click', function () {
            this.classList.toggle('active');

            // Get content and icon elements
            let content = this.nextElementSibling;
            let icon = this.querySelector(".bi-plus");

            // Toggle content visibility
            if (content.style.maxHeight === '240px') {
                // Close accordion
                content.style.maxHeight = '0px';
                content.style.padding = '0px 18px';
                icon.style.transform = "rotate(0deg)";
            } else {
                // Open accordion
                content.style.maxHeight = '240px';
                content.style.padding = '20px 18px';
                icon.style.transform = "rotate(45deg)";
            }
        });
    });
}