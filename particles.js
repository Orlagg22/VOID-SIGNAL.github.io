/* =============================================
   PARTICLES.JS — Canvas de partículas de fondo
   ============================================= */

(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // ——— PARTÍCULAS ———
  const NUM = 120;
  const particles = Array.from({ length: NUM }, () => createParticle());

  function createParticle() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.5,
      vy:    (Math.random() - 0.5) * 0.5,
      r:     Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.25 + 0.05,
      red:   Math.random() > 0.85  // 15% son rojas
    };
  }

  // ——— CONEXIONES ENTRE PARTÍCULAS ———
  const MAX_DIST = 130;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Actualizar posiciones
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    // Conexiones
    for (let i = 0; i < NUM; i++) {
      for (let j = i + 1; j < NUM; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].red || particles[j].red
            ? `rgba(255,45,85,${alpha})`
            : `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Dibujar puntos
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.red
        ? `rgba(255,45,85,${p.alpha * 2})`
        : `rgba(255,255,255,${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
})();
