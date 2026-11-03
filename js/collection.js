// Pure catalog rules: URL state, filtering, sorting. No DOM here.
import { updateQuery } from './neorgon-navigation.js';
import { CATEGORIES } from './patterns/categories.js';

export const defaults = Object.freeze({ query: '', category: 'all', sort: 'curated', view: 'grid', open: '' });
const SORTS = ['curated', 'name', 'newest'];

export function readLocation(url, preferredView = defaults.view) {
  const params = new URL(url).searchParams;
  return {
    query: (params.get('q') || '').slice(0, 200),
    category: (params.get('cat') || defaults.category).slice(0, 100),
    sort: SORTS.includes(params.get('sort')) ? params.get('sort') : defaults.sort,
    view: ['grid', 'list'].includes(params.get('view')) ? params.get('view') : preferredView,
    open: (params.get('p') || '').slice(0, 80),
  };
}

/** Preserve theme, attribution parameters and fragments owned by other features. */
export function locationForState(url, state) {
  return updateQuery(url, {
    q: state.query.trim(),
    cat: state.category === defaults.category ? '' : state.category,
    sort: state.sort === defaults.sort ? '' : state.sort,
    view: state.view,
    p: state.open || '',
  });
}

function haystack(item) {
  return [item.name, item.description, item.category, ...item.tags,
    ...item.seenIn.map(s => s.product), ...item.anatomy].join(' ').toLocaleLowerCase();
}

export function selectItems(items, state) {
  const query = state.query.trim().toLocaleLowerCase();
  const result = items.filter(item =>
    (state.category === 'all' || item.category === state.category) && haystack(item).includes(query));
  if (state.sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
  if (state.sort === 'newest') result.sort((a, b) => b.added.localeCompare(a.added));
  if (state.sort === 'curated') result.sort((a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category));
  return result;
}

/** The modules are first-party, but a half-written one should fail loudly, not render blank. */
export function validateItems(value) {
  if (!Array.isArray(value)) throw new Error('Expected a pattern list');
  const ids = new Set();
  return value.map(item => {
    if (!item || typeof item.id !== 'string' || ids.has(item.id) || typeof item.name !== 'string'
      || !CATEGORIES.includes(item.category) || typeof item.html !== 'string' || typeof item.css !== 'string') {
      throw new Error(`Invalid pattern module: ${item?.id || '(no id)'}`);
    }
    ids.add(item.id);
    const list = key => Array.isArray(item[key]) ? item[key] : [];
    return {
      ...item,
      tags: list('tags'), seenIn: list('seenIn'), anatomy: list('anatomy'), states: list('states'),
      behavior: list('behavior'), microcopy: list('microcopy'), variants: list('variants'),
      pitfalls: list('pitfalls'), refs: list('refs'),
      added: /^\d{4}-\d{2}-\d{2}$/.test(item.added || '') ? item.added : '',
      mount: typeof item.mount === 'function' ? item.mount : null,
    };
  });
}
