/* Kay Jewelers — Hero Block */

export default function decorate(block) {
  // Parse rows from EDS table
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      const val = cells[1];
      data[key] = val;
    } else if (cells.length === 1) {
      // Single-cell row — could be the image
      const img = cells[0].querySelector('img');
      if (img && !data.image) data.image = img;
    }
  });

  // Extract values with defaults
  const eyebrow = data.eyebrow?.textContent?.trim() || 'Where Love Becomes a Legacy';
  const headline = data.headline?.textContent?.trim() || 'For the Moments\nthat Define Forever';
  const body = data.body?.textContent?.trim()
    || 'Celebrate the milestones that shape your story — whether you\'re asking the biggest question or giving a gift that speaks from the heart.';
  const cta1Text = data['cta-1-text']?.textContent?.trim() || 'Shop Engagement Rings';
  const cta1Href = data['cta-1-href']?.textContent?.trim() || '/engagement-rings';
  const cta2Text = data['cta-2-text']?.textContent?.trim() || 'Find the Perfect Gift';
  const cta2Href = data['cta-2-href']?.textContent?.trim() || '/gifts';
  const insetLabel = data['inset-label']?.textContent?.trim() || 'Our Love Story';

  // Get images
  const allImages = block.querySelectorAll('img');
  const mainImg = allImages[0];
  const insetImg = allImages[1];

  // Build the hero
  const heroHTML = `
    <div class="hero-image-container">
      ${mainImg
        ? `<img
            src="${mainImg.src}"
            alt="${mainImg.alt || 'Couple celebrating their engagement'}"
            loading="eager"
            fetchpriority="high"
            width="1440"
            height="820"
          />`
        : `<div style="
            width:100%;
            height:100%;
            background: linear-gradient(135deg, #2a1f14 0%, #4a3728 35%, #6b4c35 60%, #8b6748 100%);
          "></div>`
      }
    </div>

    <div class="hero-content">
      <div class="hero-text">
        <span class="hero-eyebrow">${eyebrow}</span>
        <h1 class="hero-headline">${headline.replace(/\n/g, '<br>')}</h1>
        <p class="hero-body">${body}</p>
        <div class="hero-ctas">
          <a href="${cta1Href}" class="hero-cta">${cta1Text}</a>
          <a href="${cta2Href}" class="hero-cta">${cta2Text}</a>
        </div>
      </div>
    </div>

    ${insetImg ? `
    <div class="hero-inset">
      <div class="hero-inset-frame">
        <img
          src="${insetImg.src}"
          alt="${insetImg.alt || 'A cherished memory'}"
          loading="lazy"
          width="200"
          height="150"
        />
      </div>
      <span class="hero-inset-label">${insetLabel}</span>
    </div>
    ` : `
    <div class="hero-inset">
      <div class="hero-inset-frame">
        <div style="
          width:100%;
          height:100%;
          background: linear-gradient(135deg, #c4952a 0%, #8b7355 50%, #4a3728 100%);
          display:flex;
          align-items:center;
          justify-content:center;
        ">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity:0.7">
            <path d="M20 34C20 34 6 26 6 16C6 11 10 7 15 7C17.5 7 19.8 8.2 21.3 10.1C22.8 8.2 25.1 7 27.6 7C32.6 7 36.6 11 36.6 16C36.6 26 20 34 20 34Z" stroke="white" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <span class="hero-inset-label">${insetLabel}</span>
    </div>
    `}

    <div class="hero-scroll-hint" aria-hidden="true">
      <span>Scroll</span>
      <div class="hero-scroll-hint-line"></div>
    </div>
  `;

  block.innerHTML = heroHTML;

  // Lazy load the inset image with a slight delay for effect
  const insetFrame = block.querySelector('.hero-inset-frame img');
  if (insetFrame) {
    insetFrame.loading = 'lazy';
  }
}
