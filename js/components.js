/**
 * Main Components Module
 * This file imports and exports all component classes for use throughout the application.
 */

import { Dropdown } from './modules/dropdown.js';
import { Prompt } from './modules/prompt.js';

// Make components available globally
window.Dropdown = Dropdown;
window.Prompt = Prompt;