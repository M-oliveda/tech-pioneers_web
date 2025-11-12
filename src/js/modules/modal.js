/**
 * Modal Module
 *
 * Accessible modal system with:
 * - Focus trap
 * - ESC key to close
 * - Click outside to close
 * - Body scroll lock
 * - Pioneer data display
 */

class Modal {
  constructor() {
    this.modalBackdrop = document.getElementById("pioneer-modal");
    this.modal = this.modalBackdrop?.querySelector(".modal");
    this.closeButton = document.getElementById("modal-close");
    this.modalAvatar = document.getElementById("modal-avatar");
    this.modalTitle = document.getElementById("modal-title");
    this.modalSubtitle = document.getElementById("modal-subtitle");
    this.modalContent = document.getElementById("modal-content");

    this.isOpen = false;
    this.focusableElements = [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
    this.previousActiveElement = null;

    // Pioneer data (in real app, this would come from an API or database)
    this.pioneersData = {
      "katherine-johnson": {
        name: "Katherine Johnson",
        role: "NASA Mathematician",
        image: "/assets/images/katherine_johnson.svg",
        bio: "Katherine Johnson was an American mathematician whose calculations of orbital mechanics as a NASA employee were critical to the success of the first and subsequent U.S. crewed spaceflights. Her precise calculations were essential to the success of the Mercury and Apollo missions, including the historic Apollo 11 moon landing.",
        achievements: [
          "Calculated trajectories for Project Mercury and Apollo 11 moon landing",
          "Received Presidential Medal of Freedom in 2015",
          "Subject of the Academy Award-nominated film Hidden Figures (2016)",
          "Pioneer in breaking barriers for African American women in STEM fields",
          "Her work ensured the safe return of astronauts from space",
        ],
        years: "1918 - 2020",
      },
      "claude-shannon": {
        name: "Claude Shannon",
        role: "Mathematician & Electrical Engineer",
        image: "/assets/images/claude_shannon.svg",
        bio: "Claude Shannon was an American mathematician, electrical engineer, and cryptographer known as 'the father of information theory'. His master's thesis demonstrated that electrical applications of Boolean algebra could construct any logical numerical relationship, laying the foundation for digital circuit design.",
        achievements: [
          "Founded information theory and digital circuit design theory",
          "Published landmark paper 'A Mathematical Theory of Communication' (1948)",
          "Developed sampling theorem fundamental to digital communications",
          "Made significant contributions to cryptography during World War II",
          "Pioneered artificial intelligence and computer chess",
        ],
        years: "1916 - 2001",
      },
      "radia-perlman": {
        name: "Radia Perlman",
        role: "Computer Scientist & Network Engineer",
        image: "/assets/images/radia_perlman.svg",
        bio: "Radia Perlman is an American computer scientist and network engineer, often called the 'Mother of the Internet'. She invented the Spanning Tree Protocol (STP), which is fundamental to the operation of network bridges and has made significant contributions to network design and standardization.",
        achievements: [
          "Invented the Spanning Tree Protocol (STP) for network stability",
          "Made fundamental contributions to network routing protocols",
          "Received numerous awards including SIGCOMM Award and Internet Hall of Fame induction",
          "Holds over 100 patents in network technologies",
          "Author of influential textbook 'Interconnections: Bridges, Routers, Switches, and Internetworking Protocols'",
        ],
        years: "1951 - Present",
      },
      "vint-cerf": {
        name: "Vint Cerf",
        role: "Computer Scientist & Internet Pioneer",
        image: "/assets/images/vint_cerf.svg",
        bio: "Vinton Gray Cerf is an American Internet pioneer and is recognized as one of 'the fathers of the Internet'. He co-designed the TCP/IP protocols and the architecture of the Internet with Robert Kahn. His contributions have been fundamental to the development and expansion of the Internet worldwide.",
        achievements: [
          "Co-designed TCP/IP protocols that power the Internet",
          "Received Turing Award (1983) and Presidential Medal of Freedom (2005)",
          "Served as vice president and Chief Internet Evangelist at Google",
          "Founding president of the Internet Society",
          "Continues to advocate for Internet accessibility and open standards",
        ],
        years: "1943 - Present",
      },
      "shafrira-goldwasser": {
        name: "Shafi Goldwasser",
        role: "Computer Scientist & Cryptographer",
        image: "/assets/images/shafrira_goldwasser.svg",
        bio: "Shafi Goldwasser is an Israeli-American computer scientist and winner of the Turing Award in 2012. She is known for her pioneering work in cryptography and computational complexity theory, particularly in the areas of probabilistic encryption, zero-knowledge proofs, and complexity-based cryptography.",
        achievements: [
          "Received Turing Award (2012) for contributions to cryptography",
          "Co-inventor of zero-knowledge proofs",
          "Pioneer in probabilistic encryption and interactive proof systems",
          "Professor at MIT and Weizmann Institute of Science",
          "Founded cryptography companies and mentored numerous computer scientists",
        ],
        years: "1958 - Present",
      },
      "donald-knuth": {
        name: "Donald Knuth",
        role: "Computer Scientist & Mathematician",
        image: "/assets/images/donald_knuth.svg",
        bio: "Donald Ervin Knuth is an American computer scientist and mathematician, often called the 'father of the analysis of algorithms'. He is best known as the author of the multi-volume work 'The Art of Computer Programming', one of the most respected references in computer science. He also created the TeX typesetting system.",
        achievements: [
          "Author of 'The Art of Computer Programming', the seminal work in computer science",
          "Created the TeX typesetting system and METAFONT font design system",
          "Received Turing Award (1974) and numerous other prestigious honors",
          "Pioneered the analysis of algorithm complexity and computational theory",
          "Professor Emeritus at Stanford University",
        ],
        years: "1938 - Present",
      },
    };
  }

  /**
   * Initialize modal
   */
  init() {
    if (!this.modalBackdrop) {
      console.warn("Modal element not found");
      return;
    }

    this.attachEventListeners();
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Close button
    this.closeButton?.addEventListener("click", () => this.close());

    // Click outside to close
    this.modalBackdrop?.addEventListener("click", (e) => {
      if (e.target === this.modalBackdrop) {
        this.close();
      }
    });

    // ESC key to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Attach click listeners to all pioneer cards
    this.attachCardListeners();
  }

  /**
   * Attach click listeners to pioneer cards
   */
  attachCardListeners() {
    const pioneerButtons = document.querySelectorAll(
      ".pioneer-card--clickable .pioneer-card__button"
    );

    pioneerButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const pioneerId = button.getAttribute("data-pioneer-id");
        if (pioneerId) {
          this.open(pioneerId);
        }
      });
    });
  }

  /**
   * Open modal with pioneer data
   */
  open(pioneerId) {
    const pioneerData = this.pioneersData[pioneerId];

    if (!pioneerData) {
      console.warn(`Pioneer data not found for ID: ${pioneerId}`);
      return;
    }

    // Update modal content
    this.updateContent(pioneerData);

    // Store previously focused element
    this.previousActiveElement = document.activeElement;

    // Show modal
    this.modalBackdrop.classList.add("modal-backdrop--active");
    this.modalBackdrop.setAttribute("aria-hidden", "false");

    // Lock body scroll
    document.body.classList.add("modal-open");

    // Set focus trap
    this.setFocusTrap();

    // Focus first element
    setTimeout(() => {
      this.closeButton?.focus();
    }, 500);

    this.isOpen = true;
  }

  /**
   * Close modal
   */
  close() {
    // Hide modal
    this.modalBackdrop.classList.remove("modal-backdrop--active");
    this.modalBackdrop.setAttribute("aria-hidden", "true");

    // Unlock body scroll
    document.body.classList.remove("modal-open");

    // Restore focus
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }

    this.isOpen = false;
  }

  /**
   * Update modal content with pioneer data
   */
  updateContent(data) {
    // Update avatar
    if (this.modalAvatar) {
      this.modalAvatar.src = data.image;
      this.modalAvatar.alt = data.name;
    }

    // Update title and subtitle
    if (this.modalTitle) {
      this.modalTitle.textContent = data.name;
    }
    if (this.modalSubtitle) {
      this.modalSubtitle.textContent = `${data.role} (${data.years})`;
    }

    // Update content
    if (this.modalContent) {
      this.modalContent.innerHTML = `
        <h3 class="modal__section-title">Biography</h3>
        <p class="modal__text">${data.bio}</p>
        
        <h3 class="modal__section-title">Key Achievements</h3>
        <ul class="modal__list">
          ${data.achievements.map((achievement) => `<li class="modal__list-item">${achievement}</li>`).join("")}
        </ul>
      `;
    }
  }

  /**
   * Set up focus trap
   */
  setFocusTrap() {
    // Get all focusable elements
    const focusableSelectors = [
      "button:not([disabled])",
      "a[href]:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ];

    this.focusableElements = this.modal.querySelectorAll(
      focusableSelectors.join(",")
    );

    if (this.focusableElements.length > 0) {
      this.firstFocusableElement = this.focusableElements[0];
      this.lastFocusableElement =
        this.focusableElements[this.focusableElements.length - 1];

      // Trap focus
      this.modal.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === this.firstFocusableElement) {
              e.preventDefault();
              this.lastFocusableElement.focus();
            }
          } else {
            // Tab
            if (document.activeElement === this.lastFocusableElement) {
              e.preventDefault();
              this.firstFocusableElement.focus();
            }
          }
        }
      });
    }
  }
}

// Export modal instance
export default Modal;
