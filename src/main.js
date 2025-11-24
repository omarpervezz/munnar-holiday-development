/* ========================================================================
   main.js  
   Global JavaScript for all pages.
   IMPORTANT: Every section auto-detects elements before running,
              so scripts execute ONLY on pages where they exist.
   ======================================================================== */

/* =========================================================================
    MOBILE MENU
   ========================================================================= */
(function () {
  const mobileMenu = document.getElementById("mobileMenu");
  if (!mobileMenu) return;

  const mobileOverlay = document.getElementById("mobileOverlay");
  const openBtn = document.getElementById("openMenuBtn");
  const closeBtn = document.getElementById("closeMenuBtn");
  const body = document.body;

  // Mobile dropdown items
  const mobileTourToggle = document.getElementById("mobileTourToggle");
  const mobileTourMenu = document.getElementById("mobileTourMenu");
  const mobileTourArrow = document.getElementById("mobileTourArrow");

  /* -------------------------------
     Open Mobile Menu
  -------------------------------- */
  function openMobileMenu() {
    mobileMenu.classList.remove("-translate-x-full");

    if (mobileOverlay) {
      mobileOverlay.classList.remove("hidden");
      setTimeout(() => mobileOverlay.classList.remove("opacity-0"), 10);
    }

    body.classList.add("no-scroll");
  }

  /* -------------------------------
     Close Mobile Menu
  -------------------------------- */
  function closeMobileMenu() {
    mobileMenu.classList.add("-translate-x-full");

    if (mobileOverlay) {
      mobileOverlay.classList.add("opacity-0");
      setTimeout(() => mobileOverlay.classList.add("hidden"), 300);
    }

    body.classList.remove("no-scroll");
  }

  /* -------------------------------
     Event Listeners 
  -------------------------------- */
  if (openBtn) openBtn.addEventListener("click", openMobileMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileMenu);

  /* -------------------------------
     Mobile Dropdown Logic
  -------------------------------- */
  if (mobileTourToggle && mobileTourMenu && mobileTourArrow) {
    mobileTourToggle.addEventListener("click", () => {
      mobileTourMenu.classList.toggle("hidden");
      mobileTourArrow.classList.toggle("rotate-180");
    });
  }
})();

/* =========================================================================
   SECTION 1 — TESTIMONIALS SLIDER
   Runs ONLY on pages where elements with IDs starting from 
   #testimonial-text exist.
   ========================================================================= */
const textEl = document.getElementById("testimonial-text");
if (textEl) {
  const testimonials = [
    {
      text: `Booking my trip through Munnar.Holiday was one of the best decisions I’ve ever made...`,
      name: "Aleena Paul",
      location: "Mumbai",
      photo: "../assets/images/package-image-2.jpg",
      bg: "../assets/images/package-image-1.jpg",
    },
    {
      text: `Booking my trip through Munnar.Holiday was one of the best decisions I’ve ever made...`,
      name: "Rohit & Sana",
      location: "Delhi",
      photo: "../assets/images/package-image-2.jpg",
      bg: "../assets/images/package-image-5.jpg",
    },
    {
      text: `Booking my trip through Munnar.Holiday was one of the best decisions I’ve ever made...`,
      name: "Dinesh Kumar",
      location: "Bangalore",
      photo: "../assets/images/package-image-2.jpg",
      bg: "../assets/images/package-image-1.jpg",
    },
  ];

  let index = 0;

  const nameEl = document.getElementById("testimonial-name");
  const locEl = document.getElementById("testimonial-location");
  const photoEl = document.getElementById("testimonial-photo");
  const bgEl = document.getElementById("testimonial-bg");

  function updateTestimonial() {
    const t = testimonials[index];
    textEl.textContent = t.text;
    nameEl.textContent = t.name;
    locEl.textContent = t.location;
    photoEl.src = t.photo;
    bgEl.src = t.bg;

    const card = document.getElementById("testimonial-card");
    card.classList.add("opacity-0");
    setTimeout(() => card.classList.remove("opacity-0"), 150);
  }

  const nextBtn = document.getElementById("testimonial-next");
  const prevBtn = document.getElementById("testimonial-prev");

  if (nextBtn) {
    nextBtn.onclick = () => {
      index = (index + 1) % testimonials.length;
      updateTestimonial();
    };
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      index = (index - 1 + testimonials.length) % testimonials.length;
      updateTestimonial();
    };
  }
}

