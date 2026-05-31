/**
 * js/membership.js
 * Premium membership page — plan cards, billing toggle, dynamic panel.
 */

let planesData = [];
let billingCycle = "monthly"; // "monthly" | "yearly"

/* Inline plan data (avoids CORS issues on file:// protocol) */
const MEMBERSHIP_PLANS = [
  {
    id: 1, nombre: "Standar", monthlyPrice: 9, annualDiscount: 0.16,
    descripcion: "Everything you need to get started with smart automation.",
    accentColor: "#4ade80", icono: "⚡",
    benefits: ["1 active automation","Basic support","Essential catalog access","Simple tracking","Ideal for getting started"],
    automatizacionesMax: 4, seleccionesMax: 2, solicitudesMax: 1, soporte: "Community"
  },
  {
    id: 2, nombre: "Premium", monthlyPrice: 19, annualDiscount: 0.12,
    descripcion: "Advanced tools for growing teams that need more control.",
    accentColor: "#818cf8", icono: "🚀", popular: true,
    benefits: ["2 active automations","Priority support","Advanced automations access","Basic analytics & reports","Minor adjustments included"],
    automatizacionesMax: 8, seleccionesMax: 5, solicitudesMax: 3, soporte: "Email (48h)"
  },
  {
    id: 3, nombre: "VIP", monthlyPrice: 39, annualDiscount: 0.10,
    descripcion: "A fully personalized concierge experience for your business.",
    accentColor: "#fbbf24", icono: "👑",
    benefits: ["4 active automations","Fully personalized experience","Extended premium support","Special integrations","Continuous optimization","Concierge-level service"],
    automatizacionesMax: 999, seleccionesMax: 999, solicitudesMax: 999, soporte: "Priority 24/7"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  cargarMembership();
});

async function cargarMembership() {
  try {
    const res = await fetch("data/planes.json");
    if (res.ok) {
      planesData = await res.json();
    } else {
      planesData = MEMBERSHIP_PLANS;
    }
  } catch (err) {
    // Fallback to inline data (file:// protocol or network error)
    planesData = MEMBERSHIP_PLANS;
  }
  renderizarPlanes();
  inicializarBillingToggle();
  renderizarPanelInferior();
}

/* ── Billing Toggle ────────────────────────── */

function inicializarBillingToggle() {
  const toggle = document.getElementById("billing-switch");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    billingCycle = billingCycle === "monthly" ? "yearly" : "monthly";
    toggle.classList.toggle("yearly", billingCycle === "yearly");
    document.getElementById("billing-monthly").classList.toggle("active", billingCycle === "monthly");
    document.getElementById("billing-yearly").classList.toggle("active", billingCycle === "yearly");
    
    const saveBadge = document.getElementById("save-badge");
    if (saveBadge) saveBadge.classList.toggle("visible", billingCycle === "yearly");
    
    actualizarPrecios();
  });
}

function actualizarPrecios() {
  planesData.forEach(plan => {
    const priceEl = document.getElementById(`price-${plan.id}`);
    const periodEl = document.getElementById(`period-${plan.id}`);
    const saveEl = document.getElementById(`save-${plan.id}`);
    if (!priceEl) return;

    if (billingCycle === "yearly") {
      const discounted = plan.monthlyPrice * (1 - plan.annualDiscount);
      priceEl.textContent = `$${discounted.toFixed(2)}`;
      periodEl.textContent = "/mo billed yearly";
      if (saveEl) {
        saveEl.textContent = `Save ${Math.round(plan.annualDiscount * 100)}%`;
        saveEl.style.display = "inline-block";
      }
    } else {
      priceEl.textContent = `$${plan.monthlyPrice}`;
      periodEl.textContent = "/month";
      if (saveEl) saveEl.style.display = "none";
    }
  });
}

/* ── Plan Cards ────────────────────────────── */

