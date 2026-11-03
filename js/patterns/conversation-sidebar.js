export default {
  id: 'conversation-sidebar',
  name: 'Conversation sidebar with date groups and a row menu',
  category: 'Shell',
  description: 'A 260px history rail with New chat, search, Today / Yesterday / Previous 7 days groups, a per-row menu for Rename, Pin and Delete, and a collapse to an icon rail.',
  tags: ['sidebar', 'history', 'menu', 'navigation', 'collapse'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Gemini', note: 'Side panel with a Recent section; hovering a chat reveals a More menu with Pin or Unpin, Rename and Delete; pinned chats sit at the top of Recent', url: 'https://support.google.com/gemini/answer/13666746', checked: '2026-11-02' },
    { product: 'Notion AI', note: 'A "Chats with Notion AI" tab sorted by recency with a three-dot menu per row; << and >> collapse and expand, Cmd/Ctrl+backslash toggles', url: 'https://www.notion.com/help/sidebar', checked: '2026-11-02' },
    { product: 'Open WebUI', note: 'Groups Today, Yesterday, Previous 7 days, Previous 30 days, then month names; pointer resize clamped to 220 to 480px, width kept in localStorage', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'Hugging Face chat-ui', note: 'New Chat button and four groups (Today, This week, This month, Older) computed from updatedAt; rows 32px, 40px on small screens', url: 'https://github.com/huggingface/chat-ui', checked: '2026-11-02' },
    { product: 'assistant-ui', note: 'Thread list with a Today heading, aria-current on the active row, per-row buttons named "Rename {title}" and "Delete {title}"', url: 'https://github.com/assistant-ui/assistant-ui', checked: '2026-11-02' },
  ],
  anatomy: [
    'Collapse toggle and a primary New chat button on the top row',
    'Search field (or a button that opens a search dialog)',
    'One section per date group with an uppercase heading',
    'Rows that are links, with the active row marked aria-current',
    'Per-row overflow button, visible on hover and on focus-within',
    'A single menu (Rename, Pin, Delete) moved under whichever row opened it',
    'Collapsed rail of 56px that keeps only icon controls',
  ],
  states: [
    'Default: 260px wide, history visible',
    'Hover or focus on a row: overflow button appears',
    'Menu open: trigger has aria-expanded="true", first item focused',
    'Inline rename: title becomes an input; Enter saves, Escape cancels',
    'Pinned: a pin glyph before the title',
    'Collapsed: 56px icon rail; search and groups hidden',
  ],
  behavior: [
    'Open WebUI and LibreChat bind Ctrl/Cmd+Shift+S to toggle the sidebar and Ctrl/Cmd+Shift+O to a new chat; Notion uses Cmd/Ctrl+backslash',
    'Escape closes the menu and returns focus to the row button that opened it',
    'Clicking anywhere outside the menu closes it',
    'Delete announces the removed title in a polite live region; the real product confirms first in a dialog',
  ],
  microcopy: [
    { text: 'Access previous chats with Notion AI, sorted by recency.', source: 'Notion help, sidebar' },
    { text: 'Today / Yesterday / Previous 7 days / Previous 30 days', source: 'Open WebUI and LibreChat group headings' },
    { text: 'Today / This week / This month / Older', source: 'Hugging Face chat-ui group headings' },
  ],
  variants: [
    'Gemini keeps pins inside Recent instead of a separate Pinned section',
    'Open WebUI adds nested folders, pins and a pointer-resizable width',
    'HF chat-ui ships date groups only, no pins or folders',
    'Notion makes AI chats one tab among workspace tabs',
  ],
  pitfalls: [
    'Overflow buttons that appear only on hover are invisible to touch and keyboard users unless they also show on :focus-within',
    'Delete can have side effects: Gemini also removes the Activity record and any Canvas made in the chat, so confirm first',
    'The buckets disagree: "This week" is a calendar notion, "Previous 7 days" a rolling window, and grouping by updatedAt makes chats jump between groups; pick one rule and document it',
    'Hiding the collapse control inside the rail it collapses leaves no way back on narrow screens',
  ],
  refs: [
    { label: 'Open WebUI: Sidebar.svelte', url: 'https://github.com/open-webui/open-webui' },
    { label: 'LibreChat: translation.json group labels', url: 'https://github.com/danny-avila/LibreChat' },
    { label: 'assistant-ui: thread-list element', url: 'https://github.com/assistant-ui/assistant-ui' },
  ],
  spec: 'Render a nav aria-label="Chats" with a New chat button, a search input, then one section per group (Today, Yesterday, Previous 7 days, Previous 30 days, then month names) computed from each chat\'s updatedAt, each section an h2 plus a ul of links. Give each row an overflow button with aria-haspopup="menu", aria-expanded and aria-label "Options for {title}" that is visible on hover and focus-within; keep one role="menu" element and move it under the row that opened it. Rename swaps the title span for an input (Enter saves, Escape cancels); Delete confirms in a dialog. Store the collapsed state (and a resizable width clamped 220 to 480px) in localStorage and bind Ctrl/Cmd+Shift+S to collapse.',
  html: `<div class="pl pl-conversation-sidebar" data-collapsed="false">
  <nav class="pl-conversation-sidebar__nav" aria-label="Chats">
    <div class="pl-conversation-sidebar__top">
      <button type="button" class="pl-conversation-sidebar__collapse" aria-expanded="true" aria-label="Collapse sidebar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16"/></svg>
      </button>
      <button type="button" class="pl-conversation-sidebar__new" aria-label="New chat">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        <span class="pl-conversation-sidebar__text">New chat</span>
      </button>
    </div>
    <label class="pl-conversation-sidebar__search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input type="search" placeholder="Search chats" aria-label="Search chats">
    </label>
    <section class="pl-conversation-sidebar__group"><h2>Today</h2><ul>
      <li class="pl-conversation-sidebar__row" aria-current="page"><a class="pl-conversation-sidebar__link" href="#"><svg class="pl-conversation-sidebar__pin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17v5M8 3h8l-1 7 3 3H6l3-3z"/></svg><span class="pl-conversation-sidebar__title">Lisbon offsite: venue shortlist</span></a><button type="button" class="pl-conversation-sidebar__more" aria-haspopup="menu" aria-expanded="false" aria-label="Options for Lisbon offsite: venue shortlist"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button></li>
      <li class="pl-conversation-sidebar__row"><a class="pl-conversation-sidebar__link" href="#"><svg class="pl-conversation-sidebar__pin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17v5M8 3h8l-1 7 3 3H6l3-3z"/></svg><span class="pl-conversation-sidebar__title">Flaky CI: retry on 502 only</span></a><button type="button" class="pl-conversation-sidebar__more" aria-haspopup="menu" aria-expanded="false" aria-label="Options for Flaky CI: retry on 502 only"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button></li>
    </ul></section>
    <section class="pl-conversation-sidebar__group"><h2>Yesterday</h2><ul>
      <li class="pl-conversation-sidebar__row"><a class="pl-conversation-sidebar__link" href="#"><svg class="pl-conversation-sidebar__pin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17v5M8 3h8l-1 7 3 3H6l3-3z"/></svg><span class="pl-conversation-sidebar__title">Sourdough: second rise too long</span></a><button type="button" class="pl-conversation-sidebar__more" aria-haspopup="menu" aria-expanded="false" aria-label="Options for Sourdough: second rise too long"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button></li>
      <li class="pl-conversation-sidebar__row"><a class="pl-conversation-sidebar__link" href="#"><svg class="pl-conversation-sidebar__pin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17v5M8 3h8l-1 7 3 3H6l3-3z"/></svg><span class="pl-conversation-sidebar__title">NDA clause 7: carve-outs</span></a><button type="button" class="pl-conversation-sidebar__more" aria-haspopup="menu" aria-expanded="false" aria-label="Options for NDA clause 7: carve-outs"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button></li>
    </ul></section>
    <section class="pl-conversation-sidebar__group"><h2>Previous 7 days</h2><ul>
      <li class="pl-conversation-sidebar__row"><a class="pl-conversation-sidebar__link" href="#"><svg class="pl-conversation-sidebar__pin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17v5M8 3h8l-1 7 3 3H6l3-3z"/></svg><span class="pl-conversation-sidebar__title">Index on orders.created_at</span></a><button type="button" class="pl-conversation-sidebar__more" aria-haspopup="menu" aria-expanded="false" aria-label="Options for Index on orders.created_at"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button></li>
      <li class="pl-conversation-sidebar__row"><a class="pl-conversation-sidebar__link" href="#"><svg class="pl-conversation-sidebar__pin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17v5M8 3h8l-1 7 3 3H6l3-3z"/></svg><span class="pl-conversation-sidebar__title">Birthday dinner for twelve</span></a><button type="button" class="pl-conversation-sidebar__more" aria-haspopup="menu" aria-expanded="false" aria-label="Options for Birthday dinner for twelve"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button></li>
    </ul></section>
    <ul class="pl-conversation-sidebar__menu" role="menu" aria-label="Chat options" hidden>
      <li role="none"><button type="button" role="menuitem" data-action="rename">Rename</button></li>
      <li role="none"><button type="button" role="menuitem" data-action="pin">Pin</button></li>
      <li role="none"><button type="button" role="menuitem" data-action="delete">Delete</button></li>
    </ul>
    <p class="pl-sr" aria-live="polite"></p>
  </nav>
  <div class="pl-conversation-sidebar__main"><h3>Lisbon offsite: venue shortlist</h3><p>Hover a row for its menu, or collapse the rail.</p></div>
</div>`,
  css: `.pl-conversation-sidebar { display: flex; max-width: 720px; height: 520px; background: var(--pl-bg); border: 1px solid var(--pl-border); border-radius: var(--pl-radius); overflow: hidden; }
.pl-conversation-sidebar__nav { flex: none; display: flex; flex-direction: column; gap: 10px; width: 260px; padding: 12px 10px; background: var(--pl-surface); border-right: 1px solid var(--pl-border); transition: width 180ms ease-out; }
.pl-conversation-sidebar[data-collapsed="true"] .pl-conversation-sidebar__nav { width: 56px; padding-inline: 10px; }
.pl-conversation-sidebar__top { display: flex; align-items: center; gap: 6px; }
.pl-conversation-sidebar[data-collapsed="true"] .pl-conversation-sidebar__top { flex-direction: column; }
.pl-conversation-sidebar__collapse, .pl-conversation-sidebar__more { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: var(--pl-radius-sm); background: transparent; color: var(--pl-muted); }
.pl-conversation-sidebar__collapse:hover, .pl-conversation-sidebar__more:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-conversation-sidebar__new { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 36px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface-2); font-size: 14px; font-weight: 600; white-space: nowrap; }
.pl-conversation-sidebar__new:hover { border-color: var(--pl-accent); }
.pl-conversation-sidebar[data-collapsed="true"] .pl-conversation-sidebar__new { flex: none; width: 36px; padding: 0; }
.pl-conversation-sidebar[data-collapsed="true"] .pl-conversation-sidebar__text, .pl-conversation-sidebar[data-collapsed="true"] .pl-conversation-sidebar__search, .pl-conversation-sidebar[data-collapsed="true"] .pl-conversation-sidebar__group { display: none; }
.pl-conversation-sidebar__search { display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 0 10px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); color: var(--pl-muted); }
.pl-conversation-sidebar__search:focus-within { border-color: var(--pl-accent); }
.pl-conversation-sidebar__search input { flex: 1; min-width: 0; border: 0; background: transparent; outline: none; font-size: 14px; color: var(--pl-text); }
.pl-conversation-sidebar__group h2 { margin: 4px 10px; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--pl-muted); }
.pl-conversation-sidebar__group ul { list-style: none; margin: 0; padding: 0; }
.pl-conversation-sidebar__row { position: relative; display: flex; align-items: center; border-radius: var(--pl-radius-sm); }
.pl-conversation-sidebar__row:hover, .pl-conversation-sidebar__row:focus-within { background: var(--pl-surface-2); }
.pl-conversation-sidebar__row[aria-current="page"] { background: var(--pl-surface-2); box-shadow: inset 2px 0 0 var(--pl-accent); }
.pl-conversation-sidebar__link { flex: 1; min-width: 0; display: flex; align-items: center; gap: 6px; min-height: 36px; padding: 0 4px 0 10px; color: inherit; text-decoration: none; font-size: 14px; }
.pl-conversation-sidebar__title { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.pl-conversation-sidebar__rename { flex: 1; min-width: 0; margin: 3px 4px 3px 6px; padding: 4px 6px; border: 1px solid var(--pl-accent); border-radius: 6px; background: var(--pl-bg); font-size: 14px; }
.pl-conversation-sidebar__pin { display: none; flex: none; color: var(--pl-accent); }
.pl-conversation-sidebar__row[data-pinned="true"] .pl-conversation-sidebar__pin { display: block; }
.pl-conversation-sidebar__more { width: 32px; height: 32px; margin-right: 2px; opacity: 0; }
.pl-conversation-sidebar__row:hover .pl-conversation-sidebar__more, .pl-conversation-sidebar__row:focus-within .pl-conversation-sidebar__more, .pl-conversation-sidebar__more[aria-expanded="true"] { opacity: 1; }
.pl-conversation-sidebar__menu { position: absolute; z-index: 2; top: calc(100% + 2px); right: 6px; min-width: 150px; margin: 0; padding: 6px; list-style: none; background: var(--pl-surface-2); border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); box-shadow: var(--pl-shadow); }
.pl-conversation-sidebar__menu button { display: flex; width: 100%; padding: 8px 10px; border: 0; border-radius: 6px; background: transparent; font-size: 14px; text-align: left; }
.pl-conversation-sidebar__menu button:hover, .pl-conversation-sidebar__menu button:focus-visible { background: var(--pl-surface); }
.pl-conversation-sidebar__menu button[data-action="delete"] { color: var(--pl-danger); }
.pl-conversation-sidebar__main { flex: 1; min-width: 0; padding: 20px; }
.pl-conversation-sidebar__main h3 { margin: 0 0 6px; font-size: 15px; }
.pl-conversation-sidebar__main p { margin: 0; font-size: 13px; color: var(--pl-muted); }`,
  mount: function (root) {
    var nav = root.querySelector('.pl-conversation-sidebar__nav');
    var collapse = root.querySelector('.pl-conversation-sidebar__collapse');
    var menu = root.querySelector('.pl-conversation-sidebar__menu');
    var live = root.querySelector('[aria-live]');
    var openRow = null;
    function titleOf(row) { return row.querySelector('.pl-conversation-sidebar__title'); }
    function closeMenu() {
      if (!openRow) return;
      openRow.querySelector('.pl-conversation-sidebar__more').setAttribute('aria-expanded', 'false');
      menu.hidden = true; nav.appendChild(menu); openRow = null;
    }
    function openMenu(row) {
      closeMenu();
      openRow = row; row.appendChild(menu); menu.hidden = false;
      menu.querySelector('[data-action="pin"]').textContent = row.dataset.pinned === 'true' ? 'Unpin' : 'Pin';
      row.querySelector('.pl-conversation-sidebar__more').setAttribute('aria-expanded', 'true');
      menu.querySelector('[role="menuitem"]').focus();
    }
    function rename(row) {
      var title = titleOf(row);
      var input = document.createElement('input');
      input.className = 'pl-conversation-sidebar__rename'; input.value = title.textContent; input.setAttribute('aria-label', 'Chat title');
      title.replaceWith(input); input.focus(); input.select();
      function finish(save) {
        if (!input.isConnected) return;
        if (save && input.value.trim()) title.textContent = input.value.trim();
        input.replaceWith(title);
        row.querySelector('.pl-conversation-sidebar__more').setAttribute('aria-label', 'Options for ' + title.textContent);
        live.textContent = save ? 'Renamed to ' + title.textContent : 'Rename cancelled';
      }
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') finish(true); if (e.key === 'Escape') finish(false); });
      input.addEventListener('blur', function () { finish(true); });
    }
    collapse.addEventListener('click', function () {
      var collapsed = root.dataset.collapsed !== 'true';
      closeMenu();
      root.dataset.collapsed = String(collapsed);
      collapse.setAttribute('aria-expanded', String(!collapsed));
      collapse.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
    });
    root.addEventListener('click', function (e) {
      var more = e.target.closest('.pl-conversation-sidebar__more');
      var item = e.target.closest('[role="menuitem"]');
      if (e.target.closest('a')) e.preventDefault();
      if (more) { var row = more.closest('.pl-conversation-sidebar__row'); if (openRow === row) closeMenu(); else openMenu(row); return; }
      if (item && openRow) {
        var target = openRow, action = item.dataset.action;
        closeMenu();
        if (action === 'rename') rename(target);
        if (action === 'pin') { var pinned = target.dataset.pinned === 'true'; target.dataset.pinned = String(!pinned); live.textContent = (pinned ? 'Unpinned ' : 'Pinned ') + titleOf(target).textContent; }
        if (action === 'delete') { live.textContent = 'Deleted ' + titleOf(target).textContent; target.remove(); }
        return;
      }
      if (!e.target.closest('.pl-conversation-sidebar__menu')) closeMenu();
    });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openRow) { var trigger = openRow.querySelector('.pl-conversation-sidebar__more'); closeMenu(); trigger.focus(); }
    });
  },
};
