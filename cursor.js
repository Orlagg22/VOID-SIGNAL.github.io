/* =============================================
   CURSOR.JS — Cursor personalizado
   ============================================= */

(function () {
  const cursor  = document.getElementById('cursor');
  const trail   = document.getElementById('cursor-trail');
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Trail con retardo suave
  function animTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    trail.style.left = trailX + 'px';
    trail.style.top  = trailY + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();

  // Efecto hover en elementos interactivos
  const interactables = 'a, button, .nav-link, .mob-link, .track, .disco-card, .shop-item, .filter-btn, .cta-btn, .ghost-btn, .stream-btn, .tour-btn, .shop-btn, #cart-icon';
  document.querySelectorAll(interactables).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // También para elementos añadidos después
  const observer = new MutationObserver(() => {
    document.querySelectorAll(interactables).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Click ripple
  document.addEventListener('click', e => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position:fixed;
      left:${e.clientX}px;
      top:${e.clientY}px;
      width:6px;height:6px;
      border-radius:50%;
      background:rgba(255,45,85,0.6);
      transform:translate(-50%,-50%);
      pointer-events:none;
      z-index:9999;
      animation:rippleOut 0.5s ease forwards;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });

  // CSS para ripple
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleOut {
      from { transform:translate(-50%,-50%) scale(1); opacity:1; }
      to   { transform:translate(-50%,-50%) scale(8); opacity:0; }
    }
  `;
  document.head.appendChild(style);
})();
