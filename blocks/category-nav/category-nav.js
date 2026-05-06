/* Kay Jewelers — Category Nav Block */

const DEFAULT_CATEGORIES = [
  {
    label: 'Engagement Rings',
    count: '2,400+ styles',
    href: '/engagement-rings',
    gradient: 'linear-gradient(135deg, #F5F0E8 0%, #D4C4A8 40%, #B8A882 100%)',
    iconPath: 'M20 8C20 12.4 12 20 12 20C12 20 4 12.4 4 8C4 5.8 5.8 4 8 4C9.6 4 11 4.8 12 6C13 4.8 14.4 4 16 4C18.2 4 20 5.8 20 8Z',
  },
  {
    label: 'Wedding Bands',
    count: '800+ styles',
    href: '/wedding-bands',
    gradient: 'linear-gradient(135deg, #FFF8E8 0%, #D4A840 40%, #B88820 100%)',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z',
  },
  {
    label: 'Necklaces',
    count: '1,200+ styles',
    href: '/necklaces',
    gradient: 'linear-gradient(135deg, #F5E8D5 0%, #C4952A 40%, #A07020 100%)',
    iconPath: 'M12 2C12 2 4 8 4 14C4 17.31 7.58 20 12 20C16.42 20 20 17.31 20 14C20 8 12 2 12 2Z',
  },
  {
    label: 'Earrings',
    count: '950+ styles',
    href: '/earrings',
    gradient: 'linear-gradient(135deg, #E8D5F5 0%, #9A5AB8 40%, #7840A0 100%)',
    iconPath: 'M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2ZM12 14V22',
  },
  {
    label: 'Bracelets',
    count: '600+ styles',
    href: '/bracelets',
    gradient: 'linear-gradient(135deg, #D5E8F5 0%, #5A8AB8 40%, #3060A0 100%)',
    iconPath: 'M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7',
  },
];

export default function decorate(block) {
  // Parse custom category data from EDS block rows
  const rows = [...block.querySelectorAll(':scope > div')];
  const customCategories = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim();
      const linkEl = cells[1].querySelector('a');
      const imgEl = cells[1].querySelector('img');

      if (label && label.toLowerCase() !== 'title' && label.toLowerCase() !== 'eyebrow') {
        customCategories.push({
          label,
          href: linkEl?.href || `/${label.toLowerCase().replace(/\s+/g, '-')}`,
          imgSrc: imgEl?.src || null,
          imgAlt: imgEl?.alt || label,
        });
      }
    }
  });

  const categories = customCategories.length > 0
    ? customCategories.map((c, i) => ({ ...DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length], ...c }))
    : DEFAULT_CATEGORIES;

  block.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.className = 'category-nav-header';
  header.innerHTML = `
    <span class="category-nav-eyebrow">Explore Our Collections</span>
    <h2 class="category-nav-title">Shop by Category</h2>
  `;

  // Grid
  const grid = document.createElement('div');
  grid.className = 'category-nav-grid';
  grid.setAttribute('role', 'list');
  grid.setAttribute('aria-label', 'Jewelry categories');

  categories.forEach((cat, i) => {
    const item = document.createElement('a');
    item.className = 'category-nav-item';
    item.href = cat.href;
    item.setAttribute('role', 'listitem');
    item.setAttribute('aria-label', `Shop ${cat.label}`);

    // Circle with image or SVG placeholder
    const imageContent = cat.imgSrc
      ? `<img src="${cat.imgSrc}" alt="${cat.imgAlt || cat.label}" loading="lazy" width="160" height="160" />`
      : `<div style="
          width:100%;
          height:100%;
          background:${cat.gradient};
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:50%;
        ">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity:0.6" aria-hidden="true">
            <path d="${cat.iconPath}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </div>`;

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

  // Stagger animation on scroll
  if ('IntersectionObserver' in window) {
    const items = grid.querySelectorAll('.category-nav-item');

    items.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = [...items].indexOf(entry.target);
            setTimeout(() => {
              entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, idx * 80);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    items.forEach((item) => io.observe(item));
  }
}
