/*
 * Kay Jewelers — Split Banner Block
 *
 * EDS rows:
 *   eyebrow        | "Crafted for the Moment"
 *   title          | "The Ring That Starts <em>Forever</em>"
 *   body           | body text
 *   feature-title  | "Kay Lifetime Guarantee"
 *   feature-desc   | "Free cleaning, inspection & repair"
 *   cta-text       | "Shop Engagement Rings"
 *   cta-href       | /engagement-rings
 *   image-side     | "right" (optional, defaults to left)
 *   (image parsed from picture/img in a cell)
 */

export default function decorate(block) {
  /* ---- 1. Parse EDS rows ---- */
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      data[key] = {
        text:    cells[1].textContent.trim(),
        html:    cells[1].innerHTML.trim(),
        img:     cells[1].querySelector('img'),
        picture: cells[1].querySelector('picture'),
        link:    cells[1].querySelector('a'),
      };
    }
  });

  /* ---- 2. Resolve values ---- */
  const eyebrow      = data.eyebrow?.text      || 'Crafted for the Moment';
  const title        = data.title?.html         || 'The Ring That<br>Starts <em>Forever</em>';
  const body         = data.body?.text
    || "Every engagement ring at Kay is crafted to tell your unique story. Explore thousands of styles — from timeless solitaires to modern halo settings — all backed by our lifetime guarantee.";
  const ctaText      = data['cta-text']?.text    || 'Shop Engagement Rings';
  const ctaHref      = data['cta-href']?.text    || data['cta-text']?.link?.href || '/engagement-rings';
  const featureTitle = data['feature-title']?.text || 'Kay Lifetime Guarantee';
  const featureDesc  = data['feature-desc']?.text  || 'Free cleaning, inspection & repair';
  const imageOnRight = data['image-side']?.text?.toLowerCase() === 'right';

  /* ---- 3. Layout variant ---- */
  block.innerHTML = '';
  if (imageOnRight) block.classList.add('image-right');

  const inner = document.createElement('div');
  inner.className = 'split-banner-inner';

  /* ---- 4. Image panel ---- */
  const imagePanel = document.createElement('div');
  imagePanel.className = 'split-banner-image';

  const pictureEl = data.image?.picture || block.querySelector('picture');
  const imgEl     = data.image?.img     || block.querySelector('img');

  if (pictureEl) {
    const pic = pictureEl.cloneNode(true);
    const img = pic.querySelector('img');
    if (img) {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('width', '720');
      img.setAttribute('height', '520');
      if (!img.alt) img.alt = 'Kay Jewelers featured piece';
    }
    imagePanel.append(pic);
  } else if (imgEl) {
    const img = imgEl.cloneNode(true);
    img.setAttribute('loading', 'lazy');
    img.setAttribute('width', '720');
    img.setAttribute('height', '520');
    if (!img.alt) img.alt = 'Kay Jewelers featured piece';
    imagePanel.append(img);
  } else {
    /* Gradient placeholder */
    const placeholder = document.createElement('div');
    placeholder.style.cssText = [
      'width:100%', 'height:100%',
      'background:linear-gradient(135deg,#2a1f14 0%,#6b4c35 50%,#9e7a58 100%)',
      'display:flex', 'align-items:center', 'justify-content:center',
    ].join(';');
    placeholder.innerHTML = `
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity:0.3" aria-hidden="true">
        <circle cx="40" cy="40" r="28" stroke="white" stroke-width="1.5" fill="none"/>
        <circle cx="40" cy="40" r="18" stroke="white" stroke-width="1" fill="none" stroke-dasharray="4 3"/>
        <circle cx="40" cy="40" r="5" fill="white" opacity="0.6"/>
        <path d="M40 12L44 24L40 20L36 24L40 12Z" fill="white" opacity="0.8"/>
      </svg>
    `;
    imagePanel.append(placeholder);
  }

  /* ---- 5. Content panel ---- */
  const contentPanel = document.createElement('div');
  contentPanel.className = 'split-banner-content';

  contentPanel.innerHTML = `
    <span class="split-banner-eyebrow">${eyebrow}</span>
    <h2 class="split-banner-title">${title}</h2>
    <p class="split-banner-body">${body}</p>

    <div class="split-banner-feature">
      <div class="split-banner-feature-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2 9H9.5L12 2Z"
            stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="split-banner-feature-text">
        <strong>${featureTitle}</strong>
        <span>${featureDesc}</span>
      </div>
    </div>

    <a href="${ctaHref}" class="split-banner-cta">
      ${ctaText}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
  `;

  inner.append(imagePanel, contentPanel);
  block.append(inner);

  /* ---- 6. Scroll animation for content panel ---- */
  if ('IntersectionObserver' in window) {
    const dir = imageOnRight ? '-1' : '1';
    contentPanel.style.opacity   = '0';
    contentPanel.style.transform = `translateX(${parseInt(dir, 10) * 24}px)`;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
              entry.target.style.opacity   = '1';
              entry.target.style.transform = 'translateX(0)';
            }, 100);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '9999px 0px 9999px 0px' },
    );

    io.observe(contentPanel);
  }
}
