/*
 * Kay Jewelers — Milestone Grid Block
 *
 * 4-tile grid: Engagement · Anniversary · Birthday · Just Because
 * Full-image squares with label + hover zoom.
 * Tiles fade in with 80ms stagger on IntersectionObserver.
 */

const DEFAULT_MILESTONES = [
  {
    occasion: 'engagement',
    label: 'Engagement',
    sublabel: 'The Beginning',
    href: '/engagement-rings',
    imgAlt: 'Engagement rings — the beginning of forever',
    gradient: 'linear-gradient(160deg,#3a2416 0%,#7a5c44 55%,#9e7a58 100%)',
  },
  {
    occasion: 'anniversary',
    label: 'Anniversary',
    sublabel: 'Every Year, More Love',
    href: '/gifts/anniversary',
    imgAlt: 'Anniversary jewelry gifts',
    gradient: 'linear-gradient(160deg,#1e2a3a 0%,#3d506e 55%,#5a7499 100%)',
  },
  {
    occasion: 'birthday',
    label: 'Birthday',
    sublabel: 'Make It Special',
    href: '/gifts/birthday',
    imgAlt: 'Birthday jewelry gifts',
    gradient: 'linear-gradient(160deg,#2a1e2a 0%,#6e3d6e 55%,#9a5a9a 100%)',
  },
  {
    occasion: 'just-because',
    label: 'Just Because',
    sublabel: 'No Reason Needed',
    href: '/gifts',
    imgAlt: 'Everyday jewelry gifts',
    gradient: 'linear-gradient(160deg,#1e2e1e 0%,#3d6e3d 55%,#5a9a5a 100%)',
  },
];

export default function decorate(block) {
  /* ---- 1. Parse EDS content for custom images/links ---- */
  const rows = [...block.querySelectorAll(':scope > div')];
  const customData = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/[\s/]+/g, '-');
      customData[key] = {
        text: cells[1].textContent.trim(),
        html: cells[1].innerHTML,
        img: cells[1].querySelector('img'),
        picture: cells[1].querySelector('picture'),
        link: cells[1].querySelector('a'),
      };
    }
  });

  /* ---- 2. Merge custom data into defaults ---- */
  const milestones = DEFAULT_MILESTONES.map((m, i) => {
    const imgData  = customData[`image-${i + 1}`]  || customData[m.occasion] || {};
    const linkData = customData[`href-${i + 1}`]   || customData[`${m.occasion}-href`] || {};
    return {
      ...m,
      picture: imgData.picture || null,
      imgSrc:  imgData.img?.src  || '',
      imgAlt:  imgData.img?.alt  || m.imgAlt,
      href:    linkData.text     || linkData.link?.href || m.href,
    };
  });

  /* ---- 3. Header ---- */
  const header = document.createElement('div');
  header.className = 'milestone-grid-header';
  header.innerHTML = `
    <span class="milestone-grid-eyebrow">Shop by Milestone</span>
    <h2 class="milestone-grid-title">Jewelry for Every Chapter</h2>
    <p class="milestone-grid-subtitle">
      Life is made of moments worth celebrating. Find the perfect piece
      for wherever your story takes you.
    </p>
  `;

  /* ---- 4. Tile grid ---- */
  const grid = document.createElement('div');
  grid.className = 'milestone-grid-tiles';
  grid.setAttribute('role', 'list');

  milestones.forEach((m) => {
    const tile = document.createElement('a');
    tile.className = 'milestone-tile';
    tile.href = m.href;
    tile.dataset.occasion = m.occasion;
    tile.setAttribute('role', 'listitem');
    tile.setAttribute('aria-label', `Shop ${m.label} jewelry`);

    /* Image / placeholder */
    let imageHTML;
    if (m.picture) {
      const pic = m.picture.cloneNode(true);
      const img = pic.querySelector('img');
      if (img) {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('width', '400');
        img.setAttribute('height', '533');
        img.setAttribute('alt', m.imgAlt);
      }
      imageHTML = pic.outerHTML;
    } else if (m.imgSrc) {
      imageHTML = `<img src="${m.imgSrc}" alt="${m.imgAlt}" loading="lazy" width="400" height="533" />`;
    } else {
      imageHTML = `<div style="width:100%;height:100%;background:${m.gradient};"></div>`;
    }

    tile.innerHTML = `
      <div class="milestone-tile-image">${imageHTML}</div>
      <div class="milestone-tile-overlay" aria-hidden="true"></div>
      <div class="milestone-tile-content">
        <span class="milestone-tile-label">${m.label}</span>
        <span class="milestone-tile-sublabel">${m.sublabel}</span>
        <span class="milestone-tile-cta">Shop Now →</span>
      </div>
    `;

    grid.append(tile);
  });

  /* ---- 5. CTA row ---- */
  const ctaRow = document.createElement('div');
  ctaRow.className = 'milestone-grid-cta-row';
  ctaRow.innerHTML = `<a href="/gifts">View All Occasions →</a>`;

  /* ---- 6. Assemble ---- */
  block.innerHTML = '';
  block.append(header, grid, ctaRow);

  /* ---- 7. Stagger fade-in animation with IntersectionObserver ---- */
  if ('IntersectionObserver' in window) {
    const tiles = [...grid.querySelectorAll('.milestone-tile')];

    /* Set initial hidden state */
    tiles.forEach((tile) => {
      tile.style.opacity = '0';
      tile.style.transform = 'translateY(20px)';
      tile.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = tiles.indexOf(entry.target);
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, idx * 80);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '9999px 0px 9999px 0px' },
    );

    tiles.forEach((tile) => io.observe(tile));
  }
}