/* =========================================================================
   SECTION 2 — FAQ ACCORDION  
   Runs ONLY on pages that contain elements with class ".faq-item"
   ========================================================================= */
const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-btn");
    const content = item.querySelector(".faq-content");
    const icon = item.querySelector(".faq-icon");
    const line2 = icon.querySelector(".line-2");

    btn.addEventListener("click", () => {
      faqItems.forEach((other) => {
        if (other !== item) {
          other.querySelector(".faq-content").style.maxHeight = null;
          other.querySelector(".line-2").style.opacity = "1";
        }
      });

      const isOpen = content.style.maxHeight;

      if (isOpen) {
        content.style.maxHeight = null;
        line2.style.opacity = "1";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        line2.style.opacity = "0";
      }
    });
  });
}

/* =========================================================================
   SECTION 3 — HOLIDAY POPUP (Auto show after 2 seconds)
   Works ONLY if #holidayPopup exists on the page.
   ========================================================================= */
const popup = document.getElementById("holidayPopup");

if (popup) {
  const closeBtn = document.getElementById("closePopupBtn");

  function closePopup() {
    popup.classList.add("opacity-0");
    setTimeout(() => {
      popup.classList.add("hidden");
      document.body.classList.remove("no-scroll");
    }, 300);
  }

  if (closeBtn) closeBtn.addEventListener("click", closePopup);

  popup.addEventListener("click", (event) => {
    const box = event.target.closest(".popup-box");
    if (!box) closePopup();
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hidden");
      popup.classList.add("flex");

      setTimeout(() => popup.classList.remove("opacity-0"), 50);

      document.body.classList.add("no-scroll");
    }, 2000);
  });
}

/* =========================================================================
   SECTION 4 — IMAGE GALLERY / CAROUSEL
   Works ONLY on pages that include #mainImage and .thumb elements.
   ========================================================================= */
(function () {
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumb");

  if (!mainImage || thumbnails.length === 0) return;

  // Image list
  const images = [
    "../assets/images/package-details-carousel-main-image.jpg",
    "../assets/images/package-details-carousel-thumbnail-image.jpg",
    "../assets/images/package-details-carousel-thumbnail-image-2.jpg",
    "../assets/images/package-details-carousel-thumbnail-image-3.jpg",
    "../assets/images/package-details-carousel-thumbnail-image-4.jpg",
    "../assets/images/package-details-carousel-thumbnail-image-2.jpg",
    "../assets/images/package-details-carousel-thumbnail-image.jpg",
    "../assets/images/package-details-carousel-thumbnail-image-3.jpg",
  ];

  let currentIndex = 0;

  // Update main image + fade effect
  function showImage(index) {
    currentIndex = index;

    mainImage.classList.remove("fade");
    void mainImage.offsetWidth; // restart animation
    mainImage.src = images[index];
    mainImage.classList.add("fade");

    highlightThumbs();
  }

  // Next / Previous Controls
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  // Highlight active thumbnail
  function highlightThumbs() {
    thumbnails.forEach((thumb, i) => {
      thumb.classList.remove("border-brand");
      thumb.classList.add("border-transparent");

      if (i === currentIndex) {
        thumb.classList.add("border-brand");
        thumb.classList.remove("border-transparent");
      }
    });
  }

  // Initialize default highlight
  highlightThumbs();

  // Expose optional global controls (if your HTML uses onclick="nextImage()")
  window.showImage = showImage;
  window.nextImage = nextImage;
  window.prevImage = prevImage;
})();

