/**
 * Animations Module
 * This module handles all GSAP animations throughout the site.
 */

/**
 * Initialize animations throughout the site
 */
export function initAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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