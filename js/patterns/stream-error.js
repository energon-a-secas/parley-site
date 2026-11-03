export default {
  id: 'stream-error',
  name: 'Failed, truncated and rate-limited turns',
  category: 'Trust & errors',
  description: 'The four ways a reply stops short, each inside the transcript: a failed turn with Retry, a truncated one with Continue generating, a usage-limit notice with a countdown, and an agent turn offering Resume over Retry.',
  tags: ['errors', 'retry', 'continue', 'rate-limit', 'alert'],
  added: '2026-11-02',
  seenIn: [
    { product: 'LibreChat', note: 'Error box with role="alert" inside the message; Continue shows only on the latest reply when the finish reason is not a normal stop', url: 'https://github.com/danny-avila/LibreChat', checked: '2026-11-02' },
    { product: 'Hugging Face chat-ui', note: 'For a failed agentic turn, Resume is preferred over Retry because retry re-runs the whole turn and duplicates side effects', url: 'https://github.com/huggingface/chat-ui', checked: '2026-11-02' },
    { product: 'Claude Code', note: 'On a usage limit it waits and continues automatically, showing "Usage limit reached · limit resets 3:45pm" and "Continuing automatically at 3:45pm · Esc to cancel"', url: 'https://code.claude.com/docs/en/interactive-mode', checked: '2026-11-02' },
    { product: 'Open WebUI', note: '"Continue Response" and Regenerate in the action bar; errors render as a soft inline row', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'Cloudscape', note: 'Error alert with a recovery action; distinguish access denied, server and connection errors', url: 'https://cloudscape.design/gen-ai/patterns/generative-ai-chat/', checked: '2026-11-02' },
  ],
  anatomy: [
    'Partial output preserved above whatever stopped it',
    'Inline error block with role="alert": what failed, why if known, a Retry action',
    'Truncation note with Continue generating on the latest turn only',
    'Limit notice: reset time, auto-continue countdown, Cancel',
    'Agent variant: Resume (primary) and Retry (secondary) with a line on side effects',
  ],
  states: [
    'Failed: alert shown, partial text kept',
    'Truncated by length: Continue offered',
    'Rate-limited: countdown running, cancellable',
    'Stopped by the user: muted note, no alert',
    'Resumed or retried: the note is replaced by the continuation',
  ],
  behavior: [
    'Failures are the one case for role="alert"; a user stop is never announced as an error',
    'Partial output is kept and Continue appends to the same message, re-opening an unterminated code fence first',
    'Only one continue path is offered at a time',
    'The reset time is written once to the polite status region; the countdown itself is not announced',
  ],
  microcopy: [
    { text: 'Esc to cancel', source: 'Claude Code' },
    { text: 'Keep going', source: 'LibreChat tool-limit notice' },
    { text: 'Continue Response', source: 'Open WebUI' },
  ],
  variants: [
    'Manual continue on truncation: LibreChat, Open WebUI',
    'Auto-continue after limits, stopping after three hits: Claude Code',
    'Resume vs retry for agent turns: HF chat-ui',
  ],
  pitfalls: [
    'Retrying an agent turn re-executes side effects',
    'Continue that restarts or breaks formatting (reported for ChatGPT code blocks)',
    'Offering two continue paths at once',
    'Assertive announcements for routine states',
  ],
  refs: [
    { label: 'LibreChat: useGenerationsByLatest', url: 'https://github.com/danny-avila/LibreChat' },
    { label: 'HF chat-ui: ResumeBtn.svelte', url: 'https://github.com/huggingface/chat-ui' },
  ],
  spec: 'Keep a per-turn finishReason (stop, length, error, aborted, limit) and render it inside the turn. For error append div[role="alert"] with the message and a Retry button, keeping partial text; for length show Continue generating on the latest turn only and stream the continuation into the same body; for aborted append a muted "Stopped" note with no alert; for limit show the reset time, a countdown line and a Cancel button, writing the reset time once to a polite status region. For agent turns that failed mid-run, offer Resume as the primary action and Retry as secondary, and say next to them that Retry re-runs the completed steps.',
  html: `<div class="pl pl-stream-error" role="log" aria-label="Conversation">
  <article class="pl-stream-error__turn" data-finish="error">
    <h3 class="pl-sr">Assistant said</h3>
    <p>The migration fails because the <code>orders.customer_id</code> column is nullable and the new foreign key</p>
    <div class="pl-stream-error__alert" role="alert">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
      <span>Connection lost after 212 tokens. The partial reply is kept.</span>
      <button type="button" class="pl-stream-error__retry">Retry</button>
    </div>
  </article>
  <article class="pl-stream-error__turn" data-finish="length">
    <h3 class="pl-sr">Assistant said</h3>
    <p>Three fixes, in order of risk. First, backfill the 418 null rows from the invoices table. Second, add the constraint as <code>NOT VALID</code> and validate it in a later</p>
    <div class="pl-stream-error__note"><span>Stopped at the length limit.</span><button type="button" class="pl-stream-error__continue">Continue generating</button></div>
  </article>
  <article class="pl-stream-error__turn" data-finish="limit">
    <h3 class="pl-sr">Assistant said</h3>
    <div class="pl-stream-error__limit">
      <p><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>Usage limit reached <span aria-hidden="true">·</span> limit resets 3:45pm</p>
      <p class="pl-stream-error__count">Continuing automatically in <span>0:12</span> <span aria-hidden="true">·</span> <button type="button" class="pl-stream-error__cancel">Cancel</button></p>
    </div>
  </article>
  <article class="pl-stream-error__turn" data-finish="agent-error">
    <h3 class="pl-sr">Assistant said</h3>
    <p>Edited <code>schema.sql</code> and <code>backfill.sql</code>, then started the dry run.</p>
    <div class="pl-stream-error__alert" role="alert">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
      <span>The dry run timed out at step 3 of 4.</span>
      <button type="button" class="pl-stream-error__resume">Resume</button>
      <button type="button" class="pl-stream-error__retry pl-stream-error__retry--agent">Retry</button>
      <small>Retry re-runs the two edits. Resume picks up at step 3.</small>
    </div>
  </article>
  <p class="pl-sr" role="status" aria-live="polite"></p>
</div>`,
  css: `.pl-stream-error { max-width: 680px; padding: 20px; display: flex; flex-direction: column; gap: 20px; font-size: 15px; }
.pl-stream-error__turn p { margin: 0 0 10px; line-height: 1.6; max-width: 65ch; }
.pl-stream-error__turn code { font-family: var(--pl-mono); font-size: 13px; padding: 1px 5px; border-radius: 5px; background: var(--pl-surface-2); }
.pl-stream-error__alert, .pl-stream-error__note, .pl-stream-error__limit { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 10px; padding: 10px 12px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); font-size: 14px; }
.pl-stream-error__alert { border-color: color-mix(in srgb, var(--pl-danger) 45%, var(--pl-border)); background: color-mix(in srgb, var(--pl-danger) 9%, var(--pl-surface)); }
.pl-stream-error__alert svg { color: var(--pl-danger); flex: none; }
.pl-stream-error__alert span, .pl-stream-error__note span:first-child { flex: 1; min-width: 160px; }
.pl-stream-error__alert small { flex-basis: 100%; font-size: 12px; color: var(--pl-muted); }
.pl-stream-error__note { color: var(--pl-muted); }
.pl-stream-error__turn button { min-height: 32px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; color: var(--pl-text); font-size: 13px; transition: background 160ms ease-out; }
.pl-stream-error__turn button:hover { background: var(--pl-surface-2); }
.pl-stream-error__alert .pl-stream-error__retry, .pl-stream-error__alert .pl-stream-error__resume { background: var(--pl-text); color: var(--pl-bg); border-color: transparent; }
.pl-stream-error__alert .pl-stream-error__retry--agent { background: transparent; color: var(--pl-text); border-color: var(--pl-border); }
.pl-stream-error__limit { flex-direction: column; align-items: flex-start; gap: 4px; color: var(--pl-muted); }
.pl-stream-error__limit p { display: flex; align-items: center; gap: 8px; margin: 0; }
.pl-stream-error__limit p:first-child { color: var(--pl-text); }
.pl-stream-error__count span:first-child { font-variant-numeric: tabular-nums; color: var(--pl-text); }
.pl-stream-error__count button { min-height: 28px; padding: 0 10px; }
.pl-stream-error__done { color: var(--pl-success); }`,
  mount: function (root) {
    var status = root.querySelector('[role="status"]');
    var count = root.querySelector('.pl-stream-error__count');
    var digits = count.querySelector('span');
    var cancel = root.querySelector('.pl-stream-error__cancel');
    var left = 12, tick = null, timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function settle(box, text, cls) { if (!box) return; box.className = 'pl-stream-error__note' + (cls ? ' ' + cls : ''); box.removeAttribute('role'); box.innerHTML = '<span></span>'; box.firstChild.textContent = text; }
    status.textContent = 'Usage limit reached, resets at 3:45pm';
    tick = setInterval(function () {
      left -= 1;
      digits.textContent = '0:' + (left < 10 ? '0' : '') + left;
      if (left <= 0) { clearInterval(tick); count.textContent = 'Resumed at 3:45pm. The wait is recorded in the conversation.'; count.classList.add('pl-stream-error__done'); status.textContent = 'Resumed'; }
    }, 1000);
    cancel.addEventListener('click', function () { clearInterval(tick); count.textContent = 'Auto-continue cancelled. Send a message to resume later.'; });
    root.querySelector('[data-finish="error"] .pl-stream-error__retry').addEventListener('click', function (e) {
      var box = e.currentTarget.parentNode, p = box && box.previousElementSibling;
      if (!box) return;
      settle(box, 'Retrying...');
      later(function () { p.textContent += ' rejects nulls. Backfill or allow nulls on the key before adding it.'; box.remove(); status.textContent = 'Reply completed'; }, 1200);
    });
    root.querySelector('.pl-stream-error__continue').addEventListener('click', function (e) {
      var box = e.currentTarget.parentNode, p = box && box.previousElementSibling;
      if (!box) return;
      settle(box, 'Continuing...');
      later(function () { p.textContent += ' maintenance window so writes keep flowing. Third, switch the ORM to write the id on insert.'; box.remove(); status.textContent = 'Reply completed'; }, 1200);
    });
    root.querySelector('.pl-stream-error__resume').addEventListener('click', function (e) { settle(e.currentTarget.parentNode, 'Resumed at step 3 of 4. The two edits were kept.', 'pl-stream-error__done'); status.textContent = 'Resumed at step 3'; });
    root.querySelector('.pl-stream-error__retry--agent').addEventListener('click', function (e) { settle(e.currentTarget.parentNode, 'Retrying from step 1. Both files will be edited again.'); status.textContent = 'Retrying the whole turn'; });
    return function () { clearInterval(tick); timers.forEach(clearTimeout); };
  },
};
