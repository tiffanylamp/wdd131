/**
 * TrailsKE - Main JavaScript
 * Author: Tiffany Lalampaa | WDD 131
 * Features: Navigation, Trail filtering/search, Saved trails (localStorage),
 * Trail detail modal, Weather widget, Form validation, Toast notifications
 */

// ===== TRAIL DATA =====
const trails = [
  {
    id: 1,
    name: "Ngong Hills Trail",
    location: "Ngong Hills",
    difficulty: "moderate",
    distance: "18 km",
    duration: "5-7 hrs",
    elevation: "2,460 m",
    description: "A stunning ridge walk with sweeping views of the Great Rift Valley and Nairobi on clear days. Maasai giraffes roam the lower slopes.",
    features: ["wildlife", "views", "ridge-walk"],
    transport: "Matatu 111 from Kencom to Ngong town, then boda boda to trailhead.",
    tips: "Start early (6 AM) to avoid afternoon clouds and heat. Carry 3L of water minimum.",
    suitable: ["hikers", "families", "groups"],
    image: "images/ngong-hills.jpg",
    imageAlt: "Panoramic view from Ngong Hills ridge overlooking the Rift Valley"
  },
  {
    id: 2,
    name: "Karura Forest Loop",
    location: "Karura Forest, Nairobi",
    difficulty: "easy",
    distance: "7 km",
    duration: "2-3 hrs",
    elevation: "1,670 m",
    description: "A peaceful urban forest trail featuring a hidden waterfall and bamboo groves. Perfect for beginners and families with children.",
    features: ["waterfall", "wildlife", "bamboo"],
    transport: "Uber or matatu to UN Avenue gate. Entrance fee: KES 600 adults, KES 300 children.",
    tips: "The waterfall trail is best visited in the rainy season (March–May, October–December). Carry insect repellent.",
    suitable: ["beginners", "families", "solo-hikers"],
    image: "images/karura-forest.jpg",
    imageAlt: "Waterfall in Karura Forest surrounded by lush green trees"
  },
  {
    id: 3,
    name: "Fourteen Falls",
    location: "Thika, Kiambu County",
    difficulty: "easy",
    distance: "4 km",
    duration: "1-2 hrs",
    elevation: "1,260 m",
    description: "Walk through farmland to one of Kenya's most spectacular waterfall systems. The Athi River cascades down 14 tiers of golden rock.",
    features: ["waterfall", "scenic", "photography"],
    transport: "Matatu from Eastleigh or Thika Road to Thika town, then tuk-tuk to the falls (approx. KES 300).",
    tips: "Visit after rains for maximum flow. Wear waterproof shoes — paths get muddy. Photography is spectacular at midday.",
    suitable: ["beginners", "families", "day-trippers"],
    image: "images/fourteen-falls.jpg",
    imageAlt: "Fourteen Falls waterfall system in Thika with water cascading over rocks"
  },
  {
    id: 4,
    name: "Longonot Crater Rim",
    location: "Mt. Longonot, Naivasha",
    difficulty: "hard",
    distance: "14 km",
    duration: "4-6 hrs",
    elevation: "2,776 m",
    description: "A challenging volcanic crater hike with dramatic views into the caldera and across the Rift Valley. Includes steep ascent and rim circumnavigation.",
    features: ["volcano", "crater", "views", "wildlife"],
    transport: "SGR train to Naivasha (KES 500), then matatu or taxi to the park gate (30 min).",
    tips: "This is a strenuous hike. Acclimatise overnight in Naivasha before attempting. Gate opens at 6 AM. Entry fee required.",
    suitable: ["experienced-hikers", "groups"],
    image: "images/longonot.jpg",
    imageAlt: "View into the volcanic crater of Mount Longonot with Rift Valley in background"
  },
  {
    id: 5,
    name: "Aberdare Waterfall Trek",
    location: "Aberdare National Park",
    difficulty: "moderate",
    distance: "12 km",
    duration: "4-5 hrs",
    elevation: "2,900 m",
    description: "Trek through misty moorlands to the magnificent Gura and Karuru waterfalls — among Africa's tallest. Elephant and buffalo sightings are common.",
    features: ["waterfall", "wildlife", "moorland"],
    transport: "Private vehicle or organised tour recommended. Public transport via Nyeri or Mweiga towns.",
    tips: "Mandatory ranger escort required. Dress in warm waterproof layers — the Aberdares are frequently cold and wet even in dry season.",
    suitable: ["hikers", "wildlife-lovers"],
    image: "images/aberdare.jpg",
    imageAlt: "Tall waterfall cascading through Aberdare moorlands with mist rising"
  },
  {
    id: 6,
    name: "Oloolua Nature Trail",
    location: "Karen, Nairobi",
    difficulty: "easy",
    distance: "6 km",
    duration: "1.5-2.5 hrs",
    elevation: "1,760 m",
    description: "A serene forest trail winding through riverine woodland to a small waterfall and gorge. Excellent for birdwatching with over 100 species recorded.",
    features: ["waterfall", "birdwatching", "forest"],
    transport: "Matatu to Karen shopping centre, then short taxi or boda boda. Located off Oloolua Road.",
    tips: "Ideal for solo hikers and early mornings for birdwatching. Carry binoculars. The gorge can be slippery after rain.",
    suitable: ["beginners", "solo-hikers", "families", "birdwatchers"],
    image: "images/oloolua.jpg",
    imageAlt: "Forest path through Oloolua Nature Trail with dappled sunlight"
  }
];

