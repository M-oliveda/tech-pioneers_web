/**
 * Animations Module
 *
 * Scroll-triggered animations using Intersection Observer API:
 * - Fade-in effects for elements entering viewport
 * - Slide-in effects (from different directions)
 * - Stagger animations for lists and groups
 * - Respects user's prefers-reduced-motion preference
 * - Performance optimized with Intersection Observer
 */

class AnimationController {
  /**
   * Initialize the AnimationController
   */
  constructor() {
    // Configuration options
    this.options = {
      rootMargin: "0px 0px -100px 0px", // Trigger when 100px before entering viewport
      threshold: 0.1, // Trigger when 10% of element is visible
      staggerDelay: 150, // Delay between staggered animations (ms)
    };

    // Animation classes for different effects
    this.animationClasses = {
      fadeIn: "animate-fade-in",
      slideUp: "animate-slide-up",
      slideDown: "animate-slide-down",
      slideLeft: "animate-slide-left",
      slideRight: "animate-slide-right",
      stagger: "animate-stagger",
    };

    // Check if user prefers reduced motion
    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Track animated elements to prevent re-animation
    this.animatedElements = new Set();

    // Initialize observer
    this.observer = null;
  }

  /**
   * Initialize animations
   */
  init() {
    // Skip if user prefers reduced motion
    if (this.prefersReducedMotion) {
      console.info("Animations disabled: user prefers reduced motion");
      this.showAllElements();
      return;
    }

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this.options
    );

    // Find and observe all animatable elements
    this.setupAnimatableElements();

