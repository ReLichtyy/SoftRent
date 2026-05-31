window.addEventListener('DOMContentLoaded', function () {
  var mbackground = document.getElementById('gradient');
  var canvas = document.getElementById('paper');

  if (!mbackground || !canvas) return;

  var c = canvas.getContext('2d');

  // ── Resize canvas ──────────────────────────────────────────
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // ── Gradient color transition ──────────────────────────────
  var paletteColors = [
    [4, 4, 4],
    [46, 23, 24],
    [91, 55, 56],
    [124, 116, 124],
    [60, 68, 60],
    [59, 59, 60],
    [148, 140, 148],
    [234, 28, 36],
    [91, 55, 56],
    [46, 23, 24]
  ];

  var bubbleColors = [
    '234,28,36',
    '91,55,56',
    '148,140,148',
    '60,68,60',
    '46,23,24'
  ];

  var state = {
    currentIdx: 0,
    nextIdx: 1,
    progress: 0,
    bubbles: [],
    timestamp: Date.now()
  };

  // Load state from sessionStorage
  var savedState = sessionStorage.getItem('softrent_bg_state');
  if (savedState) {
    try {
      var parsed = JSON.parse(savedState);
      if (parsed && parsed.bubbles && parsed.bubbles.length >= 24) {
        state = parsed;
      } else {
        initBubbles();
      }
    } catch (e) {
      initBubbles();
    }
  } else {
    initBubbles();
  }

  function initBubbles() {
    var numBubbles = Math.floor(Math.random() * (40 - 24 + 1)) + 24;
    state.bubbles = [];
    for (var i = 0; i < numBubbles; i++) {
      state.bubbles.push(createBubble());
    }
  }

  function createBubble() {
    var radius = Math.random() * 50 + 10;
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: radius,
      speedX: (Math.random() - 0.5) * 1.2,
      speedY: (Math.random() - 0.5) * 1.2,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      alpha: Math.random() * 0.15 + 0.05
    };
  }

  function lerp(a, b, t) { return Math.round(a + (b - a) * t); }

  function updateGradient(deltaTime) {
    var progressSpeed = 0.0000625; // Equivale a STEP = 0.005 cada 80ms
    state.progress += progressSpeed * deltaTime;

    if (state.progress >= 1) {
      state.progress = 0;
      state.currentIdx = state.nextIdx;
      state.nextIdx = (state.nextIdx + 1) % paletteColors.length;
    }

    var from = paletteColors[state.currentIdx];
    var to = paletteColors[state.nextIdx];
    var r = lerp(from[0], to[0], state.progress);
    var g = lerp(from[1], to[1], state.progress);
    var b = lerp(from[2], to[2], state.progress);

    mbackground.style.backgroundImage =
      'linear-gradient(180deg, rgb(4,4,4) 0%, rgb(' + r + ',' + g + ',' + b + ') 100%)';
  }

  function updateAndDrawBubbles(deltaTime) {
    c.clearRect(0, 0, canvas.width, canvas.height);

    var timeScale = deltaTime / 16.66; // Normalizado para 60fps

    for (var i = 0; i < state.bubbles.length; i++) {
      var b = state.bubbles[i];

      b.x += b.speedX * timeScale;
      b.y += b.speedY * timeScale;

      if (b.x > canvas.width + b.radius) b.x = -b.radius;
      else if (b.x < -b.radius) b.x = canvas.width + b.radius;

      if (b.y > canvas.height + b.radius) b.y = -b.radius;
      else if (b.y < -b.radius) b.y = canvas.height + b.radius;

      c.beginPath();
      // Dibujar burbujas con gradiente radial para un efecto suave y difuso
      var grad = c.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
      grad.addColorStop(0, 'rgba(' + b.color + ', ' + b.alpha + ')');
      grad.addColorStop(1, 'rgba(' + b.color + ', 0)');

      c.fillStyle = grad;
      c.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      c.fill();
    }
  }

  function saveState() {
    state.timestamp = Date.now();
    try {
      sessionStorage.setItem('softrent_bg_state', JSON.stringify(state));
    } catch (e) {
      // Ignorar si el storage está lleno
    }
  }

  var lastTime = performance.now();
  var lastSave = performance.now();

  function loop(time) {
    var deltaTime = time - lastTime;
    if (deltaTime > 100) deltaTime = 16.66; // Prevenir saltos bruscos si el tab se inactiva
    lastTime = time;

    updateGradient(deltaTime);
    updateAndDrawBubbles(deltaTime);

    if (time - lastSave > 900) { // Guardar estado cada ~900ms
      saveState();
      lastSave = time;
    }

    requestAnimationFrame(loop);
  }

  // Iniciar animación
  requestAnimationFrame(loop);

  // Guardar estado antes de cambiar de página
  window.addEventListener('beforeunload', saveState);
  window.addEventListener('pagehide', saveState);

});
