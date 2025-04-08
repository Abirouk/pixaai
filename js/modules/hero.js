/**
 * Hero Section Module
 * This module initializes the hero section functionality including animations,
 * typed.js, and video modal.
 */

import { Dropdown } from './dropdown.js';
import { Prompt } from './prompt.js';

// Constants
const RESPONSIVE_WIDTH = 1024;
const MAX_PROMPTS = 3;

/**
 * Initialize the hero section
 * @param {HTMLElement} container - The hero section container
 */
export function initHero(container) {
    const videoBg = container.querySelector("#video-container-bg");
    const videoContainer = container.querySelector("#video-container");
    const promptSample = container.querySelector('#prompts-sample');

    // Initialize typed.js
    if (promptSample) {
        new Typed(promptSample, {
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

    // Initialize prompt window and form
    const promptWindow = new Prompt("#Tobeez-playground");
    const promptForm = container.querySelector("#prompt-form");
    
    if (promptForm) {
        const promptInput = promptForm.querySelector("input[name='prompt']");
        
        promptForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (promptWindow.promptList.length >= MAX_PROMPTS) {
                return false;
            }

            promptWindow.addPrompt(promptInput.value);
            promptInput.value = "";
            
            if (promptWindow.promptList.length >= MAX_PROMPTS) {
                // Prompt signup after 3 prompts
                const signUpPrompt = container.querySelector("#signup-prompt");
                signUpPrompt.classList.add("tw-scale-100");
                signUpPrompt.classList.remove("tw-scale-0");

                promptForm.querySelectorAll("input").forEach(e => {e.disabled = true});
            }

            return false;
        });
    }

    // Initialize dropdown selectors
    const dropdowns = container.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => new Dropdown(`#${dropdown.id}`, promptWindow.setAIModel));

    // Initialize GSAP animations
    initHeroAnimations();

    // Initialize video modal functions
    initVideoModal(videoBg, videoContainer);
}

/**
 * Initialize Hero section animations with GSAP
 */
function initHeroAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Set initial state for reveal animations
    gsap.to(".reveal-up", {
        opacity: 0,
        y: "100%",
    });

    // Dashboard animation
    gsap.to("#dashboard", {
        scale: 1,
        translateY: 0,
        rotateX: "0deg",
        scrollTrigger: {
            trigger: "#hero-section",
            start: window.innerWidth > RESPONSIVE_WIDTH ? "top 95%" : "top 70%",
            end: "bottom bottom",
            scrub: 1,
        }
    });
}

/**
 * Initialize video modal functionality
 * @param {HTMLElement} videoBg - The video background overlay element
 * @param {HTMLElement} videoContainer - The video container element
 */
function initVideoModal(videoBg, videoContainer) {
    /**
     * Open the video modal
     */
    window.openVideo = function() {
        videoBg.classList.remove("tw-scale-0", "tw-opacity-0");
        videoBg.classList.add("tw-scale-100", "tw-opacity-100");
        videoContainer.classList.remove("tw-scale-0");
        videoContainer.classList.add("tw-scale-100");
        document.body.classList.add("modal-open");
    };

    /**
     * Close the video modal
     */
    window.closeVideo = function() {
        videoContainer.classList.add("tw-scale-0");
        videoContainer.classList.remove("tw-scale-100");

        setTimeout(() => {
            videoBg.classList.remove("tw-scale-100", "tw-opacity-100");
            videoBg.classList.add("tw-scale-0", "tw-opacity-0");
        }, 400);
       
        document.body.classList.remove("modal-open");
    };
}