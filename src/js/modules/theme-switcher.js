/**
 * Theme Switcher Module
 *
 * Handles theme switching functionality:
 * - Toggle between light and dark themes
 * - Save user preference to localStorage
 * - Load saved preference on page load
 * - Respect system color scheme preference
 * - Smooth theme transitions
 */

class ThemeSwitcher {
  /**
   * Initialize the ThemeSwitcher component
   */
  constructor() {
    this.themeButton = document.querySelector(".theme-switcher");
    this.html = document.documentElement;
    this.storageKey = "techpioneers-theme";

    // Theme values
    this.themes = {
      LIGHT: "light",
      DARK: "dark",
    };

    // Initialize if button exists
    if (this.themeButton) {
      this.init();
    }
  }

  /**
   * Initialize theme switcher
   */
  init() {
    // Load saved theme or detect system preference
    const savedTheme = this.loadPreference();
    const systemTheme = this.getSystemPreference();
    const initialTheme = savedTheme || systemTheme;

    // Set initial theme
    this.setTheme(initialTheme);

    // Add click event listener
    this.themeButton.addEventListener("click", () => this.toggle());

    // Listen for system theme changes
    this.watchSystemPreference();
  }

  /**
   * Toggle theme between light and dark
   */
  toggle() {
    const currentTheme = this.getCurrentTheme();
    const newTheme =
      currentTheme === this.themes.LIGHT ? this.themes.DARK : this.themes.LIGHT;

    this.setTheme(newTheme);
    this.animateIcon();
  }

  /**
   * Set theme
   * @param {string} theme - Theme to set ('light' or 'dark')
   */
  setTheme(theme) {
    // Validate theme
    if (!Object.values(this.themes).includes(theme)) {
      theme = this.themes.LIGHT;
    }

    // Update HTML data attribute
    this.html.setAttribute("data-theme", theme);

    // Update button aria-label
    const label =
      theme === this.themes.DARK
        ? "Switch to light theme"
        : "Switch to dark theme";
    this.themeButton.setAttribute("aria-label", label);

    // Save preference
    this.savePreference(theme);
  }

  /**
   * Get current theme
   * @returns {string} Current theme ('light' or 'dark')
   */
  getCurrentTheme() {
    return this.html.getAttribute("data-theme") || this.themes.LIGHT;
  }

  /**
   * Save theme preference to localStorage
   * @param {string} theme - Theme to save
   */
  savePreference(theme) {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (error) {
      console.warn("Failed to save theme preference:", error);
    }
  }

  /**
   * Load theme preference from localStorage
   * @returns {string|null} Saved theme or null
   */
  loadPreference() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (error) {
      console.warn("Failed to load theme preference:", error);
      return null;
    }
  }

  /**
   * Get system color scheme preference
   * @returns {string} System preference ('light' or 'dark')
   */
  getSystemPreference() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return this.themes.DARK;
    }
    return this.themes.LIGHT;
  }

  /**
   * Watch for system color scheme changes
   */
  watchSystemPreference() {
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", (e) => {
        // Only update if user hasn't set a preference
        if (!this.loadPreference()) {
          const newTheme = e.matches ? this.themes.DARK : this.themes.LIGHT;
          this.setTheme(newTheme);
        }
      });
    }
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener((e) => {
        if (!this.loadPreference()) {
          const newTheme = e.matches ? this.themes.DARK : this.themes.LIGHT;
          this.setTheme(newTheme);
        }
      });
    }
  }

  /**
   * Animate theme switcher icon
   */
  animateIcon() {
    const icons = this.themeButton.querySelectorAll(".theme-switcher__icon");

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return; // Skip animation
    }

    // Add animation class
    icons.forEach((icon) => {
      icon.classList.add("theme-switcher__icon--animating");
    });

    // Remove animation class after animation completes
    setTimeout(() => {
      icons.forEach((icon) => {
        icon.classList.remove("theme-switcher__icon--animating");
      });
    }, 250); // Match animation duration
  }
}

// Export the ThemeSwitcher class
export default ThemeSwitcher;
