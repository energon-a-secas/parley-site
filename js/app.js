import { state, restoreLocation, loadItems } from './state.js';
import { render } from './render.js';
import { bindEvents, navigation, openPattern } from './events.js';

restoreLocation();
navigation.replace();
bindEvents();
render();
loadItems(render).then(() => {
  // A shared ?p= link opens its pattern once the modules are in.
  if (state.open && state.loaded) openPattern(state.open);
});