    // Listen for reduced motion preference changes
    this.watchReducedMotionPreference();
  }

  /**
   * Setup animatable elements with data attributes
   */
  setupAnimatableElements() {
    // Define selectors for elements to animate
    const animatableSelectors = [
      "[data-animate]", // Elements with explicit animation data attribute
      ".hero__content", // Hero section content
      ".section__title", // Section titles
      ".pioneer-card--featured", // Only featured pioneer cards (non-clickable)
      ".timeline__item", // Timeline items
      ".resource-item", // Resource items
    ];

    // Find all elements and set up animations
    animatableSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => this.setupElement(element));
    });
  }

  /**
   * Setup individual element for animation
   * @param {HTMLElement} element - Element to setup
   */
  setupElement(element) {
    // Skip if already setup
    if (element.hasAttribute("data-animation-setup")) {
      return;
    }

    // Skip interactive elements that shouldn't be hidden initially
    if (this.shouldSkipElement(element)) {
      element.setAttribute("data-animation-setup", "true");
      return;
    }

    // Get animation type from data attribute or infer from element
    const animationType = this.getAnimationType(element);
    const isStaggered = this.isStaggeredElement(element);

    // Add initial state classes
    element.classList.add("animate-hidden");

    if (isStaggered) {
      // Handle staggered animations for groups
      this.setupStaggeredGroup(element);
    } else {
      // Store animation type for later use
      element.dataset.animationType = animationType;

      // Observe the element
      this.observer.observe(element);
    }

    // Mark as setup
    element.setAttribute("data-animation-setup", "true");
  }

  /**
   * Check if element should be skipped for animation setup
   * @param {HTMLElement} element - Element to check
   * @returns {boolean} Whether element should be skipped
   */
  shouldSkipElement(element) {
    // Skip clickable pioneer cards - they need to remain interactive
    if (element.classList.contains("pioneer-card--clickable")) {
      return true;
    }

    // Skip elements that contain clickable buttons
    if (
      element.querySelector("button") ||
      element.querySelector("[role='button']")
    ) {
      return true;
    }

    // Skip modal - it has its own animation system
    if (element.classList.contains("modal")) {
      return true;
    }

    // Skip header and navigation elements
    if (element.closest(".header") || element.classList.contains("header")) {
      return true;
    }

    return false;
  }

  /**
   * Setup staggered animations for groups (like carousel items, timeline items)
   * @param {HTMLElement} container - Container element
   */
  setupStaggeredGroup(container) {
    const items = this.getStaggeredItems(container);

    if (items.length === 0) {
      return;
    }

    // Add stagger class to items
    items.forEach((item, index) => {
      item.classList.add("animate-hidden");
      item.dataset.animationType = "stagger";
      item.dataset.staggerIndex = index;
    });

    // Observe the container instead of individual items
    container.dataset.animationType = "stagger-container";
    this.observer.observe(container);
  }

  /**
   * Get animation type for an element
   * @param {HTMLElement} element - Element to check
   * @returns {string} Animation type
   */
  getAnimationType(element) {
    // Check for explicit data attribute
    const dataAnimate = element.getAttribute("data-animate");
    if (dataAnimate && this.animationClasses[dataAnimate]) {
      return dataAnimate;
    }

    // Infer animation type from element characteristics
    if (element.classList.contains("hero__content")) {
      return "fadeIn";
    }

    if (element.classList.contains("section__title")) {
      return "slideUp";
    }

    if (element.classList.contains("pioneer-card")) {
      return "slideUp";
    }

    if (element.classList.contains("timeline__item")) {
      return "slideLeft";
    }

    if (element.classList.contains("resource-item")) {
      return "slideUp";
    }

    if (element.classList.contains("modal")) {
      return "fadeIn";
    }

    // Default animation
    return "fadeIn";
  }

  /**
   * Check if element should use staggered animations
   * @param {HTMLElement} element - Element to check
   * @returns {boolean} Whether element should be staggered
   */
  isStaggeredElement(element) {
    // Check for explicit stagger attribute
    if (element.hasAttribute("data-stagger")) {
      return true;
    }

    // Check for containers that should use staggered animations
    const staggerSelectors = [
      ".carousel__track", // Carousel items
      ".timeline", // Timeline items
      ".resources__grid", // Resource items
    ];

    return staggerSelectors.some(
      (selector) => element.matches(selector) || element.querySelector(selector)
    );
  }

  /**
   * Get items for staggered animation
   * @param {HTMLElement} container - Container element
   * @returns {HTMLElement[]} Array of items to stagger
   */
  getStaggeredItems(container) {
    // Define selectors for staggered items based on container
    let itemSelector = "";

    if (
      container.classList.contains("carousel__track") ||
      container.querySelector(".carousel__track")
    ) {
      itemSelector = ".pioneer-card";
    } else if (
      container.classList.contains("timeline") ||
      container.querySelector(".timeline")
    ) {
      itemSelector = ".timeline__item";
    } else if (
      container.classList.contains("resources__grid") ||
      container.querySelector(".resources__grid")
    ) {
      itemSelector = ".resource-item";
    } else {
      // Generic fallback
      itemSelector =
        "[data-stagger-item], .pioneer-card, .timeline__item, .resource-item";
    }

    return Array.from(container.querySelectorAll(itemSelector));
  }

  /**
   * Handle intersection observer entries
   * @param {IntersectionObserverEntry[]} entries - Observer entries
   */
  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
        this.animateElement(entry.target);
        this.animatedElements.add(entry.target);

        // Stop observing animated elements to improve performance
        this.observer.unobserve(entry.target);
      }
    });
  }

  /**
   * Animate an element based on its animation type
   * @param {HTMLElement} element - Element to animate
   */
  animateElement(element) {
    const animationType = element.dataset.animationType;

    if (animationType === "stagger-container") {
      this.animateStaggeredGroup(element);
    } else {
      this.animateSingleElement(element, animationType);
    }
  }

  /**
   * Animate a single element
   * @param {HTMLElement} element - Element to animate
   * @param {string} animationType - Type of animation
   */
  animateSingleElement(element, animationType) {
    // Remove hidden state
    element.classList.remove("animate-hidden");

    // Add animation class
    const animationClass =
      this.animationClasses[animationType] || this.animationClasses.fadeIn;
    element.classList.add(animationClass);

    // Clean up after animation completes
    setTimeout(() => {
      element.classList.remove(animationClass);
      element.classList.add("animate-visible");
    }, 1000); // Animation duration + buffer
  }

  /**
   * Animate staggered group
   * @param {HTMLElement} container - Container element
   */
  animateStaggeredGroup(container) {
    const items = this.getStaggeredItems(container);

    items.forEach((item, index) => {
      setTimeout(() => {
        if (!this.animatedElements.has(item)) {
          item.classList.remove("animate-hidden");
          item.classList.add(this.animationClasses.slideUp);
          this.animatedElements.add(item);

          // Clean up after animation
          setTimeout(() => {
            item.classList.remove(this.animationClasses.slideUp);
            item.classList.add("animate-visible");
          }, 1000);
        }
      }, index * this.options.staggerDelay);
    });
  }

  /**
   * Show all elements immediately (for reduced motion)
   */
  showAllElements() {
    const hiddenElements = document.querySelectorAll(".animate-hidden");
    hiddenElements.forEach((element) => {
      element.classList.remove("animate-hidden");
      element.classList.add("animate-visible");
    });

    // Ensure all potentially animated elements are visible
    const animatableSelectors = [
      "[data-animate]",
      ".hero__content",
      ".section__title",
      ".pioneer-card--featured",
      ".timeline__item",
      ".resource-item",
    ];

    animatableSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (!element.classList.contains("animate-visible")) {
          element.classList.add("animate-visible");
        }
      });
    });
  }

  /**
   * Watch for changes in reduced motion preference
   */
  watchReducedMotionPreference() {
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e) => {
      this.prefersReducedMotion = e.matches;

      if (this.prefersReducedMotion) {
        // Disable animations and show all elements
        this.destroy();
        this.showAllElements();
      } else {
        // Re-enable animations
        this.init();
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    }
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }
  }

  /**
   * Animate element on demand (for modals, etc.)
   * @param {HTMLElement} element - Element to animate
   * @param {string} animationType - Animation type
   */
  animateOnDemand(element, animationType = "fadeIn") {
    if (this.prefersReducedMotion) {
      return;
    }

    const animationClass =
      this.animationClasses[animationType] || this.animationClasses.fadeIn;

    element.classList.add(animationClass);

    setTimeout(() => {
      element.classList.remove(animationClass);
    }, 1000);
  }

  /**
   * Destroy the animation controller
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.animatedElements.clear();
  }
}

// Export the AnimationController class
export default AnimationController;
