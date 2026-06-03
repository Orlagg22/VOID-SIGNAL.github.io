/* =============================================
   ANIMATIONS.JS — Contadores, interacciones
   ============================================= */

(function () {

  // ——— CONTADORES ANIMADOS ———
  function animateCounters() {
    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
      if (el.dataset.animated) return;
      el.dataset.animated = 'true';

      const target   = parseInt(el.dataset.target);
      const duration = 1800;
      const start    = performance.now();

      function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(ease * target);

        if (target >= 1000000) {
          el.textContent = (value / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
          el.textContent = (value / 1000).toFixed(0) + 'K';
        } else {
          el.textContent = value;
        }

        if (progress < 1) requestAnimationFrame(step);
        else {
          if (target >= 1000000) el.textContent = (target / 1000000).toFixed(1) + 'M';
          else if (target >= 1000) el.textContent = (target / 1000).toFixed(0) + 'K';
          else el.textContent = target;
        }
      }
      requestAnimationFrame(step);
    });
  }

  // Observar stats strip
  const stripObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) animateCounters();
    });
  }, { threshold: 0.3 });

  const strip = document.querySelector('.about-strip');
  if (strip) stripObserver.observe(strip);

  // ——— ÁLBUM EXPAND ———
  window.expandAlbum = function (card) {
    const tracks = card.querySelector('.disco-tracks');
    if (!tracks) return;
    tracks.classList.toggle('hidden');

    // Cerrar otros
    document.querySelectorAll('.disco-tracks').forEach(t => {
      if (t !== tracks) t.classList.add('hidden');
    });
  };

  // ——— TRACK PLAY ———
  window.playTrack = function (trackEl) {
    document.querySelectorAll('.track').forEach(t => t.classList.remove('playing'));
    trackEl.classList.add('playing');

    // Efecto visual temporal
    setTimeout(() => trackEl.classList.remove('playing'), 5000);
  };

  // ——— SHOP FILTER ———
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.shop-item').forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ——— FORMULARIO DE CONTACTO ———
  window.sendForm = function (e) {
    e.preventDefault();
    const success = document.getElementById('form-success');
    const btn = e.target.querySelector('button[type=submit]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      success.classList.remove('hidden');
      btn.textContent = '✓ Enviado';
      e.target.reset();
    }, 1200);
  };

  // ——— SCROLL REVEAL MEJORADO ———
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));

  // Re-observar en cambio de página
  document.addEventListener('siteReady', () => {
    document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));
  });

  // ——— TIMELINE HOVER RIPPLE ———
  document.querySelectorAll('.tl-dot').forEach(dot => {
    dot.addEventListener('mouseenter', () => {
      dot.style.transform = 'scale(1.5)';
    });
    dot.addEventListener('mouseleave', () => {
      dot.style.transform = 'scale(1)';
    });
  });

})();
