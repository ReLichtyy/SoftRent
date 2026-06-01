/**
 * js/services.js
 * Services page — Tabs, Recommender, Drawer, and Bridge logic.
 */

let servicesData = [];

const pageState = {
  selectedProblem: null,
  recommendedService: null,
  interactedWithRecommender: false,
  bridgeMessageSent: false,
  drawerDismissed: false,
  pageLoadTime: Date.now()
};

document.addEventListener('DOMContentLoaded', () => {
  loadServices();
  initTabs();
  initScenarios();
  initRecommender();
  initBridgeForm();
  initDrawer();
  initSmoothScroll();
});

/* ═══════════════════════════════════════
   DATA LOADING
   ═══════════════════════════════════════ */

async function loadServices() {
  try {
    const res = await fetch('data/services.json');
    if (!res.ok) throw new Error('Failed to load services');
    servicesData = await res.json();
    renderServiceCards();
  } catch (err) {
    console.error('Error loading services:', err);
  }
}

/* ═══════════════════════════════════════
   SERVICE CARDS RENDERING
   ═══════════════════════════════════════ */

function renderServiceCards() {
  const coreCards = document.getElementById('core-cards');
  const industryCards = document.getElementById('industry-cards');
  if (!coreCards || !industryCards) return;

  const core = servicesData.filter(s => s.type === 'core');
  const industry = servicesData.filter(s => s.type === 'industry');

  coreCards.innerHTML = core.map(s => buildServiceCard(s)).join('');
  industryCards.innerHTML = industry.map(s => buildServiceCard(s)).join('');

  // Attach CTA listeners
  document.querySelectorAll('.svc-card__cta--primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.dataset.service;
      selectRecommendation(serviceId);
      scrollToSection('svc-bridge');
    });
  });
}

function buildServiceCard(service) {
  const bestForItems = service.bestFor.map(b => `<li>${b}</li>`).join('');

  return `
    <article class="svc-card" style="--accent: ${service.accentColor}">
      <div class="svc-card__header">
        <div class="svc-card__icon">${service.icon}</div>
        <h3 class="svc-card__name">${service.name}</h3>
      </div>
      <p class="svc-card__pain">${service.painLine}</p>
      <p class="svc-card__desc">${service.description}</p>
      <div class="svc-card__bestfor">
        <div class="svc-card__bestfor-title">Best for</div>
        <ul class="svc-card__bestfor-list">${bestForItems}</ul>
      </div>
      <div class="svc-card__actions">
        <button class="svc-card__cta svc-card__cta--primary" data-service="${service.id}">
          Get started →
        </button>
      </div>
    </article>
  `;
}

/* ═══════════════════════════════════════
   TABS
   ═══════════════════════════════════════ */

function initTabs() {
  const tabs = document.querySelectorAll('.svc-tab');
  const panels = document.querySelectorAll('.svc-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach(p => p.classList.remove('active'));

      const targetPanel = document.getElementById(`panel-${target}`);
      if (targetPanel) {
        // Small delay for transition effect
        requestAnimationFrame(() => {
          targetPanel.classList.add('active');
        });
      }
    });
  });
}

/* ═══════════════════════════════════════
   USE-CASE RECOGNITION (S6)
   ═══════════════════════════════════════ */

function initScenarios() {
  const scenarios = document.querySelectorAll('.svc-scenario');

  scenarios.forEach(scenario => {
    scenario.addEventListener('click', () => {
      const problem = scenario.dataset.problem;

      // Clear previous selections
      scenarios.forEach(s => s.classList.remove('selected'));
      scenario.classList.add('selected');

      pageState.selectedProblem = problem;

      // Find the mapped service
      const service = servicesData.find(s => s.mappedProblems.includes(problem));
      if (service) {
        selectRecommendation(service.id);
        scrollToSection('svc-recommender');
      }
    });
  });
}

/* ═══════════════════════════════════════
   SERVICE RECOMMENDER (S7)
   ═══════════════════════════════════════ */

function initRecommender() {
  const options = document.querySelectorAll('.svc-option');

  options.forEach(option => {
    option.addEventListener('click', () => {
      const serviceId = option.dataset.recommend;
      selectRecommendation(serviceId);
    });
  });
}

function selectRecommendation(serviceId) {
  const service = servicesData.find(s => s.id === serviceId);
  if (!service) return;

  pageState.recommendedService = serviceId;
  pageState.interactedWithRecommender = true;

  // Update option visual state
  const options = document.querySelectorAll('.svc-option');
  options.forEach(opt => {
    opt.classList.remove('selected');
    opt.style.removeProperty('--accent');
    if (opt.dataset.recommend === serviceId) {
      opt.classList.add('selected');
      opt.style.setProperty('--accent', service.accentColor);
    }
  });

  // Render the recommendation panel
  renderRecommendation(service);

  // Update bridge chip
  updateBridgeChip(service);
}

