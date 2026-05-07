/*
 * Kay Jewelers — Category Nav Block
 *
 * 5 circular thumbnail links: Engagement Rings, Wedding Bands, Necklaces, Earrings, Bracelets
 * Stagger reveal animation on scroll.
 */

const DEFAULT_CATEGORIES = [
  {
    label: 'Engagement Rings',
    count: '2,400+ styles',
    href: '/engagement-rings',
    gradient: 'linear-gradient(135deg,#F5F0E8 0%,#D4C4A8 40%,#B8A882 100%)',
    iconPath: 'M20 8C20 12.4 12 20 12 20C12 20 4 12.4 4 8C4 5.8 5.8 4 8 4C9.6 4 11 4.8 12 6C13 4.8 14.4 4 16 4C18.2 4 20 5.8 20 8Z',
  },
  {
    label: 'Wedding Bands',
    count: '800+ styles',
    href: '/wedding-bands',
    gradient: 'linear-gradient(135deg,#FFF8E8 0%,#D4A840 40%,#B88820 100%)',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z',
  },
  {
    label: 'Necklaces',
    count: '1,200+ styles',
    href: '/necklaces',
    gradient: 'linear-gradient(135deg,#F5E8D5 0%,#C4952A 40%,#A07020 100%)',
    iconPath: 'M12 2C12 2 4 8 4 14c0 3.31 3.58 6 8 6s8-2.69 8-6c0-6-8-12-8-12z',
  },
  {
    label: 'Earrings',
    count: '950+ styles',
    href: '/earrings',
    gradient: 'linear-gradient(135deg,#E8D5F5 0%,#9A5AB8 40%,#7840A0 100%)',
    iconPath: 'M12 2c0 0-4 4-4 8 0 2.21 1.79 4 4 4s4-1.79 4-4c0-4-4-8-4-8zM12 14v8',
  },
  {
    label: 'Bracelets',
    count: '600+ styles',
    href: '/bracelets',
    gradient: 'linear-gradient(135deg,#D5E8F5 0%,#5A8AB8 40%,#3060A0 100%)',
    iconPath: 'M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5',
  },
];

export default function decorate(block) {
  /* ---- 1. Parse custom category data from EDS rows ---- */
  const rows = [...block.querySelectorAll(':scope > div')];
  const customCategories = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim();
      const lower = label.toLowerCase();

      /* Skip meta rows */
      if (lower === 'title' || lower === 'eyebrow' || lower === 'subtitle') return;

      const linkEl    = cells[1].querySelector('a');
      const pictureEl = cells[1].querySelector('picture');
      const imgEl     = cells[1].querySelector('img');

      if (label) {
        customCategories.push({
          label,
          href:       linkEl?.href || `/${label.toLowerCase().replace(/\s+/g, '-')}`,
          picture:    pictureEl   || null,
          imgSrc:     imgEl?.src  || null,
          imgAlt:     imgEl?.alt  || label,
        });
      }
    }
  });

  /* ---- 2. Merge custom into defaults ---- */
  const categories = customCategories.length > 0
    ? customCategories.map((c, i) => ({
        ...DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length],
        ...c,
      }))
    : DEFAULT_CATEGORIES;

  /* ---- 3. Build DOM ---- */
  block.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'category-nav-header';
  header.innerHTML = `
    <span class="category-nav-eyebrow">Explore Our Collections</span>
    <h2 class="category-nav-title">Shop by Category</h2>
  `;

  const grid = document.createElement('div');
  grid.className = 'category-nav-grid';
  grid.setAttribute('role', 'list');
  grid.setAttribute('aria-label', 'Jewelry categories');

  categories.forEach((cat) => {
    const item = document.createElement('a');
    item.className = 'category-nav-item';
    item.href = cat.href;
    item.setAttribute('role', 'listitem');
    item.setAttribute('aria-label', `Shop ${cat.label}`);

    /* Build image content */
    let imageContent;
    if (cat.picture) {
      const pic = cat.picture.cloneNode(true);
      const img = pic.querySelector('img');
      if (img) {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('width', '140');
        img.setAttribute('height', '140');
        img.setAttribute('alt', cat.imgAlt || cat.label);
      }
      imageContent = pic.outerHTML;
    } else if (cat.imgSrc) {
      imageContent = `<img src="${cat.imgSrc}" alt="${cat.imgAlt || cat.label}" loading="lazy" width="140" height="140" />`;
    } else {
      imageContent = `
        <div style="
          width:100%;height:100%;
          background:${cat.gradient};
          display:flex;align-items:center;justify-content:center;
          border-radius:50%;
        ">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity:0.65" aria-hidden="true">
            <path d="${cat.iconPath}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </div>
      `;
    }

    item.innerHTML = `
      <div class="category-nav-circle">${imageContent}</div>
      <span class="category-nav-label">
        ${cat.label}
        ${cat.count ? `<span class="category-nav-count">${cat.count}</span>` : ''}
      </span>
    `;

    grid.append(item);
  });

  block.append(header, grid);

  /* ---- 4. Stagger reveal ---- */
  if ('IntersectionObserver' in window) {
    const items = [...grid.querySelectorAll('.category-nav-item')];

    items.forEach((item) => {
      item.style.opacity   = '0';
      item.style.transform = 'translateY(20px)';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target);
            setTimeout(() => {
              entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              entry.target.style.opacity   = '1';
              entry.target.style.transform = 'translateY(0)';
            }, idx * 80);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '300px 0px 300px 0px' },
    );

    items.forEach((item) => io.observe(item));
  }
}
