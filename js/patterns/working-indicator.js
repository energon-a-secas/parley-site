export default {
  id: 'working-indicator',
  name: 'Typing dots and a shimmering status label',
  category: 'Streaming & thinking',
  description: 'The two indicators shown before the first token: three bouncing dots, and a shimmering label that names the activity with an elapsed timer and settles when the reply starts.',
  tags: ['loading', 'status', 'shimmer', 'timer', 'a11y'],
  added: '2026-11-02',
  seenIn: [
    { product: 'Claude.ai', note: 'A Thinking indicator with an elapsed-time timer while Claude works', url: 'https://support.claude.com/en/articles/8664678', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'Shimmering "Thinking..." label while streaming, then "Thought for N seconds" (reasoning.tsx, shimmer.tsx)', url: 'https://github.com/vercel/ai-elements', checked: '2026-11-02' },
    { product: 'Slack AI apps', note: 'setStatus with processing shows a loading indicator and optional stop; the legacy API rotates through up to 10 loading messages and times out after one hour', url: 'https://docs.slack.dev/ai/developing-ai-apps', checked: '2026-11-02' },
    { product: 'Cloudscape', note: 'Two stages, processing and generation; never show a loading state for under one second; past 10 seconds give an estimate', url: 'https://cloudscape.design/gen-ai/patterns/generative-ai-loading-states/', checked: '2026-11-02' },
    { product: 'shadcn-chatbot-kit', note: 'Three bouncing dots in a muted bubble with 90 ms staggered delays, no ARIA role or text', url: 'https://github.com/Blazity/shadcn-chatbot-kit', checked: '2026-11-02' },
  ],
  anatomy: [
    'Visual indicator: three dots in a bubble, or a shimmer label',
    'Label naming the activity (Thinking, Searching the web, Reading 4 sources)',
    'Elapsed timer in tabular figures',
    'Optional stop control',
    'Visually hidden role="status" text mirroring the label',
  ],
  states: [
    'Waiting: nothing shown for the first 800 to 1000 ms',
    'Processing: dots or shimmer, label present, timer running',
    'Tool running: label names the tool',
    'Done: indicator yields to the first token; label becomes "Thought for Ns"',
  ],
  behavior: [
    'Each label change is written once to a polite status region; the timer is never announced',
    'Visual and text always appear together so the state is perceivable without the animation',
    'Reduced motion stops the bounce and shimmer; the text still changes',
    'The indicator is removed, not hidden, when the first token arrives',
  ],
  microcopy: [
    { text: 'Thinking', source: 'Claude.ai' },
    { text: 'Thought for N seconds', source: 'Vercel AI Elements' },
    { text: 'is working on your request...', source: 'Slack docs example status' },
  ],
  variants: [
    'Three dots from messenger heritage: shadcn-chatbot-kit, Stream typing indicator',
    'Shimmer label: AI Elements, ChatGPT and Claude style',
    'Rotating status lines set by the app: Slack legacy loading_messages',
  ],
  pitfalls: [
    'Flashing an indicator for sub-second replies',
    'Animation-only indicators with no text or role',
    'An indicator that never clears when the backend forgets the final status',
  ],
  refs: [
    { label: 'Vercel AI Elements: Shimmer and Reasoning', url: 'https://github.com/vercel/ai-elements' },
    { label: 'Slack: assistant.threads.setStatus', url: 'https://docs.slack.dev/reference/methods/assistant.threads.setStatus' },
  ],
  spec: 'On send, insert a placeholder assistant turn but keep it invisible for 900 ms so fast replies never flash it. Show a shimmer span with the activity label and a time element counting whole seconds from the start timestamp; write the label, not the timer, into a visually hidden role="status" region whenever it changes. Build the dots as three spans with a scoped keyframe and 90 ms stagger. Replace the whole indicator with the first streamed token, and on completion write "Thought for Ns" or remove it. For the thinking row itself see thinking-disclosure.',
  html: `<div class="pl pl-working-indicator" data-phase="waiting">
  <div class="pl-working-indicator__row">
    <span class="pl-working-indicator__dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="pl-working-indicator__caption">Three dots</span>
  </div>
  <div class="pl-working-indicator__row">
    <span class="pl-working-indicator__label">Thinking</span>
    <time class="pl-working-indicator__time" datetime="PT0S">0s</time>
    <button type="button" class="pl-working-indicator__stop" aria-label="Stop">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
    </button>
  </div>
  <p class="pl-sr" role="status" aria-live="polite"></p>
</div>`,
  css: `.pl-working-indicator { max-width: 560px; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
.pl-working-indicator__row { display: flex; align-items: center; gap: 12px; min-height: 36px; font-size: 14px; transition: opacity 200ms ease-out; }
.pl-working-indicator[data-phase="waiting"] .pl-working-indicator__row { opacity: 0; }
.pl-working-indicator__dots { display: inline-flex; gap: 5px; padding: 12px 14px; border-radius: var(--pl-radius); border-end-start-radius: 4px; background: var(--pl-surface-2); }
.pl-working-indicator__dots i { width: 7px; height: 7px; border-radius: 50%; background: var(--pl-muted); animation: pl-working-indicator-bounce 1.2s ease-in-out infinite; }
.pl-working-indicator__dots i:nth-child(2) { animation-delay: 90ms; }
.pl-working-indicator__dots i:nth-child(3) { animation-delay: 180ms; }
.pl-working-indicator[data-phase="done"] .pl-working-indicator__dots i { animation: none; background: var(--pl-success); }
@keyframes pl-working-indicator-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-4px); opacity: 1; } }
.pl-working-indicator__caption { color: var(--pl-muted); font-size: 13px; }
.pl-working-indicator__label { font-weight: 500; color: var(--pl-muted); }
.pl-working-indicator[data-phase="working"] .pl-working-indicator__label { background: linear-gradient(90deg, var(--pl-muted) 0%, var(--pl-text) 50%, var(--pl-muted) 100%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: pl-working-indicator-shimmer 1.6s linear infinite; }
@keyframes pl-working-indicator-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
.pl-working-indicator__time { font-variant-numeric: tabular-nums; font-size: 13px; color: var(--pl-muted); }
.pl-working-indicator__stop { display: grid; place-items: center; width: 32px; height: 32px; border: 1px solid var(--pl-border); border-radius: 50%; background: var(--pl-surface); color: var(--pl-muted); }
.pl-working-indicator__stop:hover { color: var(--pl-text); border-color: var(--pl-text); }
.pl-working-indicator[data-phase="done"] .pl-working-indicator__stop { visibility: hidden; }`,
  mount: function (root) {
    var label = root.querySelector('.pl-working-indicator__label');
    var time = root.querySelector('.pl-working-indicator__time');
    var stop = root.querySelector('.pl-working-indicator__stop');
    var status = root.querySelector('[role="status"]');
    var labels = ['Thinking', 'Searching the web', 'Reading 4 sources'];
    var started = 0, shown = -1, tick = null, delay = null;
    function announce(text) { if (status.textContent !== text) status.textContent = text; }
    function finish(seconds, reason) {
      clearInterval(tick);
      root.dataset.phase = 'done';
      label.textContent = reason === 'stopped' ? 'Stopped' : 'Thought for ' + seconds + 's';
      announce(reason === 'stopped' ? 'Stopped' : 'Response complete');
      delay = setTimeout(start, 3000);
    }
    function start() {
      root.dataset.phase = 'waiting';
      shown = -1;
      started = Date.now();
      time.textContent = '0s';
      time.dateTime = 'PT0S';
      delay = setTimeout(function () {
        root.dataset.phase = 'working';
        tick = setInterval(function () {
          var s = Math.floor((Date.now() - started) / 1000);
          time.textContent = s + 's';
          time.dateTime = 'PT' + s + 'S';
          var idx = Math.min(labels.length - 1, Math.floor(s / 3));
          if (idx !== shown) { shown = idx; label.textContent = labels[idx]; announce(labels[idx]); }
          if (s >= 9) finish(s, 'done');
        }, 250);
      }, 900);
    }
    stop.addEventListener('click', function () {
      if (root.dataset.phase === 'working') finish(Math.floor((Date.now() - started) / 1000), 'stopped');
    });
    start();
    return function () { clearInterval(tick); clearTimeout(delay); };
  },
};