function renderizarPlanes() {
  const grid = document.getElementById("membership-plans");
  if (!grid) return;
  grid.innerHTML = "";

  const planActivo = typeof getPlanActivo === "function" ? getPlanActivo() : null;

  planesData.forEach(plan => {
    const esActivo = planActivo && planActivo.nombre.toLowerCase() === plan.nombre.toLowerCase();
    const isPopular = plan.popular === true;

    const card = document.createElement("div");
    card.className = `membership-card tier-${plan.nombre.toLowerCase()}${esActivo ? " active" : ""}${isPopular ? " popular" : ""}`;
    card.style.setProperty("--accent", plan.accentColor);

    // Popular badge
    const popularTag = isPopular ? `<span class="popular-tag">Most Popular</span>` : "";

    // Current plan badge
    const currentTag = esActivo ? `<span class="current-tag">Current Plan</span>` : "";

    // Benefits list
    const benefitsHTML = plan.benefits.map(b =>
      `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>${b}</span></li>`
    ).join("");

    // Button
    let btnClass, btnText;
    if (esActivo) {
      btnClass = "plan-select-btn current";
      btnText = "Current Plan";
    } else if (planActivo && NIVELES_PLANES[plan.nombre.toLowerCase()] < NIVELES_PLANES[planActivo.nombre.toLowerCase()]) {
      btnClass = "plan-select-btn downgrade";
      btnText = "Downgrade";
    } else {
      btnClass = "plan-select-btn upgrade";
      btnText = planActivo ? "Upgrade" : "Get Started";
    }

    // Price
    const priceValue = billingCycle === "yearly"
      ? (plan.monthlyPrice * (1 - plan.annualDiscount)).toFixed(2)
      : plan.monthlyPrice;
    const periodText = billingCycle === "yearly" ? "/mo billed yearly" : "/month";

    card.innerHTML = `
      ${popularTag}
      ${currentTag}
      <div class="card-icon">${plan.icono}</div>
      <h3 class="card-plan-name">${plan.nombre}</h3>
      <p class="card-desc">${plan.descripcion}</p>
      <div class="card-price">
        <span class="price-amount" id="price-${plan.id}">$${priceValue}</span>
        <span class="price-period" id="period-${plan.id}">${periodText}</span>
      </div>
      <span class="card-save" id="save-${plan.id}" style="display:${billingCycle === "yearly" ? "inline-block" : "none"}">Save ${Math.round(plan.annualDiscount * 100)}%</span>
      <ul class="card-benefits">${benefitsHTML}</ul>
      <button class="${btnClass}" data-plan-id="${plan.id}"${esActivo ? " disabled" : ""}>${btnText}</button>
    `;

    grid.appendChild(card);
  });

  // Bind select buttons
  grid.querySelectorAll(".plan-select-btn:not(.current)").forEach(btn => {
    btn.addEventListener("click", () => {
      const planId = parseInt(btn.dataset.planId);
      const plan = planesData.find(p => p.id === planId);
      if (!plan) return;
      seleccionarPlan(plan, btn);
    });
  });
}

function seleccionarPlan(plan, btnEl) {
  // Save plan
  if (typeof guardarPlan === "function") {
    guardarPlan(plan);
  }

  // Update header badge
  if (typeof mostrarBadgePlan === "function") {
    mostrarBadgePlan();
  }

  // Animate the selected card
  const allCards = document.querySelectorAll(".membership-card");
  allCards.forEach(c => c.classList.remove("active", "selecting"));

  const selectedCard = btnEl.closest(".membership-card");
  selectedCard.classList.add("selecting");

  setTimeout(() => {
    selectedCard.classList.remove("selecting");
    selectedCard.classList.add("active");
    renderizarPlanes(); // Re-render to update all button states
    renderizarPanelInferior();
  }, 600);
}

/* ── Dynamic Bottom Panel ──────────────────── */

function renderizarPanelInferior() {
  const panel = document.getElementById("membership-panel");
  if (!panel) return;

  const planActivo = typeof getPlanActivo === "function" ? getPlanActivo() : null;
  const tierName = planActivo ? planActivo.nombre.toLowerCase() : null;

  let icon, title, message, ctaText, ctaAction;

  if (!planActivo) {
    icon = "🎯";
    title = "Start your automation journey";
    message = "Choose a plan above to unlock powerful tools that save your business hours of manual work every week.";
    ctaText = "";
    ctaAction = "";
  } else if (tierName === "standar" || tierName === "basic") {
    icon = "📈";
    title = "Ready to scale your operations?";
    message = "You're on the Standar plan — a great start. Upgrade to Premium for priority support, advanced automations, and analytics to take your business further.";
    ctaText = "Explore Premium";
    ctaAction = "premium";
  } else if (tierName === "premium" || tierName === "intermediate") {
    icon = "✨";
    title = "Unlock the full experience";
    message = "Premium gives you great tools. VIP takes it further with a fully personalized concierge service, special integrations, and continuous optimization tailored to your business.";
    ctaText = "Go VIP";
    ctaAction = "vip";
  } else if (tierName === "vip") {
    icon = "👑";
    title = "Your custom experience";
    message = "You have full access to everything SoftRent offers. Your dedicated concierge team is here to optimize, integrate, and support your business around the clock.";
    ctaText = "";
    ctaAction = "";
  }

  const ctaHTML = ctaText
    ? `<button class="panel-cta" onclick="document.querySelector('.tier-${ctaAction} .plan-select-btn')?.click()">${ctaText}</button>`
    : "";

  panel.innerHTML = `
    <div class="panel-content">
      <span class="panel-icon">${icon}</span>
      <div class="panel-text">
        <h3>${title}</h3>
        <p>${message}</p>
      </div>
      ${ctaHTML}
    </div>
  `;
}
