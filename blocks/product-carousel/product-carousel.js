/* Kay Jewelers — Product Carousel Block */

const SAMPLE_PRODUCTS = [
  {
    id: 'pc-001',
    name: '1 CT. T.W. Diamond Solitaire Engagement Ring in 14K White Gold',
    category: 'Engagement Rings',
    price: 1499,
    originalPrice: null,
    badge: 'Best Seller',
    badgeType: 'bestseller',
    href: '/engagement-rings/1ct-diamond-solitaire',
    swatches: ['#C0C0C0', '#FFD700', '#F5C5A3'],
    imgGradient: 'linear-gradient(145deg, #F0EBE3 0%, #D4C4A8 60%, #B8A882 100%)',
  },
  {
    id: 'pc-002',
    name: 'Diamond Bypass Ring 1/4 CT. T.W. in 10K Rose Gold',
    category: 'Rings',
    price: 399,
    originalPrice: 549,
    badge: 'Sale',
    badgeType: 'sale',
    href: '/rings/diamond-bypass-rose-gold',
    swatches: ['#F5C5A3', '#C0C0C0'],
    imgGradient: 'linear-gradient(145deg, #F5E8D5 0%, #D4A078 60%, #B87850 100%)',
  },
  {
    id: 'pc-003',
    name: 'Open Hearts Diamond Pendant in Sterling Silver',
    category: 'Necklaces',
    price: 149,
    originalPrice: null,
    badge: null,
    href: '/necklaces/open-hearts-pendant',
    swatches: ['#C0C0C0'],
    imgGradient: 'linear-gradient(145deg, #FAFAF8 0%, #E8E0D5 60%, #C8B89A 100%)',
  },
  {
    id: 'pc-004',
    name: 'Diamond Stud Earrings 1/4 CT. T.W. in 14K White Gold',
    category: 'Earrings',
    price: 299,
    originalPrice: null,
    badge: 'New',
    badgeType: 'new',
    href: '/earrings/diamond-studs-14k',
    swatches: ['#C0C0C0', '#FFD700'],
    imgGradient: 'linear-gradient(145deg, #F0EBE3 0%, #C8B89A 60%, #A89070 100%)',
  },
  {
    id: 'pc-005',
    name: 'Diamond Tennis Bracelet 1 CT. T.W. in 10K White Gold',
    category: 'Bracelets',
    price: 799,
    originalPrice: 999,
    badge: 'Sale',
    badgeType: 'sale',
    href: '/bracelets/diamond-tennis',
    swatches: ['#C0C0C0', '#FFD700'],
    imgGradient: 'linear-gradient(145deg, #E8E8F5 0%, #A8A8D4 60%, #8888B8 100%)',
  },
  {
    id: 'pc-006',
    name: 'Wedding Band with Milgrain Detail in 14K Yellow Gold',
    category: 'Wedding Bands',
    price: 549,
    originalPrice: null,
    badge: null,
    href: '/wedding-bands/milgrain-yellow-gold',
    swatches: ['#FFD700', '#C0C0C0', '#F5C5A3'],
    imgGradient: 'linear-gradient(145deg, #FFF8E8 0%, #D4A840 60%, #B88820 100%)',
  },
];

function buildCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('role', 'listitem');

  const priceHTML = product.originalPrice
    ? `<span class="product-card-price-sale">$${product.price.toLocaleString()}</span>
       <span class="product-card-price-original">$${product.originalPrice.toLocaleString()}</span>`
    : `$${product.price.toLocaleString()}`;

  const swatchesHTML = (product.swatches || [])
    .map((color) => `<span class="product-card-swatch" style="background:${color};" title="${color}"></span>`)
    .join('');

  card.innerHTML = `
    <div class="product-card-image">
      <div style="width:100%;height:100%;background:${product.imgGradient};"></div>
      ${product.badge ? `<span class="product-card-badge product-card-badge--${product.badgeType}">${product.badge}</span>` : ''}
      <button
        class="product-card-wishlist"
        aria-label="Add to wishlist: ${product.name}"
        aria-pressed="false"
        data-wishlist-toggle="${product.id}"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 21C12 21 3 14.5 3 8.5C3 5.4 5.4 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.6 3 23 5.4 23 8.5C23 14.5 12 21 12 21Z"
            stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="product-card-info">
      <span class="product-card-category">${product.category}</span>
      <a href="${product.href}" class="product-card-name">${product.name}</a>
      <div class="product-card-price">${priceHTML}</div>
      ${swatchesHTML ? `<div class="product-card-swatch-row" aria-label="Available metals">${swatchesHTML}</div>` : ''}
    </div>
  `;

  card.addEventListener('click', (e) => {
    if (!e.target.closest('.product-card-wishlist')) {
      window.location.href = product.href;
    }
  });

  return card;
}

