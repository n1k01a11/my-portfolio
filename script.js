
/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });

    // Close the menu if the screen becomes desktop-sized.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        }
    });
}

/* =========================================
   AUTOMATIC FOOTER YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const revealElements = document.querySelectorAll(
    ".about-card, .skill-card, .project-card, " +
    ".quiz-card, .contact-card, " +
    "#skills .eyebrow, #skills .section-title, " +
    "#skills .section-intro, " +
    "#quiz-results .eyebrow, #quiz-results .section-title, " +
    "#quiz-results .section-intro"
);

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -25px 0px"
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
}

/* =========================================
   TYPING ANIMATION
========================================= */

const typingText = document.getElementById("typing-text");

if (typingText) {
    const roles = [
        "Information Technology Student",
        "Aspiring Web Developer",
        "Aspiring Mobile App Developer"
    ];

    if (prefersReducedMotion) {
        typingText.textContent = roles[0];
    } else {
        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeRole() {
            const currentRole = roles[roleIndex];

            if (deleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingText.textContent = currentRole.slice(0, charIndex);

            let delay = deleting ? 40 : 75;

            if (!deleting && charIndex === currentRole.length) {
                deleting = true;
                delay = 1500;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 300;
            }

            window.setTimeout(typeRole, delay);
        }

        typeRole();
    }
}
