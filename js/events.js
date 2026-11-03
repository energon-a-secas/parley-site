import { state, restoreLocation, savePreferences, loadItems } from './state.js';
import { locationForState } from './collection.js';
import { CATEGORIES } from './patterns/categories.js';
import { render, renderDetail, renderDetailPreview, renderCode, unmountDetail } from './render.js';
import { singleFile, agentMarkdown, catalogMarkdown, snippetCss, snippetJs } from './export.js';
import { $, copyText, downloadText, showToast } from './utils.js';
import { bindDialog, openDialog } from './dialogs.js';
import { createQueryHistory } from './neorgon-navigation.js';

export const navigation = createQueryHistory(href => locationForState(href, state));
const current = () => state.items.find(p => p.id === state.open);

function clearFilters() {
  navigation.push(() => { state.query = ''; state.category = 'all'; });
  render();
  $('searchInput').focus();
}

export function openPattern(id, opener) {
  const item = state.items.find(p => p.id === id);
  if (!item) return;
  const dialog = $('itemDialog');
  if (state.open !== id) navigation.push(() => { state.open = id; });
  renderDetail(item);
  dialog.querySelector('.dialog__body').scrollTop = 0;
  if (!dialog.open) openDialog(dialog, opener);
}

async function copy(text, done) {
  showToast(await copyText(text) ? done : 'Could not copy. Select the code and copy it by hand.');
}

export function bindEvents() {
  const dialog = $('itemDialog');
  bindDialog(dialog, $('searchInput'));
  dialog.addEventListener('close', () => {
    unmountDetail();
    if (state.open) navigation.push(() => { state.open = ''; });
  });

  $('collectionFilters').addEventListener('submit', event => { event.preventDefault(); navigation.replace(); });
  $('searchInput').addEventListener('input', event => { state.query = event.target.value; render(); navigation.schedule(); });
  for (const [id, key] of [['categorySelect', 'category'], ['sortSelect', 'sort']]) {
    $(id).addEventListener('change', event => { navigation.push(() => { state[key] = event.target.value; }); render(); });
  }
  document.querySelector('.view-switch').addEventListener('click', event => {
    const button = event.target.closest('button[data-view]');
    if (!button || button.dataset.view === state.view) return;
    navigation.push(() => { state.view = button.dataset.view; });
    if (!savePreferences()) showToast('Layout changed for this visit. Your browser could not save it.');
    render();
  });
  for (const id of ['clearFilters', 'emptyReset']) $(id).addEventListener('click', clearFilters);
  $('retryCollection').addEventListener('click', () => loadItems(render));

  $('shareView').addEventListener('click', async () => {
    navigation.replace();
    await copy(locationForState(location.href, state).href, 'Link copied. It includes your filters and layout.');
  });
  $('copyCatalog').addEventListener('click', () => copy(catalogMarkdown(state.items, CATEGORIES), 'Catalog copied as Markdown: every spec, no code.'));

  $('itemList').addEventListener('click', event => {
    const button = event.target.closest('[data-item]');
    if (button) openPattern(button.dataset.item, button);
  });

  // Dialog controls
  dialog.addEventListener('click', event => {
    const theme = event.target.closest('[data-preview-theme]');
    if (theme && theme.dataset.previewTheme !== state.previewTheme) {
      state.previewTheme = theme.dataset.previewTheme;
      savePreferences();
      const item = current();
      render();
      if (item) { renderDetailPreview(item); $('previewStandalone').href = `preview.html?p=${encodeURIComponent(item.id)}${state.previewTheme === 'light' ? '&theme=light' : ''}`; }
      return;
    }
    if (event.target.closest('#restartDemo')) { const item = current(); if (item) renderDetailPreview(item); return; }
    const tab = event.target.closest('[data-code-tab]');
    if (tab) { state.codeTab = tab.dataset.codeTab; const item = current(); if (item) renderCode(item); return; }
  });
  dialog.querySelector('.code-tabs').addEventListener('keydown', event => {
    if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    const tabs = [...dialog.querySelectorAll('[data-code-tab]:not([hidden])')];
    const index = tabs.findIndex(t => t.dataset.codeTab === state.codeTab);
    const next = tabs[(index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    next.click(); next.focus();
  });
  $('copyCode').addEventListener('click', () => {
    const item = current(); if (!item) return;
    const text = state.codeTab === 'css' ? snippetCss(item) : state.codeTab === 'js' ? snippetJs(item) : item.html;
    copy(text, `${state.codeTab.toUpperCase()} copied.`);
  });
  $('copySingle').addEventListener('click', () => { const item = current(); if (item) copy(singleFile(item, state.previewTheme), 'Single HTML file copied. Paste it into a .html and open it.'); });
  $('downloadSingle').addEventListener('click', () => { const item = current(); if (item) downloadText(singleFile(item, state.previewTheme), `parley-${item.id}.html`, 'text/html'); });
  $('copyAgent').addEventListener('click', () => { const item = current(); if (item) copy(agentMarkdown(item), 'Agent brief copied: spec, evidence and reference code in Markdown.'); });

  navigation.listen(() => {
    restoreLocation();
    render();
    if (state.open) openPattern(state.open);
    else if (dialog.open) dialog.close();
  });
}
