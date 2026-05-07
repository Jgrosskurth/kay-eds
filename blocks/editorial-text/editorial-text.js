/*
 * Kay Jewelers — Editorial Text Block
 *
 * EDS rows:
 *   eyebrow  | "Our Promise to You"
 *   headline | "Every Kiss Begins with <em>Kay</em>"
 *   body     | paragraph text (may contain HTML)
 *   cta-text | "Our Story"
 *   cta-href | /about
 */

export default function decorate(block) {
  /* ---- 1. Parse content rows ---- */
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      data[key] = {
        text: cells[1].textContent.trim(),
        html: cells[1].innerHTML.trim(),
        link: cells[1].querySelector('a'),
      };
    } else if (cells.length === 1 && !data.body) {
      /* Single-cell row treated as body copy */
      data.body = {
        text: cells[0].textContent.trim(),
        html: cells[0].innerHTML.trim(),
      };
    }
  });

  /* ---- 2. Resolve values ---- */
  const eyebrow = data.eyebrow?.text || 'Our Promise to You';
  const headline = data.headline?.html
    || 'Every Kiss Begins<br>with <em>Kay</em>';
  const body = data.body?.html
    || `<p>For over 100 years, Kay Jewelers has helped people celebrate 
    life's most meaningful moments. From the first "yes" to every 
    anniversary, birthday, and just-because moment — we're here to help 
    you find the piece that speaks from the heart.</p>`;
  const ctaText = data['cta-text']?.text || 'Our Story';
  const ctaHref = data['cta-href']?.text
    || data['cta-text']?.link?.href
    || '/about';

  /* ---- 3. Build ---- */
  block.innerHTML = `
    <div class="editorial-text-inner">

      <div class="editorial-text-ornament" aria-hidden="true">
        <span class="editorial-text-ornament-line"></span>
        <span class="editorial-text-ornament-diamond"></span>
        <span class="editorial-text-ornament-line"></span>
      </div>

      <span class="editorial-text-eyebrow">${eyebrow}</span>

      <h2 class="editorial-text-headline">${headline}</h2>

      <div class="editorial-text-body">${body}</div>

      <a href="${ctaHref}" class="editorial-text-cta">
        ${ctaText}
        <svg
          width="14" height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M2 7H12M8 3L12 7L8 11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>

    </div>
  `;

  /* ---- 4. Scroll-triggered reveal ---- */
  if ('IntersectionObserver' in window) {
    const inner = block.querySelector('.editorial-text-inner');
    inner.style.opacity    = '0';
    inner.style.transform  = 'translateY(24px)';

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
            entry.target.style.opacity    = '1';
            entry.target.style.transform  = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '300px 0px 300px 0px' },
    );

    io.observe(inner);
  }
}
