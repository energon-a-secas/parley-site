export default {
  id: 'slash-mentions',
  name: 'Slash commands and @-mentions popover',
  category: 'Composer',
  description: 'Typing "/" at the start or "@" anywhere opens a filtered listbox above the composer; arrows move, Enter or Tab inserts a chip, Escape closes.',
  tags: ['composer', 'autocomplete', 'combobox', 'commands', 'mentions'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Claude Code', note: '"/" at the start lists commands and skills; "@" triggers file path autocomplete; a path like /tmp/notes.md does not keep the list open', url: 'https://code.claude.com/docs/en/interactive-mode', checked: '2026-11-02' },
    { product: 'Cursor', note: '"@" attaches files, folders, Terminals, Chats, Commit, Branch and Browser; "/" invokes a skill for one message', url: 'https://cursor.com/docs/context/mentions', checked: '2026-11-02' },
    { product: 'Linear', note: '"/" opens formatting and commands; "@" mentions users, issues, projects, dates and documents, and a mentioned issue becomes a related issue', url: 'https://linear.app/docs/editor', checked: '2026-11-02' },
    { product: 'Notion AI', note: '@-mention pages, teamspaces and people inside the AI prompt', url: 'https://www.notion.com/help/notion-ai-faqs', checked: '2026-11-02' },
    { product: 'Hugging Face chat-ui', note: 'The textarea carries role="combobox", aria-autocomplete="list", aria-expanded and aria-activedescendant; Enter accepts a mention only if the highlight moved', url: 'https://github.com/huggingface/chat-ui', checked: '2026-11-02' },
  ],
  anatomy: [
    'Textarea with role="combobox", aria-autocomplete="list", aria-expanded and aria-controls',
    'Trigger detection on the text before the caret: "/" only at index 0, "@" after a space or at the start',
    'Listbox positioned above the composer with option rows: trigger glyph, name, one-line description',
    'Highlighted row reflected through aria-activedescendant, never by moving DOM focus',
    'Token row above the textarea holding the inserted commands and mentions as chips',
    'Polite live region announcing insertions and removals',
  ],
  states: [
    'Closed: aria-expanded="false", Enter sends as usual',
    'Open with results: first row highlighted, textarea keeps focus',
    'Open with no results: one muted row naming the query',
    'Token inserted: trigger text removed from the textarea, chip added',
    'Token removed as a unit by its remove button or by Backspace in an empty textarea',
  ],
  behavior: [
    'Every input and caret move re-reads the text before selectionStart and matches /(^|\\s)([@/])([\\w./-]*)$/',
    'A "/" that is not at index 0 never opens the command list, so file paths pass through',
    'ArrowDown and ArrowUp cycle the highlight; Enter or Tab inserts the highlighted row; Escape and blur close',
    'Enter is intercepted only while a row is highlighted; otherwise it reaches the send handler',
    'Mentions are stored in a side array and rendered as chips, since a textarea cannot hold pills',
  ],
  microcopy: [
    { text: 'Type @ in the chat input to attach specific context to your prompt.', source: 'Cursor docs' },
    { text: '@-mention a specific page or person in your query', source: 'Notion AI FAQ' },
    { text: 'Ask anything. Type @ / # !', source: 'Chatbot UI placeholder' },
  ],
  variants: [
    'Claude Code and Cursor run commands or skills on "/"; Linear and Notion insert blocks and formatting',
    'Open WebUI uses "@" to pick a model for one message, not a person',
    'ChatKit adds a visible button that inserts "@" for users who do not know the trigger',
    'Claude Code opens the list with no row highlighted so Enter still sends; Tab inserts the top match',
  ],
  pitfalls: [
    'Focusing a restored draft that ends in an @token can reopen the search and steal the next Enter',
    'A "/" inside a path must not open the command list',
    'Linear notifies mentioned users and links mentioned issues; say so in the row description',
    'Putting the option rows in the Tab order breaks the APG combobox model; focus stays in the textarea',
  ],
  refs: [
    { label: 'W3C APG: editable combobox pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/' },
    { label: 'huggingface/chat-ui ChatInput.svelte', url: 'https://github.com/huggingface/chat-ui' },
    { label: 'openai/chatkit-js: commands and entities', url: 'https://github.com/openai/chatkit-js' },
  ],
  spec: 'On every input and caret move, read the textarea value before selectionStart and test /(^|\\s)([@/])([\\w./-]*)$/; treat "/" as a trigger only when the match starts at index 0. When it matches, filter a fixed list by the captured query, render a ul role="listbox" above the composer with li role="option" rows that have ids, set aria-expanded="true" and aria-controls on the textarea, and highlight the first row through aria-activedescendant. ArrowDown and ArrowUp change the highlighted id; Enter or Tab on a highlighted row removes the trigger text from the textarea, pushes the item into a mentions array and renders it as a chip with a labelled remove button; Escape and blur close the list. Intercept Enter only while a row is highlighted. Pair with the send-stop pattern for sending.',
  html: `<form class="pl pl-slash-mentions" aria-label="Message composer">
  <div class="pl-slash-mentions__card">
    <ul class="pl-slash-mentions__list" role="listbox" aria-label="Suggestions" hidden></ul>
    <ul class="pl-slash-mentions__chips" aria-label="Attached context"></ul>
    <textarea class="pl-slash-mentions__input" rows="2" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-haspopup="listbox" aria-label="Message" placeholder="Why does the coupon test fail? Type / for commands or @ for files"></textarea>
    <div class="pl-slash-mentions__bar">
      <span class="pl-slash-mentions__hint"><kbd>/</kbd> commands <kbd>@</kbd> files, terminal, people</span>
      <button type="submit" class="pl-slash-mentions__send" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
    </div>
  </div>
  <p class="pl-sr" aria-live="polite"></p>
</form>`,
  css: `.pl-slash-mentions { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-slash-mentions__card { position: relative; display: flex; flex-direction: column; gap: 8px; padding: 10px 10px 8px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 20px; transition: border-color 160ms ease-out, box-shadow 160ms ease-out; }
.pl-slash-mentions__card:focus-within { border-color: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 20%, transparent); }
.pl-slash-mentions__list { position: absolute; left: 8px; bottom: calc(100% + 8px); z-index: 3; width: min(380px, calc(100% - 16px)); margin: 0; padding: 6px; list-style: none; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface-2); box-shadow: var(--pl-shadow); }
.pl-slash-mentions__option { display: grid; grid-template-columns: 22px 1fr; column-gap: 8px; align-items: center; padding: 7px 8px; border-radius: var(--pl-radius-sm); font-size: 14px; cursor: pointer; }
.pl-slash-mentions__option:hover { background: var(--pl-surface); }
.pl-slash-mentions__option[aria-selected="true"] { background: color-mix(in srgb, var(--pl-accent) 16%, var(--pl-surface-2)); }
.pl-slash-mentions__glyph { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 6px; background: var(--pl-surface); font-family: var(--pl-mono); font-size: 12px; color: var(--pl-accent); grid-row: span 2; }
.pl-slash-mentions__name { font-weight: 600; line-height: 1.25; }
.pl-slash-mentions__desc { font-size: 12px; color: var(--pl-muted); line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pl-slash-mentions__empty { padding: 8px 10px; font-size: 13px; color: var(--pl-muted); }
.pl-slash-mentions__chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
.pl-slash-mentions__chips:empty { display: none; }
.pl-slash-mentions__chip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 2px 2px 8px; border: 1px solid var(--pl-border); border-radius: 999px; background: var(--pl-surface-2); font-family: var(--pl-mono); font-size: 12.5px; }
.pl-slash-mentions__chip[data-kind="command"] { border-color: var(--pl-accent); color: var(--pl-accent); }
.pl-slash-mentions__chip-remove { display: grid; place-items: center; width: 22px; height: 22px; border: 0; border-radius: 50%; background: transparent; color: var(--pl-muted); }
.pl-slash-mentions__chip-remove:hover { background: var(--pl-surface); color: var(--pl-text); }
.pl-slash-mentions__input { width: 100%; min-height: 24px; max-height: 176px; padding: 2px 4px; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; }
.pl-slash-mentions__input::placeholder { color: var(--pl-muted); }
.pl-slash-mentions__bar { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.pl-slash-mentions__hint { font-size: 12px; color: var(--pl-muted); }
.pl-slash-mentions__hint kbd { display: inline-block; min-width: 18px; padding: 0 4px; border: 1px solid var(--pl-border); border-radius: 4px; font-family: var(--pl-mono); font-size: 11px; text-align: center; color: var(--pl-text); }
.pl-slash-mentions__send { display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-slash-mentions__send:hover { filter: brightness(1.08); }`,
  mount: function (root) {
    var input = root.querySelector('.pl-slash-mentions__input');
    var list = root.querySelector('.pl-slash-mentions__list');
    var chips = root.querySelector('.pl-slash-mentions__chips');
    var live = root.querySelector('[aria-live]');
    var uid = 'pl-sm-' + Math.random().toString(36).slice(2, 7);
    var commands = [
      { label: 'fix', desc: 'Propose a patch for the failing test' },
      { label: 'explain', desc: 'Walk through the selected code' },
      { label: 'review', desc: 'Review the current diff against main' },
      { label: 'test', desc: 'Write or run tests for a file' },
    ];
    var mentions = [
      { label: 'checkout.ts', desc: 'src/cart/checkout.ts' },
      { label: 'cart.test.ts', desc: 'tests/cart.test.ts, 3 failing' },
      { label: 'Terminal', desc: 'Last 40 lines of output' },
      { label: 'Branch', desc: 'Diff against main, 6 files' },
      { label: 'Mara', desc: 'Mara Lind. Mentioning notifies her' },
    ];
    var match = null, items = [], active = -1;
    list.id = uid;
    input.setAttribute('aria-controls', uid);
    function close() {
      match = null; items = []; active = -1;
      list.hidden = true; list.innerHTML = '';
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    }
    function render() {
      list.innerHTML = '';
      if (!items.length) {
        var empty = document.createElement('li');
        empty.className = 'pl-slash-mentions__empty';
        empty.textContent = 'No matches for ' + match.trigger + match.query;
        list.appendChild(empty);
      }
      items.forEach(function (it, i) {
        var li = document.createElement('li');
        li.id = uid + '-' + i;
        li.className = 'pl-slash-mentions__option';
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', String(i === active));
        li.innerHTML = '<span class="pl-slash-mentions__glyph"></span><span class="pl-slash-mentions__name"></span><span class="pl-slash-mentions__desc"></span>';
        li.children[0].textContent = match.trigger;
        li.children[1].textContent = it.label;
        li.children[2].textContent = it.desc;
        li.addEventListener('mousedown', function (ev) { ev.preventDefault(); pick(it); });
        list.appendChild(li);
      });
      list.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      if (active >= 0) input.setAttribute('aria-activedescendant', uid + '-' + active); else input.removeAttribute('aria-activedescendant');
    }
    function update() {
      var before = input.value.slice(0, input.selectionStart);
      var m = before.match(/(^|\s)([@/])([\w./-]*)$/);
      if (!m || (m[2] === '/' && m.index !== 0)) return close();
      match = { start: m.index + m[1].length, trigger: m[2], query: m[3] };
      var q = m[3].toLowerCase();
      items = (m[2] === '/' ? commands : mentions).filter(function (it) { return it.label.toLowerCase().indexOf(q) >= 0; });
      active = items.length ? 0 : -1;
      render();
    }
    function pick(it) {
      var token = match.trigger + it.label;
      var chip = document.createElement('li');
      chip.className = 'pl-slash-mentions__chip';
      chip.dataset.kind = match.trigger === '/' ? 'command' : 'mention';
      chip.innerHTML = '<span></span><button type="button" class="pl-slash-mentions__chip-remove"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>';
      chip.firstChild.textContent = token;
      chip.lastChild.setAttribute('aria-label', 'Remove ' + token);
      chips.appendChild(chip);
      var caret = input.selectionStart;
      input.value = input.value.slice(0, match.start) + input.value.slice(caret);
      input.setSelectionRange(match.start, match.start);
      live.textContent = 'Added ' + token;
      close();
    }
    input.addEventListener('input', update);
    input.addEventListener('click', update);
    input.addEventListener('keydown', function (ev) {
      if (list.hidden) {
        if (ev.key === 'Backspace' && !input.value && chips.lastElementChild) chips.lastElementChild.querySelector('button').click();
        if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); if (input.value.trim()) { live.textContent = 'Sent'; input.value = ''; chips.innerHTML = ''; } }
        return;
      }
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        ev.preventDefault();
        if (items.length) { active = (active + (ev.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length; render(); }
      } else if ((ev.key === 'Enter' || ev.key === 'Tab') && active >= 0) { ev.preventDefault(); pick(items[active]); }
      else if (ev.key === 'Escape') { ev.preventDefault(); close(); }
    });
    input.addEventListener('blur', close);
    chips.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.pl-slash-mentions__chip-remove');
      if (!btn) return;
      live.textContent = btn.getAttribute('aria-label').replace('Remove', 'Removed');
      btn.parentNode.remove();
      input.focus();
    });
    root.addEventListener('submit', function (ev) { ev.preventDefault(); });
  },
};
