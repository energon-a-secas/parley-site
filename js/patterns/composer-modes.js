export default {
  id: 'composer-modes',
  name: 'Mode toggles inside the composer',
  category: 'Composer',
  description: 'Search and Think pinned on the bar, Deep research and Canvas in the plus menu; an armed mode adds a removable chip, swaps the placeholder and clears after send unless marked persistent.',
  tags: ['composer', 'modes', 'chips', 'menu', 'toggles'],
  added: '2026-11-03',
  seenIn: [
    { product: 'ChatGPT', note: 'The plus menu lists Create image, Thinking, Deep research and Web search; picking one adds a removable chip and can change the placeholder (third-party teardown, June 2026)', url: 'https://aiuxplayground.com/teardowns/chatgpt/composer', checked: '2026-11-02' },
    { product: 'Claude.ai', note: 'Web search sits in the plus menu with a checkmark when on; the newer experience drops the toggle and searches when useful', url: 'https://support.claude.com/en/articles/10684626-enable-and-use-web-search', checked: '2026-11-02' },
    { product: 'Gemini', note: 'Deep Research and Canvas live under the control below the text box; Deep Research then offers Sources, Edit plan and Start research', url: 'https://support.google.com/gemini/answer/15719111', checked: '2026-11-02' },
    { product: 'Microsoft Copilot', note: 'A control under the prompt starts as Quick response and switches to Think Deeper, Study and learn, Smart or Search; the mode persists for follow-ups', url: 'https://support.microsoft.com/en-us/Microsoft-Copilot/conversation-modes-in-microsoft-copilot', checked: '2026-11-02' },
    { product: 'OpenAI ChatKit', note: 'ToolOption has label, shortLabel, placeholderOverride, pinned (outside the menu) and persistent (default false: cleared after submit)', url: 'https://github.com/openai/chatkit-js', checked: '2026-11-02' },
  ],
  anatomy: [
    'Plus button with aria-haspopup="menu" opening role="menu" rows of menuitemcheckbox with aria-checked',
    'Pinned toggles rendered on the bar as aria-pressed buttons with an icon and short label',
    'Chip row above the textarea with one chip per armed menu mode and a labelled remove button',
    'Placeholder override per mode, applied from the most recently armed mode',
    'Mode definition object holding label, placeholder, pinned and persistent flags',
    'Duration hint on costly rows, so a minutes-long mode does not look like a seconds-long one',
  ],
  states: [
    'Off: plain toggle, no chip, default placeholder',
    'Armed: toggle pressed or row checked, chip shown, placeholder swapped',
    'Armed and persistent: survives send (Canvas here, every Copilot mode)',
    'Cleared after send: non-persistent modes drop and the placeholder returns',
    'Disabled by plan or admin: row stays visible with aria-disabled and a reason',
  ],
  behavior: [
    'Pinned toggles flip on click and announce "Search on" or "Search off"',
    'Menu rows toggle aria-checked; closing the menu returns focus to the plus button',
    'Removing a chip is the same as unchecking its row; both paths call one setMode function',
    'Send clears every mode whose definition says persistent: false, then restores the placeholder',
    'The placeholder follows the last armed mode, so arming Deep research after Search reads as Deep research',
  ],
  microcopy: [
    { text: 'The selected mode will remain active until you disable it.', source: 'Microsoft Copilot help' },
    { text: 'What should we work on next?', source: 'Perplexity Computer placeholder, per teardown' },
  ],
  variants: [
    'All modes in the plus menu (ChatGPT, Gemini, Claude web search)',
    'Thinking and effort inside the model menu instead (Claude, Gemini thinking level)',
    'A separate mode picker under the prompt that replaces the model picker (Copilot)',
    'Chips always visible on the bar (Perplexity Search and Computer, ChatKit pinned tools)',
  ],
  pitfalls: [
    'No in-bar cue after arming a mode from a menu; the chip is the cue, do not skip it',
    'Equal visual weight for a seconds-long mode and a minutes-long, costly one',
    'Reset behavior differs by product (ChatKit clears, Copilot keeps); store it per mode, not in ad hoc code',
    'Gemini files its modes under a button named "Add files", a label that does not describe what it holds',
  ],
  refs: [
    { label: 'openai/chatkit-js ToolOption types', url: 'https://github.com/openai/chatkit-js' },
    { label: 'Claude: model, effort and thinking settings', url: 'https://support.claude.com/en/articles/8664678-change-the-model-effort-and-extended-thinking-settings' },
    { label: 'Gemini: Canvas', url: 'https://support.google.com/gemini/answer/16047321' },
  ],
  spec: 'Define modes as objects with id, label, placeholder, pinned and persistent. Render pinned modes as aria-pressed buttons on the composer bar and the rest as menuitemcheckbox rows inside a role="menu" opened by a plus button with aria-haspopup="menu" and aria-expanded. One setMode(id, on) function updates the toggle or row, adds or removes a chip with a button labelled "Remove <label>", and sets the textarea placeholder to the most recently armed mode\'s override or the default. On submit, call setMode(id, false) for every armed mode with persistent false. Pair with the send-stop pattern for the textarea and send button.',
  html: `<form class="pl pl-composer-modes" aria-label="Message composer">
  <div class="pl-composer-modes__card">
    <ul class="pl-composer-modes__chips" aria-label="Active modes"></ul>
    <textarea class="pl-composer-modes__input" rows="1" aria-label="Message" placeholder="Ask anything about the Lisbon trip"></textarea>
    <div class="pl-composer-modes__bar">
      <div class="pl-composer-modes__anchor">
        <button type="button" class="pl-composer-modes__plus" aria-label="More tools" aria-haspopup="menu" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button>
        <div class="pl-composer-modes__menu" role="menu" aria-label="Tools" hidden>
          <button type="button" role="menuitemcheckbox" aria-checked="false" data-mode="research"><span class="pl-composer-modes__check" aria-hidden="true"></span><span class="pl-composer-modes__row"><span>Deep research</span><small>Reads dozens of sources. 5 to 30 min</small></span></button>
          <button type="button" role="menuitemcheckbox" aria-checked="false" data-mode="canvas"><span class="pl-composer-modes__check" aria-hidden="true"></span><span class="pl-composer-modes__row"><span>Canvas</span><small>Edit the itinerary side by side. Stays on</small></span></button>
          <button type="button" role="menuitemcheckbox" aria-checked="false" aria-disabled="true" data-mode="image"><span class="pl-composer-modes__check" aria-hidden="true"></span><span class="pl-composer-modes__row"><span>Create image</span><small>Not available on this plan</small></span></button>
        </div>
      </div>
      <button type="button" class="pl-composer-modes__toggle" aria-pressed="false" data-mode="search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>Search</button>
      <button type="button" class="pl-composer-modes__toggle" aria-pressed="false" data-mode="think"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a4 4 0 0 0-4 4v1a4 4 0 0 0-3 6 4 4 0 0 0 3 6h8a4 4 0 0 0 3-6 4 4 0 0 0-3-6V7a4 4 0 0 0-4-4Z"/></svg>Think</button>
      <button type="submit" class="pl-composer-modes__send" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
    </div>
  </div>
  <p class="pl-composer-modes__status">Modes clear after you send, except Canvas.</p>
  <p class="pl-sr" aria-live="polite"></p>
</form>`,
  css: `.pl-composer-modes { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-composer-modes__card { display: flex; flex-direction: column; gap: 8px; padding: 10px 10px 8px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 20px; transition: border-color 160ms ease-out, box-shadow 160ms ease-out; }
.pl-composer-modes__card:focus-within { border-color: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 20%, transparent); }
.pl-composer-modes__chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
.pl-composer-modes__chips:empty { display: none; }
.pl-composer-modes__chip { display: inline-flex; align-items: center; gap: 4px; padding: 3px 3px 3px 10px; border: 1px solid var(--pl-accent); border-radius: 999px; background: color-mix(in srgb, var(--pl-accent) 14%, var(--pl-surface)); font-size: 13px; font-weight: 600; color: var(--pl-text); }
.pl-composer-modes__chip-remove { display: grid; place-items: center; width: 22px; height: 22px; border: 0; border-radius: 50%; background: transparent; color: var(--pl-muted); }
.pl-composer-modes__chip-remove:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-composer-modes__input { width: 100%; min-height: 24px; max-height: 176px; padding: 2px 4px; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; }
.pl-composer-modes__input::placeholder { color: var(--pl-muted); }
.pl-composer-modes__bar { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.pl-composer-modes__anchor { position: relative; }
.pl-composer-modes__plus, .pl-composer-modes__send { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: transparent; color: var(--pl-muted); transition: background 160ms ease-out, color 160ms ease-out; }
.pl-composer-modes__plus:hover, .pl-composer-modes__plus[aria-expanded="true"] { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-composer-modes__toggle { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px 0 10px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; font-size: 13px; color: var(--pl-muted); transition: background 160ms ease-out, color 160ms ease-out, border-color 160ms ease-out; }
.pl-composer-modes__toggle:hover { color: var(--pl-text); background: var(--pl-surface-2); }
.pl-composer-modes__toggle[aria-pressed="true"] { border-color: var(--pl-accent); background: color-mix(in srgb, var(--pl-accent) 16%, var(--pl-surface)); color: var(--pl-text); }
.pl-composer-modes__send { margin-left: auto; background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-composer-modes__send:hover { filter: brightness(1.08); }
.pl-composer-modes__menu { position: absolute; left: 0; bottom: calc(100% + 8px); z-index: 3; display: flex; flex-direction: column; gap: 2px; min-width: 260px; padding: 6px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface-2); box-shadow: var(--pl-shadow); }
.pl-composer-modes__menu [role="menuitemcheckbox"] { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 10px; border: 0; border-radius: var(--pl-radius-sm); background: transparent; text-align: left; font-size: 14px; color: var(--pl-text); }
.pl-composer-modes__menu [role="menuitemcheckbox"]:hover, .pl-composer-modes__menu [role="menuitemcheckbox"]:focus-visible { background: var(--pl-surface); }
.pl-composer-modes__menu [aria-disabled="true"] { opacity: 0.5; cursor: not-allowed; }
.pl-composer-modes__check { flex: none; width: 16px; height: 16px; border: 1.5px solid var(--pl-border); border-radius: 4px; }
.pl-composer-modes__menu [aria-checked="true"] .pl-composer-modes__check { border-color: var(--pl-accent); background: var(--pl-accent) center / 10px no-repeat; box-shadow: inset 0 0 0 3px var(--pl-surface-2); }
.pl-composer-modes__row { display: flex; flex-direction: column; line-height: 1.25; }
.pl-composer-modes__row small { font-size: 12px; color: var(--pl-muted); }
.pl-composer-modes__status { margin: 8px 12px 0; font-size: 12px; color: var(--pl-muted); }`,
  mount: function (root) {
    var input = root.querySelector('.pl-composer-modes__input');
    var chips = root.querySelector('.pl-composer-modes__chips');
    var plus = root.querySelector('.pl-composer-modes__plus');
    var menu = root.querySelector('.pl-composer-modes__menu');
    var status = root.querySelector('.pl-composer-modes__status');
    var live = root.querySelector('[aria-live]');
    var defaultPlaceholder = input.placeholder;
    var modes = {
      search: { label: 'Search', placeholder: 'Search the web for Lisbon tips', persistent: false },
      think: { label: 'Think', placeholder: 'Ask something worth thinking through', persistent: false },
      research: { label: 'Deep research', placeholder: 'Describe what to research. This takes several minutes', persistent: false },
      canvas: { label: 'Canvas', placeholder: 'Describe the itinerary to draft in Canvas', persistent: true },
      image: { label: 'Create image', placeholder: 'Describe an image', persistent: false },
    };
    var armed = [];
    function control(id) { return root.querySelector('[data-mode="' + id + '"]'); }
    function syncPlaceholder() { input.placeholder = armed.length ? modes[armed[armed.length - 1]].placeholder : defaultPlaceholder; }
    function setMode(id, on) {
      var el = control(id);
      armed = armed.filter(function (m) { return m !== id; });
      if (on) armed.push(id);
      el.setAttribute(el.getAttribute('role') === 'menuitemcheckbox' ? 'aria-checked' : 'aria-pressed', String(on));
      var chip = chips.querySelector('[data-chip="' + id + '"]');
      if (chip) chip.remove();
      if (on && el.getAttribute('role') === 'menuitemcheckbox') {
        chip = document.createElement('li');
        chip.className = 'pl-composer-modes__chip';
        chip.dataset.chip = id;
        chip.innerHTML = '<span></span><button type="button" class="pl-composer-modes__chip-remove"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>';
        chip.firstChild.textContent = modes[id].label;
        chip.lastChild.setAttribute('aria-label', 'Remove ' + modes[id].label);
        chips.appendChild(chip);
      }
      syncPlaceholder();
      live.textContent = modes[id].label + (on ? ' on' : ' off');
    }
    function setOpen(open) {
      menu.hidden = !open;
      plus.setAttribute('aria-expanded', String(open));
      if (open) menu.querySelector('[role="menuitemcheckbox"]').focus();
    }
    function onDocClick(ev) { if (!menu.hidden && !root.contains(ev.target)) setOpen(false); }
    plus.addEventListener('click', function () { setOpen(menu.hidden); });
    menu.addEventListener('click', function (ev) {
      var row = ev.target.closest('[role="menuitemcheckbox"]');
      if (!row) return;
      if (row.getAttribute('aria-disabled') === 'true') { status.textContent = 'Create image needs a paid plan.'; return; }
      setMode(row.dataset.mode, row.getAttribute('aria-checked') !== 'true');
      setOpen(false);
      plus.focus();
      input.focus();
    });
    menu.addEventListener('keydown', function (ev) {
      var rows = Array.prototype.slice.call(menu.querySelectorAll('[role="menuitemcheckbox"]'));
      var i = rows.indexOf(document.activeElement);
      if (ev.key === 'Escape') { ev.preventDefault(); setOpen(false); plus.focus(); }
      if (ev.key === 'ArrowDown') { ev.preventDefault(); rows[(i + 1) % rows.length].focus(); }
      if (ev.key === 'ArrowUp') { ev.preventDefault(); rows[(i + rows.length - 1) % rows.length].focus(); }
    });
    Array.prototype.forEach.call(root.querySelectorAll('.pl-composer-modes__toggle'), function (btn) {
      btn.addEventListener('click', function () { setMode(btn.dataset.mode, btn.getAttribute('aria-pressed') !== 'true'); });
    });
    chips.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.pl-composer-modes__chip-remove');
      if (btn) { setMode(btn.parentNode.dataset.chip, false); input.focus(); }
    });
    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); root.requestSubmit(); }
    });
    root.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!input.value.trim()) return;
      var sentWith = armed.map(function (id) { return modes[id].label; });
      input.value = '';
      armed.slice().forEach(function (id) { if (!modes[id].persistent) setMode(id, false); });
      status.textContent = sentWith.length ? 'Sent with ' + sentWith.join(', ') + '. ' + (armed.length ? 'Canvas stays on.' : 'Modes cleared.') : 'Sent.';
      live.textContent = status.textContent;
    });
    document.addEventListener('click', onDocClick);
    return function () { document.removeEventListener('click', onDocClick); };
  },
};
