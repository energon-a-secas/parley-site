export default {
  id: 'composer-limits',
  name: 'Length limits, context meter and paste collapse',
  category: 'Composer',
  description: 'A character counter that appears only near the limit, a context-window meter in the bar, and a long paste that collapses into a "[Pasted text #1]" chip instead of failing after send.',
  tags: ['composer', 'limits', 'counter', 'context', 'paste'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Claude.ai', note: 'An error beginning "Your message will exceed the length limit for this chat" suggests fewer or smaller files or a new chat; some plans summarize earlier messages near the limit', url: 'https://support.claude.com/en/articles/12466728', checked: '2026-11-02' },
    { product: 'Claude Code', note: 'A paste over 800 characters or three lines collapses to a "[Pasted text #1 +120 lines]" placeholder; the full text is still sent', url: 'https://code.claude.com/docs/en/terminal-config', checked: '2026-11-02' },
    { product: 'Open WebUI', note: 'Opt-in largeTextAsFile turns a paste over 1000 characters into a Pasted_Text_<timestamp>.txt upload; holding Shift skips it', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'Context component shows used versus max tokens, a percentage and an input, output, reasoning and cache breakdown in a hover card', url: 'https://elements.ai-sdk.dev/components/context', checked: '2026-11-02' },
    { product: 'Sendbird UIKit React', note: 'MessageInput maxLength defaults to 5000 characters', url: 'https://github.com/sendbird/sendbird-uikit-react', checked: '2026-11-02' },
  ],
  anatomy: [
    'Hard limit held in one constant: characters for chat apps, estimated tokens for LLM apps',
    'Counter next to send, hidden under 80 percent, warning color at 95, danger at 100',
    'Context meter: ring plus "38k / 200k" label with an estimate note in its title',
    'Chip row above the textarea for collapsed pastes, each with line count and a remove button',
    'Reason line under the card explaining why send is disabled',
    'Polite live region fired at thresholds, not on every keystroke',
  ],
  states: [
    'Under limit: no counter',
    'Approaching: counter visible in muted type',
    'Near limit: counter in the danger color',
    'At limit: send disabled, reason shown, text intact',
    'Paste collapsed: chip added, textarea stays short, meter grows',
    'Context near full: meter turns danger and suggests a new chat or removing attachments',
  ],
  behavior: [
    'On paste, text over 800 characters or more than 3 lines is prevented and becomes a chip; Shift held pastes inline',
    'The chip stands for the full text, which is still sent; nothing is truncated',
    'Backspace in an empty textarea removes the last chip',
    'The counter reads "187 / 200" and is announced only when it crosses 80, 95 and 100 percent',
    'When the server rejects length, restore the draft and say what to remove',
  ],
  microcopy: [
    { text: 'Your message will exceed the length limit for this chat', source: 'Claude.ai error' },
    { text: '[Pasted text #1 +120 lines]', source: 'Claude Code placeholder format' },
  ],
  variants: [
    'Character cap with a counter (Discord, Sendbird, Slack-style chat)',
    'Token meter instead of characters (AI Elements Context, Claude Code /context)',
    'Paste to file (Claude Code, Open WebUI, Discord)',
    'Automatic history summarization that hides the limit until one very large message (Claude)',
  ],
  pitfalls: [
    'Silent truncation of a large paste is worse than any error (open Claude Code issue 92118)',
    'Failing only after send, then disabling the composer, leaves a dead end',
    'Counting characters when the real limit is tokens produces false confidence; label estimates as estimates',
    'A counter on every keystroke in a live region is noise; announce thresholds only',
  ],
  refs: [
    { label: 'Vercel AI Elements: Context', url: 'https://elements.ai-sdk.dev/components/context' },
    { label: 'Claude Code terminal config (paste placeholder)', url: 'https://code.claude.com/docs/en/terminal-config' },
    { label: 'anthropics/claude-code issue 92118', url: 'https://github.com/anthropics/claude-code/issues/92118' },
  ],
  spec: 'Keep LIMIT in one constant. On paste, read clipboardData.getData("text/plain"); if it has more than 800 characters or more than 3 lines and Shift is not held, preventDefault and append a chip labelled "[Pasted text N +L lines]" that holds the full text in a side array. On input, show a counter reading "n / LIMIT" once n passes 80 percent, add a danger class at 95, and at 100 disable send and write the reason under the card while leaving the text intact. Draw a context ring from estimated tokens (characters divided by 4 plus each chip), label it as an estimate, and turn it danger past 90 percent with a suggestion to start a new chat. Announce threshold crossings in a polite live region. Pair with the send-stop pattern for the send control.',
  html: `<form class="pl pl-composer-limits" aria-label="Message composer">
  <div class="pl-composer-limits__card">
    <ul class="pl-composer-limits__chips" aria-label="Pasted text attachments"></ul>
    <textarea class="pl-composer-limits__input" rows="2" aria-label="Message" placeholder="Describe the bug">The checkout test passes alone but fails in the suite. It looks like the coupon mock leaks between cases. Here is the output from the last run on</textarea>
    <div class="pl-composer-limits__bar">
      <button type="button" class="pl-composer-limits__demo">Paste long text</button>
      <span class="pl-composer-limits__context" title="Estimated from characters. The real limit is tokens." aria-label="Context used: 38k of 200k tokens, estimated">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="3" aria-hidden="true"><circle class="pl-composer-limits__track" cx="12" cy="12" r="9"/><circle class="pl-composer-limits__fill" cx="12" cy="12" r="9" stroke-linecap="round"/></svg>
        <span class="pl-composer-limits__context-label">38k / 200k</span>
      </span>
      <span class="pl-composer-limits__counter" hidden></span>
      <button type="submit" class="pl-composer-limits__send" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
    </div>
  </div>
  <p class="pl-composer-limits__reason">Limit 200 characters in this demo. Long pastes become a chip and are still sent in full.</p>
  <p class="pl-sr" aria-live="polite"></p>
</form>`,
  css: `.pl-composer-limits { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-composer-limits__card { display: flex; flex-direction: column; gap: 8px; padding: 10px 10px 8px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 20px; transition: border-color 160ms ease-out, box-shadow 160ms ease-out; }
.pl-composer-limits__card:focus-within { border-color: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 20%, transparent); }
.pl-composer-limits__chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
.pl-composer-limits__chips:empty { display: none; }
.pl-composer-limits__chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 4px 4px 10px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface-2); font-family: var(--pl-mono); font-size: 12.5px; }
.pl-composer-limits__chip button { display: grid; place-items: center; width: 24px; height: 24px; border: 0; border-radius: 50%; background: transparent; color: var(--pl-muted); }
.pl-composer-limits__chip button:hover { background: var(--pl-surface); color: var(--pl-text); }
.pl-composer-limits__input { width: 100%; min-height: 24px; max-height: 176px; padding: 2px 4px; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; }
.pl-composer-limits__input::placeholder { color: var(--pl-muted); }
.pl-composer-limits__bar { display: flex; align-items: center; gap: 10px; }
.pl-composer-limits__demo { height: 32px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; font-size: 13px; color: var(--pl-muted); }
.pl-composer-limits__demo:hover { color: var(--pl-text); background: var(--pl-surface-2); }
.pl-composer-limits__context { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; font-size: 12px; color: var(--pl-muted); cursor: help; }
.pl-composer-limits__context svg { transform: rotate(-90deg); }
.pl-composer-limits__track { stroke: var(--pl-border); }
.pl-composer-limits__fill { stroke: var(--pl-accent); stroke-dasharray: 56.5; stroke-dashoffset: 45.8; transition: stroke-dashoffset 200ms ease-out, stroke 200ms ease-out; }
.pl-composer-limits__context[data-level="danger"] .pl-composer-limits__fill { stroke: var(--pl-danger); }
.pl-composer-limits__context[data-level="danger"] { color: var(--pl-danger); }
.pl-composer-limits__counter { font-family: var(--pl-mono); font-size: 12px; color: var(--pl-muted); }
.pl-composer-limits__counter[data-level="danger"] { color: var(--pl-danger); font-weight: 600; }
.pl-composer-limits__send { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-composer-limits__send:hover { filter: brightness(1.08); }
.pl-composer-limits__send:disabled { background: var(--pl-surface-2); color: var(--pl-muted); cursor: not-allowed; }
.pl-composer-limits__reason { margin: 8px 12px 0; font-size: 12px; color: var(--pl-muted); min-height: 18px; }
.pl-composer-limits__reason[data-level="danger"] { color: var(--pl-danger); }`,
  mount: function (root) {
    var LIMIT = 200, MAX_TOKENS = 200000, BASE_TOKENS = 38000;
    var input = root.querySelector('.pl-composer-limits__input');
    var chips = root.querySelector('.pl-composer-limits__chips');
    var counter = root.querySelector('.pl-composer-limits__counter');
    var context = root.querySelector('.pl-composer-limits__context');
    var fill = root.querySelector('.pl-composer-limits__fill');
    var contextLabel = root.querySelector('.pl-composer-limits__context-label');
    var send = root.querySelector('.pl-composer-limits__send');
    var reason = root.querySelector('.pl-composer-limits__reason');
    var demo = root.querySelector('.pl-composer-limits__demo');
    var live = root.querySelector('[aria-live]');
    var defaultReason = reason.textContent;
    var pasted = [], lastLevel = 'ok';
    function level(n) { return n >= LIMIT ? 'danger' : n >= LIMIT * 0.95 ? 'warn' : n >= LIMIT * 0.8 ? 'near' : 'ok'; }
    function update() {
      var n = input.value.length;
      var lv = level(n);
      counter.hidden = lv === 'ok';
      counter.textContent = n + ' / ' + LIMIT;
      counter.dataset.level = lv === 'ok' || lv === 'near' ? 'muted' : 'danger';
      send.disabled = lv === 'danger';
      reason.dataset.level = lv === 'danger' ? 'danger' : '';
      reason.textContent = lv === 'danger' ? 'Your message will exceed the length limit for this chat. Remove ' + (n - LIMIT + 1) + ' characters or paste the long part as text.' : defaultReason;
      if (lv !== lastLevel && lv !== 'ok') live.textContent = lv === 'danger' ? 'Limit reached, send disabled' : n + ' of ' + LIMIT + ' characters';
      lastLevel = lv;
      var tokens = BASE_TOKENS + Math.round(n / 4) + pasted.reduce(function (sum, p) { return sum + Math.round(p.length / 4); }, 0);
      var share = Math.min(1, tokens / MAX_TOKENS);
      fill.style.strokeDashoffset = (56.5 * (1 - share)).toFixed(1);
      contextLabel.textContent = Math.round(tokens / 1000) + 'k / 200k';
      context.dataset.level = share > 0.9 ? 'danger' : 'ok';
      context.setAttribute('aria-label', 'Context used: ' + Math.round(tokens / 1000) + 'k of 200k tokens, estimated');
      if (share > 0.9 && lv !== 'danger') reason.textContent = 'Near the context limit. Start a new chat or remove a pasted block.';
    }
    function addPaste(text) {
      var lines = text.split('\n').length;
      pasted.push(text);
      var li = document.createElement('li');
      li.className = 'pl-composer-limits__chip';
      li.innerHTML = '<span></span><button type="button"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>';
      li.firstChild.textContent = '[Pasted text #' + pasted.length + ' +' + lines + ' lines]';
      li.lastChild.setAttribute('aria-label', 'Remove pasted text ' + pasted.length);
      li.lastChild.addEventListener('click', function () { pasted.splice(pasted.indexOf(text), 1); li.remove(); live.textContent = 'Pasted text removed'; update(); });
      chips.appendChild(li);
      live.textContent = 'Long paste collapsed into an attachment with ' + lines + ' lines. It is still sent in full.';
      update();
    }
    input.addEventListener('input', update);
    input.addEventListener('paste', function (ev) {
      var text = ev.clipboardData.getData('text/plain');
      if (!ev.shiftKey && (text.length > 800 || text.split('\n').length > 3)) { ev.preventDefault(); addPaste(text); }
    });
    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'Backspace' && !input.value && chips.lastElementChild) chips.lastElementChild.querySelector('button').click();
    });
    demo.addEventListener('click', function () {
      var block = [];
      for (var i = 1; i <= 120; i++) block.push('  at CartService.applyCoupon (src/cart/checkout.ts:' + (40 + i) + ':' + (i % 17 + 3) + ')');
      addPaste('FAIL tests/cart.test.ts\n' + block.join('\n'));
      input.focus();
    });
    root.addEventListener('submit', function (ev) { ev.preventDefault(); if (send.disabled) return; live.textContent = 'Sent with ' + pasted.length + ' pasted block(s)'; });
    update();
  },
};
