/* =============================================
   LOADER.JS — Pantalla de carga con canvas
   ============================================= */

(function () {
  const loader    = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderTxt = document.getElementById('loader-text');
  const canvas    = document.getElementById('loader-canvas');
  const ctx       = canvas.getContext('2d');

  // ——— TEXTOS DE PROGRESO ———
  const msgs = [
    'Inicializando señal...',
    'Cargando frecuencias oscuras...',
    'Sincronizando nodos de audio...',
    'Calibrando distorsión...',
    'Activando núcleo sónico...',
    'Señal lista. Bienvenido.'
  ];

  // ——— CANVAS RESIZE ———
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // ——— PARTÍCULAS DEL LOADER ———
  const particles = Array.from({ length: 80 }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    r:  Math.random() * 1.5 + 0.3,
    alpha: Math.random() * 0.5 + 0.2,
    color: Math.random() > 0.5 ? '#ff2d55' : '#ffffff'
  }));

  // ——— LÍNEAS ELÉCTRICAS ———
  const lines = [];
  function addLine() {
    lines.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: Math.random() * 120 + 40,
      angle: Math.random() * Math.PI * 2,
      speed: (Math.random() + 0.5) * 2,
      life: 0,
      maxLife: 30
    });
  }

  function drawLoader() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Partículas
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });

    // Líneas eléctricas
    if (Math.random() < 0.15) addLine();
    lines.forEach((l, i) => {
      l.life++;
      const progress = l.life / l.maxLife;
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(
        l.x + Math.cos(l.angle) * l.len * progress,
        l.y + Math.sin(l.angle) * l.len * progress
      );
      ctx.strokeStyle = '#ff2d55';
      ctx.globalAlpha = (1 - progress) * 0.6;
      ctx.lineWidth = 1;
      ctx.stroke();
      if (l.life >= l.maxLife) lines.splice(i, 1);
    });

    ctx.globalAlpha = 1;
  }

  // ——— LOOP DEL CANVAS ———
  let animId;
  function loaderLoop() {
    drawLoader();
    animId = requestAnimationFrame(loaderLoop);
  }
  loaderLoop();

  // ——— PROGRESO ———
  let progress = 0;
  const interval = setInterval(() => {
    const increment = Math.random() * 12 + 3;
    progress = Math.min(progress + increment, 100);
    loaderBar.style.width = progress + '%';

    const idx = Math.floor((progress / 100) * (msgs.length - 1));
    loaderTxt.textContent = msgs[Math.min(idx, msgs.length - 1)];

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        cancelAnimationFrame(animId);
        loader.classList.add('done');
        // Lanzar animaciones de entrada del sitio
        document.dispatchEvent(new Event('siteReady'));
      }, 600);
    }
  }, 200);
})();
