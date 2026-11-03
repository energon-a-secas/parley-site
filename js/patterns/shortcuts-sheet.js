export default {
  id: 'shortcuts-sheet',
  name: 'Keyboard shortcuts sheet',
  category: 'Shell',
  description: 'A native dialog opened by a button or the "?" key that lists the chat bindings per product: new chat, focus composer, toggle sidebar, copy last reply, stop, show shortcuts.',
  tags: ['keyboard', 'shortcuts', 'dialog', 'help', 'accessibility'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Open WebUI', note: 'Mod+Shift+O new chat, Mod+Shift+S toggle sidebar, Shift+Esc focus composer, Mod+Shift+C copy last reply, Esc stop, Mod+/ show shortcuts, Mod+K search (src/lib/shortcuts.ts)', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'LibreChat', note: 'Ctrl/Cmd+Shift+O new chat, Ctrl/Cmd+Shift+S sidebar, Shift+Esc focus composer, Ctrl/Cmd+Shift+; copy last reply, Ctrl/Cmd+Shift+X stop, Ctrl/Cmd+Shift+/ shortcuts; bindings are user-editable through a recorder dialog', url: 'https://github.com/danny-avila/LibreChat', checked: '2026-11-02' },
    { product: 'Slack', note: 'Cmd/Ctrl+N new message, Cmd/Ctrl+. toggles the right sidebar, Cmd/Ctrl+K jump, Cmd/Ctrl+/ shortcuts; the page lists the show-shortcuts key inconsistently across versions', url: 'https://slack.com/help/articles/201374536-Slack-keyboard-shortcuts', checked: '2026-11-02' },
    { product: 'Cursor', note: 'Cmd+N or Cmd+R new chat, Cmd+I, Cmd+L or Cmd+K open the side panel, Esc unfocuses, Cmd+Shift+Backspace stops, Cmd+. mode menu; Mac only', url: 'https://cursor.com/docs/configuration/kbd', checked: '2026-11-02' },
    { product: 'ChatGPT', note: 'Third-party lists give Ctrl/Cmd+Shift+O new chat, Ctrl/Cmd+Shift+S sidebar, Ctrl/Cmd+Shift+C copy last reply, Ctrl/Cmd+/ shortcuts; unverified, no OpenAI page loaded', url: 'https://www.tomsguide.com/ai/these-4-chatgpt-keyboard-shortcuts-will-change-how-you-write', checked: '2026-11-02' },
  ],
  anatomy: [
    'Trigger button with a visible "?" keycap and aria-keyshortcuts',
    'Native dialog labelled by its heading, closed by Escape',
    'Product switcher as a radiogroup of pills',
    'Two-column table: action, binding rendered as kbd keycaps',
    'Footnote marking reported-only bindings',
    'Optional remap control per row (LibreChat records custom bindings)',
  ],
  states: [
    'Closed',
    'Open on the default product',
    'Switched to another product: table re-rendered',
    'Binding not found for a product: the cell says "none found"',
    'Customised: user remaps stored, conflicts refused',
  ],
  behavior: [
    'One keydown listener on document maps {mod, shift, key} to actions, where mod is Cmd on Mac and Ctrl elsewhere',
    'Single-key bindings such as "?" are skipped while focus is in an editable field',
    'Every binding is also exposed as aria-keyshortcuts on the matching button',
    'LibreChat stores an ARIA-style key string ("Control+Shift+O") next to the display string, which suits aria-keyshortcuts',
  ],
  microcopy: [
    { text: 'none found', source: 'research table cell, when a product has no binding' },
  ],
  variants: [
    'The Mod+Shift+letter family: ChatGPT (reported), Open WebUI, LibreChat',
    'Slack and Discord: Mod+K for a switcher, Mod+/ for the sheet',
    'Cursor: Cmd+Shift+Backspace stops or rejects all, decided by context',
    'LibreChat: user remapping with a conflict check',
  ],
  pitfalls: [
    'Ctrl+Shift+C opens browser devtools on Windows and Linux; LibreChat uses Ctrl+Shift+; for copy instead',
    'Mod+R (Open WebUI, regenerate) collides with browser reload',
    'Single-character shortcuts need a way to turn off or remap under WCAG 2.1.4',
    'Documentation drift: a Discord community post says the official hotkey article is wrong; third-party Claude lists disagree with each other',
  ],
  refs: [
    { label: 'Open WebUI: shortcuts.ts', url: 'https://github.com/open-webui/open-webui' },
    { label: 'LibreChat: useKeyboardShortcuts.ts', url: 'https://github.com/danny-avila/LibreChat' },
    { label: 'Slack: keyboard shortcuts', url: 'https://slack.com/help/articles/201374536-Slack-keyboard-shortcuts' },
  ],
  spec: 'Render a button "Keyboard shortcuts" with aria-keyshortcuts="Shift+?" that calls showModal on a dialog labelled by its h2. Inside, a radiogroup of product pills and a table with one row per action (New chat, Focus composer, Toggle sidebar, Copy last reply, Stop generating, Show shortcuts) whose binding cell renders each key in a kbd element, or "none found". Add one keydown listener on document: open the sheet on "?" unless the target is an input, textarea or contenteditable; map Mod+Shift+O, Mod+Shift+S, Shift+Escape, Mod+Shift+; (not C) and Escape-while-generating to their actions. Persist remaps in localStorage and refuse a binding already in use.',
  html: `<div class="pl pl-shortcuts-sheet">
  <button type="button" class="pl-shortcuts-sheet__open" aria-keyshortcuts="Shift+?">Keyboard shortcuts <kbd>?</kbd></button>
  <dialog class="pl-shortcuts-sheet__dialog" aria-labelledby="pl-shortcuts-sheet-title">
    <div class="pl-shortcuts-sheet__inner">
      <div class="pl-shortcuts-sheet__head"><h2 id="pl-shortcuts-sheet-title">Keyboard shortcuts</h2><button type="button" class="pl-shortcuts-sheet__close" aria-label="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
      <div class="pl-shortcuts-sheet__tabs" role="radiogroup" aria-label="Product">
        <button type="button" role="radio" aria-checked="true" data-product="openwebui">Open WebUI</button>
        <button type="button" role="radio" aria-checked="false" data-product="librechat">LibreChat</button>
        <button type="button" role="radio" aria-checked="false" data-product="chatgpt">ChatGPT*</button>
        <button type="button" role="radio" aria-checked="false" data-product="slack">Slack</button>
      </div>
      <table class="pl-shortcuts-sheet__table"><thead><tr><th scope="col">Action</th><th scope="col">Binding</th></tr></thead><tbody>
        <tr><td>New chat</td><td><kbd>Mod</kbd><kbd>Shift</kbd><kbd>O</kbd></td></tr>
        <tr><td>Focus composer</td><td><kbd>Shift</kbd><kbd>Esc</kbd></td></tr>
        <tr><td>Toggle sidebar</td><td><kbd>Mod</kbd><kbd>Shift</kbd><kbd>S</kbd></td></tr>
        <tr><td>Copy last reply</td><td><kbd>Mod</kbd><kbd>Shift</kbd><kbd>C</kbd></td></tr>
        <tr><td>Stop generating</td><td><kbd>Esc</kbd></td></tr>
        <tr><td>Show shortcuts</td><td><kbd>Mod</kbd><kbd>/</kbd></td></tr>
      </tbody></table>
      <p class="pl-shortcuts-sheet__note">Mod is Cmd on Mac, Ctrl elsewhere. * reported by third parties, not verified against an OpenAI page.</p>
    </div>
  </dialog>
</div>`,
  css: `.pl-shortcuts-sheet { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-shortcuts-sheet kbd { display: inline-grid; place-items: center; min-width: 24px; height: 24px; padding: 0 6px; border: 1px solid var(--pl-border); border-bottom-width: 2px; border-radius: 6px; background: var(--pl-surface-2); font-family: var(--pl-font); font-size: 12px; font-weight: 600; color: var(--pl-text); }
.pl-shortcuts-sheet kbd + kbd { margin-left: 4px; }
.pl-shortcuts-sheet__open { display: inline-flex; align-items: center; gap: 8px; min-height: 36px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface); font-size: 14px; }
.pl-shortcuts-sheet__open:hover { background: var(--pl-surface-2); }
.pl-shortcuts-sheet__dialog { width: min(460px, calc(100vw - 32px)); padding: 0; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); color: var(--pl-text); box-shadow: var(--pl-shadow); }
.pl-shortcuts-sheet__dialog::backdrop { background: rgba(0, 0, 0, 0.5); }
.pl-shortcuts-sheet__inner { padding: 18px 20px 16px; font-family: var(--pl-font); }
.pl-shortcuts-sheet__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.pl-shortcuts-sheet__head h2 { margin: 0; font-size: 17px; }
.pl-shortcuts-sheet__close { display: grid; place-items: center; width: 32px; height: 32px; border: 0; border-radius: var(--pl-radius-sm); background: transparent; color: var(--pl-muted); }
.pl-shortcuts-sheet__close:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-shortcuts-sheet__tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.pl-shortcuts-sheet__tabs button { min-height: 30px; padding: 0 10px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; font-size: 13px; color: var(--pl-muted); }
.pl-shortcuts-sheet__tabs button[aria-checked="true"] { background: var(--pl-accent); border-color: var(--pl-accent); color: var(--pl-on-accent); }
.pl-shortcuts-sheet__table { width: 100%; border-collapse: collapse; font-size: 14px; }
.pl-shortcuts-sheet__table th { padding: 6px 0; text-align: left; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--pl-muted); border-bottom: 1px solid var(--pl-border); }
.pl-shortcuts-sheet__table td { padding: 8px 0; border-bottom: 1px solid var(--pl-border); vertical-align: middle; }
.pl-shortcuts-sheet__table td:last-child { text-align: right; white-space: nowrap; }
.pl-shortcuts-sheet__table td[data-none] { color: var(--pl-muted); font-size: 13px; }
.pl-shortcuts-sheet__note { margin: 12px 0 0; font-size: 12px; color: var(--pl-muted); }`,
  mount: function (root) {
    var dialog = root.querySelector('.pl-shortcuts-sheet__dialog');
    var tbody = root.querySelector('tbody');
    var tabs = root.querySelectorAll('[role="radio"]');
    var actions = ['New chat', 'Focus composer', 'Toggle sidebar', 'Copy last reply', 'Stop generating', 'Show shortcuts'];
    var table = {
      openwebui: ['Mod Shift O', 'Shift Esc', 'Mod Shift S', 'Mod Shift C', 'Esc', 'Mod /'],
      librechat: ['Mod Shift O', 'Shift Esc', 'Mod Shift S', 'Mod Shift ;', 'Mod Shift X', 'Mod Shift /'],
      chatgpt: ['Mod Shift O', '', 'Mod Shift S', 'Mod Shift C', '', 'Mod /'],
      slack: ['Mod N', '', 'Mod .', '', '', 'Mod /']
    };
    function render(product) {
      tbody.innerHTML = '';
      actions.forEach(function (action, i) {
        var tr = document.createElement('tr'), td1 = document.createElement('td'), td2 = document.createElement('td');
        td1.textContent = action;
        var keys = table[product][i];
        if (!keys) { td2.textContent = 'none found'; td2.dataset.none = 'true'; }
        else keys.split(' ').forEach(function (k) { var kbd = document.createElement('kbd'); kbd.textContent = k; td2.appendChild(kbd); });
        tr.appendChild(td1); tr.appendChild(td2); tbody.appendChild(tr);
      });
    }
    function open() { if (typeof dialog.showModal === 'function') { if (!dialog.open) dialog.showModal(); } else dialog.setAttribute('open', ''); }
    root.querySelector('.pl-shortcuts-sheet__open').addEventListener('click', open);
    root.querySelector('.pl-shortcuts-sheet__close').addEventListener('click', function () { dialog.close(); });
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.setAttribute('aria-checked', String(t === tab)); });
        render(tab.dataset.product);
      });
    });
    function onKey(e) {
      var t = e.target;
      var editable = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if (e.key === '?' && !editable && !e.metaKey && !e.ctrlKey) { e.preventDefault(); open(); }
    }
    document.addEventListener('keydown', onKey);
    return function () { document.removeEventListener('keydown', onKey); if (dialog.open) dialog.close(); };
  },
};
