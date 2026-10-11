// Standalone pricing concept. Amounts are illustrative, not a billing source.
const TIERS = [
  { n: 1, usd: 78, titulo: '1 servicio', para: 'Una sola cosa, bien resuelta.', extra: ['Elija 1: Web + Chatbot, reservas, cobros o facturación', 'Hasta 500 conversaciones con IA al mes', '1 automatización incluida', 'Soporte por chat'] },
  { n: 2, precio: 64900, usd: 129, titulo: '2 servicios', destacado: true, para: 'El punto medio de la mayoría de negocios.', extra: ['Elija 2 de los 4 servicios', 'Hasta 1.500 conversaciones con IA al mes', '3 automatizaciones incluidas', 'Resumen semanal del negocio'] },
  { n: 3, precio: 129900, usd: 259, titulo: '3 servicios', para: 'Para negocios con mucho movimiento.', extra: ['Elija 3 de los 4 servicios', 'Hasta 4.000 conversaciones con IA al mes', '6 automatizaciones incluidas', 'Soporte prioritario y ajustes mensuales'] },
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
let periodo = 'mensual';
let moneda = 'CRC';
let manualCurrency = false;
let savedCurrency = null;
let exchange = { status: 'loading', rate: null, updatedAt: null };
const EXCHANGE_CACHE_KEY = 'softrent-usd-crc-rate-v1';
try {
  savedCurrency = localStorage.getItem('softrent-moneda');
} catch (error) {
  // Storage unavailable: controls still work for the current page visit.
  console.warn('No se puede leer la moneda guardada; se usará la zona horaria.', error);
}

const money = (amount, currency = moneda) => currency === 'USD'
  ? `US$${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  : `₡${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

function serviceStack(count) {
  return `<ul class="service-stack" data-count="${count}" aria-label="${count} ${count === 1 ? 'servicio a su elección' : 'servicios a su elección'}">
    ${Array.from({ length: count }, (_, index) => `<li class="service-card choice-card">
      <span class="sr-only">Servicio ${index + 1} a su elección</span>
      <span class="graphite-face" aria-hidden="true">
        <span class="graphite-top"><span>SoftRent</span><span>Servicios</span></span>
        <img class="graphite-mark" src="/src/assets/brand/softrent-symbol.png" width="116" height="116" alt="" />
        <span class="graphite-title">A su<br />elección.</span>
        <span class="graphite-foot">Un servicio. Usted elige.</span>
      </span>
    </li>`).join('')}
  </ul>`;
}
const check = '<svg viewBox="0 0 16 18" aria-hidden="true"><path d="m2 9 4 4 8-9"/></svg>';

function render() {
  $('[data-plans]').innerHTML = TIERS.map((tier) => {
    const converted = tier.n === 1 && moneda === 'CRC';
    const currency = converted && exchange.status !== 'ready' ? 'USD' : moneda;
    const base = currency === 'USD' ? tier.usd : tier.n === 1 ? tier.usd * exchange.rate : tier.precio;
    const annual = periodo === 'anual';
    const amount = Math.round(annual ? base * 10 / 12 : base);
    return `<article class="plan plan-${tier.n}" aria-labelledby="plan-${tier.n}-title">
      <div class="plan-heading"><h3 id="plan-${tier.n}-title">${tier.titulo}</h3>${tier.destacado ? '<span>Más elegido</span>' : ''}</div>
      <p class="plan-description">${tier.para}</p>
      <div class="price">${money(amount, currency)}<small>/mes</small></div>
      <p class="bill-note">${annual ? `${money(Math.round(base * 10), currency)} facturados al año` : 'Facturación mensual'}</p>
      <div class="plan-art"><p>${tier.n === 1 ? 'Elija el servicio que necesita' : `Combine ${tier.n} servicios a su elección`}</p>${serviceStack(tier.n)}<a class="catalog-link" href="#servicios">Ver servicios disponibles <span aria-hidden="true">↓</span></a></div>
      <a class="button" href="/comenzar?servicios=${tier.n}" aria-label="Comenzar con ${tier.titulo}">Comenzar con ${tier.titulo}<span aria-hidden="true">↗</span></a>
      <p class="includes">Lo que incluye su plan</p>
      <ul class="features">${tier.extra.map((feature) => `<li>${check}<span>${feature}</span></li>`).join('')}</ul>
    </article>`;
  }).join('');
  $$('[data-cur]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.cur === moneda)));
  $$('[data-period]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.period === periodo)));
}

// The other tiers keep their existing prices. Only tier 1 converts from USD.
async function loadExchangeRate() {
  const now = Date.now();
  const validRate = (value) => Number.isFinite(value) && value > 0;
  try {
    const stored = localStorage.getItem(EXCHANGE_CACHE_KEY);
    if (stored) {
      const cached = JSON.parse(stored);
      if (cached && validRate(cached.rate) && Number.isFinite(cached.updatedAt)
        && cached.updatedAt <= now && now - cached.updatedAt < 48 * 60 * 60 * 1000
        && Number.isFinite(cached.expiresAt) && cached.expiresAt > now
        && cached.expiresAt <= now + 24 * 60 * 60 * 1000) {
        exchange = { status: 'ready', rate: cached.rate, updatedAt: cached.updatedAt };
        render();
        return;
      }
      console.warn('El tipo de cambio guardado venció o no es válido; se solicitará uno actualizado.');
    }
  } catch (error) {
    console.warn('No se pudo leer el tipo de cambio guardado; se consultará en línea.', error);
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD', { signal: controller.signal });
    if (!response.ok) throw new Error(`Exchange rate: HTTP ${response.status}`);
    const data = await response.json();
    const rate = data.rates?.CRC;
    const updatedAt = data.time_last_update_unix * 1000;
    const expiresAt = data.time_next_update_unix * 1000;
    if (data.result !== 'success' || data.base_code !== 'USD' || !validRate(rate)
      || !Number.isFinite(updatedAt) || updatedAt > Date.now()
      || Date.now() - updatedAt >= 48 * 60 * 60 * 1000
      || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      throw new Error('Exchange rate: invalid or outdated response');
    }
    exchange = { status: 'ready', rate, updatedAt };
    try {
      localStorage.setItem(EXCHANGE_CACHE_KEY, JSON.stringify({ rate, updatedAt, expiresAt: Math.min(expiresAt, Date.now() + 24 * 60 * 60 * 1000) }));
    } catch (error) {
      console.warn('El tipo de cambio se aplicó, pero no se pudo guardar para próximas visitas.', error);
    }
  } catch (error) {
    exchange = { status: 'error', rate: null, updatedAt: null };
    console.warn('Conversión no disponible; el precio base del primer plan se mostrará en USD.', error);
  } finally {
    clearTimeout(timeout);
  }
  render();
  if (moneda === 'CRC') $('[data-announcement]').textContent = exchange.status === 'ready'
    ? 'El precio del plan de 1 servicio se actualizó a colones.'
    : 'Conversión no disponible. El plan de 1 servicio se muestra en dólares.';
}

function setCurrency(value, save = false) {
  moneda = value;
  if (save) {
    manualCurrency = true;
    try {
      localStorage.setItem('softrent-moneda', value);
    } catch (error) {
      console.warn('La moneda se aplicó para esta visita, pero no se pudo guardar.', error);
    }
  }
  render();
}

document.addEventListener('click', (event) => {
  const currency = event.target.closest('[data-cur]');
  const period = event.target.closest('[data-period]');
  if (currency) setCurrency(currency.dataset.cur, true);
  if (period) {
    periodo = period.dataset.period;
    render();
  }
  if (currency || period) {
    const currencySummary = moneda === 'CRC' && exchange.status !== 'ready'
      ? 'Plan de 1 servicio en dólares; los otros planes en colones'
      : `Precios en ${moneda === 'CRC' ? 'colones' : 'dólares'}`;
    $('[data-announcement]').textContent = `${currencySummary}, pago ${periodo}.`;
  }
});

setCurrency(savedCurrency === 'CRC' || savedCurrency === 'USD'
  ? savedCurrency
  : Intl.DateTimeFormat().resolvedOptions().timeZone === 'America/Costa_Rica' ? 'CRC' : 'USD');

// Retain country-based selection. A delayed lookup must never override a click.
async function detectCountry() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const response = await fetch('https://api.country.is/', { signal: controller.signal });
    if (!response.ok) throw new Error(`Country lookup: HTTP ${response.status}`);
    const data = await response.json();
    if (typeof data.country !== 'string' || !/^[A-Z]{2}$/.test(data.country)) throw new Error('Country lookup: invalid country');
    if (!manualCurrency) setCurrency(data.country === 'CR' ? 'CRC' : 'USD');
  } catch (error) {
    // One bounded attempt; local selection remains usable without the lookup.
    console.warn('No se pudo detectar el país. Se mantiene la moneda local; puede cambiarla en los controles.', error);
  } finally {
    clearTimeout(timeout);
  }
}
if (savedCurrency !== 'CRC' && savedCurrency !== 'USD') void detectCountry();
void loadExchangeRate();

// Only the decorative catalog faces move; service descriptions stay still.
const cardMotion = matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)');
for (const visual of $$('.catalog-visual')) {
  const face = visual.querySelector('.graphite-face');
  let frame = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    face.style.removeProperty('--rx');
    face.style.removeProperty('--ry');
  };
  visual.addEventListener('pointermove', (event) => {
    if (!cardMotion.matches || event.pointerType === 'touch') return;
    const bounds = visual.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      face.style.setProperty('--rx', `${(0.5 - y) * 12}deg`);
      face.style.setProperty('--ry', `${(x - 0.5) * 16}deg`);
      frame = 0;
    });
  });
  visual.addEventListener('pointerleave', reset);
  visual.addEventListener('pointercancel', reset);
  cardMotion.addEventListener('change', reset);
}
