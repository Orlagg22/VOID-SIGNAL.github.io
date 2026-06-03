/* =============================================
   AUDIO.JS — Efectos de audio e interacciones musicales
   ============================================= */

(function () {

  // ——— VISUALIZADOR DE AUDIO FAKE (visual only) ———
  // Crea un mini visualizador decorativo cuando se selecciona una canción

  let activeBar = null;

  window.playTrack = function (trackEl) {
    // Quitar clase de todos
    document.querySelectorAll('.track').forEach(t => {
      t.classList.remove('playing');
      const old = t.querySelector('.mini-viz');
      if (old) old.remove();
    });

    trackEl.classList.add('playing');

    // Mini visualizador
    const viz = document.createElement('div');
    viz.className = 'mini-viz';
    viz.style.cssText = `
      display: inline-flex;
      align-items: flex-end;
      gap: 2px;
      height: 14px;
      margin-left: 8px;
      vertical-align: middle;
    `;

    for (let i = 0; i < 5; i++) {
      const bar = document.createElement('div');
      bar.style.cssText = `
        width: 3px;
        background: #ff2d55;
        border-radius: 1px;
        animation: vizBar ${0.3 + Math.random() * 0.4}s ${Math.random() * 0.3}s ease-in-out infinite alternate;
        height: ${4 + Math.random() * 10}px;
      `;
      viz.appendChild(bar);
    }

    const nameEl = trackEl.querySelector('.track-name');
    if (nameEl) nameEl.appendChild(viz);
    activeBar = viz;

    // Detener después de 30 segundos (simulación)
    clearTimeout(window._trackTimeout);
    window._trackTimeout = setTimeout(() => {
      trackEl.classList.remove('playing');
      if (viz.parentNode) viz.remove();
    }, 30000);
  };

  // CSS del visualizador
  const style = document.createElement('style');
  style.textContent = `
    @keyframes vizBar {
      from { transform: scaleY(0.4); }
      to   { transform: scaleY(1); }
    }
  `;
  document.head.appendChild(style);

  // ——— EFECTO DE SONIDO EN HOVER DE NAV (visual) ———
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.letterSpacing = '0.18em';
      setTimeout(() => { link.style.letterSpacing = ''; }, 200);
    });
  });

  // ——— EASTER EGG: KONAMI CODE → mostrar logo animado ———
  const KONAMI = [38,38,40,40,37,39,37,39,66,65];
  let ki = 0;
  document.addEventListener('keydown', e => {
    if (e.keyCode === KONAMI[ki]) {
      ki++;
      if (ki === KONAMI.length) {
        ki = 0;
        showEasterEgg();
      }
    } else { ki = 0; }
  });

  function showEasterEgg() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.9);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      z-index:9995;cursor:pointer;
      animation:fadeIn 0.5s ease;
    `;
    overlay.innerHTML = `
      <div style="font-family:'Orbitron',monospace;font-size:clamp(2rem,8vw,5rem);
        font-weight:900;color:#ff2d55;text-shadow:0 0 40px #ff2d55;
        animation:glitchTop 1s infinite;letter-spacing:0.3em;text-align:center;">
        VOID SIGNAL
      </div>
      <div style="font-family:'Share Tech Mono',monospace;color:#aaa;margin-top:1rem;font-size:0.9rem;letter-spacing:0.2em;">
        CÓDIGO KONAMI ACTIVADO ◆ LA SEÑAL ES ETERNA
      </div>
      <div style="margin-top:2rem;font-size:0.75rem;color:#555;letter-spacing:0.1em;font-family:'Share Tech Mono',monospace;">
        [click para cerrar]
      </div>
    `;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  }

})();
