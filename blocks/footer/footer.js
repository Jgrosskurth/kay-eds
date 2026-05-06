/*
 * Kay Jewelers — Footer Block
 *
 * Sections:
 *  - Newsletter strip
 *  - Brand column: KAY / JEWELERS wordmark, tagline, social, app badges
 *  - 4 link columns with mobile accordion
 *  - Bottom bar: copyright, legal links, payment icons
 */

const FOOTER_COLUMNS = [
  {
    title: 'Engagement',
    links: [
      { label: 'Engagement Rings', href: '/engagement-rings' },
      { label: 'Wedding Bands',    href: '/wedding-bands' },
      { label: 'Bridal Sets',      href: '/bridal-sets' },
      { label: 'Diamond Rings',    href: '/diamond-rings' },
      { label: 'Create with Kay',  href: '/create' },
      { label: 'Ring Sizer',       href: '/ring-sizer' },
    ],
  },
  {
    title: 'Jewelry',
    links: [
      { label: 'Necklaces',   href: '/necklaces' },
      { label: 'Earrings',    href: '/earrings' },
      { label: 'Bracelets',   href: '/bracelets' },
      { label: 'Rings',       href: '/rings' },
      { label: 'Collections', href: '/collections' },
      { label: 'Sale',        href: '/sale' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Book an Appointment', href: '/appointments' },
      { label: 'Custom Design',       href: '/custom-design' },
      { label: 'Jewelry Repair',      href: '/services/repair' },
      { label: 'Engravables',         href: '/engravables' },
      { label: 'Cleaning & Care',     href: '/services/care' },
      { label: 'Financing',           href: '/financing' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Help Center',         href: '/help' },
      { label: 'Track My Order',      href: '/order-tracking' },
      { label: 'Returns & Exchanges', href: '/returns' },
      { label: 'Vault Rewards',       href: '/vault-rewards' },
      { label: 'Find a Store',        href: '/store-locator' },
      { label: 'Contact Us',          href: '/contact' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/kayjewelers',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/kayjewelers',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>`,
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com/kayjewelers',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.67 7.87 6.44 9.34-.09-.75-.18-1.91 0-2.73l1.21-5.09s-.3-.71-.3-1.77c0-1.66.97-2.91 2.17-2.91 1.02 0 1.51.77 1.51 1.69 0 1.03-.66 2.57-1 3.99-.29 1.24.6 2.25 1.78 2.25 2.14 0 3.79-2.25 3.79-5.5 0-2.87-2.06-4.88-5-4.88C9 6.38 6.9 9.03 6.9 11.8c0 1.03.4 2.14.89 2.74" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/kayjewelers',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M22.54 6.42A2.78 2.78 0 0020.59 4.5C18.88 4 12 4 12 4S5.12 4 3.41 4.46A2.78 2.78 0 001.46 6.42C1 8.14 1 12 1 12s0 3.86.46 5.58A2.78 2.78 0 003.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.46A2.78 2.78 0 0022.54 17.58C23 15.86 23 12 23 12s0-3.86-.46-5.58z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M9.75 15.02L15.5 12l-5.75-3.02v6.04z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,
  },
];

export default function decorate(block) {
  block.innerHTML = '';

  /* ============================================================
     NEWSLETTER STRIP
     ============================================================ */
  const newsletter = document.createElement('div');
  newsletter.className = 'footer-newsletter';
  newsletter.innerHTML = `
    <div class="footer-newsletter-inner">
      <div class="footer-newsletter-copy">
        <h3>Join the Kay Family</h3>
        <p>Be first to hear about new arrivals, exclusive events, and special offers.</p>
      </div>
      <form class="footer-newsletter-form" action="/newsletter" method="post" novalidate>
        <input
          class="footer-newsletter-input"
          type="email"
          name="email"
          placeholder="Enter your email address"
          aria-label="Email address for newsletter"
          required
          autocomplete="email"
        />
        <button class="footer-newsletter-btn" type="submit">Subscribe</button>
      </form>
    </div>
  `;

  newsletter.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletter.querySelector('.footer-newsletter-input');
    const btn   = newsletter.querySelector('.footer-newsletter-btn');
    if (input.value && input.checkValidity()) {
      btn.textContent     = '✓ Subscribed';
      btn.style.background = '#5a9a5a';
      btn.style.borderColor = '#5a9a5a';
      btn.style.color      = '#fff';
      input.value   = '';
      input.disabled = true;
      btn.disabled   = true;
    } else {
      input.reportValidity();
    }
  });

  /* ============================================================
     TOP (brand + columns)
     ============================================================ */
  const top = document.createElement('div');
  top.className = 'footer-top';

  /* ---- Brand column ---- */
  const brand = document.createElement('div');
  brand.className = 'footer-brand';
  brand.innerHTML = `
    <a href="/" class="footer-logo" aria-label="Kay Jewelers — Home">
      <div class="footer-logo-wordmark">
        <span>Kay</span>
        <span>Jewelers</span>
      </div>
    </a>

    <p class="footer-tagline">Every kiss begins with Kay</p>

    <nav class="footer-social" aria-label="Social media links">
      ${SOCIAL_LINKS.map((s) => `
        <a class="footer-social-link"
           href="${s.href}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="${s.label} (opens in new tab)">
          ${s.icon}
        </a>
      `).join('')}
    </nav>

    <div class="footer-app">
      <span class="footer-app-label">Shop the App</span>
      <div class="footer-app-badges">
        <a href="https://apps.apple.com" class="footer-app-badge"
           target="_blank" rel="noopener noreferrer"
           aria-label="Download on the App Store">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.83z" stroke="currentColor" stroke-width="1.2"/>
            <path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.14-1.15.42-2.35 1.05-3.11z" stroke="currentColor" stroke-width="1.2"/>
          </svg>
          App Store
        </a>
        <a href="https://play.google.com" class="footer-app-badge"
           target="_blank" rel="noopener noreferrer"
           aria-label="Get it on Google Play">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M3 20.5V3.5L14 12 3 20.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
            <path d="M3 3.5L14 12M3 20.5L14 12M14 12l6-3.5M14 12l6 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          Google Play
        </a>
      </div>
    </div>
  `;

  top.append(brand);

  /* ---- Link columns ---- */
  FOOTER_COLUMNS.forEach((col) => {
    const column = document.createElement('div');
    column.className = 'footer-column';

    const colId = `footer-col-${col.title.toLowerCase().replace(/\s+/g, '-')}`;

    const toggle = document.createElement('button');
    toggle.className = 'footer-column-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', colId);
    toggle.innerHTML = `
      <span class="footer-column-title">${col.title}</span>
      <svg class="footer-column-toggle-icon" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;

    toggle.addEventListener('click', () => {
      /* Only toggle on mobile (accordion behavior) */
      if (window.innerWidth >= 768) return;
      const isOpen = column.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen.toString());
    });

    const linkList = document.createElement('ul');
    linkList.className = 'footer-column-links';
    linkList.id = colId;

    col.links.forEach((link) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${link.href}">${link.label}</a>`;
      linkList.append(li);
    });

    column.append(toggle, linkList);
    top.append(column);
  });

  /* ============================================================
     BOTTOM BAR
     ============================================================ */
  const bottomBar = document.createElement('div');
  bottomBar.className = 'footer-bottom';

  const year = new Date().getFullYear();

  bottomBar.innerHTML = `
    <div class="footer-bottom-legal">
      <p style="margin:0">© ${year} Kay Jewelers. All rights reserved.</p>
      <span class="divider" aria-hidden="true"></span>
      <a href="/privacy-policy">Privacy Policy</a>
      <span class="divider" aria-hidden="true"></span>
      <a href="/terms">Terms of Use</a>
      <span class="divider" aria-hidden="true"></span>
      <a href="/accessibility">Accessibility</a>
      <span class="divider" aria-hidden="true"></span>
      <a href="/sitemap">Sitemap</a>
    </div>

    <div class="footer-payment-icons" aria-label="Accepted payment methods">
      <svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa" role="img" style="opacity:.45">
        <rect x=".5" y=".5" width="37" height="21" rx="3.5" stroke="white" stroke-opacity=".3"/>
        <text x="8" y="16" font-family="serif" font-size="11" font-weight="bold" fill="white" opacity=".9">VISA</text>
      </svg>
      <svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard" role="img" style="opacity:.45">
        <rect x=".5" y=".5" width="37" height="21" rx="3.5" stroke="white" stroke-opacity=".3"/>
        <circle cx="14" cy="11" r="6" fill="#EB001B" opacity=".75"/>
        <circle cx="24" cy="11" r="6" fill="#F79E1B" opacity=".75"/>
        <path d="M19 6.5c1.5 1 2.5 2.6 2.5 4.5s-1 3.5-2.5 4.5c-1.5-1-2.5-2.6-2.5-4.5s1-3.5 2.5-4.5z" fill="#FF5F00" opacity=".85"/>
      </svg>
      <svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="American Express" role="img" style="opacity:.45">
        <rect x=".5" y=".5" width="37" height="21" rx="3.5" stroke="white" stroke-opacity=".3"/>
        <text x="4" y="15" font-family="sans-serif" font-size="8" font-weight="bold" fill="white" opacity=".85">AMEX</text>
      </svg>
      <svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PayPal" role="img" style="opacity:.45">
        <rect x=".5" y=".5" width="37" height="21" rx="3.5" stroke="white" stroke-opacity=".3"/>
        <text x="4" y="15" font-family="sans-serif" font-size="8" font-weight="bold" fill="white" opacity=".85">PayPal</text>
      </svg>
    </div>
  `;

  block.append(newsletter, top, bottomBar);
}
