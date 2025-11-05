/**
 * TechPioneers - Main JavaScript Entry Point
 *
 * This file initializes all modules and components:
 * - Theme switcher
 * - Navigation (mobile/desktop)
 * - Scroll animations
 * - Other interactive features
 */

// Import modules
import Navigation from "./modules/navigation.js";
import ThemeSwitcher from "./modules/theme-switcher.js";

/**
 * Initialize application
 */
function init() {
  // Initialize theme switcher
  new ThemeSwitcher();

  // Initialize navigation
  new Navigation();

  // Confirm initialization (development only)
  if (import.meta.env.DEV) {
    // Initialization complete
  }
}

/**
 * Run initialization when DOM is ready
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
