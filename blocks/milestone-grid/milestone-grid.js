/* Kay Jewelers — Milestone Grid Block */

const DEFAULT_MILESTONES = [
  {
    occasion: 'engagement',
    label: 'Engagement',
    sublabel: 'The Beginning',
    href: '/engagement',
    description: 'Start forever with the perfect ring',
    imgSrc: '',
    imgAlt: 'Engagement rings — the beginning of forever',
    gradient: 'linear-gradient(160deg, #3a2416 0%, #7a5c44 55%, #9e7a58 100%)',
  },
  {
    occasion: 'anniversary',
    label: 'Anniversary',
    sublabel: 'Every Year, More Love',
    href: '/gifts/anniversary',
    description: 'Celebrate the years between',
    imgSrc: '',
    imgAlt: 'Anniversary jewelry gifts',
    gradient: 'linear-gradient(160deg, #1e2a3a 0%, #3d506e 55%, #5a7499 100%)',
  },
  {
    occasion: 'birthday',
    label: 'Birthday',
    sublabel: 'Make It Special',
    href: '/gifts/birthday',
    description: 'A gift that shines as bright as they do',
    imgSrc: '',
    imgAlt: 'Birthday jewelry gifts',
    gradient: 'linear-gradient(160deg, #2a1e2a 0%, #6e3d6e 55%, #9a5a9a 100%)',
  },
  {
    occasion: 'just-because',
    label: 'Just Because',
    sublabel: 'No Reason Needed',
    href: '/gifts',
    description: 'Because love doesn\'t need an occasion',
    imgSrc: '',
    imgAlt: 'Everyday jewelry gifts',
    gradient: 'linear-gradient(160deg, #1e2e1e 0%, #3d6e3d 55%, #5a9a5a 100%)',
  },
];

export default function decorate(block) {
  // Parse EDS rows for custom milestone data
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
        link: cells[1].querySelector('a'),
      };
    }
  });

  // Merge custom data into defaults
  const milestones = DEFAULT_MILESTONES.map((m, i) => {
    const imgEl = customData[`image-${i + 1}`]?.img || customData[m.occasion]?.img;
    const linkEl = customData[`href-${i + 1}`] || customData[`${m.occasion}-href`];
    return {
      ...m,
      imgSrc: imgEl?.src || m.imgSrc,
      imgAlt: imgEl?.alt || m.imgAlt,
      href: linkEl?.text || m.href,
    };
  });

  // Section header
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

  // Tile grid
  const grid = document.createElement('div');
  grid.className = 'milestone-grid-tiles';
  grid.setAttribute('role', 'list');

  milestones.forEach((milestone) => {
    const tile = document.createElement('a');
    tile.className = 'milestone-tile';
    tile.href = milestone.href;
    tile.dataset.occasion = milestone.occasion;
    tile.setAttribute('role', 'listitem');
    tile.setAttribute('aria-label', `Shop ${milestone.label} jewelry`);

    const imageHTML = milestone.imgSrc
      ? `<img src="${milestone.imgSrc}" alt="${milestone.imgAlt}" loading="lazy" width="400" height="533" />`
      : `<div style="width:100%;height:100%;background:${milestone.gradient};"></div>`;

    tile.innerHTML = `
      <div class="milestone-tile-image">${imageHTML}</div>
      <div class="milestone-tile-overlay"></div>
      <div class="milestone-tile-content">
        <span class="milestone-tile-label">${milestone.label}</span>
        <span class="milestone-tile-sublabel">${milestone.sublabel}</span>
        <span class="milestone-tile-cta">Shop Now →</span>
      </div>
    `;

    grid.append(tile);
  });

  // CTA row
  const ctaRow = document.createElement('div');
  ctaRow.className = 'milestone-grid-cta-row';
  ctaRow.innerHTML = `<a href="/gifts">View All Occasions →</a>`;

  // Assemble
  block.innerHTML = '';
  block.append(header, grid, ctaRow);

  // Animate tiles on scroll into view
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, i * 80);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    grid.querySelectorAll('.milestone-tile').forEach((tile, i) => {
      tile.style.opacity = '0';
      tile.style.transform = 'translateY(20px)';
      tile.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      io.observe(tile);
    });
  }
}
