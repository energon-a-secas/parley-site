export default {
  id: 'memory-panel',
  name: 'Memory updated toast and the saved-memories manager',
  category: 'Trust & errors',
  description: 'A "Memory updated" toast under the reply that opens a dialog listing saved memories, each with Delete, plus a "Forget all" action and an empty state.',
  tags: ['memory', 'toast', 'dialog', 'personalization', 'settings'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Claude.ai', note: 'Settings > Your Claude > Manage lists memory as topics, each editable or deletable; toggles for generating memory (with Pause and Reset), sensitive topics (off by default) and searching past chats; per chat "Memory off" before the first message only', url: 'https://support.claude.com/en/articles/11817273-using-memory', checked: '2026-11-02' },
    { product: 'ChatGPT', note: 'An in-chat "Memory updated" marker; hovering it leads to Manage memories; saved memories and chat-history insights have separate toggles; deleting a chat does not delete its memories (openai.com snippet, page returned 403)', url: 'https://openai.com/index/memory-and-new-controls-for-chatgpt/', checked: '2026-11-02' },
    { product: 'Gemini', note: 'Personal context > Your past chats with Gemini, on by default; Gemini Apps Activity renamed Keep Activity', url: 'https://blog.google/products/gemini/temporary-chats-privacy-controls/', checked: '2026-11-02' },
    { product: 'Microsoft 365 Copilot', note: 'Settings > Personalization > Saved memories > Manage saved memories; turning memory off does not delete saved memories (snippet)', url: 'https://support.microsoft.com/en-US/Microsoft-365-Copilot/manage-copilot-memory-in-microsoft-365-copilot', checked: '2026-11-02' },
    { product: 'Open WebUI', note: 'Personalization > Memory, and a "Memory updated successfully" toast', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
  ],
  anatomy: [
    'Toast (role="status") that slides in under the reply with a Manage button',
    'Manager dialog with a heading and a one-line explanation of what memory is used for',
    'List of saved memories, each with the text, when it was saved, and a Delete button named with the item',
    'Forget all action, destructive styling, confirming in the dialog',
    'Empty state when nothing is saved',
    'Footer link to the memory settings (generate, sensitive topics, past chats)',
  ],
  states: [
    'Saving: toast visible for about 6s or until dismissed',
    'Manager open: list populated',
    'Item deleted: row removed, status announces it',
    'Empty: "No memories saved" replaces the list and Forget all is disabled',
    'Paused: memory kept but not used (Claude); off is not delete',
  ],
  behavior: [
    'The indicator links straight to the manager; the manager is also reachable from settings',
    'Deleting a chat does not delete its memories (ChatGPT), so the manager is the only place to remove them',
    'Opting a chat out must happen before the first message (Claude)',
    'The toast is a status region; the dialog is a native dialog so Escape closes it and focus returns to the toast button',
  ],
  microcopy: [
    { text: 'Memory updated', source: 'ChatGPT in-chat marker' },
    { text: 'Manage saved memories', source: 'Microsoft 365 Copilot' },
    { text: 'Include sensitive topics in memory', source: 'Claude settings toggle' },
  ],
  variants: [
    'Claude: topics, a Pause and Reset split, cited past-chat search',
    'ChatGPT: two sources, saved memories and chat history, each with its own switch',
    'Gemini: one "past chats" switch under Personal context',
    'Copilot: a Personalization tile',
  ],
  pitfalls: [
    'Off is not delete (Copilot, Claude\'s Pause); say it next to the switch',
    'Deleting a chat is not deleting its memory; users expect it to be',
    'A per-chat switch that locks after message one with no explanation',
    'A toast with no path to the manager leaves the user unable to undo what was just saved',
  ],
  refs: [
    { label: 'Claude: using memory', url: 'https://support.claude.com/en/articles/11817273-using-memory' },
    { label: 'Open WebUI: translation.json memory strings', url: 'https://github.com/open-webui/open-webui' },
  ],
  spec: 'When the backend reports a saved memory, insert a role="status" toast under the reply reading "Memory updated" with a Manage button and a dismiss control, and remove it after about 6 seconds. Manage calls showModal on a dialog that lists memories as li elements with the text, a relative date and a Delete button named "Delete: {text}"; deleting removes the row and announces it. A Forget all button clears the list after an in-dialog confirmation, and the empty state replaces the list with "No memories saved". Link the dialog footer to the three memory switches, each labelled with whether turning it off deletes anything.',
  html: `<div class="pl pl-memory-panel">
  <article class="pl-memory-panel__reply" aria-label="Assistant message">
    <p>Noted. I will quote venue prices in EUR excluding VAT from now on, and flag anything over 85 per head.</p>
  </article>
  <div class="pl-memory-panel__toast" role="status" hidden>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a4 4 0 0 0-4 4v1a4 4 0 0 0-3 6 4 4 0 0 0 3 6h8a4 4 0 0 0 3-6 4 4 0 0 0-3-6V7a4 4 0 0 0-4-4Z"/></svg>
    <span>Memory updated</span>
    <button type="button" class="pl-memory-panel__manage">Manage</button>
    <button type="button" class="pl-memory-panel__close" aria-label="Dismiss"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  </div>
  <dialog class="pl-memory-panel__dialog" aria-labelledby="pl-memory-panel-title">
    <div class="pl-memory-panel__inner">
      <h2 id="pl-memory-panel-title">Saved memories</h2>
      <p class="pl-memory-panel__lead">Used to personalise replies. Deleting a chat does not delete its memories; this list does.</p>
      <ul class="pl-memory-panel__list">
        <li><div><span>Quotes venue prices in EUR excluding VAT</span><time>just now</time></div><button type="button" aria-label="Delete: Quotes venue prices in EUR excluding VAT">Delete</button></li>
        <li><div><span>Team offsite budget is 85 per head per day</span><time>2 days ago</time></div><button type="button" aria-label="Delete: Team offsite budget is 85 per head per day">Delete</button></li>
        <li><div><span>Prefers answers in British English</span><time>3 weeks ago</time></div><button type="button" aria-label="Delete: Prefers answers in British English">Delete</button></li>
      </ul>
      <p class="pl-memory-panel__empty" hidden>No memories saved.</p>
      <div class="pl-memory-panel__foot">
        <button type="button" class="pl-memory-panel__forget">Forget all</button>
        <a href="#" class="pl-memory-panel__settings">Memory settings</a>
        <button type="button" class="pl-memory-panel__done">Done</button>
      </div>
    </div>
  </dialog>
  <p class="pl-sr" aria-live="polite"></p>
</div>`,
  css: `.pl-memory-panel { max-width: 720px; min-height: 150px; padding: 16px; background: var(--pl-bg); }
.pl-memory-panel__reply { max-width: 85%; padding: 12px 16px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); font-size: 14px; line-height: 1.55; }
.pl-memory-panel__reply p { margin: 0; }
.pl-memory-panel__toast { display: inline-flex; align-items: center; gap: 8px; margin-top: 10px; padding: 6px 6px 6px 12px; border: 1px solid var(--pl-border); border-radius: 999px; background: var(--pl-surface-2); font-size: 13px; color: var(--pl-muted); box-shadow: var(--pl-shadow); animation: pl-memory-panel-in 240ms ease-out; }
.pl-memory-panel__toast[hidden] { display: none; }
.pl-memory-panel__toast > svg { color: var(--pl-accent); }
@keyframes pl-memory-panel-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.pl-memory-panel__manage, .pl-memory-panel__forget, .pl-memory-panel__done { min-height: 30px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: 999px; background: var(--pl-surface); color: var(--pl-text); font-size: 13px; font-weight: 600; }
.pl-memory-panel__manage:hover, .pl-memory-panel__forget:hover { border-color: var(--pl-accent); }
.pl-memory-panel__close { display: grid; place-items: center; width: 30px; height: 30px; border: 0; border-radius: 50%; background: transparent; color: var(--pl-muted); }
.pl-memory-panel__close:hover { background: var(--pl-surface); color: var(--pl-text); }
.pl-memory-panel__dialog { width: min(480px, calc(100vw - 32px)); padding: 0; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); color: var(--pl-text); box-shadow: var(--pl-shadow); }
.pl-memory-panel__dialog::backdrop { background: rgba(0, 0, 0, 0.5); }
.pl-memory-panel__inner { padding: 20px; font-family: var(--pl-font); }
.pl-memory-panel__inner h2 { margin: 0 0 4px; font-size: 17px; }
.pl-memory-panel__lead { margin: 0 0 14px; font-size: 13px; color: var(--pl-muted); }
.pl-memory-panel__list { margin: 0; padding: 0; list-style: none; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); overflow: hidden; }
.pl-memory-panel__list li { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 12px; font-size: 14px; }
.pl-memory-panel__list li + li { border-top: 1px solid var(--pl-border); }
.pl-memory-panel__list div { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.pl-memory-panel__list time { font-size: 12px; color: var(--pl-muted); }
.pl-memory-panel__list button { flex: none; min-height: 32px; padding: 0 10px; border: 1px solid transparent; border-radius: var(--pl-radius-sm); background: transparent; color: var(--pl-muted); font-size: 13px; }
.pl-memory-panel__list button:hover { color: var(--pl-danger); border-color: var(--pl-border); background: var(--pl-bg); }
.pl-memory-panel__empty { margin: 0; padding: 20px; border: 1px dashed var(--pl-border); border-radius: var(--pl-radius-sm); text-align: center; font-size: 14px; color: var(--pl-muted); }
.pl-memory-panel__foot { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 14px; }
.pl-memory-panel__forget { color: var(--pl-danger); }
.pl-memory-panel__forget:disabled { opacity: 0.5; cursor: not-allowed; }
.pl-memory-panel__settings { margin-left: auto; font-size: 13px; color: var(--pl-accent); text-underline-offset: 3px; }
.pl-memory-panel__done { background: var(--pl-accent); border-color: var(--pl-accent); color: var(--pl-on-accent); }`,
  mount: function (root) {
    var toast = root.querySelector('.pl-memory-panel__toast');
    var dialog = root.querySelector('.pl-memory-panel__dialog');
    var list = root.querySelector('.pl-memory-panel__list');
    var empty = root.querySelector('.pl-memory-panel__empty');
    var forget = root.querySelector('.pl-memory-panel__forget');
    var manage = root.querySelector('.pl-memory-panel__manage');
    var live = root.querySelector('[aria-live]');
    var timers = [setTimeout(function () { toast.hidden = false; }, 800)];
    function refresh() {
      var none = list.children.length === 0;
      list.hidden = none; empty.hidden = !none; forget.disabled = none;
    }
    function open() { if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', ''); }
    manage.addEventListener('click', open);
    root.querySelector('.pl-memory-panel__close').addEventListener('click', function () { toast.hidden = true; });
    root.querySelector('.pl-memory-panel__done').addEventListener('click', function () { dialog.close(); });
    list.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var row = btn.closest('li');
      live.textContent = 'Forgot: ' + row.querySelector('span').textContent;
      row.remove(); refresh();
    });
    forget.addEventListener('click', function () {
      if (forget.dataset.confirm !== 'true') { forget.dataset.confirm = 'true'; forget.textContent = 'Forget all ' + list.children.length + '? Click again'; return; }
      list.innerHTML = ''; delete forget.dataset.confirm; forget.textContent = 'Forget all';
      live.textContent = 'All memories forgotten'; refresh();
    });
    dialog.addEventListener('close', function () { delete forget.dataset.confirm; forget.textContent = 'Forget all'; if (!toast.hidden) manage.focus(); });
    root.addEventListener('click', function (e) { if (e.target.closest('a')) e.preventDefault(); });
    return function () { timers.forEach(clearTimeout); if (dialog.open) dialog.close(); };
  },
};
