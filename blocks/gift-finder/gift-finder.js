/*
 * Kay Jewelers — Gift Finder Block
 *
 * Interactive gift filter. Selects by recipient, occasion, price range.
 * Cards animate in on filter change. In production, replace SAMPLE_PRODUCTS
 * with a live product API fetch.
 */

const SAMPLE_PRODUCTS = [
  {
    id: 'gf-001',
    name: 'Diamond Solitaire Engagement Ring in 14K White Gold',
    price: 1299,
    originalPrice: null,
    recipient: 'her',
    occasion: 'engagement',
    priceRange: '1000+',
    badge: null,
    href: '/engagement-rings/diamond-solitaire',
    imgSrc: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 'gf-002',
    name: 'Open Hearts Diamond Necklace by Jane Seymour',
    price: 349,
    originalPrice: 499,
    recipient: 'her',
    occasion: 'anniversary',
    priceRange: '250-500',
    badge: 'Sale',
    href: '/necklaces/open-hearts-diamond',
    imgSrc: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 'gf-003',
    name: '1/5 CT. T.W. Diamond Halo Earrings in 10K Gold',
    price: 189,
    originalPrice: null,
    recipient: 'her',
    occasion: 'birthday',
    priceRange: '100-250',
    badge: 'New',
    href: '/earrings/diamond-halo',
    imgSrc: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 'gf-004',
    name: "Men's Diamond Wedding Band in 10K White Gold",
    price: 599,
    originalPrice: null,
    recipient: 'him',
    occasion: 'anniversary',
    priceRange: '500-1000',
    badge: null,
    href: '/wedding-bands/mens-diamond',
    imgSrc: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 'gf-005',
    name: 'Sterling Silver Heart Locket Necklace',
    price: 79,
    originalPrice: null,
    recipient: 'her',
    occasion: 'just-because',
    priceRange: 'under-100',
    badge: null,
    href: '/necklaces/heart-locket',
    imgSrc: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 'gf-006',
    name: "Children's Diamond Accent Heart Bracelet",
    price: 149,
    originalPrice: null,
    recipient: 'kids',
    occasion: 'birthday',
    priceRange: '100-250',
    badge: null,
    href: '/bracelets/children-heart',
    imgSrc: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 'gf-007',
    name: 'Three-Stone Diamond Anniversary Ring in 14K Rose Gold',
    price: 899,
    originalPrice: 1199,
    recipient: 'her',
    occasion: 'anniversary',
    priceRange: '500-1000',
    badge: 'Sale',
    href: '/rings/three-stone-anniversary',
    imgSrc: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 'gf-008',
    name: 'Personalized Engravable Signet Ring in 10K Gold',
    price: 249,
    originalPrice: null,
    recipient: 'him',
    occasion: 'birthday',
    priceRange: '100-250',
    badge: null,
    href: '/rings/signet-engravable',
    imgSrc: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&q=80&auto=format&fit=crop',
  },
];

function cap(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ---- Build a single product card ---- */
function buildProductCard(product) {
  const card = document.createElement('div');
  card.className = 'gift-product-card';
  card.dataset.recipient  = product.recipient;
  card.dataset.occasion   = product.occasion;
  card.dataset.priceRange = product.priceRange;

  const priceHTML = product.originalPrice
    ? `<span class="gift-product-price-sale">$${product.price.toLocaleString()}</span>
       <span class="gift-product-price-original">$${product.originalPrice.toLocaleString()}</span>`
    : `$${product.price.toLocaleString()}`;

  card.innerHTML = `
    <div class="gift-product-card-image">
      <img src="${product.imgSrc}" alt="${product.name}" loading="eager" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block;" />
      ${product.badge
        ? `<span class="gift-product-badge${product.badge === 'New' ? ' gift-product-badge--new' : ''}">${product.badge}</span>`
        : ''
      }
      <button
        class="gift-product-wishlist"
        type="button"
        aria-label="Add ${product.name} to wishlist"
        aria-pressed="false"
        data-wishlist-id="${product.id}"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M12 21C12 21 3 14.5 3 8.5C3 5.4 5.4 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.6 3 23 5.4 23 8.5C23 14.5 12 21 12 21Z"
            stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="gift-product-info">
      <a href="${product.href}" class="gift-product-name">${product.name}</a>
      <div class="gift-product-price">${priceHTML}</div>
      <span class="gift-product-occasion">${cap(product.occasion)}</span>
    </div>
  `;

  /* Card click → navigate */
  card.addEventListener('click', (e) => {
    if (!e.target.closest('.gift-product-wishlist')) {
      window.location.href = product.href;
    }
  });
  card.style.cursor = 'pointer';

  /* Wishlist toggle */
  const wishlistBtn = card.querySelector('.gift-product-wishlist');
  wishlistBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const pressed = wishlistBtn.getAttribute('aria-pressed') === 'true';
    wishlistBtn.setAttribute('aria-pressed', (!pressed).toString());
  });

  return card;
}

/* ============================================================
   Main decorate
   ============================================================ */
