// Mounts a pattern's HTML, CSS and optional behavior into a host element.
// Styles are injected once per pattern id and shared by every instance.
import { TOKENS_CSS } from './patterns/tokens.js';

const injected = new Set();

function ensureStyle(id, css) {
  if (injected.has(id)) return;
  const style = document.createElement('style');
  style.dataset.pattern = id;
  style.textContent = css;
  document.head.append(style);
  injected.add(id);
}

/** Returns a cleanup function. Safe to call repeatedly on the same host. */
export function mountPreview(host, pattern, { theme = 'dark', interactive = true } = {}) {
  ensureStyle('tokens', TOKENS_CSS);
  ensureStyle(pattern.id, pattern.css);
  host.innerHTML = pattern.html;
  const root = host.querySelector('.pl');
  if (root && theme === 'light') root.dataset.plTheme = 'light';
  let cleanup = null;
  if (interactive && pattern.mount && root) {
    try { cleanup = pattern.mount(root) || null; } catch (error) { console.error(`demo ${pattern.id}`, error); }
  }
  return () => {
    if (typeof cleanup === 'function') { try { cleanup(); } catch { /* demo already gone */ } }
    host.innerHTML = '';
  };
}