// ===== STATE =====
const state = {
  currentFilter: "all",
  searchQuery: "",
  savedTrails: [],
  activeModal: null
};

// ===== UTILITY FUNCTIONS =====

/**
 * Show a toast notification message
 * @param {string} message - The message to display
 * @param {number} duration - How long to show (ms)
 */
function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), duration);
}

/**
 * Capitalise first letter of a string
 * @param {string} str
 * @returns {string}
 */
function capitalise(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

/**
 * Save to localStorage
 * @param {string} key
 * @param {*} value
 */
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Load from localStorage
 * @param {string} key
 * @returns {*}
 */
function loadFromStorage(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

// ===== NAVIGATION =====

/**
 * Initialise the mobile hamburger menu toggle
 */
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close nav when a link is clicked
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);
    });
  });

  // Mark active page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navMenu.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

// ===== TRAIL RENDERING =====

/**
 * Build the HTML for a single trail card
 * @param {Object} trail - Trail data object
 * @returns {string} HTML string
 */
function buildTrailCard(trail) {
  const isSaved = state.savedTrails.includes(trail.id);
  const badgeClass = `badge-${trail.difficulty}`;
  const tagsHTML = trail.features
    .map(f => `<span class="tag">${capitalise(f.replace(/-/g, " "))}</span>`)
    .join("");

  return `
    <article class="trail-card" data-id="${trail.id}" data-difficulty="${trail.difficulty}">
      <div class="card-img-wrap">
        <img
          src="${trail.image}"
          alt="${trail.imageAlt}"
          loading="lazy"
          onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22400%22%3E%3Crect fill=%22%23c8e6c2%22 width=%22800%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2242%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Georgia,serif%22 font-size=%2248%22%3E%E2%9B%B0%EF%B8%8F%3C/text%3E%3Ctext x=%2250%25%22 y=%2262%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Georgia,serif%22 font-size=%2218%22 fill=%22%234e6b53%22%3E${encodeURIComponent(trail.name)}%3C/text%3E%3C/svg%3E';"
        >
        <span class="card-badge ${badgeClass}">${capitalise(trail.difficulty)}</span>
      </div>
      <div class="card-body">
        <h3>${trail.name}</h3>
        <p>${trail.description}</p>
        <div class="card-meta">
          <span class="meta-item"><span class="meta-icon">📍</span>${trail.location}</span>
          <span class="meta-item"><span class="meta-icon">📏</span>${trail.distance}</span>
          <span class="meta-item"><span class="meta-icon">⏱️</span>${trail.duration}</span>
          <span class="meta-item"><span class="meta-icon">⛰️</span>${trail.elevation}</span>
        </div>
        <div class="card-tags">${tagsHTML}</div>
        <div class="card-actions">
          <button class="btn btn-primary" onclick="openModal(${trail.id})">View Details</button>
          <button
            class="btn btn-outline save-btn"
            data-trail-id="${trail.id}"
            onclick="toggleSaveTrail(${trail.id})"
            aria-label="${isSaved ? "Remove from saved" : "Save trail"}"
          >
            ${isSaved ? "✓ Saved" : "🔖 Save"}
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Filter and render trail cards based on current state
 */
function renderTrails() {
  const grid = document.getElementById("trailsGrid");
  const noResults = document.getElementById("noResults");
  if (!grid) return;

  const query = state.searchQuery.toLowerCase().trim();

  const filtered = trails.filter(trail => {
    const matchesDifficulty =
      state.currentFilter === "all" ||
      state.currentFilter === "waterfall" ? trail.features.includes("waterfall") :
      trail.difficulty === state.currentFilter;

    // Special filter for waterfall
    const matchesFilter =
      state.currentFilter === "all" ? true :
      state.currentFilter === "waterfall" ? trail.features.includes("waterfall") :
      trail.difficulty === state.currentFilter;

    const matchesSearch =
      !query ||
      trail.name.toLowerCase().includes(query) ||
      trail.location.toLowerCase().includes(query) ||
      trail.features.some(f => f.toLowerCase().includes(query)) ||
      trail.difficulty.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (noResults) noResults.style.display = "block";
  } else {
    if (noResults) noResults.style.display = "none";
    grid.innerHTML = filtered.map(t => buildTrailCard(t)).join("");
  }
}

// ===== FILTER & SEARCH =====

/**
 * Initialise filter buttons
 */
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentFilter = btn.dataset.filter;
      renderTrails();
    });
  });
}

/**
 * Initialise trail search input
 */
function initSearch() {
  const searchInput = document.getElementById("trailSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    state.searchQuery = searchInput.value;
    renderTrails();
  });
}

// ===== SAVED TRAILS (localStorage) =====

/**
 * Load saved trails from localStorage and update state
 */
function loadSavedTrails() {
  const saved = loadFromStorage("trailsKE_saved");
  state.savedTrails = saved || [];
  renderSavedTrails();
}

/**
 * Toggle a trail's saved status
 * @param {number} trailId
 */
function toggleSaveTrail(trailId) {
  const index = state.savedTrails.indexOf(trailId);

  if (index === -1) {
    state.savedTrails.push(trailId);
    showToast("✅ Trail saved to your list!");
  } else {
    state.savedTrails.splice(index, 1);
    showToast("Removed from saved trails.");
  }

  saveToStorage("trailsKE_saved", state.savedTrails);
  renderSavedTrails();
  renderTrails(); // refresh button states
}

/**
 * Remove a trail from saved list
 * @param {number} trailId
 */
function removeSavedTrail(trailId) {
  toggleSaveTrail(trailId);
}

/**
 * Render the saved trails list UI
 */
function renderSavedTrails() {
  const savedList = document.getElementById("savedList");
  const savedSection = document.getElementById("savedSection");
  if (!savedList) return;

  if (state.savedTrails.length === 0) {
    savedList.innerHTML = `<p class="empty-saved">No trails saved yet. Click "Save" on any trail to add it here.</p>`;
  } else {
    const savedItems = state.savedTrails.map(id => {
      const trail = trails.find(t => t.id === id);
      if (!trail) return "";
      return `
        <span class="saved-tag">
          ${trail.name}
          <button onclick="removeSavedTrail(${trail.id})" aria-label="Remove ${trail.name} from saved">×</button>
        </span>
      `;
    }).join("");
    savedList.innerHTML = savedItems;
  }
}

// ===== TRAIL DETAIL MODAL =====

/**
 * Open trail detail modal
 * @param {number} trailId
 */
function openModal(trailId) {
  const trail = trails.find(t => t.id === trailId);
  if (!trail) return;

  const overlay = document.getElementById("trailModal");
  const content = document.getElementById("modalContent");
  if (!overlay || !content) return;

  const suitableText = trail.suitable.map(s => capitalise(s.replace(/-/g, " "))).join(", ");
  const isSaved = state.savedTrails.includes(trail.id);

  content.innerHTML = `
    <div class="modal-header">
      <h3>${trail.name}</h3>
      <button class="modal-close" onclick="closeModal()" aria-label="Close modal">✕</button>
    </div>
    <div class="modal-meta">
      <span class="meta-item"><span class="meta-icon">📏</span>${trail.distance}</span>
      <span class="meta-item"><span class="meta-icon">⏱️</span>${trail.duration}</span>
      <span class="meta-item"><span class="meta-icon">⛰️</span>${trail.elevation}</span>
      <span class="card-badge badge-${trail.difficulty} badge-inline">${capitalise(trail.difficulty)}</span>
    </div>
    <p class="modal-detail">${trail.description}</p>
    <h4 class="modal-section-heading">🚌 Getting There</h4>
    <p class="modal-detail">${trail.transport}</p>
    <h4 class="modal-section-heading">💡 Trail Tips</h4>
    <p class="modal-detail">${trail.tips}</p>
    <h4 class="modal-section-heading">👤 Best For</h4>
    <p class="modal-detail">${suitableText}</p>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="toggleSaveTrail(${trail.id}); closeModal();">
        ${isSaved ? "✓ Already Saved" : "🔖 Save This Trail"}
      </button>
      <button class="btn btn-outline" onclick="closeModal()">Close</button>
    </div>
  `;

  overlay.classList.add("open");
  state.activeModal = trailId;
  document.body.style.overflow = "hidden";
}

/**
 * Close the trail detail modal
 */
function closeModal() {
  const overlay = document.getElementById("trailModal");
  if (!overlay) return;
  overlay.classList.remove("open");
  state.activeModal = null;
  document.body.style.overflow = "";
}

/**
 * Initialise modal event listeners
 */
function initModal() {
  const overlay = document.getElementById("trailModal");
  if (!overlay) return;

  // Close on overlay click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.activeModal) closeModal();
  });
}

// ===== WEATHER WIDGET =====

/**
 * Simulate a Nairobi weather condition based on the current month
 * Nairobi has two rainy seasons: March–May (long rains) and Oct–Dec (short rains)
 */
function initWeatherWidget() {
  const widget = document.getElementById("weatherWidget");
  if (!widget) return;

  const month = new Date().getMonth(); // 0–11
  let condition, icon, temp;

  if (month >= 2 && month <= 4) {
    // Long rains (March–May)
    condition = "Long Rains — Waterfalls at peak!";
    icon = "🌧️";
    temp = "19°C";
  } else if (month >= 9 && month <= 11) {
    // Short rains (October–December)
    condition = "Short Rains — Lush & green";
    icon = "🌦️";
    temp = "21°C";
  } else if (month >= 5 && month <= 8) {
    // Cold dry season (June–September)
    condition = "Cool & Dry — Great visibility";
    icon = "☁️";
    temp = "17°C";
  } else {
    // Hot dry (January–February)
    condition = "Warm & Sunny — Ideal conditions";
    icon = "☀️";
    temp = "24°C";
  }

  widget.innerHTML = `
    <h3>🌍 Nairobi Trail Weather</h3>
    <div class="weather-icon">${icon}</div>
    <div class="weather-temp">${temp}</div>
    <p class="weather-desc">${condition}</p>
    <p class="weather-note">Nairobi sits at 1,795 m above sea level. Temperatures vary significantly by elevation on mountain trails.</p>
  `;
}

// ===== CONTACT FORM =====

/**
 * Initialise contact form with validation and localStorage draft saving
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Load saved draft
  const draft = loadFromStorage("trailsKE_contactDraft");
  if (draft) {
    const nameField = form.querySelector("#fullName");
    const emailField = form.querySelector("#email");
    const msgField = form.querySelector("#message");
    if (nameField && draft.name) nameField.value = draft.name;
    if (emailField && draft.email) emailField.value = draft.email;
    if (msgField && draft.message) msgField.value = draft.message;
  }

  // Auto-save draft as user types
  form.addEventListener("input", () => {
    const draft = {
      name: form.querySelector("#fullName")?.value || "",
      email: form.querySelector("#email")?.value || "",
      message: form.querySelector("#message")?.value || ""
    };
    saveToStorage("trailsKE_contactDraft", draft);
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      handleFormSuccess(form);
    }
  });
}

/**
 * Validate form fields
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function validateForm(form) {
  let isValid = true;

  // Clear previous errors
  form.querySelectorAll(".field-error").forEach(el => el.remove());
  form.querySelectorAll(".error").forEach(el => el.classList.remove("error"));

  const nameField = form.querySelector("#fullName");
  const emailField = form.querySelector("#email");
  const messageField = form.querySelector("#message");
  const trailField = form.querySelector("#trailInterest");

  if (!nameField.value.trim()) {
    showFieldError(nameField, "Please enter your full name.");
    isValid = false;
  }

  if (!emailField.value.trim() || !emailField.value.includes("@")) {
    showFieldError(emailField, "Please enter a valid email address.");
    isValid = false;
  }

  if (!trailField.value) {
    showFieldError(trailField, "Please select a trail you are interested in.");
    isValid = false;
  }

  if (!messageField.value.trim() || messageField.value.trim().length < 10) {
    showFieldError(messageField, "Please enter a message of at least 10 characters.");
    isValid = false;
  }

  return isValid;
}

/**
 * Show a field-level error message
 * @param {HTMLElement} field
 * @param {string} message
 */
function showFieldError(field, message) {
  field.classList.add("error");
  const error = document.createElement("p");
  error.className = "field-error";
  error.style.cssText = "color: #c0392b; font-size: 0.85rem; margin-top: 0.25rem;";
  error.textContent = message;
  field.parentElement.appendChild(error);
}

/**
 * Handle successful form submission
 * @param {HTMLFormElement} form
 */
function handleFormSuccess(form) {
  const name = form.querySelector("#fullName").value.trim();

  // Clear the draft
  localStorage.removeItem("trailsKE_contactDraft");

  // Show success message
  const successEl = document.getElementById("formSuccess");
  if (successEl) {
    successEl.innerHTML = `
      <p class="form-success-msg">
        🎉 Thank you, ${name}! Your message has been received. We'll be in touch within 2 business days.
      </p>
    `;
    successEl.scrollIntoView({ behavior: "smooth" });
  }

  showToast(`Thank you, ${name}! Message sent successfully.`);
  form.reset();
}

// ===== PACK TIPS (Home page) =====

/**
 * Render packing tips list on home page
 */
function renderPackTips() {
  const tipsGrid = document.getElementById("tipsGrid");
  if (!tipsGrid) return;

  const tips = [
    { icon: "💧", title: "Water", text: "Carry at least 2–3 litres per person. Nairobi's altitude makes dehydration a real risk, even on cooler days." },
    { icon: "🧴", title: "Sun Protection", text: "High altitude means stronger UV radiation. Use SPF 50+ sunscreen, a hat, and UV-protective clothing." },
    { icon: "🥾", title: "Footwear", text: "Trail shoes or hiking boots with ankle support are essential. Avoid sandals — rocks and roots are common." },
    { icon: "🌧️", title: "Rain Gear", text: "Kenya's weather changes fast. Pack a lightweight waterproof jacket, especially for highland trails like Longonot." },
    { icon: "🩹", title: "First Aid Kit", text: "Carry blister plasters, antiseptic wipes, pain relief, and any personal medications. Know basic first aid." },
    { icon: "📱", title: "Navigation", text: "Download offline maps (Maps.me or Google Maps) before you go. Cellular coverage can be limited on remote trails." },
    { icon: "🍌", title: "Energy Food", text: "Pack high-energy snacks: bananas, nuts, energy bars, and sandwiches. Fuelling up every 1–2 hours is important." },
    { icon: "🦟", title: "Insect Protection", text: "Apply DEET-based repellent for forest trails like Karura and Oloolua. Long sleeves and trousers also help." }
  ];

  tipsGrid.innerHTML = tips.map(tip => `
    <div class="tip-card">
      <span class="tip-icon">${tip.icon}</span>
      <div>
        <h4>${tip.title}</h4>
        <p>${tip.text}</p>
      </div>
    </div>
  `).join("");
}

// ===== FEATURED TRAILS (Home page) =====

/**
 * Render a subset of featured trails on the home page
 */
function renderFeaturedTrails() {
  const grid = document.getElementById("featuredTrailsGrid");
  if (!grid) return;

  const featured = trails.filter(t => [1, 2, 4].includes(t.id));
  grid.innerHTML = featured.map(t => buildTrailCard(t)).join("");
}

// ===== YEAR IN FOOTER =====

/**
 * Update copyright year dynamically
 */
function updateFooterYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ===== INIT =====

/**
 * Main initialisation — runs on DOMContentLoaded
 */
function init() {
  updateFooterYear();
  initNavigation();
  initModal();
  loadSavedTrails();

  // Trails page
  if (document.getElementById("trailsGrid")) {
    renderTrails();
    initFilters();
    initSearch();
  }

  // Home page
  if (document.getElementById("featuredTrailsGrid")) {
    renderFeaturedTrails();
  }

  if (document.getElementById("tipsGrid")) {
    renderPackTips();
  }

  if (document.getElementById("weatherWidget")) {
    initWeatherWidget();
  }

  // Contact page
  if (document.getElementById("contactForm")) {
    initContactForm();
  }
}

document.addEventListener("DOMContentLoaded", init);