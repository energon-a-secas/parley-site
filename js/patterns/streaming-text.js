export default {
  id: 'streaming-text',
  name: 'Streaming reply with stick-to-bottom scrolling',
  category: 'Streaming & thinking',
  description: 'A transcript that follows a reply as it streams word by word with a caret, lets go the moment the reader scrolls up, and offers a "Jump to latest" pill with hysteresis.',
  tags: ['streaming', 'scroll', 'caret', 'live-region', 'a11y'],
  added: '2026-11-02',
  seenIn: [
    { product: 'Hugging Face chat-ui', note: 'Any upward move detaches, a near-bottom zone re-attaches, growth while pinned snaps on the next frame; jump buttons appear past 200 px and hide within 60 px', url: 'https://github.com/huggingface/chat-ui', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'Conversation wraps the list in use-stick-to-bottom with role="log" and a scroll-to-bottom button rendered only when not at bottom', url: 'https://github.com/vercel/ai-elements', checked: '2026-11-02' },
    { product: 'Vercel Streamdown', note: 'Optional per-word fade while animating and an end-of-text caret shown only while streaming, both removed once the message is complete', url: 'https://streamdown.ai/llms.txt', checked: '2026-11-02' },
    { product: 'Stream Chat React', note: '"At bottom" means within a 200 px threshold; a new-message notice appears when messages arrive while scrolled up', url: 'https://getstream.io/chat/docs/sdk/react/v15/component-reference/message-list/messagelist/', checked: '2026-11-02' },
    { product: 'Cloudscape', note: 'Do not auto-scroll while the user is reading or copying older messages; keep the input pinned and scroll only the log', url: 'https://cloudscape.design/gen-ai/patterns/generative-ai-chat/', checked: '2026-11-02' },
  ],
  anatomy: [
    'Scroll container with role="log", aria-live="off", a label and tabindex="0"',
    'Streaming body with a caret drawn by ::after while the streaming class is present',
    'Jump-to-latest pill, absolutely positioned above the composer, with an accessible name',
    'Separate visually hidden role="status" region for "started" and "complete"',
    'Replay control (demo only)',
  ],
  states: [
    'Pinned: following growth, pill hidden',
    'Detached: reader scrolled up, pill visible past 200 px',
    'Gliding: programmatic smooth scroll in flight, cancelled by any user input',
    'Streaming vs complete: caret present only while streaming',
  ],
  behavior: [
    'Detach on any upward wheel, touch or key scroll; never yank a detached reader',
    'Re-pin only when the reader is within 8 px of the bottom, or taps the pill',
    'Show the pill past 200 px from the bottom and hide it under 60 px, so it cannot flicker at the edge',
    'The streaming body is outside any live region; only state changes are announced',
  ],
  microcopy: [
    { text: 'allows the user to cancel the stickiness at any time by scrolling up', source: 'use-stick-to-bottom README' },
    { text: 'do not make the streaming response body itself an automatic announcement target', source: 'azukiazusa, 2026-08-11' },
  ],
  variants: [
    'Bottom-anchored follow: AI Elements, HF chat-ui, Stream, shadcn-chatbot-kit',
    'Top-anchored turn, question pinned to the top and the answer fills down: assistant-ui turnAnchor="top"',
    'Animated reveal with per-word fade and block or circle caret: Streamdown',
  ],
  pitfalls: [
    'Thresholds without hysteresis make the pill flicker near the edge',
    'Relying on CSS overflow-anchor, which Safari does not support',
    'Programmatic scroll events misread as user intent, causing random detaches',
    'An icon-only jump button with no accessible name (seen in shadcn-chatbot-kit chat.tsx)',
    'Live-announcing each token floods screen readers',
  ],
  refs: [
    { label: 'use-stick-to-bottom', url: 'https://github.com/stackblitz-labs/use-stick-to-bottom' },
    { label: 'HF chat-ui: stickToBottom.ts', url: 'https://github.com/huggingface/chat-ui' },
    { label: 'Accessible streaming chat UI (azukiazusa)', url: 'https://azukiazusa.dev/en/blog/accessible-streaming-chat-ui' },
  ],
  spec: 'Keep a pinned boolean. In the scroll handler, if scrollTop moved up compared with the last value set pinned to false; if the distance from the bottom is under 8 px set it to true. Also unpin on wheel with negative deltaY and on ArrowUp, PageUp or Home. After every appended token (or in a ResizeObserver callback) set scrollTop to scrollHeight inside requestAnimationFrame when pinned. Show the jump pill when the distance exceeds 200 px and hide it under 60 px; clicking it re-pins and smooth-scrolls. Render the streamed text into a node outside any live region, toggle a streaming class that draws the caret with ::after, and write "Response started" and "Response complete" into a separate polite status region.',
  html: `<div class="pl pl-streaming-text">
  <div class="pl-streaming-text__wrap">
    <div class="pl-streaming-text__log" role="log" aria-live="off" aria-label="Conversation" tabindex="0">
      <article class="pl-streaming-text__turn" data-role="user"><h3 class="pl-sr">You said</h3><div class="pl-streaming-text__bubble">Why does our nightly build fail only on Mondays?</div></article>
      <article class="pl-streaming-text__turn" data-role="assistant"><h3 class="pl-sr">Assistant said</h3><div class="pl-streaming-text__body"><p>The failing job is the one that rebuilds the search index, and it only fails after a weekend. Two things line up with that.</p></div></article>
      <article class="pl-streaming-text__turn" data-role="user"><h3 class="pl-sr">You said</h3><div class="pl-streaming-text__bubble">Go on, what are the two things?</div></article>
      <article class="pl-streaming-text__turn" data-role="assistant"><h3 class="pl-sr">Assistant said</h3><div class="pl-streaming-text__body pl-streaming-text__stream"><p></p></div></article>
    </div>
    <button type="button" class="pl-streaming-text__jump" hidden>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      Jump to latest
    </button>
  </div>
  <div class="pl-streaming-text__bar">
    <button type="button" class="pl-streaming-text__replay">Replay stream</button>
    <span class="pl-streaming-text__hint">Scroll up while it streams to detach</span>
  </div>
  <p class="pl-sr" role="status" aria-live="polite"></p>
</div>`,
  css: `.pl-streaming-text { max-width: 640px; padding: 16px; }
.pl-streaming-text__wrap { position: relative; }
.pl-streaming-text__log { height: 300px; overflow-y: auto; padding: 16px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); display: flex; flex-direction: column; gap: 14px; overflow-anchor: none; }
.pl-streaming-text__turn { display: flex; }
.pl-streaming-text__turn[data-role="user"] { justify-content: flex-end; }
.pl-streaming-text__bubble { max-width: 80%; padding: 8px 12px; border-radius: var(--pl-radius); border-end-end-radius: 4px; background: var(--pl-user); font-size: 14px; }
.pl-streaming-text__body { font-size: 14px; line-height: 1.6; max-width: 100%; }
.pl-streaming-text__body p { margin: 0 0 8px; }
.pl-streaming-text__body p:last-child { margin: 0; }
.pl-streaming-text__stream.is-streaming p:last-child::after { content: ""; display: inline-block; width: 7px; height: 1em; margin-inline-start: 2px; vertical-align: -2px; background: var(--pl-text); animation: pl-streaming-text-blink 1s steps(2, start) infinite; }
@keyframes pl-streaming-text-blink { to { visibility: hidden; } }
.pl-streaming-text__jump { position: absolute; left: 50%; bottom: 12px; transform: translateX(-50%); display: inline-flex; align-items: center; gap: 6px; min-height: 32px; padding: 0 12px 0 10px; border: 1px solid var(--pl-border); border-radius: 999px; background: var(--pl-surface-2); color: var(--pl-text); font-size: 13px; box-shadow: var(--pl-shadow); }
.pl-streaming-text__jump:hover { border-color: var(--pl-accent); }
.pl-streaming-text__bar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 10px; font-size: 13px; color: var(--pl-muted); }
.pl-streaming-text__replay { min-height: 32px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; color: var(--pl-text); font-size: 13px; }
.pl-streaming-text__replay:hover { background: var(--pl-surface-2); }`,
  mount: function (root) {
    var log = root.querySelector('.pl-streaming-text__log');
    var stream = root.querySelector('.pl-streaming-text__stream');
    var pill = root.querySelector('.pl-streaming-text__jump');
    var replay = root.querySelector('.pl-streaming-text__replay');
    var status = root.querySelector('[role="status"]');
    var text = 'First, the index job reads a cache that expires after 48 hours, and nothing refreshes it over the weekend, so Monday starts from an empty cache and the job times out before it finishes warming. Second, the Monday run overlaps the log rotation at 02:00, which briefly locks the file the indexer tails; on other days the job has finished long before that. Fix the first by extending the cache TTL to 72 hours or adding a Sunday warm-up run, and fix the second by moving rotation to 03:30 or by making the tailer reopen the file on ENOENT. If you only have time for one, do the cache: it explains the timeout in every Monday log you pasted.';
    var words = text.split(' ');
    var pinned = true, lastTop = 0, i = 0, timer = null, delay = null;
    function distance() { return log.scrollHeight - log.scrollTop - log.clientHeight; }
    function updatePill() { var d = distance(); if (d > 200) pill.hidden = false; else if (d < 60) pill.hidden = true; }
    function follow() { if (pinned) requestAnimationFrame(function () { log.scrollTop = log.scrollHeight; }); }
    log.addEventListener('scroll', function () {
      if (log.scrollTop < lastTop - 1) pinned = false;
      if (distance() < 8) pinned = true;
      lastTop = log.scrollTop;
      updatePill();
    });
    log.addEventListener('wheel', function (e) { if (e.deltaY < 0) pinned = false; }, { passive: true });
    log.addEventListener('keydown', function (e) { if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Home') pinned = false; });
    pill.addEventListener('click', function () { pinned = true; pill.hidden = true; log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' }); });
    function step() {
      var p = stream.lastElementChild;
      p.textContent += (i ? ' ' : '') + words[i];
      i += 1;
      follow();
      if (i >= words.length) { clearInterval(timer); stream.classList.remove('is-streaming'); status.textContent = 'Response complete'; }
    }
    function run() {
      clearInterval(timer); clearTimeout(delay);
      i = 0; pinned = true;
      stream.innerHTML = '<p></p>';
      stream.classList.add('is-streaming');
      log.scrollTop = log.scrollHeight; lastTop = log.scrollTop; updatePill();
      delay = setTimeout(function () { status.textContent = 'Response started'; timer = setInterval(step, 70); }, 600);
    }
    replay.addEventListener('click', run);
    run();
    return function () { clearInterval(timer); clearTimeout(delay); };
  },
};
