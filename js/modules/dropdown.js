/**
 * Dropdown Module
 * This module provides a reusable dropdown component that can be used across the application.
 */

/**
 * Creates a dropdown component
 * @class
 */
export class Dropdown {
    /**
     * Create a new Dropdown
     * @param {string} selector - CSS selector for the dropdown container
     * @param {Function} onChange - Callback function for when a selection is made
     */
    constructor(selector, onChange) {
        this.dropdown = document.querySelector(selector);
        this.toggleButton = this.dropdown.querySelector('.dropdown-toggle');
        this.onChange = onChange;

        this.defaultText = this.toggleButton.querySelector("span").innerText;

        this.menu = this.dropdown.querySelector('.dropdown-menu');
        
        this.selectItem = this.selectItem.bind(this);
        this.toggleButton.addEventListener('click', this.toggleDropdown.bind(this));
        document.addEventListener('click', this.closeDropdown.bind(this));

        this.lists = this.dropdown.querySelectorAll('li');
        this.lists.forEach(e => {
            e.addEventListener("click", () => this.selectItem(e));
        });

        this.value = "";

        this.dropDownInput = this.dropdown.querySelector(".dropdown-input");
    }
  
    /**
     * Toggle dropdown visibility
     */
    toggleDropdown() {
        this.menu.style.display = (this.menu.style.display === 'block') ? 'none' : 'block';
    }

    /**
     * Select an item from the dropdown
     * @param {HTMLElement} ele - The selected dropdown item
     */
    selectItem(ele) {
        const selectedInput = this.toggleButton.querySelector(".dropdown-select-text");
        const selectIcon = this.toggleButton.querySelector(".dropdown-select-icon");

        this.value = ele.querySelector(".dropdown-text").innerText.trim();

        if (selectIcon && ele.querySelector(".dropdown-menu-icon")) {
            selectIcon.style.visibility = "";
            selectIcon.setAttribute("src", ele.querySelector(".dropdown-menu-icon").src);
            selectIcon.setAttribute("alt", ele.innerText);
        } else {
            selectIcon.style.visibility = "hidden";
        }

        selectedInput.innerText = ele.querySelector(".dropdown-text").innerText.trim();
        
        if(this.dropDownInput)
            this.dropDownInput.value = this.value;

        if (this.onChange) {
            this.onChange(this.value);
        }

        this.closeDropdown();
    }

    /**
     * Close the dropdown
     * @param {Event} event - DOM event object
     */
    closeDropdown(event) {
        if (event === undefined || !this.dropdown.contains(event.target)) {
            this.menu.style.display = 'none';
        }
    }
}