// Standalone stage for one pattern: preview.html?p=<id>&theme=light
import { mountPreview } from './demos.js';
import { $ } from './utils.js';

const params = new URLSearchParams(location.search);
const id = (params.get('p') || '').slice(0, 80);
let theme = params.get('theme') === 'light' ? 'light' : 'dark';
let cleanup = null;
let pattern = null;

function paint() {
  cleanup?.();
  cleanup = mountPreview($('previewStage'), pattern, { theme });
  $('previewStage').dataset.theme = theme;
  document.querySelectorAll('[data-preview-theme]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.previewTheme === theme)));
  const url = new URL(location.href);
  if (theme === 'light') url.searchParams.set('theme', 'light'); else url.searchParams.delete('theme');
  history.replaceState(null, '', url);
}

try {
  const { PATTERNS } = await import('./patterns/index.js');
  pattern = PATTERNS.find(p => p.id === id) || null;
} catch (error) { console.error(error); }

if (!pattern) {
  $('previewMissing').hidden = false;
  $('previewTitle').textContent = 'Pattern not found';
} else {
  document.title = `${pattern.name} | Parley`;
  $('previewTitle').textContent = pattern.name;
  $('previewCategory').textContent = pattern.category;
  $('backToCatalog').href = `./?p=${encodeURIComponent(pattern.id)}`;
  paint();
  document.querySelector('.detail__toolbar').addEventListener('click', event => {
    const button = event.target.closest('[data-preview-theme]');
    if (button && button.dataset.previewTheme !== theme) { theme = button.dataset.previewTheme; paint(); }
    if (event.target.closest('#restartDemo')) paint();
  });
}