/* =========================================================================
   SECTION 5 — SMOOTH SCROLL + ACTIVE TAB HIGHLIGHTING
   Auto-detects if page contains .scroll-section
   ========================================================================= */
(function () {
  const sections = document.querySelectorAll(".scroll-section");
  if (sections.length === 0) return;

  // Smooth scroll (exposed globally for onclick)
  window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    const offset = 120;
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - offset,
      behavior: "smooth",
    });
  };

  // All tabs used on any page
  const tabs = {
    "section-itinerary": document.getElementById("tab-itinerary"),
    "section-included": document.getElementById("tab-included"),
    "section-notincluded": document.getElementById("tab-notincluded"),
  };

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((sec) => {
      const secTop = sec.offsetTop - 350;
      const secHeight = sec.offsetHeight;
      const secBottom = secTop + secHeight;

      if (window.scrollY >= secTop && window.scrollY < secBottom) {
        current = sec.id;
      }
    });

    // Reset all tabs
    Object.values(tabs).forEach((tab) => {
      if (!tab) return;
      tab.classList.remove("text-brand");
      tab.classList.add("text-neutral-700");
      tab.querySelector(".tab-underline")?.classList.add("hidden");
    });

    // Highlight current tab
    if (tabs[current]) {
      const tab = tabs[current];
      tab.classList.add("text-brand");
      tab.classList.remove("text-neutral-700");
      tab.querySelector(".tab-underline")?.classList.remove("hidden");
    }
  });
})();

/* =========================================================================
   SECTION 6 — ACCORDION
   Reusable across any page
   ========================================================================= */
(function () {
  window.toggleAccordion = function (header) {
    if (!header) return;

    const content = header.nextElementSibling;
    const arrow = header.querySelector(".accordion-arrow");

    if (!content || !arrow) return;

    content.classList.toggle("active");
    arrow.classList.toggle("rotate-180");
  };
})();

/* =========================================================================
      HERO SEARCH BOX WITH DROPDOWN SUGGESTIONS
   ========================================================================= */
(function () {
  const input = document.getElementById("heroSearch");
  const dropdown = document.getElementById("searchSuggestions");

  if (!input || !dropdown) return;

  // Suggestion List
  const suggestions = [
    "Visit London's top attractions",
    "Find the best family activities",
    "Explore London itineraries",
    "Join immersive experiences",
    "See the latest exhibitions",
    "Take a day trip from London",
    "Discover Christmas experiences",
    "Find a place to stay in London",
  ];

  /* ----------------------------------------------------------
     Render Suggestion Items
  ---------------------------------------------------------- */
  function renderSuggestions(list) {
    dropdown.innerHTML = "";

    list.forEach((item) => {
      const li = document.createElement("li");
      li.className =
        "px-4 py-2 hover:bg-brand hover:text-white cursor-pointer text-neutral-900 text-sm lg:text-base text-left";

      li.textContent = item;

      li.addEventListener("click", () => {
        input.value = item;
        dropdown.classList.add("hidden");
      });

      dropdown.appendChild(li);
    });

    dropdown.classList.remove("hidden");
  }

  /* ----------------------------------------------------------
     Input Typing Filter
  ---------------------------------------------------------- */
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();

    const filtered = suggestions.filter((item) =>
      item.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      dropdown.classList.add("hidden");
      return;
    }

    renderSuggestions(filtered);
  });

  /* ----------------------------------------------------------
     Show all suggestions on focus (if input empty)
  ---------------------------------------------------------- */
  input.addEventListener("focus", () => {
    if (input.value === "") {
      renderSuggestions(suggestions);
    }
  });

  /* ----------------------------------------------------------
     Hide when clicking outside
  ---------------------------------------------------------- */
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest("#heroSearch") &&
      !e.target.closest("#searchSuggestions")
    ) {
      dropdown.classList.add("hidden");
    }
  });
})();
