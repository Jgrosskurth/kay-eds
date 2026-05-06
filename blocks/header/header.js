/*
 * Kay Jewelers — Header Block
 *
 * Builds desktop nav (left) + stacked logo (center) + icon tray (right).
 * Mobile: hamburger (left) + logo (center) + search/bag (right).
 * Static NAV_ITEMS — in production swap for nav.plain.html fetch.
 */

const NAV_ITEMS = [
  {
    label: 'Engagement + Wedding',
    href: '/engagement-wedding',
    children: [
      { label: 'Engagement Rings', href: '/engagement-rings' },
      { label: 'Wedding Bands', href: '/wedding-bands' },
      { label: 'Bridal Sets', href: '/bridal-sets' },
      { label: 'Diamond Rings', href: '/diamond-rings' },
    ],
  },
  {
    label: 'Jewelry',
    href: '/jewelry',
    children: [
      { label: 'Necklaces', href: '/necklaces' },
      { label: 'Earrings', href: '/earrings' },
      { label: 'Bracelets', href: '/bracelets' },
      { label: 'Rings', href: '/rings' },
      { label: 'Anklets', href: '/anklets' },
    ],
  },
  {
    label: 'Diamonds',
    href: '/diamonds',
    children: [
      { label: 'Diamond Rings', href: '/diamond-rings' },
      { label: 'Diamond Necklaces', href: '/diamond-necklaces' },
      { label: 'Diamond Earrings', href: '/diamond-earrings' },
      { label: 'Loose Diamonds', href: '/loose-diamonds' },
    ],
  },
  {
    label: 'Gifts',
    href: '/gifts',
    children: [
      { label: 'Gifts for Her', href: '/gifts/her' },
      { label: 'Gifts for Him', href: '/gifts/him' },
      { label: 'Gifts Under $100', href: '/gifts/under-100' },
      { label: 'Anniversary Gifts', href: '/gifts/anniversary' },
      { label: 'Birthday Gifts', href: '/gifts/birthday' },
    ],
  },
  {
    label: 'Create with Kay',
    href: '/create',
    children: [
      { label: 'Custom Engagement Rings', href: '/create/engagement' },
      { label: 'Custom Jewelry', href: '/create/jewelry' },
      { label: 'Engravables', href: '/create/engravables' },
    ],
  },
  {
    label: 'Collections',
    href: '/collections',
    children: [
      { label: 'Leo Diamond', href: '/collections/leo-diamond' },
      { label: 'Open Hearts', href: '/collections/open-hearts' },
      { label: 'The Peerless Diamond', href: '/collections/peerless' },
    ],
  },
  { label: 'Sale', href: '/sale', sale: true },
];

/* ---- SVG helpers ---- */
function svg(name) {
  const icons = {
    search: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.5"/>
      <path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    account: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.5"/>
      <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M12 21C12 21 3 14.5 3 8.5C3 5.4 5.4 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.6 3 23 5.4 23 8.5C23 14.5 12 21 12 21Z"
        stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,
    bag: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="1.5"/>
      <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    chevron: `<svg class="nav-chevron" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    chevronRight: `<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  };
  return icons[name] || '';
}

