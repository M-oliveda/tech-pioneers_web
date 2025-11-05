/**
 * Navigation Module
 *
 * Handles mobile navigation functionality:
 * - Toggle mobile menu
 * - Close menu on link click
 * - Close menu on outside click
 * - Prevent body scroll when menu is open
 * - Smooth scroll to sections
 * - Active section highlighting
 */

class Navigation {
  /**
   * Initialize the Navigation component
   */
  constructor() {
    this.menuToggle = document.querySelector(".header__menu-toggle");
    this.mobileNav = document.querySelector(".header__mobile-nav");
    this.header = document.querySelector(".header");
    this.body = document.body;
    this.isOpen = false;

    // Get all navigation links (both mobile and desktop)
    this.mobileNavLinks = document.querySelectorAll(".header__mobile-nav-link");
    this.desktopNavLinks = document.querySelectorAll(".header__nav-link");
    this.allNavLinks = [
      ...Array.from(this.mobileNavLinks),
      ...Array.from(this.desktopNavLinks),
    ];

    // Initialize if elements exist
    if (this.menuToggle && this.mobileNav) {
      this.init();
    }
  }

  /**
   * Initialize event listeners
   */
  init() {
    // Mobile menu toggle
    this.menuToggle.addEventListener("click", () => this.toggle());

    // Close mobile menu when clicking on a link
    this.mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.close();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.isOpen &&
        !this.mobileNav.contains(e.target) &&
        !this.menuToggle.contains(e.target)
      ) {
        this.close();
      }
    });

    // Handle escape key to close menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Smooth scroll for all navigation links
    this.setupSmoothScroll();

    // Highlight active section on scroll
    this.setupScrollSpy();
  }

  /**
   * Toggle mobile menu open/closed
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open mobile menu
   */
  open() {
    this.isOpen = true;
    this.mobileNav.classList.add("header__mobile-nav--open");
    this.mobileNav.style.display = "block";
    this.menuToggle.setAttribute("aria-expanded", "true");
    this.header.style.border = "none";

    // Prevent body scroll
    this.body.style.overflow = "hidden";
  }

  /**
   * Close mobile menu
   */
  close() {
    this.isOpen = false;
    this.mobileNav.classList.remove("header__mobile-nav--open");
    this.menuToggle.setAttribute("aria-expanded", "false");
    this.header.style.border = "1px solid var(--color-border)";

    // Re-enable body scroll
    this.body.style.overflow = "";

    // Hide after transition
    setTimeout(() => {
      if (!this.isOpen) {
        this.mobileNav.style.display = "none";
      }
    }, 250); // Match transition duration
  }

  /**
   * Setup smooth scrolling for navigation links
   */
  setupSmoothScroll() {
    this.allNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Only handle hash links
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) {
          return;
        }

        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Get header height for offset
          const header = document.querySelector(".header");
          const headerHeight = header ? header.offsetHeight : 0;

          // Calculate scroll position
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          // Smooth scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Update URL hash without scrolling
          history.pushState(null, null, href);

          // Close mobile menu if open
          if (this.isOpen) {
            this.close();
          }
        }
      });
    });
  }

  /**
   * Setup scroll spy to highlight active section
   */
  setupScrollSpy() {
    // Get all sections
    const sections = [];
    this.allNavLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const targetId = href.substring(1);
        const section = document.getElementById(targetId);
        if (section) {
          sections.push({
            id: targetId,
            element: section,
          });
        }
      }
    });

    // Update active link on scroll
    let ticking = false;

    const updateActiveLink = () => {
      const scrollPosition = window.pageYOffset + 100; // Offset for better UX

      // Find the current section
      let currentSection = null;
      sections.forEach((section) => {
        const sectionTop = section.element.offsetTop;
        const sectionBottom = sectionTop + section.element.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.id;
        }
      });

      // Update active class on all navigation links
      this.allNavLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${currentSection}`) {
          link.classList.add(
            link.classList.contains("header__nav-link")
              ? "header__nav-link--active"
              : "header__mobile-nav-link--active"
          );
        } else {
          link.classList.remove(
            "header__nav-link--active",
            "header__mobile-nav-link--active"
          );
        }
      });

      ticking = false;
    };

    // Throttle scroll event using requestAnimationFrame
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveLink();
        });
        ticking = true;
      }
    });

    // Initial update
    updateActiveLink();
  }
}

// Export the Navigation class
export default Navigation;
