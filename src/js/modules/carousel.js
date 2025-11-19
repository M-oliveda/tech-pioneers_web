/**
 * Carousel Module
 *
 * A custom vanilla JS carousel implementation with:
 * - Touch/swipe support for mobile
 * - Keyboard navigation (arrow keys)
 * - Previous/Next navigation buttons
 * - Smooth slide transitions
 * - Responsive design (adapts to viewport)
 * - Accessibility support
 */

class Carousel {
  /**
   * Initialize carousel
   * @param {HTMLElement} element - The carousel container element
   * @param {Object} options - Configuration options
   */
  constructor(element, options = {}) {
    this.carousel = element;
    this.viewport = element.querySelector(".carousel__viewport");
    this.track = element.querySelector(".carousel__track");
    this.slides = Array.from(element.querySelectorAll(".carousel__slide"));
    this.prevButton = element.querySelector(".carousel__button--prev");
    this.nextButton = element.querySelector(".carousel__button--next");

    // Configuration options
    this.options = {
      slidesToShow: options.slidesToShow || 1,
      slidesToScroll: options.slidesToScroll || 1,
      infinite: options.infinite !== undefined ? options.infinite : false,
      autoplay: options.autoplay || false,
      autoplaySpeed: options.autoplaySpeed || 3000,
      speed: options.speed || 300,
      ...options,
    };

    // State
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.isDragging = false;
    this.startPos = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.autoplayInterval = null;

    // Responsive breakpoints
    this.breakpoints = {
      mobile: 768,
      tablet: 1024,
      desktop: 1440,
    };

    // Initialize
    if (this.carousel && this.track && this.slides.length > 0) {
      this.init();
    }
  }

