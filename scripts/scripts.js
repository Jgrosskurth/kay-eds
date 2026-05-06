/* Kay Jewelers — Main Scripts Entry Point */

import {
  decorateMain,
  loadBlocks,
  loadCSS,
  getLCPCandidate,
} from './aem.js';

/**
 * Loads everything needed to display the above-the-fold content.
 * @param {Element} doc
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await waitForLCP(main);
  }
}

/**
 * Loads everything that doesn't need to be loaded eagerly.
 * @param {Element} doc
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  if (hash) {
    const el = doc.getElementById(hash.substring(1));
    if (el) el.scrollIntoView();
  }

  loadCSS('/styles/lazy-styles.css');
  loadFontsAsync();
}

/**
 * Loads everything that happens after lazy loading.
 * @param {Element} doc
 */
function loadDelayed(doc) {
  // Performance: load non-critical scripts after 3s idle
  window.setTimeout(() => {
    import('./delayed.js').catch(() => {});
  }, 3000);
}

/**
 * Applies template and theme classes from metadata.
 */
function decorateTemplateAndTheme() {
  const template = getMetadata('template');
  if (template) {
    document.body.classList.add(toClassName(template));
  }
  const theme = getMetadata('theme');
  if (theme) {
    document.body.classList.add(toClassName(theme));
  }
}

/**
 * Reads metadata from head.
 * @param {string} name
 */
function getMetadata(name) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = document.head.querySelector(`meta[${attr}="${name}"]`);
  return meta?.content ?? '';
}

/**
 * Converts a string to a CSS-safe class name.
 * @param {string} str
 */
function toClassName(str) {
  return str
    .toLowerCase()
    .replace(/[^0-9a-z]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Waits for the LCP element to load.
 * @param {Element} main
 */
async function waitForLCP(main) {
  const lcpEl = getLCPCandidate();
  if (!lcpEl) return;

  if (lcpEl.tagName === 'IMG' && !lcpEl.complete) {
    await new Promise((resolve) => {
      lcpEl.addEventListener('load', resolve, { once: true });
      lcpEl.addEventListener('error', resolve, { once: true });
    });
  }
}

/**
 * Loads fonts asynchronously after LCP.
 */
function loadFontsAsync() {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // fonts already linked in head.html via rel=preconnect
    // just ensure the CSS loads
    loadCSS('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&display=swap');
  }
}

/**
 * Setup global event delegation for warm interactive touches.
 */
function setupGlobalEvents() {
  // Smooth hover elevation on product cards
  document.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.product-card');
    if (card) card.classList.add('hovered');
  });
  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.product-card');
    if (card) card.classList.remove('hovered');
  });
}

// ============================================================
// MAIN EXECUTION
// ============================================================
(async function init() {
  setupGlobalEvents();
  await loadEager(document);
  await loadLazy(document);
  loadDelayed(document);
})();
