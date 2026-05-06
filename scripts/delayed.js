/* Kay Jewelers — Delayed scripts (loaded after page is interactive) */

/**
 * Deferred third-party integrations and analytics.
 * Runs ~3s after page load to avoid blocking LCP/FID.
 */

// ============================================================
// INTERSECTION OBSERVER — animate-on-scroll
// ============================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
}

// ============================================================
// WISHLIST — localStorage persistence
// ============================================================
function initWishlist() {
  const STORAGE_KEY = 'kay-wishlist';

  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveWishlist(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function updateWishlistCount() {
    const count = getWishlist().length;
    const badge = document.querySelector('.header-wishlist-count');
    if (badge) {
      badge.textContent = count;
      badge.hidden = count === 0;
    }
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-wishlist-toggle]');
    if (!btn) return;

    const productId = btn.dataset.wishlistToggle;
    const list = getWishlist();
    const idx = list.indexOf(productId);

    if (idx === -1) {
      list.push(productId);
      btn.classList.add('wishlisted');
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('aria-label', 'Remove from wishlist');
    } else {
      list.splice(idx, 1);
      btn.classList.remove('wishlisted');
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Add to wishlist');
    }

    saveWishlist(list);
    updateWishlistCount();
  });

  // Hydrate wishlist state on load
  const list = getWishlist();
  list.forEach((id) => {
    const btn = document.querySelector(`[data-wishlist-toggle="${id}"]`);
    if (btn) {
      btn.classList.add('wishlisted');
      btn.setAttribute('aria-pressed', 'true');
    }
  });

  updateWishlistCount();
}

// ============================================================
// MINI CART — localStorage cart count
// ============================================================
function initCartCount() {
  const STORAGE_KEY = 'kay-cart';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"items":[]}');
    } catch {
      return { items: [] };
    }
  }

  function updateCartBadge() {
    const cart = getCart();
    const count = cart.items.reduce((sum, item) => sum + (item.qty || 1), 0);
    const badge = document.querySelector('.header-cart-count');
    if (badge) {
      badge.textContent = count;
      badge.hidden = count === 0;
    }
  }

  updateCartBadge();
  window.addEventListener('storage', updateCartBadge);
}

// ============================================================
// BACK-TO-TOP button
// ============================================================
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .back-to-top {
      position: fixed;
      bottom: 32px;
      right: 32px;
      width: 44px;
      height: 44px;
      background: var(--color-primary);
      color: var(--color-white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      z-index: 500;
      border: none;
      box-shadow: 0 2px 12px rgba(26,26,26,0.2);
    }
    .back-to-top.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .back-to-top:hover {
      background: var(--color-accent);
    }
    @media (max-width: 768px) {
      .back-to-top { bottom: 20px; right: 16px; }
    }
  `;
  document.head.append(style);
  document.body.append(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// PERFORMANCE ANALYTICS stub
// ============================================================
function initAnalytics() {
  // Web vitals reporting stub — replace with actual analytics
  if ('performance' in window && 'getEntriesByType' in performance) {
    window.addEventListener('load', () => {
      const [nav] = performance.getEntriesByType('navigation');
      if (nav) {
        // eslint-disable-next-line no-console
        console.debug('[Kay] Page load timing:', {
          ttfb: Math.round(nav.responseStart - nav.requestStart),
          domContent: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
          load: Math.round(nav.loadEventEnd - nav.startTime),
        });
      }
    });
  }
}

// ============================================================
// INIT
// ============================================================
initScrollAnimations();
initWishlist();
initCartCount();
initBackToTop();
initAnalytics();
