const cards = [...document.querySelectorAll('[data-style]')];
const summary = document.querySelector('[data-selection]');
const motionAllowed = matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)');

for (const card of cards) {
  let frame = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
    card.style.removeProperty('--shine-x');
    card.style.removeProperty('--shine-y');
  };

  card.addEventListener('pointermove', (event) => {
    if (!motionAllowed.matches || event.pointerType === 'touch') return;
    const bounds = card.closest('.stage').getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      card.style.setProperty('--rx', `${(0.5 - y) * 14}deg`);
      card.style.setProperty('--ry', `${(x - 0.5) * 18}deg`);
      card.style.setProperty('--shine-x', `${x * 100}%`);
      card.style.setProperty('--shine-y', `${y * 100}%`);
      frame = 0;
    });
  });
  card.addEventListener('pointerleave', reset);
  card.addEventListener('pointercancel', reset);
  card.addEventListener('blur', reset);
  motionAllowed.addEventListener('change', reset);

  card.addEventListener('click', () => {
    for (const option of cards) {
      const selected = option === card;
      option.setAttribute('aria-pressed', String(selected));
      option.closest('.option').querySelector('.selection-label').textContent = selected ? 'Favorita ✓' : 'Elegir ↗';
    }
    summary.textContent = `Su favorita: ${card.dataset.style}. Podemos desarrollar esta dirección para las tarjetas de servicios.`;
  });
}
