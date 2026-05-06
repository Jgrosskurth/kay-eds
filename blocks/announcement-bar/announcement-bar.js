/* Kay Jewelers — Announcement Bar Block */

export default function decorate(block) {
  // Parse content rows from EDS table format
  const rows = [...block.querySelectorAll(':scope > div')];
  const data = {};
  rows.forEach((row) => {
    const [key, val] = [...row.children];
    if (key && val) {
      data[key.textContent.trim().toLowerCase()] = val.innerHTML.trim();
    }
  });

  const message = data.message || 'Limited time only! 30% off Travel';
  const dropdownTitle = data['dropdown-title'] || '30% Off Travel Jewelry';
  const dropdownBody = data['dropdown-body'] || 'Save on our beautiful selection of travel-ready jewelry. Use code at checkout for your exclusive discount.';
  const dropdownCode = data['promo-code'] || 'TRAVEL30';
  const dropdownCta = data['dropdown-cta'] || 'Shop Travel Jewelry';
  const dropdownCtaHref = data['dropdown-href'] || '/jewelry/travel';

  // Build the inner structure
  block.innerHTML = `
    <div class="announcement-bar-inner">
      <div class="announcement-bar-left" role="navigation" aria-label="Utility navigation left">
        <a href="/store-locator">Find a Store</a>
        <a href="/help">Help</a>
      </div>

      <div class="announcement-bar-center">
        <button
          class="announcement-bar-trigger"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="announcement-dropdown"
        >
          <span class="announcement-bar-message">${message}</span>
          <svg class="chevron" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div
          class="announcement-bar-dropdown"
          id="announcement-dropdown"
          role="dialog"
          aria-label="Offer details"
        >
          <h3>${dropdownTitle}</h3>
          <div class="dropdown-code">${dropdownCode}</div>
          <p>${dropdownBody}</p>
          <a href="${dropdownCtaHref}" class="dropdown-cta">${dropdownCta} →</a>
        </div>
      </div>

      <div class="announcement-bar-right" role="navigation" aria-label="Utility navigation right">
        <a href="/appointments">Book an Appointment</a>
        <a href="/vault-rewards">Vault Rewards</a>
      </div>
    </div>
  `;

  // Toggle dropdown
  const trigger = block.querySelector('.announcement-bar-trigger');
  const dropdown = block.querySelector('.announcement-bar-dropdown');

  function openDropdown() {
    trigger.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    dropdown.classList.add('open');
  }

  function closeDropdown() {
    trigger.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    dropdown.classList.remove('open');
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    isOpen ? closeDropdown() : openDropdown();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!block.contains(e.target)) closeDropdown();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown();
  });

  // Prevent dropdown clicks from bubbling to document
  dropdown.addEventListener('click', (e) => e.stopPropagation());
}