export default function decorate(block) {
  block.innerHTML = '';

  /* ---- Header ---- */
  const header = document.createElement('div');
  header.className = 'gift-finder-header';
  header.innerHTML = `
    <span class="gift-finder-eyebrow">Personalized for You</span>
    <h2 class="gift-finder-title">Find the Perfect Gift</h2>
    <p class="gift-finder-subtitle">
      Tell us a little about who you're shopping for, and we'll help
      you find a piece they'll treasure forever.
    </p>
  `;

  /* ---- Filters ---- */
  const filters = document.createElement('div');
  filters.className = 'gift-finder-filters';
  filters.setAttribute('role', 'search');
  filters.setAttribute('aria-label', 'Gift finder filters');

  filters.innerHTML = `
    <div class="gift-finder-filter-group">
      <label class="gift-finder-filter-label" for="gf-recipient">For Who</label>
      <select class="gift-finder-select" id="gf-recipient" name="recipient">
        <option value="all">Anyone</option>
        <option value="her">Her</option>
        <option value="him">Him</option>
        <option value="kids">Kids</option>
      </select>
    </div>
    <div class="gift-finder-filter-group">
      <label class="gift-finder-filter-label" for="gf-occasion">Occasion</label>
      <select class="gift-finder-select" id="gf-occasion" name="occasion">
        <option value="all">All Occasions</option>
        <option value="engagement">Engagement</option>
        <option value="anniversary">Anniversary</option>
        <option value="birthday">Birthday</option>
        <option value="just-because">Just Because</option>
      </select>
    </div>
    <div class="gift-finder-filter-group">
      <label class="gift-finder-filter-label" for="gf-price">Price Range</label>
      <select class="gift-finder-select" id="gf-price" name="price">
        <option value="all">Any Budget</option>
        <option value="under-100">Under $100</option>
        <option value="100-250">$100 – $250</option>
        <option value="250-500">$250 – $500</option>
        <option value="500-1000">$500 – $1,000</option>
        <option value="1000+">$1,000+</option>
      </select>
    </div>
    <button class="gift-finder-search-btn" type="button" aria-label="Find gifts">
      Find Gifts
    </button>
  `;

  /* ---- Results ---- */
  const results = document.createElement('div');
  results.className = 'gift-finder-results';

  const resultsHeader = document.createElement('div');
  resultsHeader.className = 'gift-finder-results-header';
  resultsHeader.innerHTML = `
    <h3 class="gift-finder-results-title">Gifts They'll Love</h3>
    <span class="gift-finder-results-count">${SAMPLE_PRODUCTS.length} items</span>
  `;

  const productGrid = document.createElement('div');
  productGrid.className = 'gift-finder-product-grid';
  productGrid.setAttribute('role', 'list');
  productGrid.setAttribute('aria-live', 'polite');
  productGrid.setAttribute('aria-label', 'Gift results');

  /* ---- Render products with stagger animation ---- */
  function renderProducts(filtered) {
    productGrid.innerHTML = '';

    const countEl = resultsHeader.querySelector('.gift-finder-results-count');
    if (countEl) countEl.textContent = `${filtered.length} item${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'gift-finder-empty';
      empty.innerHTML = `
        <h3>No gifts found</h3>
        <p>Try adjusting your filters to discover more beautiful options.</p>
        <a href="/gifts" class="editorial-text-cta" style="margin-top:8px">Shop All Gifts</a>
      `;
      productGrid.append(empty);
      return;
    }

    filtered.forEach((product) => {
      const card = buildProductCard(product);
      card.setAttribute('role', 'listitem');
      productGrid.append(card);
    });

    /* Stagger fade-in */
    [...productGrid.querySelectorAll('.gift-product-card')].forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(12px)';
      requestAnimationFrame(() => {
        setTimeout(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.25s ease, border-color 0.25s ease';
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        }, i * 55);
      });
    });
  }

  /* Initial render */
  renderProducts(SAMPLE_PRODUCTS);

  /* ---- Filter logic ---- */
  function applyFilters() {
    const recipient = filters.querySelector('#gf-recipient').value;
    const occasion  = filters.querySelector('#gf-occasion').value;
    const price     = filters.querySelector('#gf-price').value;

    const filtered = SAMPLE_PRODUCTS.filter((p) => {
      if (recipient !== 'all' && p.recipient !== recipient) return false;
      if (occasion  !== 'all' && p.occasion  !== occasion)  return false;
      if (price     !== 'all' && p.priceRange !== price)     return false;
      return true;
    });

    renderProducts(filtered);
  }

  const searchBtn = filters.querySelector('.gift-finder-search-btn');
  searchBtn.addEventListener('click', applyFilters);

  /* Live filter on select change */
  let filterTimer;
  ['#gf-recipient', '#gf-occasion', '#gf-price'].forEach((sel) => {
    filters.querySelector(sel).addEventListener('change', () => {
      clearTimeout(filterTimer);
      filterTimer = setTimeout(applyFilters, 180);
    });
  });

  /* ---- CTA row ---- */
  const ctaRow = document.createElement('div');
  ctaRow.className = 'gift-finder-cta-row';
  ctaRow.innerHTML = `<a href="/gifts">Shop All Gifts →</a>`;

  results.append(resultsHeader, productGrid);
  block.append(header, filters, results, ctaRow);
}
