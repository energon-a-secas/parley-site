import { createStore } from './neorgon-persist.js';
import { defaults, readLocation, validateItems } from './collection.js';

const preferences = createStore({ key: 'parley-site:collection', version: 1 });
export const state = {
  ...defaults, items: [], status: 'loading', loaded: false,
  previewTheme: 'dark', codeTab: 'html',
};

export function restoreLocation() {
  const saved = preferences.load({});
  const view = saved?.view === 'list' ? 'list' : 'grid';
  if (saved?.previewTheme === 'light') state.previewTheme = 'light';
  Object.assign(state, readLocation(location.href, view));
}

export function savePreferences() {
  // Presentation only: layout and demo theme. Never query text.
  return preferences.save({ view: state.view, previewTheme: state.previewTheme });
}

/** Patterns are ES modules, so loading is a dynamic import. A broken module is an error state, not an empty catalog. */
export async function loadItems(render) {
  state.status = 'loading';
  render();
  try {
    const { PATTERNS } = await import('./patterns/index.js');
    state.items = validateItems(PATTERNS);
    state.loaded = true;
    state.status = 'ready';
  } catch (error) {
    console.error(error);
    state.status = 'error';
  } finally {
    render();
  }
}
