export default {
  id: 'composer-attachments',
  name: 'Attachments: plus menu, drop zone and file chips',
  category: 'Composer',
  description: 'A plus menu with Upload, Screenshot and Connect, a drop state on the whole card, and file chips with a progress ring and a remove button.',
  tags: ['composer', 'attachments', 'menu', 'upload', 'drag-drop'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Claude.ai', note: 'Plus button in the lower left of the chat box; drag into the window or paste; 500 MB per file and 20 files per chat', url: 'https://support.claude.com/en/articles/8241126-upload-files-to-claude', checked: '2026-11-02' },
    { product: 'ChatGPT', note: 'Attach lives inside the plus menu; inline thumbnails carry a dismiss control and stack next to mode chips (third-party teardown, June 2026)', url: 'https://aiuxplayground.com/teardowns/chatgpt/composer', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'Form-scoped drop with opt-in globalDrop, paste of clipboard files, maxFiles and maxFileSize checks, Backspace on an empty textarea removes the last attachment', url: 'https://elements.ai-sdk.dev/components/prompt-input', checked: '2026-11-02' },
    { product: 'OpenAI ChatKit', note: 'composer.attachments with maxSize (100 MB default), maxCount (10) and an accept map, so the UI rejects before upload', url: 'https://github.com/openai/chatkit-js', checked: '2026-11-02' },
    { product: 'Gemini', note: 'An "Add files" control below the prompt offers upload, code folder, GitHub repo or Drive; up to 10 files per prompt (search snippet only)', url: 'https://support.google.com/gemini/answer/14903178', checked: '2026-11-02' },
  ],
  anatomy: [
    'Plus button in the lower left with aria-haspopup="menu" and aria-expanded',
    'Menu of three rows: Upload file, Take screenshot, Connect app, each with a one-line description',
    'Hidden input type="file" multiple that the Upload row drives in production',
    'Chip row above the textarea: type badge, file name, size, progress ring, remove button',
    'Drop overlay covering the card while a drag hovers it',
    'Hint line stating the limits before the user picks anything',
    'Polite live region announcing added, ready and removed',
  ],
  states: [
    'Empty: no chips, hint shows the limits',
    'Menu open: plus button pressed, first row focused',
    'Dragging over: dashed accent border and an overlay label',
    'Uploading: ring fills clockwise, remove stays available',
    'Ready: ring swaps to a check in the success color',
    'Rejected: chip takes the danger color and the hint names the reason',
  ],
  behavior: [
    'Paste handler takes only clipboardData items of kind "file" and leaves text paste alone',
    'Drop is scoped to the card, not the document, so a page-level drop target is not stolen',
    'Count, size and type are validated on change and drop, before any upload starts',
    'Backspace in an empty textarea removes the last chip and announces it',
    'Escape closes the menu and returns focus to the plus button; arrow keys move between rows',
  ],
  microcopy: [
    { text: 'Add files', source: 'Gemini, button label' },
    { text: 'Upload files', source: 'Vercel AI Elements, aria-label' },
  ],
  variants: [
    'ChatGPT, Claude, Gemini and Perplexity put attach inside the plus menu; Slack, WhatsApp and most support widgets keep a paperclip',
    'Claude shows images as inline previews rather than filename chips',
    'ChatKit and AI Elements expose limits as config, so rejection happens client-side with a reason code',
  ],
  pitfalls: [
    'Hiding attach inside the plus works against the paperclip habit; both teardowns flag it',
    'Several image previews are harder to scan than filename chips with sizes',
    'Validating size and type only on the server means the user learns after a long upload',
    'No vendor documents per-chip upload progress; design the ring and its failure state yourself',
  ],
  refs: [
    { label: 'Vercel AI Elements: PromptInput attachments', url: 'https://elements.ai-sdk.dev/components/prompt-input' },
    { label: 'openai/chatkit-js composer types', url: 'https://github.com/openai/chatkit-js' },
    { label: 'sendbird-uikit-react: PendingFilesPreview', url: 'https://github.com/sendbird/sendbird-uikit-react' },
  ],
  spec: 'Put a plus button with aria-haspopup="menu" that toggles a role="menu" of menuitem buttons; the Upload row clicks a hidden input type="file" multiple. Listen for paste (take clipboardData.items where kind is "file"), and for dragover, dragleave and drop on the composer card, setting data-drag on the card while a drag hovers. Validate count, size and MIME before adding, then render a chip per file above the textarea with a type badge, the name, the size, an SVG ring whose stroke-dashoffset tracks upload progress, and a remove button labelled "Remove <name>". On Backspace in an empty textarea remove the last chip, and announce every add, completion and removal through a polite live region. Pair with the send-stop pattern for the textarea and send button.',
  html: `<form class="pl pl-composer-attachments" aria-label="Message composer">
  <div class="pl-composer-attachments__card" data-drag="false">
    <div class="pl-composer-attachments__drop" aria-hidden="true">Drop files to attach</div>
    <ul class="pl-composer-attachments__chips" aria-label="Attachments">
      <li class="pl-composer-attachments__chip" data-status="ready">
        <span class="pl-composer-attachments__kind">PDF</span>
        <span class="pl-composer-attachments__meta"><span class="pl-composer-attachments__name">lease-draft-v2.pdf</span><span class="pl-composer-attachments__size">1.8 MB</span></span>
        <svg class="pl-composer-attachments__ring" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><circle class="pl-composer-attachments__track" cx="12" cy="12" r="9"/><circle class="pl-composer-attachments__bar" cx="12" cy="12" r="9" style="stroke-dashoffset:0"/><path class="pl-composer-attachments__check" d="m8 12.5 2.5 2.5L16 9.5"/></svg>
        <button type="button" class="pl-composer-attachments__remove" aria-label="Remove lease-draft-v2.pdf"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </li>
    </ul>
    <textarea class="pl-composer-attachments__input" rows="1" placeholder="Ask about the lease, or drop the floor plan here" aria-label="Message"></textarea>
    <div class="pl-composer-attachments__bar">
      <div class="pl-composer-attachments__anchor">
        <button type="button" class="pl-composer-attachments__plus" aria-label="Add files and tools" aria-haspopup="menu" aria-expanded="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <div class="pl-composer-attachments__menu" role="menu" aria-label="Add" hidden>
          <button type="button" role="menuitem" data-action="upload"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4M6 10l6-6 6 6M4 20h16"/></svg><span>Upload file<small>From this device</small></span></button>
          <button type="button" role="menuitem" data-action="screenshot"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg><span>Take screenshot<small>Capture a window or area</small></span></button>
          <button type="button" role="menuitem" data-action="connect"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg><span>Connect app<small>Drive, GitHub, Notion</small></span></button>
        </div>
        <input type="file" multiple class="pl-sr" tabindex="-1" aria-hidden="true">
      </div>
      <span class="pl-composer-attachments__hint">Paste or drop files. Up to 10, 100 MB each.</span>
      <button type="submit" class="pl-composer-attachments__send" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
    </div>
  </div>
  <p class="pl-sr" aria-live="polite"></p>
</form>`,
  css: `.pl-composer-attachments { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-composer-attachments__card { position: relative; display: flex; flex-direction: column; gap: 8px; padding: 10px 10px 8px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 20px; transition: border-color 160ms ease-out, box-shadow 160ms ease-out; }
.pl-composer-attachments__card:focus-within { border-color: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 20%, transparent); }
.pl-composer-attachments__card[data-drag="true"] { border-style: dashed; border-color: var(--pl-accent); }
.pl-composer-attachments__drop { position: absolute; inset: 0; display: none; place-items: center; border-radius: inherit; background: color-mix(in srgb, var(--pl-accent) 12%, var(--pl-surface)); font-size: 14px; font-weight: 600; color: var(--pl-text); pointer-events: none; z-index: 2; }
.pl-composer-attachments__card[data-drag="true"] .pl-composer-attachments__drop { display: grid; }
.pl-composer-attachments__chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
.pl-composer-attachments__chips:empty { display: none; }
.pl-composer-attachments__chip { display: inline-flex; align-items: center; gap: 8px; max-width: 100%; padding: 4px 4px 4px 6px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface-2); font-size: 13px; }
.pl-composer-attachments__chip[data-status="rejected"] { border-color: var(--pl-danger); color: var(--pl-danger); }
.pl-composer-attachments__kind { flex: none; padding: 2px 5px; border-radius: 4px; background: var(--pl-accent); color: var(--pl-on-accent); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; }
.pl-composer-attachments__meta { display: flex; flex-direction: column; min-width: 0; line-height: 1.25; }
.pl-composer-attachments__name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pl-composer-attachments__size { font-size: 11px; color: var(--pl-muted); }
.pl-composer-attachments__ring { flex: none; transform: rotate(-90deg); }
.pl-composer-attachments__track { stroke: var(--pl-border); }
.pl-composer-attachments__bar { stroke: var(--pl-accent); stroke-dasharray: 56.5; stroke-dashoffset: 56.5; transition: stroke-dashoffset 140ms linear; }
.pl-composer-attachments__check { display: none; stroke: var(--pl-success); transform: rotate(90deg); transform-origin: 12px 12px; }
.pl-composer-attachments__chip[data-status="ready"] .pl-composer-attachments__bar, .pl-composer-attachments__chip[data-status="ready"] .pl-composer-attachments__track { display: none; }
.pl-composer-attachments__chip[data-status="ready"] .pl-composer-attachments__check { display: block; }
.pl-composer-attachments__remove, .pl-composer-attachments__plus, .pl-composer-attachments__send { flex: none; display: grid; place-items: center; border: 0; border-radius: 50%; background: transparent; color: var(--pl-muted); transition: background 160ms ease-out, color 160ms ease-out; }
.pl-composer-attachments__remove { width: 28px; height: 28px; }
.pl-composer-attachments__remove:hover { background: var(--pl-surface); color: var(--pl-text); }
.pl-composer-attachments__input { width: 100%; min-height: 24px; max-height: 176px; padding: 2px 4px; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; }
.pl-composer-attachments__input::placeholder { color: var(--pl-muted); }
.pl-composer-attachments__bar { display: flex; align-items: center; gap: 10px; }
.pl-composer-attachments__anchor { position: relative; }
.pl-composer-attachments__plus, .pl-composer-attachments__send { width: 36px; height: 36px; }
.pl-composer-attachments__plus:hover, .pl-composer-attachments__plus[aria-expanded="true"] { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-composer-attachments__send { margin-left: auto; background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-composer-attachments__send:hover { filter: brightness(1.08); }
.pl-composer-attachments__hint { flex: 1; min-width: 0; font-size: 12px; color: var(--pl-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pl-composer-attachments__menu { position: absolute; left: 0; bottom: calc(100% + 8px); z-index: 3; display: flex; flex-direction: column; gap: 2px; min-width: 232px; padding: 6px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface-2); box-shadow: var(--pl-shadow); }
.pl-composer-attachments__menu [role="menuitem"] { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 10px; border: 0; border-radius: var(--pl-radius-sm); background: transparent; text-align: left; font-size: 14px; color: var(--pl-text); }
.pl-composer-attachments__menu [role="menuitem"]:hover, .pl-composer-attachments__menu [role="menuitem"]:focus-visible { background: var(--pl-surface); }
.pl-composer-attachments__menu [role="menuitem"] span { display: flex; flex-direction: column; line-height: 1.25; }
.pl-composer-attachments__menu small { font-size: 12px; color: var(--pl-muted); }`,
  mount: function (root) {
    var card = root.querySelector('.pl-composer-attachments__card');
    var plus = root.querySelector('.pl-composer-attachments__plus');
    var menu = root.querySelector('.pl-composer-attachments__menu');
    var chips = root.querySelector('.pl-composer-attachments__chips');
    var input = root.querySelector('.pl-composer-attachments__input');
    var file = root.querySelector('input[type="file"]');
    var hint = root.querySelector('.pl-composer-attachments__hint');
    var live = root.querySelector('[aria-live]');
    var timers = [];
    var picks = [['floorplan.png', '2.4 MB', 'PNG'], ['inventory.xlsx', '312 KB', 'XLS'], ['photos.zip', '48 MB', 'ZIP']];
    var template = chips.firstElementChild.cloneNode(true);
    function setOpen(open) {
      menu.hidden = !open;
      plus.setAttribute('aria-expanded', String(open));
      if (open) menu.querySelector('[role="menuitem"]').focus();
    }
    function fmt(bytes) { return bytes >= 1e6 ? (bytes / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(bytes / 1e3)) + ' KB'; }
    function addChip(name, size, kind) {
      if (chips.children.length >= 10) { hint.textContent = 'Limit is 10 files. Remove one to add another.'; live.textContent = hint.textContent; return; }
      var li = template.cloneNode(true);
      var bar = li.querySelector('.pl-composer-attachments__bar');
      li.dataset.status = 'uploading';
      li.querySelector('.pl-composer-attachments__kind').textContent = kind;
      li.querySelector('.pl-composer-attachments__name').textContent = name;
      li.querySelector('.pl-composer-attachments__size').textContent = size;
      li.querySelector('.pl-composer-attachments__remove').setAttribute('aria-label', 'Remove ' + name);
      bar.style.strokeDashoffset = 56.5;
      chips.appendChild(li);
      live.textContent = 'Attached ' + name + ', uploading';
      var progress = 0;
      var tick = setInterval(function () {
        progress = Math.min(100, progress + 3 + Math.random() * 9);
        bar.style.strokeDashoffset = (56.5 * (1 - progress / 100)).toFixed(1);
        if (progress >= 100) { clearInterval(tick); li.dataset.status = 'ready'; live.textContent = name + ' ready'; }
      }, 120);
      timers.push(tick);
    }
    function addFiles(list) {
      Array.prototype.forEach.call(list, function (f) {
        var ext = (f.name.split('.').pop() || 'file').slice(0, 4).toUpperCase();
        if (f.size > 100e6) { hint.textContent = f.name + ' is over 100 MB.'; live.textContent = hint.textContent; return; }
        addChip(f.name, fmt(f.size), ext);
      });
    }
    function onDocClick(ev) { if (!menu.hidden && !root.contains(ev.target)) setOpen(false); }
    plus.addEventListener('click', function () { setOpen(menu.hidden); });
    menu.addEventListener('click', function (ev) {
      var item = ev.target.closest('[role="menuitem"]');
      if (!item) return;
      setOpen(false);
      plus.focus();
      if (item.dataset.action === 'upload') { var p = picks.shift(); picks.push(p); addChip(p[0], p[1], p[2]); }
      if (item.dataset.action === 'screenshot') addChip('screenshot-kitchen.png', '640 KB', 'PNG');
      if (item.dataset.action === 'connect') { hint.textContent = 'Connect app opens the integrations picker.'; live.textContent = hint.textContent; }
    });
    menu.addEventListener('keydown', function (ev) {
      var items = Array.prototype.slice.call(menu.querySelectorAll('[role="menuitem"]'));
      var i = items.indexOf(document.activeElement);
      if (ev.key === 'Escape') { ev.preventDefault(); setOpen(false); plus.focus(); }
      if (ev.key === 'ArrowDown') { ev.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (ev.key === 'ArrowUp') { ev.preventDefault(); items[(i + items.length - 1) % items.length].focus(); }
    });
    chips.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.pl-composer-attachments__remove');
      if (!btn) return;
      live.textContent = btn.getAttribute('aria-label').replace('Remove', 'Removed');
      btn.parentNode.remove();
      input.focus();
    });
    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'Backspace' && !input.value && chips.lastElementChild) { ev.preventDefault(); chips.lastElementChild.querySelector('.pl-composer-attachments__remove').click(); }
    });
    input.addEventListener('paste', function (ev) {
      var files = Array.prototype.filter.call(ev.clipboardData.items, function (it) { return it.kind === 'file'; }).map(function (it) { return it.getAsFile(); });
      if (files.length) { ev.preventDefault(); addFiles(files); }
    });
    file.addEventListener('change', function () { addFiles(file.files); file.value = ''; });
    card.addEventListener('dragover', function (ev) { ev.preventDefault(); card.dataset.drag = 'true'; });
    card.addEventListener('dragleave', function (ev) { if (!card.contains(ev.relatedTarget)) card.dataset.drag = 'false'; });
    card.addEventListener('drop', function (ev) { ev.preventDefault(); card.dataset.drag = 'false'; addFiles(ev.dataTransfer.files); });
    root.addEventListener('submit', function (ev) { ev.preventDefault(); });
    document.addEventListener('click', onDocClick);
    return function () { timers.forEach(clearInterval); document.removeEventListener('click', onDocClick); };
  },
};
