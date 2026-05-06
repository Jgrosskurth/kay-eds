/* Kay Jewelers — Footer Block */

const FOOTER_COLUMNS = [
  {
    title: 'Engagement',
    links: [
      { label: 'Engagement Rings', href: '/engagement-rings' },
      { label: 'Wedding Bands', href: '/wedding-bands' },
      { label: 'Bridal Sets', href: '/bridal-sets' },
      { label: 'Diamond Rings', href: '/diamond-rings' },
      { label: 'Create with Kay', href: '/create' },
      { label: 'Ring Sizer', href: '/ring-sizer' },
    ],
  },
  {
    title: 'Jewelry',
    links: [
      { label: 'Necklaces', href: '/necklaces' },
      { label: 'Earrings', href: '/earrings' },
      { label: 'Bracelets', href: '/bracelets' },
      { label: 'Rings', href: '/rings' },
      { label: 'Collections', href: '/collections' },
      { label: 'Sale', href: '/sale' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Book an Appointment', href: '/appointments' },
      { label: 'Custom Design', href: '/custom-design' },
      { label: 'Jewelry Repair', href: '/services/repair' },
      { label: 'Engravables', href: '/engravables' },
      { label: 'Cleaning & Care', href: '/services/care' },
      { label: 'Financing', href: '/financing' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Track My Order', href: '/order-tracking' },
      { label: 'Returns & Exchanges', href: '/returns' },
      { label: 'Vault Rewards', href: '/vault-rewards' },
      { label: 'Find a Store', href: '/store-locator' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/kayjewelers',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/kayjewelers',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>`,
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com/kayjewelers',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 16.24 4.67 19.87 8.44 21.34C8.35 20.59 8.26 19.43 8.44 18.61L9.65 13.52C9.65 13.52 9.3 12.81 9.3 11.75C9.3 10.08 10.27 8.83 11.47 8.83C12.49 8.83 12.98 9.61 12.98 10.54C12.98 11.58 12.33 13.17 12 14.64C11.72 15.88 12.63 16.9 13.85 16.9C16.05 16.9 17.73 14.55 17.73 11.16C17.73 8.15 15.59 6.05 12.5 6.05C8.94 6.05 6.85 8.73 6.85 11.49C6.85 12.52 7.24 13.63 7.72 14.22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/kayjewelers',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.54 6.42A2.78 2.78 0 0020.59 4.5C18.88 4 12 4 12 4S5.12 4 3.41 4.46A2.78 2.78 0 001.46 6.42C1 8.14 1 12 1 12S1 15.86 1.46 17.58A2.78 2.78 0 003.41 19.5C5.12 20 12 20 12 20S18.88 20 20.59 19.54A2.78 2.78 0 0022.54 17.58C23 15.86 23 12 23 12S23 8.14 22.54 6.42Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M9.75 15.02L15.5 12L9.75 8.98V15.02Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,
  },
];

export default function decorate(block) {
  block.innerHTML = '';

  // ---- Newsletter strip ----
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
        <button class="footer-newsletter-btn" type="submit" aria-label="Subscribe to newsletter">
          Subscribe
        </button>
      </form>
    </div>
  `;

  // Form submission
  newsletter.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletter.querySelector('.footer-newsletter-input');
    const btn = newsletter.querySelector('.footer-newsletter-btn');

    if (input.value && input.checkValidity()) {
      btn.textContent = '✓ Subscribed';
      btn.style.background = '#5a9a5a';
      input.value = '';
      input.disabled = true;
      btn.disabled = true;
    } else {
      input.reportValidity();
    }
  });

  // ---- Top footer ----
  const top = document.createElement('div');
  top.className = 'footer-top';

  // Brand column
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
        <a class="footer-social-link" href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label} (opens in new tab)">
          ${s.icon}
        </a>
      `).join('')}
    </nav>

    <div class="footer-app">
      <span class="footer-app-label">Shop the App</span>
      <div class="footer-app-badges">
        <a href="https://apps.apple.com" class="footer-app-badge" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.78 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5Z" stroke="currentColor" stroke-width="1.2"/>
            <path d="M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" stroke="currentColor" stroke-width="1.2"/>
          </svg>
          App Store
        </a>
        <a href="https://play.google.com" class="footer-app-badge" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 20.5V3.5L14 12L3 20.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
            <path d="M3 3.5L14 12M3 20.5L14 12M14 12L20 8.5M14 12L20 15.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          Google Play
        </a>
      </div>
    </div>
  `;

  top.append(brand);

  // Link columns
  FOOTER_COLUMNS.forEach((col) => {
    const column = document.createElement('div');
    column.className = 'footer-column';

    // Accessible accordion toggle for mobile
    const toggle = document.createElement('button');
    toggle.className = 'footer-column-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', `footer-col-${col.title.toLowerCase().replace(/\s+/g, '-')}`);
    toggle.innerHTML = `
      <span class="footer-column-title">${col.title}</span>
      <svg class="footer-column-toggle-icon" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;

    toggle.addEventListener('click', () => {
      const isOpen = column.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen.toString());
    });

    const linkList = document.createElement('ul');
    linkList.className = 'footer-column-links';
    linkList.id = `footer-col-${col.title.toLowerCase().replace(/\s+/g, '-')}`;

    col.links.forEach((link) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${link.href}">${link.label}</a>`;
      linkList.append(li);
    });

    column.append(toggle, linkList);
    top.append(column);
  });

  // ---- Bottom footer ----
  const bottom = document.createElement('div');
  const bottomInner = document.createElement('div');
  bottomInner.className = 'footer-bottom';
  bottomInner.setAttribute('role', 'contentinfo');

  const currentYear = new Date().getFullYear();

  bottomInner.innerHTML = `
    <div class="footer-bottom-legal">
      <p>© ${currentYear} Kay Jewelers. All rights reserved.</p>
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
      <!-- Payment method placeholders -->
      <svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa" style="opacity:0.5">
        <rect x="0.5" y="0.5" width="37" height="21" rx="3.5" stroke="white" stroke-opacity="0.3"/>
        <text x="8" y="16" font-family="serif" font-size="11" font-weight="bold" fill="white" opacity="0.8">VISA</text>
      </svg>
      <svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard" style="opacity:0.5">
        <rect x="0.5" y="0.5" width="37" height="21" rx="3.5" stroke="white" stroke-opacity="0.3"/>
        <circle cx="14" cy="11" r="6" fill="#EB001B" opacity="0.7"/>
        <circle cx="24" cy="11" r="6" fill="#F79E1B" opacity="0.7"/>
        <path d="M19 6.5C20.5 7.5 21.5 9.1 21.5 11C21.5 12.9 20.5 14.5 19 15.5C17.5 14.5 16.5 12.9 16.5 11C16.5 9.1 17.5 7.5 19 6.5Z" fill="#FF5F00" opacity="0.8"/>
      </svg>
      <svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="American Express" style="opacity:0.5">
        <rect x="0.5" y="0.5" width="37" height="21" rx="3.5" stroke="white" stroke-opacity="0.3"/>
        <text x="4" y="15" font-family="sans-serif" font-size="8" font-weight="bold" fill="white" opacity="0.8">AMEX</text>
      </svg>
      <svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PayPal" style="opacity:0.5">
        <rect x="0.5" y="0.5" width="37" height="21" rx="3.5" stroke="white" stroke-opacity="0.3"/>
        <text x="4" y="15" font-family="sans-serif" font-size="8" font-weight="bold" fill="white" opacity="0.8">PayPal</text>
      </svg>
    </div>
  `;

  block.append(newsletter, top, bottomInner);
}
