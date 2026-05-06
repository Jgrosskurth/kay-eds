/* Kay Jewelers — Split Banner Block */

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      data[key] = {
        text: cells[1].textContent.trim(),
        html: cells[1].innerHTML.trim(),
        img: cells[1].querySelector('img'),
        link: cells[1].querySelector('a'),
      };
    }
  });

  // Content values with defaults
  const eyebrow = data.eyebrow?.text || 'Crafted for the Moment';
  const title = data.title?.html || data.title?.text || 'The Ring That<br>Starts <em>Forever</em>';
  const body = data.body?.text
    || 'Every engagement ring at Kay is crafted to tell your unique story. Explore thousands of styles — from timeless solitaires to modern halo settings — all backed by our lifetime guarantee.';
  const ctaText = data['cta-text']?.text || 'Shop Engagement Rings';
  const ctaHref = data['cta-href']?.text || data['cta-text']?.link?.href || '/engagement-rings';
  const featureTitle = data['feature-title']?.text || 'Kay Lifetime Guarantee';
  const featureDesc = data['feature-desc']?.text || 'Free cleaning, inspection & repair';
  const imageLayout = data['image-side']?.text?.toLowerCase() === 'right' ? 'image-right' : '';

  // Get image
  const imgEl = data.image?.img || block.querySelector('img');
  const imgGradient = 'linear-gradient(135deg, #2a1f14 0%, #6b4c35 50%, #9e7a58 100%)';

  block.innerHTML = '';
  if (imageLayout) block.classList.add(imageLayout);

  const inner = document.createElement('div');
  inner.className = 'split-banner-inner';

  // Image panel
  const imagePanel = document.createElement('div');
  imagePanel.className = 'split-banner-image';

  if (imgEl) {
    const img = document.createElement('img');
    img.src = imgEl.src;
    img.alt = imgEl.alt || 'Kay Jewelers featured piece';
    img.loading = 'lazy';
    img.width = 720;
    img.height = 520;
    imagePanel.append(img);
  } else {
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `width:100%;height:100%;background:${imgGradient};display:flex;align-items:center;justify-content:center;`;
    placeholder.innerHTML = `
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity:0.3">
        <circle cx="40" cy="40" r="28" stroke="white" stroke-width="1.5" fill="none"/>
        <circle cx="40" cy="40" r="18" stroke="white" stroke-width="1" fill="none" stroke-dasharray="4 3"/>
        <circle cx="40" cy="40" r="5" fill="white" opacity="0.6"/>
        <path d="M40 12L44 24L40 20L36 24L40 12Z" fill="white" opacity="0.8"/>
      </svg>
    `;
    imagePanel.append(placeholder);
  }

  // Content panel
  const contentPanel = document.createElement('div');
  contentPanel.className = 'split-banner-content';

  contentPanel.innerHTML = `
    <span class="split-banner-eyebrow">${eyebrow}</span>
    <h2 class="split-banner-title">${title}</h2>
    <p class="split-banner-body">${body}</p>

    <div class="split-banner-feature">
      <div class="split-banner-feature-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
  `;

  inner.append(imagePanel, contentPanel);
  block.append(inner);

  // Scroll animation
  if ('IntersectionObserver' in window) {
    contentPanel.style.opacity = '0';
    contentPanel.style.transform = 'translateX(24px)';

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateX(0)';
            }, 150);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    io.observe(contentPanel);
  }
}
