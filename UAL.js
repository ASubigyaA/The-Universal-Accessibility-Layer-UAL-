/**
 * =================================================================
 * Universal Accessibility Layer (UAL) - Proof of Concept
 * =================================================================
 * This script simulates the core functionality of the UAL.
 * It modifies the current webpage based on a user's profile.
 */

(function() {

    // 1. DEFINE THE USER'S ACCESSIBILITY PROFILE
    // In a real application, this would be securely loaded for the user.
    const userProfile = {
        hasLowVision: true,
        hasDyslexia: true,
        needsSimplifiedLayout: true,
        // Other potential options:
        // isColorblind: 'protanopia',
        // needsScreenReaderHints: true,
    };

    /**
     * Injects CSS styles into the document's head.
     * @param {string} styles - The CSS rules to inject.
     * @param {string} id - An ID for the style element to prevent duplicates.
     */
    function injectStyles(styles, id) {
        if (document.getElementById(id)) {
            return; // Style already injected
        }
        const styleSheet = document.createElement("style");
        styleSheet.id = id;
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    /**
     * Applies a high-contrast, dark-mode theme.
     */
    function applyHighContrast() {
        const css = `
            body, body * {
                background-color: #121212 !important;
                color: #E0E0E0 !important;
                border-color: #555 !important;
            }
            a {
                color: #BB86FC !important;
            }
            img, video, iframe {
                filter: grayscale(50%) brightness(80%);
            }
        `;
        injectStyles(css, 'ual-high-contrast');
        console.log("UAL: High Contrast Mode Applied.");
    }

    /**
     * Injects the OpenDyslexic font and applies it to the page.
     */
    function applyDyslexiaFriendlyFont() {
        // Inject the Google Font stylesheet for OpenDyslexic
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Open+Dyslexic&display=swap';
        fontLink.rel = 'stylesheet';
        fontLink.id = 'ual-dyslexic-font-link';
        if (!document.getElementById(fontLink.id)) {
            document.head.appendChild(fontLink);
        }

        const css = `
            body, p, h1, h2, h3, li, a, span {
                font-family: 'Open Dyslexic', sans-serif !important;
            }
        `;
        injectStyles(css, 'ual-dyslexic-font-style');
        console.log("UAL: Dyslexia-Friendly Font Applied.");
    }

    /**
     * Simplifies the page layout into a single, readable column.
     * This is a heuristic and may not work perfectly on all sites.
     */
    function simplifyLayout() {
        const body = document.body;
        let mainContent = document.querySelector('main') || document.querySelector('article') || document.querySelector('#content') || document.querySelector('.post');

        if (mainContent) {
            // Create a clean container for the content
            const readerView = document.createElement('div');
            readerView.id = 'ual-reader-view';
            readerView.appendChild(mainContent.cloneNode(true));

            // Replace the entire page body with our clean view
            body.innerHTML = '';
            body.appendChild(readerView);

            const css = `
                #ual-reader-view {
                    max-width: 800px;
                    margin: 2rem auto;
                    padding: 2rem;
                    line-height: 1.8;
                    font-size: 1.2rem;
                }
                body {
                    background-color: #f5f5f5 !important;
                }
            `;
            injectStyles(css, 'ual-reader-mode');
        } else {
            console.warn("UAL: Could not identify main content for Reader Mode.");
            return; // Exit if no main content found
        }
        console.log("UAL: Simplified Layout (Reader Mode) Applied.");
    }


    /**
     * The main function that orchestrates the accessibility changes.
     */
    function applyUAL() {
        console.clear();
        console.log("Applying Universal Accessibility Layer...");
        console.log("User Profile:", userProfile);

        if (userProfile.needsSimplifiedLayout) {
             // Reader mode is drastic, so we apply it first and stop.
             // A more advanced version would integrate the other styles.
            simplifyLayout();
            // We'll re-apply contrast and font in the simplified view
            if (userProfile.hasLowVision) applyHighContrast();
            if (userProfile.hasDyslexia) applyDyslexiaFriendlyFont();
            return;
        }

        if (userProfile.hasLowVision) {
            applyHighContrast();
        }

        if (userProfile.hasDyslexia) {
            applyDyslexiaFriendlyFont();
        }

        console.log("UAL application complete.");
    }

    // --- EXECUTE THE UAL ---
    applyUAL();

})();
