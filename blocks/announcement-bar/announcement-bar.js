/*
 * Kay Jewelers — Announcement Bar Block
 *
 * EDS table format (key-value rows):
 * | Announcement Bar | |
 * |---|---|
 * | message        | Limited time only! 30% off Travel |
 * | dropdown-title | 30% Off Travel Jewelry            |
 * | dropdown-body  | Your next adventure deserves...   |
 * | promo-code     | TRAVEL30                          |
 * | dropdown-cta   | Shop Travel Jewelry               |
 * | dropdown-href  | /jewelry/travel                   |
 *
 * Renders: cream bar, left/right utility nav, center promo dropdown.
 */

export default function decorate(block) {
  /* ---- 1. Parse EDS key-value rows ---- */
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      // Preserve innerHTML for rich text values; also store plain text
      data[key] = {
        html: cells[1].innerHTML.trim(),
        text: cells[1].textContent.trim(),
      };
    }
  });

  /* ---- 2. Resolve content with fallbacks ---- */
  const message       = data.message?.text       || 'Limited time only! 30% off Travel';
  const dropdownTitle = data['dropdown-title']?.text || '30% Off Travel Jewelry';
  const dropdownBody  = data['dropdown-body']?.html
    || 'Save on our beautiful selection of travel-ready jewelry. Use code at checkout for your exclusive discount.';
  const dropdownCode  = data['promo-code']?.text  || 'TRAVEL30';
  const dropdownCta   = data['dropdown-cta']?.text || 'Shop Travel Jewelry';
  const dropdownHref  = data['dropdown-href']?.text || '/jewelry/travel';

  /* ---- 3. Build HTML ---- */
  block.innerHTML = `
    <div class="announcement-bar-inner">

      <nav class="announcement-bar-left" aria-label="Store utilities">
        <a href="/store-locator">Find a Store</a>
        <a href="/help">Help</a>
      </nav>

      <div class="announcement-bar-center">
        <button
          class="announcement-bar-trigger"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="announcement-dropdown"
          type="button"
        >
          <span class="announcement-bar-message">${message}</span>
          <svg
            class="chevron"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            width="10"
            height="10"
          >
            <path
              d="M2 3.5L5 6.5L8 3.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div
          class="announcement-bar-dropdown"
          id="announcement-dropdown"
          role="dialog"
          aria-label="Promotional offer details"
          aria-modal="false"
        >
          <h3>${dropdownTitle}</h3>
          <div class="dropdown-code" aria-label="Promo code: ${dropdownCode}">${dropdownCode}</div>
          <div>${dropdownBody}</div>
          <a href="${dropdownHref}" class="dropdown-cta">${dropdownCta} →</a>
        </div>
      </div>

      <nav class="announcement-bar-right" aria-label="Account utilities">
        <a href="/appointments">Book an Appointment</a>
        <a href="/vault-rewards">Vault Rewards</a>
      </nav>

    </div>
  `;

  /* ---- 4. Dropdown interactions ---- */
  const trigger  = block.querySelector('.announcement-bar-trigger');
  const dropdown = block.querySelector('.announcement-bar-dropdown');

  function openDropdown() {
    trigger.setAttribute('aria-expanded', 'true');
    trigger.classList.add('open');
    dropdown.classList.add('open');
  }

  function closeDropdown() {
    trigger.setAttribute('aria-expanded', 'false');
    trigger.classList.remove('open');
    dropdown.classList.remove('open');
  }

  function toggleDropdown() {
    if (dropdown.classList.contains('open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  /* Toggle on click */
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  /* Close on outside click */
  document.addEventListener('click', (e) => {
    if (!block.contains(e.target)) closeDropdown();
  });

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
      trigger.focus();
    }
  });

  /* Prevent dropdown clicks from bubbling out */
  dropdown.addEventListener('click', (e) => e.stopPropagation());

  /* Trap focus within dropdown when open (simple: close on Tab out) */
  dropdown.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusable = [...dropdown.querySelectorAll('a, button')];
      const last = focusable[focusable.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        closeDropdown();
        trigger.focus();
      }
    }
  });
}
