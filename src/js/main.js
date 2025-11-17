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
import Modal from "./modules/modal.js";
import Carousel from "./modules/carousel.js";
import AnimationController from "./modules/animations.js";

/**
 * Initialize application
 */
function init() {
  // Initialize theme switcher
  const themeSwitcher = new ThemeSwitcher();
  themeSwitcher.init();

  // Initialize navigation (init is called automatically in constructor)
  new Navigation();

  // Initialize modal
  const modal = new Modal();
  modal.init();

  // Initialize scroll animations
  const animationController = new AnimationController();
  animationController.init();

  // Initialize carousels
  const featuredCarousel = document.querySelector('[data-carousel="featured"]');
  if (featuredCarousel) {
    new Carousel(featuredCarousel, {
      infinite: false,
      autoplay: false,
    });
  }

  const morePioneersCarousel = document.querySelector(
    '[data-carousel="more-pioneers"]'
  );
  if (morePioneersCarousel) {
    new Carousel(morePioneersCarousel, {
      infinite: false,
      autoplay: false,
    });
  }

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
