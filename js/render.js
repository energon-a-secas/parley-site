import { state } from './state.js';
import { selectItems } from './collection.js';
import { CATEGORIES } from './patterns/categories.js';
import { mountPreview } from './demos.js';
import { snippetCss, snippetJs } from './export.js';
import { $, escHtml } from './utils.js';

const cleanups = new Map();
let observer = null;

function cardPreviewObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const host = entry.target;
      const item = state.items.find(p => p.id === host.dataset.preview);
      if (!item) continue;
      if (entry.isIntersecting && !cleanups.has(host)) {
        cleanups.set(host, mountPreview(host, item, { theme: state.previewTheme }));
      } else if (!entry.isIntersecting && cleanups.has(host)) {
        cleanups.get(host)();
        cleanups.delete(host);
      }
    }
  }, { rootMargin: '200px 0px' });
  return observer;
}

function unmountCards() {
  for (const [host, cleanup] of cleanups) { cleanup(); observer?.unobserve(host); }
  cleanups.clear();
}

let categorySignature = '';
export function render() {
  const present = new Set(state.items.map(item => item.category));
  const categories = CATEGORIES.filter(c => present.has(c));
  const signature = JSON.stringify(categories);
  if (signature !== categorySignature) {
    $('categorySelect').innerHTML = '<option value="all">All categories</option>'
      + categories.map(category => `<option value="${escHtml(category)}">${escHtml(category)}</option>`).join('');
    categorySignature = signature;
  }
  if ($('searchInput').value !== state.query) $('searchInput').value = state.query;
  $('categorySelect').value = categories.includes(state.category) ? state.category : 'all';
  $('sortSelect').value = state.sort;
  document.querySelectorAll('.view-switch [data-view]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.view === state.view));
  });
  const filtered = Boolean(state.query.trim() || state.category !== 'all');
  $('clearFilters').disabled = !filtered;
  const loading = state.status === 'loading';
  $('collectionResults').setAttribute('aria-busy', String(loading));
  $('collectionLoading').hidden = state.loaded || !loading;
  $('collectionError').hidden = state.status !== 'error';

  const items = selectItems(state.items, state);
  const count = `${items.length} of ${state.items.length} ${state.items.length === 1 ? 'pattern' : 'patterns'}`;
  $('resultCount').textContent = !state.loaded ? (loading ? 'Loading patterns…' : 'Catalog unavailable') : count;

  const list = $('itemList');
  list.hidden = !state.loaded || !items.length;
  list.dataset.view = state.view;
  list.dataset.previewTheme = state.previewTheme;
  unmountCards();
  list.innerHTML = items.map(item => `<li><article class="pattern-card" data-category="${escHtml(item.category)}">
    <button type="button" class="pattern-card__open" data-item="${escHtml(item.id)}" aria-label="Open ${escHtml(item.name)}">
      <div class="pattern-card__frame" inert><div class="pattern-card__preview" data-preview="${escHtml(item.id)}"></div></div>
    </button>
    <div class="pattern-card__body">
      <p class="pattern-card__category">${escHtml(item.category)}${item.mount ? ' <span class="pattern-card__live" title="Interactive demo">live</span>' : ''}</p>
      <h3><button type="button" class="pattern-card__title" data-item="${escHtml(item.id)}">${escHtml(item.name)}</button></h3>
      <p class="pattern-card__description">${escHtml(item.description)}</p>
      <ul class="pattern-card__seen" aria-label="Seen in">${item.seenIn.slice(0, 4).map(s => `<li>${escHtml(s.product)}</li>`).join('')}${item.seenIn.length > 4 ? `<li>+${item.seenIn.length - 4}</li>` : ''}</ul>
    </div>
  </article></li>`).join('');
  const io = cardPreviewObserver();
  list.querySelectorAll('[data-preview]').forEach(host => io.observe(host));

  $('collectionEmpty').hidden = !state.loaded || items.length > 0;
  $('emptyTitle').textContent = filtered ? 'No matches' : 'No patterns yet';
  $('emptyDescription').textContent = filtered
    ? 'Try another word, a product name, or clear the filters to see the full catalog.'
    : 'New patterns will appear here.';
  $('emptyReset').hidden = !filtered;
}

const list = items => items.map(s => `<li>${escHtml(s)}</li>`).join('');
let detailCleanup = null;

export function renderDetail(item) {
  $('itemDialogTitle').textContent = item.name;
  $('itemDialogCategory').textContent = item.category;
  $('itemDialogDescription').textContent = item.description;
  $('detailSeen').innerHTML = item.seenIn.map(s => `<li><p class="detail__seen-head"><strong>${escHtml(s.product)}</strong>${s.url ? `<a href="${escHtml(s.url)}" target="_blank" rel="noopener">source</a>` : ''}</p><span>${escHtml(s.note)}</span>${s.checked ? `<time datetime="${escHtml(s.checked)}">checked ${escHtml(s.checked)}</time>` : ''}</li>`).join('');
  $('detailAnatomy').innerHTML = list(item.anatomy);
  $('detailStates').innerHTML = list(item.states);
  $('detailBehavior').innerHTML = list(item.behavior);
  $('detailMicrocopy').innerHTML = item.microcopy.map(m => `<li>"${escHtml(m.text)}" <span>${escHtml(m.source)}</span></li>`).join('');
  $('detailMicrocopyBlock').hidden = !item.microcopy.length;
  $('detailVariants').innerHTML = list(item.variants);
  $('detailVariantsBlock').hidden = !item.variants.length;
  $('detailPitfalls').innerHTML = list(item.pitfalls);
  $('detailRefs').innerHTML = item.refs.map(r => `<li><a href="${escHtml(r.url)}" target="_blank" rel="noopener">${escHtml(r.label)}</a></li>`).join('');
  $('detailRefsBlock').hidden = !item.refs.length;
  $('detailSpec').textContent = item.spec;
  $('detailTags').innerHTML = item.tags.map(t => `<li>${escHtml(t)}</li>`).join('');
  $('previewStandalone').href = `preview.html?p=${encodeURIComponent(item.id)}${state.previewTheme === 'light' ? '&theme=light' : ''}`;
  $('codeTabJs').hidden = !item.mount;
  if (!item.mount && state.codeTab === 'js') state.codeTab = 'html';
  renderDetailPreview(item);
  renderCode(item);
}

export function renderDetailPreview(item) {
  detailCleanup?.();
  const host = $('detailPreview');
  detailCleanup = mountPreview(host, item, { theme: state.previewTheme });
  document.querySelectorAll('[data-preview-theme]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.previewTheme === state.previewTheme));
  });
}

export function unmountDetail() { detailCleanup?.(); detailCleanup = null; }

export function renderCode(item) {
  const code = state.codeTab === 'css' ? snippetCss(item) : state.codeTab === 'js' ? snippetJs(item) : item.html;
  $('detailCode').textContent = code;
  document.querySelectorAll('[data-code-tab]').forEach(button => {
    button.setAttribute('aria-selected', String(button.dataset.codeTab === state.codeTab));
    button.tabIndex = button.dataset.codeTab === state.codeTab ? 0 : -1;
  });
  $('copyCode').textContent = `Copy ${state.codeTab.toUpperCase()}`;
}