export default function decorate(block) {
  // Parse block data
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = {};
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      data[key] = cells[1].textContent.trim();
    }
  });

  const title = data.title || 'Best Sellers';
  const eyebrow = data.eyebrow || 'Trending Now';
  const viewAllHref = data['view-all'] || '/jewelry';

  block.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.className = 'product-carousel-header';
  header.innerHTML = `
    <div class="product-carousel-header-left">
      <span class="product-carousel-eyebrow">${eyebrow}</span>
      <h2 class="product-carousel-title">${title}</h2>
    </div>
    <a href="${viewAllHref}" class="product-carousel-view-all">View All →</a>
  `;

  // Wrapper + track
  const wrapper = document.createElement('div');
  wrapper.className = 'product-carousel-wrapper';

  const track = document.createElement('div');
  track.className = 'product-carousel-track';
  track.setAttribute('role', 'list');
  track.setAttribute('aria-label', title);

  SAMPLE_PRODUCTS.forEach((product) => {
    track.append(buildCard(product));
  });

  wrapper.append(track);

  // Navigation
  const nav = document.createElement('div');
  nav.className = 'product-carousel-nav';
  nav.setAttribute('aria-label', 'Carousel navigation');

  const prevBtn = document.createElement('button');
  prevBtn.className = 'product-carousel-btn product-carousel-btn--prev';
  prevBtn.setAttribute('aria-label', 'Previous products');
  prevBtn.disabled = true;
  prevBtn.innerHTML = `
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11 4L6 9L11 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const nextBtn = document.createElement('button');
  nextBtn.className = 'product-carousel-btn product-carousel-btn--next';
  nextBtn.setAttribute('aria-label', 'Next products');
  nextBtn.innerHTML = `
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 4L12 9L7 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  nav.append(prevBtn, nextBtn);

  // Dots
  const dots = document.createElement('div');
  dots.className = 'product-carousel-dots';
  dots.setAttribute('role', 'tablist');
  dots.setAttribute('aria-label', 'Carousel pages');

  block.append(header, wrapper, nav, dots);

  // ---- Carousel logic ----
  const VISIBLE_CARDS = () => {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    if (window.innerWidth < 1200) return 3;
    return 4;
  };

  let currentIndex = 0;

  function getTotalPages() {
    return Math.ceil(SAMPLE_PRODUCTS.length / VISIBLE_CARDS());
  }

  function buildDots() {
    dots.innerHTML = '';
    const pages = getTotalPages();
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = `product-carousel-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Page ${i + 1} of ${pages}`);
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => goTo(i));
      dots.append(dot);
    }
  }

  function updateDots(index) {
    dots.querySelectorAll('.product-carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
  }

  function goTo(index) {
    const cards = track.querySelectorAll('.product-card');
    if (!cards.length) return;

    const visible = VISIBLE_CARDS();
    const maxIndex = Math.max(0, getTotalPages() - 1);
    currentIndex = Math.max(0, Math.min(index, maxIndex));

    const cardWidth = cards[0].offsetWidth;
    const gap = 16;
    const offset = currentIndex * visible * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    updateDots(currentIndex);
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Keyboard arrow navigation
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
    }
  });

  // Recalculate on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      buildDots();
      goTo(0);
    }, 250);
  });

  // Init
  buildDots();
  goTo(0);
}
