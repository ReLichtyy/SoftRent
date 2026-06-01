/**
 * js/services.js
 * Services page — Visual Accordion Cards, Tabs, Recommender, Drawer, Bridge.
 */

let servicesData = [];

const pageState = {
  recommendedService: null,
  expandedCard: null,
  interactedWithRecommender: false,
  bridgeMessageSent: false,
  drawerDismissed: false,
  pageLoadTime: Date.now()
};

document.addEventListener('DOMContentLoaded', () => {
  loadServices();
  initTabs();
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
    // Show error in card containers
    ['core-cards', 'industry-cards'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '<p style="color: rgba(255,255,255,0.4); text-align: center; padding: 2rem;">Unable to load services. Please refresh.</p>';
    });
  }
}

/* ═══════════════════════════════════════
   VISUAL ACCORDION CARDS
   ═══════════════════════════════════════ */

function renderServiceCards() {
  const coreCards = document.getElementById('core-cards');
  const industryCards = document.getElementById('industry-cards');
  if (!coreCards || !industryCards) return;

  const core = servicesData.filter(s => s.type === 'core');
  const industry = servicesData.filter(s => s.type === 'industry');

  coreCards.innerHTML = core.map(s => buildVisualCard(s)).join('');
  industryCards.innerHTML = industry.map(s => buildVisualCard(s)).join('');

  // Attach accordion click listeners
  document.querySelectorAll('.svc-vcard').forEach(card => {
    const header = card.querySelector('.svc-vcard__header');
    if (header) {
      header.addEventListener('click', () => toggleCard(card));
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCard(card);
        }
      });
    }
  });

  // Attach detail CTA listeners
  document.querySelectorAll('.svc-vcard__cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const serviceId = btn.dataset.service;
      selectRecommendation(serviceId);
      scrollToSection('svc-bridge');
    });
  });
}

function buildVisualCard(service) {
  const bestForItems = service.bestFor.map(b => `<li>${b}</li>`).join('');
  const imgSrc = service.previewImage || '';

  return `
    <article class="svc-vcard" data-service-id="${service.id}" style="--accent: ${service.accentColor}">
      <!-- COLLAPSED HEADER (always visible) -->
      <div class="svc-vcard__header" role="button" tabindex="0" aria-expanded="false" aria-controls="detail-${service.id}">
        <div class="svc-vcard__img-wrap">
          ${imgSrc ? `<img src="${imgSrc}" alt="${service.name}" class="svc-vcard__img" loading="lazy">` : ''}
          <div class="svc-vcard__overlay"></div>
          <div class="svc-vcard__accent-bar"></div>
        </div>
        <div class="svc-vcard__info">
          <div class="svc-vcard__meta">
            <span class="svc-vcard__icon">${service.icon}</span>
            <h3 class="svc-vcard__name">${service.name}</h3>
          </div>
          <p class="svc-vcard__pain">${service.painLine}</p>
        </div>
        <div class="svc-vcard__toggle" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      </div>

      <!-- EXPANDED DETAIL (hidden by default) -->
      <div class="svc-vcard__detail" id="detail-${service.id}" aria-hidden="true">
        <div class="svc-vcard__detail-inner">
          <div class="svc-vcard__detail-grid">
            <div class="svc-vcard__block">
              <div class="svc-vcard__label">What it solves</div>
              <p>${service.solvesText}</p>
            </div>
            <div class="svc-vcard__block">
              <div class="svc-vcard__label">What it does</div>
              <p>${service.doesText}</p>
            </div>
          </div>

          <div class="svc-vcard__fits">
            <div class="svc-vcard__label">Why it fits you</div>
            <p>${service.fitsYouText}</p>
          </div>

          <div class="svc-vcard__bestfor">
            <div class="svc-vcard__label">Best for</div>
            <ul>${bestForItems}</ul>
          </div>

          <button class="svc-vcard__cta" data-service="${service.id}">
            Talk to us about ${service.name}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

/* ═══════════════════════════════════════
   ACCORDION TOGGLE
   ═══════════════════════════════════════ */

function toggleCard(card) {
  const isExpanded = card.classList.contains('expanded');
  const panel = card.dataset.tab || card.closest('.svc-panel')?.id;

  if (isExpanded) {
    collapseCard(card);
    pageState.expandedCard = null;
  } else {
    // Collapse any currently open card in the same panel
    const parent = card.closest('.svc-cards');
    if (parent) {
      parent.querySelectorAll('.svc-vcard.expanded').forEach(c => collapseCard(c));
    }

    expandCard(card);
    pageState.expandedCard = card.dataset.serviceId;

    // Smooth scroll to the card
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

function expandCard(card) {
  const header = card.querySelector('.svc-vcard__header');
  const detail = card.querySelector('.svc-vcard__detail');

  card.classList.add('expanded');
  if (header) header.setAttribute('aria-expanded', 'true');
  if (detail) detail.setAttribute('aria-hidden', 'false');
}

function collapseCard(card) {
  const header = card.querySelector('.svc-vcard__header');
  const detail = card.querySelector('.svc-vcard__detail');

  card.classList.remove('expanded');
  if (header) header.setAttribute('aria-expanded', 'false');
  if (detail) detail.setAttribute('aria-hidden', 'true');
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
        requestAnimationFrame(() => {
          targetPanel.classList.add('active');
        });
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

  renderRecommendation(service);
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

    const submission = {
      email,
      message,
      recommendedService: pageState.recommendedService,
      timestamp: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('softrent_contacts') || '[]');
    existing.push(submission);
    localStorage.setItem('softrent_contacts', JSON.stringify(existing));

    pageState.bridgeMessageSent = true;

    form.style.display = 'none';
    const sub = document.querySelector('.svc-bridge__sub');
    const reassure = document.querySelector('.svc-bridge__reassure');
    if (sub) sub.style.display = 'none';
    if (reassure) reassure.style.display = 'none';

    const chip = document.getElementById('bridge-chip');
    if (chip) chip.style.display = 'none';

    const success = document.getElementById('bridge-success');
    if (success) success.style.display = 'block';

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

  if (sessionStorage.getItem('softrent_drawer_dismissed')) {
    pageState.drawerDismissed = true;
  }

  window.addEventListener('scroll', () => {
    if (pageState.drawerDismissed || pageState.bridgeMessageSent) return;
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

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('visible');
      drawer.setAttribute('aria-hidden', 'true');
      pageState.drawerDismissed = true;
      sessionStorage.setItem('softrent_drawer_dismissed', 'true');
    });
  }

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

      drawer.querySelector('.svc-drawer__inner').innerHTML = `
        <div style="text-align: center; padding: 1rem 0;">
          <div style="font-size: 2rem; margin-bottom: 0.75rem;">✓</div>
          <h3 style="color: #fff; margin-bottom: 0.4rem;">Message sent!</h3>
          <p style="color: rgba(255,255,255,0.5); font-size: 0.88rem;">We'll get back to you within 24 hours.</p>
        </div>
      `;

      pageState.bridgeMessageSent = true;

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