function renderRecommendation(service) {
  const container = document.getElementById('svc-result');
  if (!container) return;

  const bestForItems = service.bestFor.map(b => `<li>${b}</li>`).join('');

  container.innerHTML = `
    <div class="svc-result__panel" style="--accent: ${service.accentColor}">
      <div class="svc-result__badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Based on your selection
      </div>

      <div class="svc-result__header">
        <div class="svc-result__icon">${service.icon}</div>
        <h3 class="svc-result__name">${service.name}</h3>
      </div>

      <div class="svc-result__block">
        <div class="svc-result__label">What it solves</div>
        <p class="svc-result__text">${service.solvesText}</p>
      </div>

      <div class="svc-result__block">
        <div class="svc-result__label">What it does</div>
        <p class="svc-result__text">${service.doesText}</p>
      </div>

      <div class="svc-result__block">
        <div class="svc-result__label">Why it fits you</div>
        <p class="svc-result__fits">${service.fitsYouText}</p>
      </div>

      <div class="svc-result__bestfor">
        <div class="svc-card__bestfor-title">Best for</div>
        <ul class="svc-card__bestfor-list">${bestForItems}</ul>
      </div>

      <button class="svc-result__cta" data-service="${service.id}">
        Talk to us about ${service.name} →
      </button>

      <p class="svc-result__alt">Not quite right? <a href="#svc-recommender">Try selecting a different challenge ↑</a></p>
    </div>
  `;

  // CTA in the result panel → scroll to bridge
  const resultCta = container.querySelector('.svc-result__cta');
  if (resultCta) {
    resultCta.addEventListener('click', () => {
      scrollToSection('svc-bridge');
    });
  }
}

/* ═══════════════════════════════════════
   MINI INTAKE BRIDGE (S7c)
   ═══════════════════════════════════════ */

function updateBridgeChip(service) {
  const chip = document.getElementById('bridge-chip');
  const chipIcon = document.getElementById('bridge-chip-icon');
  const chipText = document.getElementById('bridge-chip-text');
  const chipRemove = document.getElementById('bridge-chip-remove');

  if (!chip || !chipIcon || !chipText) return;

  chipIcon.textContent = service.icon;
  chipText.textContent = service.name;
  chip.style.display = 'inline-flex';

  // Remove handler
  if (chipRemove) {
    chipRemove.onclick = () => {
      chip.style.display = 'none';
      pageState.recommendedService = null;
    };
  }
}

function initBridgeForm() {
  const form = document.getElementById('bridge-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('bridge-email').value.trim();
    const message = document.getElementById('bridge-message').value.trim();

    if (!email) return;

    // Gather data
    const submission = {
      email,
      message,
      recommendedService: pageState.recommendedService,
      selectedProblem: pageState.selectedProblem,
      timestamp: new Date().toISOString()
    };

    // Store in localStorage for demo
    const existing = JSON.parse(localStorage.getItem('softrent_contacts') || '[]');
    existing.push(submission);
    localStorage.setItem('softrent_contacts', JSON.stringify(existing));

    // Show success state
    pageState.bridgeMessageSent = true;

    form.style.display = 'none';
    document.querySelector('.svc-bridge__sub').style.display = 'none';
    document.querySelector('.svc-bridge__reassure').style.display = 'none';

    const chip = document.getElementById('bridge-chip');
    if (chip) chip.style.display = 'none';

    const success = document.getElementById('bridge-success');
    if (success) success.style.display = 'block';

    // Hide drawer if visible (already contacted)
    const drawer = document.getElementById('svc-drawer');
    if (drawer) drawer.classList.remove('visible');

    console.log('Bridge form submitted:', submission);
  });
}

/* ═══════════════════════════════════════
   CONTACT DRAWER (S8)
   ═══════════════════════════════════════ */

function initDrawer() {
  const drawer = document.getElementById('svc-drawer');
  const closeBtn = document.getElementById('drawer-close');
  const drawerForm = document.getElementById('drawer-form');

  if (!drawer) return;

  // Check if already dismissed this session
  if (sessionStorage.getItem('softrent_drawer_dismissed')) {
    pageState.drawerDismissed = true;
  }

  // Scroll trigger
  window.addEventListener('scroll', () => {
    if (pageState.drawerDismissed || pageState.bridgeMessageSent) return;

    // Don't show in the first 5 seconds
    if (Date.now() - pageState.pageLoadTime < 5000) return;

    const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;

    if (scrollPercent > 0.85 && !drawer.classList.contains('visible')) {
      setTimeout(() => {
        if (!pageState.drawerDismissed && !pageState.bridgeMessageSent) {
          drawer.classList.add('visible');
          drawer.setAttribute('aria-hidden', 'false');
        }
      }, 500);
    }
  }, { passive: true });

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('visible');
      drawer.setAttribute('aria-hidden', 'true');
      pageState.drawerDismissed = true;
      sessionStorage.setItem('softrent_drawer_dismissed', 'true');
    });
  }

  // Drawer form submit
  if (drawerForm) {
    drawerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('drawer-email').value.trim();
      const message = document.getElementById('drawer-message').value.trim();

      if (!email) return;

      const submission = {
        email,
        message,
        source: 'drawer',
        recommendedService: pageState.recommendedService,
        timestamp: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem('softrent_contacts') || '[]');
      existing.push(submission);
      localStorage.setItem('softrent_contacts', JSON.stringify(existing));

      // Replace form with confirmation
      drawer.querySelector('.svc-drawer__inner').innerHTML = `
        <div style="text-align: center; padding: 1rem 0;">
          <div style="font-size: 2rem; margin-bottom: 0.75rem;">✓</div>
          <h3 style="color: #fff; margin-bottom: 0.4rem;">Message sent!</h3>
          <p style="color: rgba(255,255,255,0.5); font-size: 0.88rem;">We'll get back to you within 24 hours.</p>
        </div>
      `;

      pageState.bridgeMessageSent = true;

      // Auto-hide after 3 seconds
      setTimeout(() => {
        drawer.classList.remove('visible');
        pageState.drawerDismissed = true;
      }, 3000);

      console.log('Drawer form submitted:', submission);
    });
  }
}

/* ═══════════════════════════════════════
   SMOOTH SCROLL
   ═══════════════════════════════════════ */

function initSmoothScroll() {
  // Handle anchor links with smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
