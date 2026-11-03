export default {
  id: 'agent-picker',
  name: 'Agent and mode picker above the composer',
  category: 'Shell',
  description: 'A trigger showing the current agent that opens a listbox of agents with avatar, name, one-line description and a selected state; choosing one changes the composer placeholder.',
  tags: ['agents', 'picker', 'listbox', 'composer', 'modes'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Microsoft 365 Copilot Chat', note: 'Agents in both the Web and Work tabs, an Agents section in the navigation panel, All agents opens the Agent Store, suggested prompts after picking one; used agents sit in a most-recently-used list and can be pinned', url: 'https://support.microsoft.com/en-gb/topic/get-started-with-agents-for-microsoft-365-copilot-169469d7-328d-4d37-9090-bfc2058a39bd', checked: '2026-11-02' },
    { product: 'ChatGPT GPTs', note: 'Explore GPTs to browse; typing "@" brings a GPT into an existing conversation on web, not on iOS or Android per the help text; forum users report the mention stopped working (snippets)', url: 'https://community.openai.com/t/why-does-the-custom-gpt-mention-feature-no-longer-work/1370980', checked: '2026-11-02' },
    { product: 'Cursor', note: 'Cmd+. opens the mode menu, Shift+Tab cycles Agent modes, Cmd+/ cycles models; staff recommend Cmd+. to switch within a chat because the Agent shortcut opens a new chat on purpose', url: 'https://forum.cursor.com/t/bug-while-cycling-through-agent-plan-ask-modes-using-hotkeys/140490', checked: '2026-11-02' },
    { product: 'Gemini Gems', note: 'Gems and My Gems in the sidebar; a chat starts by selecting one', url: 'https://support.google.com/gemini/answer/15146780', checked: '2026-11-02' },
    { product: 'Open WebUI', note: '"@" talks to a model, Mod+Shift+M opens the model selector, pinned models sit in the sidebar', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'Claude Skills', note: 'Customize > Skills lists skills with on/off toggles; Claude decides when to use one and the article describes no in-chat indicator', url: 'https://support.claude.com/en/articles/12512180-use-skills-in-claude', checked: '2026-11-02' },
  ],
  anatomy: [
    'Trigger button with the current agent\'s avatar and name, aria-haspopup="listbox" and aria-expanded',
    'Popover ul role="listbox" with aria-activedescendant managed on the trigger or list',
    'Options with avatar, name, one-line description and aria-selected',
    'Groups: Pinned, Recent, All (and a store link)',
    'Composer whose placeholder and suggested prompts follow the agent',
    'An identity stamp on each assistant message naming the agent that answered',
  ],
  states: [
    'Default agent',
    'Open: list visible, first or selected option highlighted',
    'Selected: trigger and placeholder update, list closes, focus returns to the trigger',
    'Unavailable: needs approval or upgrade, option disabled with a reason',
    'Chat already has messages: confirm "Switch here" or "Start a new chat with {agent}"',
  ],
  behavior: [
    'Arrow keys move the highlight, Home and End jump, Enter or Space selects, Escape closes without changing',
    'Typing "@" in the composer opens the same list as a combobox popover (ChatGPT, Open WebUI)',
    'Cursor separates "new chat with this mode" from "switch mode here", because switching mid-chat changes what context the agent sees',
    'Each assistant message is stamped with the agent name, so a mid-chat switch stays visible in the history',
  ],
  microcopy: [
    { text: 'Switching modes or models in the same chat can cause context issues.', source: 'Cursor staff, forum' },
    { text: 'Agents are available in both the Web and Work tabs.', source: 'Microsoft 365 Copilot help' },
  ],
  variants: [
    'Copilot: a store plus pinned agents in the left rail',
    'ChatGPT: a store plus @-mention in the composer',
    'Claude: Projects hold context, Skills are auto-invoked with no picker',
    'Gemini: Gems as personas started from the sidebar',
    'Cursor: modes and models switched in the composer with shortcuts',
  ],
  pitfalls: [
    'Switching agent or model mid-chat corrupts expectations about context (Cursor)',
    'Mention features that regress silently (ChatGPT forum reports)',
    'Auto-selected tools with no in-chat indicator leave users unsure what ran',
    'Mobile parity gaps: no GPT @-mention on iOS or Android per the help text',
  ],
  refs: [
    { label: 'Cursor: keyboard shortcuts', url: 'https://cursor.com/docs/configuration/kbd' },
    { label: 'Microsoft: get started with agents', url: 'https://support.microsoft.com/en-gb/topic/get-started-with-agents-for-microsoft-365-copilot-169469d7-328d-4d37-9090-bfc2058a39bd' },
  ],
  spec: 'Render a button with aria-haspopup="listbox", aria-expanded and aria-controls showing the current agent\'s avatar and name. It toggles a ul role="listbox" of li role="option" items (each with id, avatar, name, description and aria-selected); keep the highlighted option in aria-activedescendant on the list, move it with ArrowUp, ArrowDown, Home and End, select on Enter or Space or click, close on Escape or outside click, and return focus to the trigger. On select, update the trigger, set data-agent on the root, swap the textarea placeholder for that agent\'s prompt, and if the chat already has messages ask whether to switch here or start a new chat. Stamp each assistant message with the agent name and icon.',
  html: `<div class="pl pl-agent-picker" data-agent="general">
  <div class="pl-agent-picker__wrap">
    <button type="button" class="pl-agent-picker__trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="pl-agent-picker-list"><span class="pl-agent-picker__avatar" data-tone="a" aria-hidden="true">G</span><span class="pl-agent-picker__name">General</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
    <ul id="pl-agent-picker-list" class="pl-agent-picker__list" role="listbox" aria-label="Choose an agent" tabindex="-1" hidden>
      <li id="pl-agent-picker-general" role="option" aria-selected="true" data-id="general" data-placeholder="Ask anything"><span class="pl-agent-picker__avatar" data-tone="a" aria-hidden="true">G</span><span><strong>General</strong><small>Questions, drafts, quick answers</small></span></li>
      <li id="pl-agent-picker-trip" role="option" aria-selected="false" data-id="trip" data-placeholder="Where to, and when?"><span class="pl-agent-picker__avatar" data-tone="b" aria-hidden="true">T</span><span><strong>Trip planner</strong><small>Itineraries, budgets, bookings to check</small></span></li>
      <li id="pl-agent-picker-review" role="option" aria-selected="false" data-id="review" data-placeholder="Paste a diff or describe the failing test"><span class="pl-agent-picker__avatar" data-tone="c" aria-hidden="true">R</span><span><strong>Code reviewer</strong><small>Reads diffs, flags risks, suggests tests</small></span></li>
      <li id="pl-agent-picker-contract" role="option" aria-selected="false" data-id="contract" data-placeholder="Paste the clause you want checked"><span class="pl-agent-picker__avatar" data-tone="d" aria-hidden="true">C</span><span><strong>Contract reader</strong><small>Plain-language summaries, not legal advice</small></span></li>
    </ul>
  </div>
  <form class="pl-agent-picker__composer" aria-label="Message composer">
    <textarea rows="1" placeholder="Ask anything" aria-label="Message"></textarea>
    <button type="submit" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
  </form>
  <p class="pl-sr" aria-live="polite"></p>
</div>`,
  css: `.pl-agent-picker { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-agent-picker__wrap { position: relative; display: inline-block; margin-bottom: 10px; }
.pl-agent-picker__trigger { display: inline-flex; align-items: center; gap: 8px; min-height: 36px; padding: 0 10px 0 6px; border: 1px solid var(--pl-border); border-radius: 999px; background: var(--pl-surface); font-size: 14px; font-weight: 600; }
.pl-agent-picker__trigger:hover, .pl-agent-picker__trigger[aria-expanded="true"] { border-color: var(--pl-accent); }
.pl-agent-picker__avatar { flex: none; display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; font-size: 12px; font-weight: 700; color: var(--pl-on-accent); background: var(--pl-accent); }
.pl-agent-picker__avatar[data-tone="b"] { background: var(--pl-success); color: var(--pl-bg); }
.pl-agent-picker__avatar[data-tone="c"] { background: var(--pl-text); color: var(--pl-bg); }
.pl-agent-picker__avatar[data-tone="d"] { background: var(--pl-muted); color: var(--pl-bg); }
.pl-agent-picker__list { position: absolute; z-index: 3; top: calc(100% + 6px); left: 0; width: min(320px, calc(100vw - 48px)); margin: 0; padding: 6px; list-style: none; background: var(--pl-surface-2); border: 1px solid var(--pl-border); border-radius: var(--pl-radius); box-shadow: var(--pl-shadow); outline: none; }
.pl-agent-picker__list[hidden] { display: none; }
.pl-agent-picker__list li { display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 6px 8px; border-radius: var(--pl-radius-sm); cursor: pointer; font-size: 14px; }
.pl-agent-picker__list li > span:last-child { display: flex; flex-direction: column; min-width: 0; }
.pl-agent-picker__list small { font-size: 12px; color: var(--pl-muted); }
.pl-agent-picker__list li:hover, .pl-agent-picker__list li[data-active="true"] { background: var(--pl-surface); }
.pl-agent-picker__list li[aria-selected="true"] { box-shadow: inset 0 0 0 1px var(--pl-accent); }
.pl-agent-picker__list li[aria-selected="true"] strong::after { content: ' Selected'; font-size: 11px; font-weight: 600; color: var(--pl-accent); }
.pl-agent-picker__composer { display: flex; align-items: flex-end; gap: 8px; padding: 8px 8px 8px 14px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 24px; }
.pl-agent-picker__composer:focus-within { border-color: var(--pl-accent); }
.pl-agent-picker__composer textarea { flex: 1; min-width: 0; min-height: 36px; padding: 7px 0; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; }
.pl-agent-picker__composer textarea::placeholder { color: var(--pl-muted); }
.pl-agent-picker__composer button { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); }`,
  mount: function (root) {
    var trigger = root.querySelector('.pl-agent-picker__trigger');
    var list = root.querySelector('.pl-agent-picker__list');
    var options = Array.prototype.slice.call(list.querySelectorAll('[role="option"]'));
    var textarea = root.querySelector('textarea');
    var live = root.querySelector('[aria-live]');
    var active = 0;
    function highlight(i) {
      active = (i + options.length) % options.length;
      options.forEach(function (o, n) { if (n === active) o.dataset.active = 'true'; else delete o.dataset.active; });
      list.setAttribute('aria-activedescendant', options[active].id);
    }
    function setOpen(open) {
      list.hidden = !open; trigger.setAttribute('aria-expanded', String(open));
      if (open) { highlight(options.findIndex(function (o) { return o.getAttribute('aria-selected') === 'true'; })); list.focus(); }
    }
    function select(i) {
      var o = options[i];
      options.forEach(function (x) { x.setAttribute('aria-selected', String(x === o)); });
      root.dataset.agent = o.dataset.id;
      root.querySelector('.pl-agent-picker__name').textContent = o.querySelector('strong').textContent;
      var av = trigger.querySelector('.pl-agent-picker__avatar'), src = o.querySelector('.pl-agent-picker__avatar');
      av.textContent = src.textContent; av.dataset.tone = src.dataset.tone;
      textarea.placeholder = o.dataset.placeholder;
      live.textContent = o.querySelector('strong').textContent + ' selected';
      setOpen(false); trigger.focus();
    }
    trigger.addEventListener('click', function () { setOpen(list.hidden); });
    list.addEventListener('click', function (e) { var o = e.target.closest('[role="option"]'); if (o) select(options.indexOf(o)); });
    list.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); highlight(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(active - 1); }
      else if (e.key === 'Home') { e.preventDefault(); highlight(0); }
      else if (e.key === 'End') { e.preventDefault(); highlight(options.length - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(active); }
      else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); trigger.focus(); }
    });
    root.addEventListener('submit', function (e) { e.preventDefault(); });
    root.addEventListener('click', function (e) { if (!list.hidden && !e.target.closest('.pl-agent-picker__wrap')) setOpen(false); });
    list.addEventListener('focusout', function (e) { if (!list.contains(e.relatedTarget) && e.relatedTarget !== trigger) setOpen(false); });
  },
};
