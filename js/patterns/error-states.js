export default {
  id: 'error-states',
  name: 'Shell-level error, limit and refusal states',
  category: 'Trust & errors',
  description: 'Four stacked states: an offline banner that retries on a countdown, a rate limit with an absolute reset time and a plan hint, a refusal card with a "why" link, and a model-unavailable notice with a fallback.',
  tags: ['errors', 'offline', 'rate limit', 'refusal', 'banner'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Claude.ai', note: '"5-hour limit reached" with a reset time, a weekly limit with a reset day and time, a variant that continues on usage credits, "Message too long" with remedies, and a capacity message ("try again in a few minutes") that does not appear on the status page', url: 'https://support.claude.com/en/articles/12466728-understanding-claude-error-messages', checked: '2026-11-02' },
    { product: 'Claude.ai', note: 'When Claude ends a conversation the composer is disabled and a bar offers "start a new chat" and feedback; earlier messages can still be edited to branch', url: 'https://www.anthropic.com/research/end-subset-conversations', checked: '2026-11-02' },
    { product: 'ChatGPT', note: 'At the free-plan cap a banner says replies will use another model until a stated reset time; moderation shows an orange warning that content may violate policy (forum and help snippets)', url: 'https://community.openai.com/t/this-content-may-violate-our-usage-policies/829716', checked: '2026-11-02' },
    { product: 'Bot Framework Web Chat', note: 'Connectivity states Connecting, Connected, slow connection, Reconnecting, Unable to connect; a per-message "Send failed" with an inline Retry link and screen-reader failure hints', url: 'https://github.com/microsoft/BotFramework-WebChat', checked: '2026-11-02' },
  ],
  anatomy: [
    'Offline banner (role="status") with a retry countdown and a Retry now button',
    'Quota banner (role="alert") with the reason, an absolute local reset time and the alternatives',
    'Refusal card in the assistant column, muted frame, a "Why?" link and a feedback button',
    'Model unavailable notice with a Switch model action and the fallback named',
    'Per-message "Send failed. Retry" (see the message-level pattern)',
    'Composer stays enabled unless no fallback exists',
  ],
  states: [
    'Warning: approaching the limit, percentage shown',
    'Degraded: a fallback model is active, so the model badge must change',
    'Blocked until a time: composer disabled, countdown running',
    'Reconnecting: banner counts down, then retries with backoff',
    'Fatal: unable to connect, manual retry only',
    'Ended: conversation closed by the model, new chat offered',
  ],
  behavior: [
    'Keep the history readable; disable the composer only while blocked',
    'Reset times are absolute local times from Intl.DateTimeFormat, with the remaining minutes next to them',
    'Offline retries use exponential backoff: 5s, 10s, 20s, capped at 60s; Retry now resets the backoff',
    'Failures are announced once in the status region; the banner itself is the visible record',
  ],
  microcopy: [
    { text: 'Network interruption occurred. Reconnecting…', source: 'Bot Framework Web Chat' },
    { text: '5-hour limit reached', source: 'Claude help, error messages' },
    { text: 'This content may violate our usage policies.', source: 'ChatGPT, forum report' },
  ],
  variants: [
    'Claude: absolute reset times and a usage-credits path',
    'ChatGPT: silent fallback to another model at the free cap',
    'Web Chat: transport-level states with a slow-connection notice',
    'Claude: the conversation-ending bar with feedback and new chat',
  ],
  pitfalls: [
    'A stated reset time that is wrong: one July 2026 report put Claude\'s message about 3.5 hours late',
    'Capacity errors that never show on the status page send users to a green page',
    'False-positive policy flags on benign prompts are widely reported; always give a feedback path',
    'A degraded state that changes the model without changing the visible badge',
  ],
  refs: [
    { label: 'Claude: understanding error messages', url: 'https://support.claude.com/en/articles/12466728-understanding-claude-error-messages' },
    { label: 'Web Chat: en-US.json localisation strings', url: 'https://github.com/microsoft/BotFramework-WebChat' },
  ],
  spec: 'Drive an offline banner from window online and offline events plus fetch failures: render a role="status" strip with "Retrying in Ns" counting down on a 1s interval, retry with exponential backoff capped at 60s, and a Retry now button that resets it. For quotas render a role="alert" banner above the composer with the absolute local reset time from Intl.DateTimeFormat and the remaining time, plus the available actions (wait, switch model, upgrade); disable the composer only when no fallback exists. Render a refusal as an assistant message in a muted frame with a short reason, a "Why?" link to policy and a feedback button, never as a toast. For model unavailable, name the fallback and offer a one-click switch that also updates the header badge.',
  html: `<div class="pl pl-error-states">
  <div class="pl-error-states__banner" role="status" data-kind="offline">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 8.5a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0M12 19h.01M3 3l18 18"/></svg>
    <p>You are offline. <span class="pl-error-states__retry-text">Retrying in 5s</span></p>
    <button type="button" class="pl-error-states__retry">Retry now</button>
  </div>
  <div class="pl-error-states__banner" role="alert" data-kind="limit">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
    <p><strong>5-hour limit reached.</strong> Resets at <time class="pl-error-states__reset">18:00</time> (<span class="pl-error-states__countdown">47:00</span>). Until then, replies use Atlas Mini.</p>
    <a href="#" class="pl-error-states__link">Upgrade</a>
  </div>
  <article class="pl-error-states__refusal" aria-label="Assistant message">
    <p>I can't help with bypassing the licence check in that installer. I can help you contact the vendor for a replacement key, or find an open alternative.</p>
    <p class="pl-error-states__refusal-foot"><a href="#">Why?</a> <button type="button">This was a mistake</button></p>
  </article>
  <div class="pl-error-states__banner" data-kind="model">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
    <p><strong>Atlas 2 is at capacity.</strong> Try again in a few minutes, or continue with Atlas Mini.</p>
    <button type="button" class="pl-error-states__switch">Switch to Atlas Mini</button>
  </div>
  <p class="pl-sr" aria-live="polite"></p>
</div>`,
  css: `.pl-error-states { display: flex; flex-direction: column; gap: 12px; max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-error-states__banner { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 10px 14px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); font-size: 14px; }
.pl-error-states__banner > svg { flex: none; color: var(--pl-muted); }
.pl-error-states__banner p { flex: 1 1 200px; margin: 0; }
.pl-error-states__banner[data-kind="offline"] { border-color: color-mix(in srgb, var(--pl-muted) 50%, var(--pl-border)); }
.pl-error-states__banner[data-kind="limit"] { border-color: color-mix(in srgb, var(--pl-accent) 50%, var(--pl-border)); background: color-mix(in srgb, var(--pl-accent) 8%, var(--pl-surface)); }
.pl-error-states__banner[data-kind="limit"] > svg { color: var(--pl-accent); }
.pl-error-states__banner[data-kind="model"] { border-color: color-mix(in srgb, var(--pl-danger) 45%, var(--pl-border)); }
.pl-error-states__banner[data-kind="model"] > svg { color: var(--pl-danger); }
.pl-error-states__banner[data-done="true"] { border-color: var(--pl-success); }
.pl-error-states__banner[data-done="true"] > svg { color: var(--pl-success); }
.pl-error-states__countdown, .pl-error-states__reset { font-variant-numeric: tabular-nums; }
.pl-error-states__retry, .pl-error-states__switch, .pl-error-states__link { display: inline-flex; align-items: center; min-height: 32px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface-2); color: var(--pl-text); font-size: 13px; font-weight: 600; text-decoration: none; white-space: nowrap; }
.pl-error-states__retry:hover, .pl-error-states__switch:hover, .pl-error-states__link:hover { border-color: var(--pl-accent); }
.pl-error-states__link { background: var(--pl-accent); border-color: var(--pl-accent); color: var(--pl-on-accent); }
.pl-error-states__refusal { max-width: 85%; padding: 12px 16px; border: 1px dashed var(--pl-border); border-radius: var(--pl-radius); background: transparent; font-size: 14px; line-height: 1.55; color: var(--pl-muted); }
.pl-error-states__refusal p { margin: 0; }
.pl-error-states__refusal-foot { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 8px !important; font-size: 13px; }
.pl-error-states__refusal a { color: var(--pl-accent); text-underline-offset: 3px; }
.pl-error-states__refusal button { padding: 0; border: 0; background: transparent; color: var(--pl-muted); text-decoration: underline; text-underline-offset: 3px; }
.pl-error-states__refusal button:hover, .pl-error-states__refusal a:hover { color: var(--pl-text); }`,
  mount: function (root) {
    var offline = root.querySelector('[data-kind="offline"]');
    var retryText = root.querySelector('.pl-error-states__retry-text');
    var countdown = root.querySelector('.pl-error-states__countdown');
    var reset = root.querySelector('.pl-error-states__reset');
    var model = root.querySelector('[data-kind="model"]');
    var live = root.querySelector('[aria-live]');
    var backoff = 5, left = 5, until = Date.now() + 47 * 60 * 1000;
    reset.textContent = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(until);
    reset.setAttribute('datetime', new Date(until).toISOString());
    function tick() {
      if (offline.dataset.done !== 'true') {
        left -= 1;
        if (left > 0) retryText.textContent = 'Retrying in ' + left + 's';
        else if (left === 0) retryText.textContent = 'Reconnecting…';
        else if (backoff >= 10) { offline.dataset.done = 'true'; retryText.textContent = 'Back online.'; live.textContent = 'Connection restored'; }
        else { backoff = Math.min(backoff * 2, 60); left = backoff; retryText.textContent = 'Still offline. Retrying in ' + left + 's'; }
      }
      var ms = Math.max(0, until - Date.now()), m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000);
      countdown.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    }
    var interval = setInterval(tick, 1000);
    root.querySelector('.pl-error-states__retry').addEventListener('click', function () { backoff = 5; left = 1; delete offline.dataset.done; tick(); });
    root.querySelector('.pl-error-states__switch').addEventListener('click', function () {
      model.dataset.done = 'true';
      model.querySelector('p').innerHTML = '<strong>Now using Atlas Mini.</strong> The header badge changed with it; switch back from the model menu.';
      model.querySelector('.pl-error-states__switch').remove();
      live.textContent = 'Switched to Atlas Mini';
    });
    root.addEventListener('click', function (e) { if (e.target.closest('a')) e.preventDefault(); });
    return function () { clearInterval(interval); };
  },
};
