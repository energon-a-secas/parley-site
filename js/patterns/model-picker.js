export default {
  id: 'model-picker',
  name: 'Model picker in the composer bar',
  category: 'Composer',
  description: 'A compact dropdown left of send showing the current model, opening a listbox grouped into Fast and Smart with a one-line outcome per row, a Default badge, a locked row and a "More models" overflow.',
  tags: ['composer', 'listbox', 'dropdown', 'models'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Claude.ai', note: 'The model name next to the send button opens a menu with models, More models, Effort levels (one marked Default) and a thinking toggle; changes apply from the next reply', url: 'https://support.claude.com/en/articles/8664678-change-the-model-effort-and-extended-thinking-settings', checked: '2026-11-02' },
    { product: 'Gemini', note: 'Picker inside the composer with outcome labels Fast, Thinking, Pro; a later capture shows the bar naming a family while the menu uses other names (third-party teardown)', url: 'https://aiuxplayground.com/teardowns/gemini/composer', checked: '2026-11-02' },
    { product: 'Perplexity', note: '"Best" picks a model per question; specific models are reserved for Pro subscribers', url: 'https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work', checked: '2026-11-02' },
    { product: 'OpenAI ChatKit', note: 'composer.models entries carry label, description, disabled and default, chosen before sending', url: 'https://github.com/openai/chatkit-js', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'PromptInputSelect family placed in the composer footer next to submit', url: 'https://elements.ai-sdk.dev/components/prompt-input', checked: '2026-11-02' },
  ],
  anatomy: [
    'Trigger button with aria-haspopup="listbox" and aria-expanded showing the short label and a chevron',
    'Listbox opening upward, grouped with role="group" and a small heading per group (Fast, Smart)',
    'Option rows: name, one-line outcome description, optional badge (Default, Team plan)',
    'Locked option with aria-disabled="true" and the reason in its description',
    'Footer row "More models" leading to the full list',
    'One-line note when a change applies from the next reply',
  ],
  states: [
    'Closed: trigger shows the current short label',
    'Open: current option has aria-selected="true" and focus',
    'Option disabled by plan: visible, not selectable, reason shown',
    'Changed mid-conversation: note says the choice applies from the next reply',
  ],
  behavior: [
    'Click or ArrowDown on the trigger opens the list and focuses the selected option',
    'ArrowUp and ArrowDown move between enabled options; Home and End jump; Enter or Space selects',
    'Escape and outside click close and return focus to the trigger',
    'Selection is persisted per conversation and sent with each request',
    'The trigger label and the menu row use the same name, never two naming systems',
  ],
  microcopy: [
    { text: 'More models', source: 'Claude.ai model menu' },
    { text: 'Default', source: 'Claude.ai effort badge' },
    { text: 'Best', source: 'Perplexity model option' },
  ],
  variants: [
    'In the composer right side next to send (Claude, Gemini, ChatKit, AI Elements)',
    'In the page header instead of the bar; the menu is identical, only the anchor moves',
    'Outcome labels instead of model IDs (Gemini Fast, Thinking, Pro)',
    'No model picker at all, a mode picker instead (Copilot); per-message model via "@" (Open WebUI)',
  ],
  pitfalls: [
    'Two naming systems between bar and menu',
    'An effort level named "Low" next to a model name reads as weak quality',
    'Locked rows doubling as paywall previews crowd the list',
    'A picker must say when a choice removes capabilities, as Notion warns for non-Notion models',
  ],
  refs: [
    { label: 'openai/chatkit-js composer.models', url: 'https://github.com/openai/chatkit-js' },
    { label: 'Vercel AI Elements: PromptInput', url: 'https://elements.ai-sdk.dev/components/prompt-input' },
  ],
  spec: 'Place a small button immediately left of send with aria-haspopup="listbox", aria-expanded and the current model\'s short label. On click open a ul role="listbox" above the bar, grouped with role="group" elements that carry aria-label, each li role="option" holding a name, a one-line outcome description and an optional badge; mark the current one aria-selected="true" and locked ones aria-disabled="true" with the reason in the description. Manage focus with roving tabindex: focus the selected option on open, move with the arrow keys skipping disabled rows, select on Enter or Space, close on Escape and return focus to the trigger. Persist the choice per conversation and show a one-line note when it applies from the next reply. Pair with the send-stop pattern for the rest of the bar.',
  html: `<div class="pl pl-model-picker">
  <div class="pl-model-picker__card">
    <textarea class="pl-model-picker__input" rows="1" aria-label="Message" placeholder="Rewrite clause 4 of the lease in plain English"></textarea>
    <div class="pl-model-picker__bar">
      <span class="pl-model-picker__note" aria-live="polite"></span>
      <div class="pl-model-picker__anchor">
        <button type="button" class="pl-model-picker__trigger" aria-haspopup="listbox" aria-expanded="false" aria-label="Model: Lark Pro"><span class="pl-model-picker__label">Lark Pro</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
        <ul class="pl-model-picker__list" role="listbox" aria-label="Model" hidden>
          <li role="group" aria-label="Fast"><span class="pl-model-picker__group">Fast</span>
            <ul>
              <li role="option" tabindex="-1" aria-selected="false" data-id="flash" data-label="Lark Flash"><span class="pl-model-picker__name">Lark Flash</span><span class="pl-model-picker__desc">Quick answers and edits. Lowest cost</span></li>
            </ul>
          </li>
          <li role="group" aria-label="Smart"><span class="pl-model-picker__group">Smart</span>
            <ul>
              <li role="option" tabindex="0" aria-selected="true" data-id="pro" data-label="Lark Pro"><span class="pl-model-picker__name">Lark Pro <span class="pl-model-picker__badge">Default</span></span><span class="pl-model-picker__desc">Complex work, documents and code</span></li>
              <li role="option" tabindex="-1" aria-selected="false" data-id="deep" data-label="Lark Deep"><span class="pl-model-picker__name">Lark Deep</span><span class="pl-model-picker__desc">Long reasoning. Slower, best for hard problems</span></li>
              <li role="option" tabindex="-1" aria-selected="false" aria-disabled="true" data-id="ultra" data-label="Lark Ultra"><span class="pl-model-picker__name">Lark Ultra <span class="pl-model-picker__badge">Team plan</span></span><span class="pl-model-picker__desc">Needs a Team workspace. Ask your admin</span></li>
            </ul>
          </li>
          <li class="pl-model-picker__more"><button type="button">More models<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></button></li>
        </ul>
      </div>
      <button type="button" class="pl-model-picker__send" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
    </div>
  </div>
</div>`,
  css: `.pl-model-picker { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-model-picker__card { display: flex; flex-direction: column; gap: 8px; padding: 10px 10px 8px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 20px; transition: border-color 160ms ease-out, box-shadow 160ms ease-out; }
.pl-model-picker__card:focus-within { border-color: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 20%, transparent); }
.pl-model-picker__input { width: 100%; min-height: 24px; max-height: 176px; padding: 2px 4px; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; }
.pl-model-picker__input::placeholder { color: var(--pl-muted); }
.pl-model-picker__bar { display: flex; align-items: center; gap: 8px; }
.pl-model-picker__note { flex: 1; min-width: 0; font-size: 12px; color: var(--pl-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pl-model-picker__anchor { position: relative; }
.pl-model-picker__trigger { display: inline-flex; align-items: center; gap: 4px; height: 32px; padding: 0 8px 0 12px; border: 1px solid transparent; border-radius: 999px; background: transparent; font-size: 13px; font-weight: 600; color: var(--pl-muted); transition: background 160ms ease-out, color 160ms ease-out; }
.pl-model-picker__trigger:hover, .pl-model-picker__trigger[aria-expanded="true"] { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-model-picker__trigger svg { transition: transform 160ms ease-out; }
.pl-model-picker__trigger[aria-expanded="true"] svg { transform: rotate(180deg); }
.pl-model-picker__send { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-model-picker__send:hover { filter: brightness(1.08); }
.pl-model-picker__list, .pl-model-picker__list ul { margin: 0; padding: 0; list-style: none; }
.pl-model-picker__list { position: absolute; right: 0; bottom: calc(100% + 8px); z-index: 3; width: min(300px, calc(100vw - 48px)); padding: 6px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface-2); box-shadow: var(--pl-shadow); }
.pl-model-picker__group { display: block; padding: 6px 10px 2px; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--pl-muted); }
.pl-model-picker__list [role="option"] { display: flex; flex-direction: column; gap: 1px; padding: 7px 10px; border-radius: var(--pl-radius-sm); font-size: 14px; line-height: 1.3; cursor: pointer; }
.pl-model-picker__list [role="option"]:hover, .pl-model-picker__list [role="option"]:focus-visible { background: var(--pl-surface); }
.pl-model-picker__list [role="option"][aria-selected="true"] { background: color-mix(in srgb, var(--pl-accent) 16%, var(--pl-surface-2)); }
.pl-model-picker__list [role="option"][aria-disabled="true"] { opacity: 0.55; cursor: not-allowed; }
.pl-model-picker__name { display: flex; align-items: center; gap: 6px; font-weight: 600; }
.pl-model-picker__badge { padding: 1px 6px; border-radius: 999px; background: var(--pl-surface); border: 1px solid var(--pl-border); font-size: 10.5px; font-weight: 600; color: var(--pl-muted); }
.pl-model-picker__desc { font-size: 12px; color: var(--pl-muted); }
.pl-model-picker__more { margin-top: 4px; padding-top: 4px; border-top: 1px solid var(--pl-border); }
.pl-model-picker__more button { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 7px 10px; border: 0; border-radius: var(--pl-radius-sm); background: transparent; font-size: 13px; color: var(--pl-muted); }
.pl-model-picker__more button:hover { background: var(--pl-surface); color: var(--pl-text); }`,
  mount: function (root) {
    var trigger = root.querySelector('.pl-model-picker__trigger');
    var label = root.querySelector('.pl-model-picker__label');
    var list = root.querySelector('.pl-model-picker__list');
    var note = root.querySelector('.pl-model-picker__note');
    var options = Array.prototype.slice.call(list.querySelectorAll('[role="option"]'));
    var enabled = options.filter(function (o) { return o.getAttribute('aria-disabled') !== 'true'; });
    function selected() { return list.querySelector('[aria-selected="true"]'); }
    function setOpen(open) {
      list.hidden = !open;
      trigger.setAttribute('aria-expanded', String(open));
      if (open) selected().focus();
    }
    function focusOption(el) {
      options.forEach(function (o) { o.tabIndex = -1; });
      el.tabIndex = 0;
      el.focus();
    }
    function choose(el) {
      if (el.getAttribute('aria-disabled') === 'true') { note.textContent = el.dataset.label + ' needs a Team workspace.'; return; }
      var changed = selected() !== el;
      options.forEach(function (o) { o.setAttribute('aria-selected', String(o === el)); });
      label.textContent = el.dataset.label;
      trigger.setAttribute('aria-label', 'Model: ' + el.dataset.label);
      note.textContent = changed ? el.dataset.label + ' applies from the next reply.' : '';
      setOpen(false);
      trigger.focus();
    }
    function onDocClick(ev) { if (!list.hidden && !root.contains(ev.target)) setOpen(false); }
    trigger.addEventListener('click', function () { setOpen(list.hidden); });
    trigger.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') { ev.preventDefault(); setOpen(true); }
    });
    list.addEventListener('click', function (ev) {
      var opt = ev.target.closest('[role="option"]');
      if (opt) choose(opt);
      else if (ev.target.closest('.pl-model-picker__more')) { note.textContent = 'More models opens the full list in settings.'; setOpen(false); trigger.focus(); }
    });
    list.addEventListener('keydown', function (ev) {
      var i = enabled.indexOf(document.activeElement);
      if (ev.key === 'Escape') { ev.preventDefault(); setOpen(false); trigger.focus(); }
      else if (ev.key === 'ArrowDown') { ev.preventDefault(); focusOption(enabled[Math.min(enabled.length - 1, i + 1)]); }
      else if (ev.key === 'ArrowUp') { ev.preventDefault(); focusOption(enabled[Math.max(0, i - 1)]); }
      else if (ev.key === 'Home') { ev.preventDefault(); focusOption(enabled[0]); }
      else if (ev.key === 'End') { ev.preventDefault(); focusOption(enabled[enabled.length - 1]); }
      else if ((ev.key === 'Enter' || ev.key === ' ') && document.activeElement.getAttribute('role') === 'option') { ev.preventDefault(); choose(document.activeElement); }
    });
    document.addEventListener('click', onDocClick);
    return function () { document.removeEventListener('click', onDocClick); };
  },
};
