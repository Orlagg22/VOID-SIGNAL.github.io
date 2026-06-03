/* =============================================
   NAV.JS — Navegación entre páginas
   ============================================= */

(function () {
  const pages    = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobLinks = document.querySelectorAll('.mob-link');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');

  // ——— MOSTRAR PÁGINA ———
  window.showPage = function (pageId) {
    pages.forEach(p => {
      p.classList.remove('active');
      p.style.display = 'none';
    });

    const target = document.getElementById(pageId);
    if (target) {
      target.style.display = 'block';
      // force reflow
      void target.offsetWidth;
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Actualizar nav activo
    navLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.page === pageId);
    });

    // Disparar fade-ins
    setTimeout(checkFadeIns, 150);
  };

  // ——— LINKS DE NAV ———
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  mobLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showPage(link.dataset.page);
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // ——— HAMBURGER ———
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // ——— NAVBAR SCROLL ———
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ——— FADE-IN AL SCROLL ———
  window.checkFadeIns = function () {
    const trigger = window.innerHeight * 0.88;
    document.querySelectorAll('.fade-in').forEach(el => {
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', checkFadeIns);
  checkFadeIns();

  // ——— SITE READY ———
  document.addEventListener('siteReady', () => {
    showPage('inicio');
    checkFadeIns();
  });

  // Mostrar inicio por defecto si el loader ya terminó
  if (document.getElementById('loader').classList.contains('done')) {
    showPage('inicio');
  }
})();
