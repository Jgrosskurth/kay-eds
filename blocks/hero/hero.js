/*
 * Kay Jewelers — Hero Block
 *
 * EDS table rows:
 *   eyebrow      | "Where Love Becomes a Legacy"
 *   headline     | "For the Moments that Define Forever"
 *   body         | paragraph text
 *   cta-1-text   | "Shop Engagement Rings"
 *   cta-1-href   | /engagement-rings
 *   cta-2-text   | "Find the Perfect Gift"
 *   cta-2-href   | /gifts
 *   inset-label  | "Our Love Story"
 *   (images parsed from picture/img elements in cells)
 *
 * Design: full-bleed image, text bottom-left, inset photo bottom-right.
 */

export default function decorate(block) {
  /* ---- 1. Parse EDS rows ---- */
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      data[key] = cells[1]; // store element reference
    }
  });

  /* ---- 2. Extract values ---- */
  const eyebrow    = data.eyebrow?.textContent?.trim()    || 'Where Love Becomes a Legacy';
  const headline   = data.headline?.textContent?.trim()   || 'For the Moments\nthat Define Forever';
  const body       = data.body?.textContent?.trim()
    || "Celebrate the milestones that shape your story — whether you're asking the biggest question or giving a gift that speaks from the heart.";
  const cta1Text   = data['cta-1-text']?.textContent?.trim() || 'Shop Engagement Rings';
  const cta1Href   = data['cta-1-href']?.textContent?.trim() || '/engagement-rings';
  const cta2Text   = data['cta-2-text']?.textContent?.trim() || 'Find the Perfect Gift';
  const cta2Href   = data['cta-2-href']?.textContent?.trim() || '/gifts';
  const insetLabel = data['inset-label']?.textContent?.trim() || 'Our Love Story';

  /* ---- 3. Find images (from picture/img elements anywhere in block) ---- */
  const allPictures = [...block.querySelectorAll('picture')];
  const allImgs     = [...block.querySelectorAll('img')];

  // Prefer picture elements; fall back to bare imgs
  const mainPicture  = allPictures[0] || null;
  const insetPicture = allPictures[1] || null;
  const mainImgEl    = mainPicture ? mainPicture.querySelector('img') : allImgs[0];
  const insetImgEl   = insetPicture ? insetPicture.querySelector('img') : allImgs[1];

  /* ---- 4. Build image container HTML ---- */
  let mainImageHTML;
  if (mainPicture) {
    mainPicture.querySelector('img')?.setAttribute('fetchpriority', 'high');
    mainPicture.querySelector('img')?.setAttribute('loading', 'eager');
    mainPicture.querySelector('img')?.setAttribute('width', '1440');
    mainPicture.querySelector('img')?.setAttribute('height', '820');
    mainImageHTML = mainPicture.outerHTML;
  } else if (mainImgEl) {
    mainImgEl.setAttribute('fetchpriority', 'high');
    mainImgEl.setAttribute('loading', 'eager');
    mainImageHTML = mainImgEl.outerHTML;
  } else {
    // Gradient placeholder — warm golden-hour
    mainImageHTML = `<div style="
      width:100%;height:100%;
      background:linear-gradient(135deg,#2a1f14 0%,#4a3728 35%,#6b4c35 60%,#8b6748 100%);
    "></div>`;
  }

  /* ---- 5. Build inset image HTML ---- */
  let insetImageHTML;
  if (insetPicture) {
    const img = insetPicture.querySelector('img');
    if (img) {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('width', '200');
      img.setAttribute('height', '150');
    }
    insetImageHTML = insetPicture.outerHTML;
  } else if (insetImgEl) {
    insetImgEl.setAttribute('loading', 'lazy');
    insetImageHTML = insetImgEl.outerHTML;
  } else {
    // Gold-tone placeholder showing a heart
    insetImageHTML = `<div style="
      width:100%;height:100%;
      background:linear-gradient(135deg,#c4952a 0%,#8b7355 50%,#4a3728 100%);
      display:flex;align-items:center;justify-content:center;
    ">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity:0.7" aria-hidden="true">
        <path d="M20 34C20 34 6 26 6 16C6 11 10 7 15 7C17.5 7 19.8 8.2 21.3 10.1C22.8 8.2 25.1 7 27.6 7C32.6 7 36.6 11 36.6 16C36.6 26 20 34 20 34Z"
          stroke="white" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
      </svg>
    </div>`;
  }

  /* ---- 6. Render ---- */
  block.innerHTML = `
    <div class="hero-image-container" aria-hidden="true">
      ${mainImageHTML}
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

    <div class="hero-inset" aria-label="${insetLabel}">
      <div class="hero-inset-frame">
        ${insetImageHTML}
      </div>
      <span class="hero-inset-label">${insetLabel}</span>
    </div>

    <div class="hero-scroll-hint" aria-hidden="true">
      <span>Scroll</span>
      <div class="hero-scroll-hint-line"></div>
    </div>
  `;
}