  /**
   * Initialize carousel
   */
  init() {
    this.updateSlidesToShow();
    this.setupEventListeners();
    this.updateCarousel();
    this.updateButtons();

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.updateSlidesToShow();
        this.goToSlide(this.currentIndex, false);
        this.updateButtons();
      }, 150);
    });

    // Start autoplay if enabled
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  /**
   * Update slides to show based on viewport width
   */
  updateSlidesToShow() {
    const width = window.innerWidth;
    const carouselType = this.carousel.classList.contains("carousel--featured")
      ? "featured"
      : "more-pioneers";

    if (width >= this.breakpoints.desktop) {
      // Desktop
      this.options.slidesToShow = carouselType === "featured" ? 4 : 3;
    } else if (width >= this.breakpoints.tablet) {
      // Tablet
      this.options.slidesToShow = carouselType === "featured" ? 4 : 2;
    } else if (width >= this.breakpoints.mobile) {
      // Tablet (small)
      this.options.slidesToShow = 2;
    } else {
      // Mobile
      this.options.slidesToShow = 1;
    }

    this.options.slidesToScroll = 1;
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Navigation buttons
    if (this.prevButton) {
      this.prevButton.addEventListener("click", () => this.prev());
    }
    if (this.nextButton) {
      this.nextButton.addEventListener("click", () => this.next());
    }

    // Keyboard navigation
    this.carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        this.next();
      }
    });

    // Touch/Mouse events for dragging
    this.setupTouchEvents();

    // Pause autoplay on hover
    if (this.options.autoplay) {
      this.carousel.addEventListener("mouseenter", () => this.stopAutoplay());
      this.carousel.addEventListener("mouseleave", () => this.startAutoplay());
    }
  }

  /**
   * Setup touch/mouse drag events
   */
  setupTouchEvents() {
    // Touch events
    this.track.addEventListener("touchstart", (e) => this.dragStart(e), {
      passive: true,
    });
    this.track.addEventListener("touchmove", (e) => this.dragMove(e), {
      passive: false,
    });
    this.track.addEventListener("touchend", () => this.dragEnd());

    // Mouse events
    this.track.addEventListener("mousedown", (e) => this.dragStart(e));
    this.track.addEventListener("mousemove", (e) => this.dragMove(e));
    this.track.addEventListener("mouseup", () => this.dragEnd());
    this.track.addEventListener("mouseleave", () => this.dragEnd());

    // Prevent context menu on long press
    this.track.addEventListener("contextmenu", (e) => {
      if (this.isDragging) {
        e.preventDefault();
      }
    });
  }

  /**
   * Drag start handler
   */
  dragStart(e) {
    this.isDragging = true;
    this.startPos = this.getPositionX(e);
    this.track.classList.add("carousel__track--dragging");
    this.carousel.style.cursor = "grabbing";

    // Stop autoplay during drag
    this.stopAutoplay();
  }

  /**
   * Drag move handler
   */
  dragMove(e) {
    if (!this.isDragging) {
      return;
    }

    const currentPosition = this.getPositionX(e);
    const diff = currentPosition - this.startPos;
    this.currentTranslate = this.prevTranslate + diff;

    // Apply transform
    this.track.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  /**
   * Drag end handler
   */
  dragEnd() {
    if (!this.isDragging) {
      return;
    }

    this.isDragging = false;
    this.track.classList.remove("carousel__track--dragging");
    this.carousel.style.cursor = "grab";

    const movedBy = this.currentTranslate - this.prevTranslate;

    // Determine if we should move to next/prev slide
    const threshold = 50; // pixels
    if (movedBy < -threshold && this.currentIndex < this.getMaxIndex()) {
      this.next();
    } else if (movedBy > threshold && this.currentIndex > 0) {
      this.prev();
    } else {
      // Snap back to current position
      this.goToSlide(this.currentIndex);
    }

    // Resume autoplay if enabled
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  /**
   * Get position X from touch or mouse event
   */
  getPositionX(e) {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  }

  /**
   * Go to next slide
   */
  next() {
    const maxIndex = this.getMaxIndex();
    if (this.currentIndex < maxIndex) {
      this.goToSlide(this.currentIndex + this.options.slidesToScroll);
    } else if (this.options.infinite) {
      this.goToSlide(0);
    }
  }

  /**
   * Go to previous slide
   */
  prev() {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - this.options.slidesToScroll);
    } else if (this.options.infinite) {
      this.goToSlide(this.getMaxIndex());
    }
  }

  /**
   * Go to specific slide
   * @param {number} index - Slide index to go to
   * @param {boolean} animate - Whether to animate the transition
   */
  goToSlide(index, animate = true) {
    const maxIndex = this.getMaxIndex();

    // Clamp index
    this.currentIndex = Math.max(0, Math.min(index, maxIndex));

    // Add animating class for enhanced animation
    if (animate) {
      this.track.classList.add("carousel__track--animating");
    }

    // Update carousel
    this.updateCarousel(animate);
    this.updateButtons();

    // Remove animating class after animation completes
    if (animate) {
      setTimeout(() => {
        this.track.classList.remove("carousel__track--animating");
      }, 500);
    }

    // Announce to screen readers
    this.announceSlide();
  }

  /**
   * Update carousel position
   */
  updateCarousel(animate = true) {
    // Get gap value (8px)
    const gap = 8;

    // Batch all DOM reads first to prevent layout thrashing
    const trackStyle = window.getComputedStyle(this.track);
    const trackPaddingLeft = parseFloat(trackStyle.paddingLeft) || 0;
    const trackPaddingRight = parseFloat(trackStyle.paddingRight) || 0;
    const totalPadding = trackPaddingLeft + trackPaddingRight;
    const viewportWidth = this.viewport.offsetWidth;

    // Then perform all calculations
    const availableWidth = viewportWidth - totalPadding;
    const slideWidth = availableWidth / this.options.slidesToShow;
    const offset = -this.currentIndex * (slideWidth + gap);

    // Finally, batch all DOM writes together
    if (!animate) {
      this.track.style.transition = "none";
    }

    this.track.style.transform = `translateX(${offset}px)`;
    this.prevTranslate = offset;
    this.currentTranslate = offset;

    // Use requestAnimationFrame to avoid forced reflow
    if (!animate) {
      requestAnimationFrame(() => {
        this.track.style.transition = "";
      });
    }
  }

  /**
   * Update button states
   */
  updateButtons() {
    const maxIndex = this.getMaxIndex();

    if (this.prevButton) {
      if (this.currentIndex === 0 && !this.options.infinite) {
        this.prevButton.disabled = true;
        this.prevButton.setAttribute("aria-disabled", "true");
      } else {
        this.prevButton.disabled = false;
        this.prevButton.setAttribute("aria-disabled", "false");
      }
    }

    if (this.nextButton) {
      if (this.currentIndex >= maxIndex && !this.options.infinite) {
        this.nextButton.disabled = true;
        this.nextButton.setAttribute("aria-disabled", "true");
      } else {
        this.nextButton.disabled = false;
        this.nextButton.setAttribute("aria-disabled", "false");
      }
    }
  }

  /**
   * Get maximum slide index
   */
  getMaxIndex() {
    return Math.max(0, this.totalSlides - this.options.slidesToShow);
  }

  /**
   * Start autoplay
   */
  startAutoplay() {
    if (!this.options.autoplay) {
      return;
    }

    this.stopAutoplay(); // Clear existing interval
    this.autoplayInterval = setInterval(() => {
      if (this.currentIndex >= this.getMaxIndex()) {
        if (this.options.infinite) {
          this.goToSlide(0);
        } else {
          this.stopAutoplay();
        }
      } else {
        this.next();
      }
    }, this.options.autoplaySpeed);
  }

  /**
   * Stop autoplay
   */
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  /**
   * Announce current slide to screen readers
   */
  announceSlide() {
    const announcement = `Slide ${this.currentIndex + 1} of ${this.totalSlides}`;

    // Create or update live region
    let liveRegion = this.carousel.querySelector(".carousel__live-region");
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.className = "carousel__live-region carousel__sr-only";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      this.carousel.appendChild(liveRegion);
    }

    liveRegion.textContent = announcement;
  }

  /**
   * Destroy carousel (cleanup)
   */
  destroy() {
    this.stopAutoplay();
    // Remove event listeners and reset styles
    this.track.style.transform = "";
    this.carousel.style.cursor = "";
  }
}

// Export the Carousel class
export default Carousel;
