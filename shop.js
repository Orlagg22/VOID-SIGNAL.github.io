/* =============================================
   SHOP.JS — Carrito de compras interactivo
   ============================================= */

(function () {
  let cart  = [];
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartPanel = document.getElementById('cart-panel');

  function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = '';

    if (cart.length === 0) {
      cartItems.innerHTML = '<p style="font-size:0.8rem;color:#666;text-align:center;padding:1rem 0;">Carrito vacío</p>';
    } else {
      cart.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'cart-entry';
        div.innerHTML = `
          <span>${item.name}</span>
          <span style="display:flex;align-items:center;gap:0.5rem;">
            $${item.price.toFixed(2)}
            <button onclick="removeFromCart(${i})" style="
              background:none;border:none;color:#ff2d55;font-size:0.8rem;
              cursor:pointer;padding:0;font-family:'Orbitron',monospace;
            ">✕</button>
          </span>
        `;
        cartItems.appendChild(div);
      });
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)} USD`;
  }

  window.addToCart = function (btn, name, price) {
    cart.push({ name, price });
    updateCart();
    btn.classList.add('added');
    btn.textContent = '✓ Añadido';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.textContent = '+ Añadir';
    }, 1500);

    // Animación de burbuja flotando al carrito
    const bubble = document.createElement('div');
    bubble.textContent = '+1';
    bubble.style.cssText = `
      position:fixed;
      left:calc(2rem + 28px);
      bottom:calc(2rem + 28px);
      color:#ff2d55;
      font-family:'Orbitron',monospace;
      font-weight:900;
      font-size:0.85rem;
      pointer-events:none;
      z-index:9000;
      animation:bubbleUp 0.9s ease forwards;
    `;
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 900);
  };

  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCart();
  };

  window.toggleCart = function () {
    cartPanel.classList.toggle('open');
  };

  // Cerrar panel al hacer click fuera
  document.addEventListener('click', e => {
    const float = document.getElementById('cart-float');
    if (float && !float.contains(e.target)) {
      cartPanel.classList.remove('open');
    }
  });

  // CSS de burbuja
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bubbleUp {
      from { transform:translateY(0); opacity:1; }
      to   { transform:translateY(-60px); opacity:0; }
    }
  `;
  document.head.appendChild(style);

  updateCart();
})();