export default function decorate(block) {
  block.innerHTML = '';

  /* ============================================================
     DESKTOP HEADER
     ============================================================ */
  const inner = document.createElement('div');
  inner.className = 'header-inner';

  /* ---- Navigation (left) ---- */
  const navEl = document.createElement('nav');
  navEl.className = 'header-nav';
  navEl.setAttribute('aria-label', 'Main navigation');

  const navList = document.createElement('ul');
  navList.className = 'header-nav-list';
  navList.setAttribute('role', 'menubar');

  NAV_ITEMS.forEach((item) => {
    const li = document.createElement('li');
    li.className = `header-nav-item${item.sale ? ' header-nav-item--sale' : ''}`;
    li.setAttribute('role', 'none');

    const link = document.createElement('a');
    link.className = 'header-nav-link';
    link.href = item.href;
    link.setAttribute('role', 'menuitem');
    if (item.children) {
      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('aria-expanded', 'false');
    }
    link.innerHTML = `${item.label}${item.children ? svg('chevron') : ''}`;

    li.append(link);

    if (item.children) {
      const dropdown = document.createElement('div');
      dropdown.className = 'header-nav-dropdown';
      dropdown.setAttribute('role', 'menu');

      item.children.forEach((child) => {
        const a = document.createElement('a');
        a.href = child.href;
        a.textContent = child.label;
        a.setAttribute('role', 'menuitem');
        dropdown.append(a);
      });

      li.append(dropdown);

      /* aria-expanded management */
      li.addEventListener('mouseenter', () => link.setAttribute('aria-expanded', 'true'));
      li.addEventListener('mouseleave', () => link.setAttribute('aria-expanded', 'false'));
      li.addEventListener('focusin', () => link.setAttribute('aria-expanded', 'true'));
      li.addEventListener('focusout', (e) => {
        if (!li.contains(e.relatedTarget)) link.setAttribute('aria-expanded', 'false');
      });
    }

    navList.append(li);
  });

  navEl.append(navList);

  /* ---- Logo (center) ---- */
  const logoLink = document.createElement('a');
  logoLink.className = 'header-logo';
  logoLink.href = '/';
  logoLink.setAttribute('aria-label', 'Kay Jewelers — Home');
  logoLink.innerHTML = `
    <div class="header-logo-wordmark">
      <span>Kay</span>
      <span>Jewelers</span>
    </div>
  `;

  /* ---- Icons (right) ---- */
  const iconsEl = document.createElement('div');
  iconsEl.className = 'header-icons';

  /* Hamburger (mobile only, prepended to icons) */
  const hamburger = document.createElement('button');
  hamburger.className = 'header-hamburger';
  hamburger.setAttribute('type', 'button');
  hamburger.setAttribute('aria-label', 'Open navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-controls', 'header-mobile-nav');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  iconsEl.append(hamburger);

  /* Action icons */
  [
    { icon: 'search',  label: 'Search',   href: '/search' },
    { icon: 'account', label: 'Account',  href: '/account' },
    { icon: 'heart',   label: 'Wishlist', href: '/wishlist', badgeClass: 'header-wishlist-count' },
    { icon: 'bag',     label: 'Cart',     href: '/cart',     badgeClass: 'header-cart-count' },
  ].forEach(({ icon, label, href, badgeClass }) => {
    const btn = document.createElement('a');
    btn.className = 'header-icon-btn';
    btn.href = href;
    btn.setAttribute('aria-label', label);
    btn.innerHTML = svg(icon);

    if (badgeClass) {
      const badge = document.createElement('span');
      badge.className = `header-icon-badge ${badgeClass}`;
      badge.setAttribute('aria-hidden', 'true');
      badge.hidden = true;
      btn.append(badge);
    }

    iconsEl.append(btn);
  });

  inner.append(navEl, logoLink, iconsEl);
  block.append(inner);

  /* ============================================================
     MOBILE NAV
     ============================================================ */
  const overlay = document.createElement('div');
  overlay.className = 'header-nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const mobileNav = document.createElement('nav');
  mobileNav.className = 'header-mobile-nav';
  mobileNav.id = 'header-mobile-nav';
  mobileNav.setAttribute('aria-label', 'Mobile navigation');
  mobileNav.setAttribute('aria-hidden', 'true');

  /* Mobile nav header */
  const mobileHeader = document.createElement('div');
  mobileHeader.className = 'header-mobile-nav-header';
  mobileHeader.innerHTML = `
    <a href="/" class="header-logo" aria-label="Kay Jewelers — Home">
      <div class="header-logo-wordmark"><span>Kay</span><span>Jewelers</span></div>
    </a>
    <button class="header-mobile-nav-close" type="button" aria-label="Close navigation menu">
      ${svg('close')}
    </button>
  `;

  /* Mobile nav list */
  const mobileList = document.createElement('ul');
  mobileList.className = 'header-mobile-nav-list';

  NAV_ITEMS.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-mobile-nav-item';
    const a = document.createElement('a');
    a.className = `header-mobile-nav-link${item.sale ? ' header-mobile-nav-link--sale' : ''}`;
    a.href = item.href;
    a.innerHTML = `${item.label}${svg('chevronRight')}`;
    li.append(a);
    mobileList.append(li);
  });

  /* Utility links */
  const mobileUtils = document.createElement('div');
  mobileUtils.className = 'header-mobile-utils';
  mobileUtils.innerHTML = `
    <a href="/store-locator">Find a Store</a>
    <a href="/appointments">Book an Appointment</a>
    <a href="/vault-rewards">Vault Rewards</a>
    <a href="/help">Help</a>
  `;

  mobileNav.append(mobileHeader, mobileList, mobileUtils);
  document.body.append(overlay, mobileNav);

  /* ============================================================
     INTERACTIONS
     ============================================================ */
  const closeBtn = mobileNav.querySelector('.header-mobile-nav-close');

  function openMobileNav() {
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', openMobileNav);
  closeBtn.addEventListener('click', closeMobileNav);
  overlay.addEventListener('click', closeMobileNav);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });
}
