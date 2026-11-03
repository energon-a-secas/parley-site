export default {
  id: 'stream-announcer',
  name: 'Transcript feed with a start-and-finish status announcer',
  category: 'Trust & errors',
  description: 'A role="feed" transcript whose streaming reply is never live, a separate polite status region that announces only start and finish, and a readout box showing what was announced and when.',
  tags: ['accessibility', 'live region', 'streaming', 'aria', 'screen reader'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Bot Framework Web Chat', note: 'Chose feed plus article over log because log is a live region screen readers mishandle with rich cards; new messages are narrated by a separate live-region twin removed after one second; never move focus when a message arrives', url: 'https://github.com/microsoft/BotFramework-WebChat', checked: '2026-11-02' },
    { product: 'LibreChat', note: 'Two sr-only aria-live="polite" aria-atomic="true" regions, one for status (cleared after 1s) and one for the log; announces reply start, still composing and end; strips *, backtick and _ before announcing; throttles the tool-activity label to 500ms', url: 'https://github.com/danny-avila/LibreChat', checked: '2026-11-02' },
    { product: 'Atlassian Rovo', note: 'ROVO-978: thinking status and the streamed answer were not announced (WCAG 4.1.3); fixed with a persistent status region updated on start and completion only, focus kept stable', url: 'https://jira.atlassian.com/browse/ROVO-978', checked: '2026-11-02' },
    { product: 'ChatGPT and Claude, third-party DOM inspection', note: 'ChatGPT: each turn a section with a hidden sender heading, no aria-live on the body, a hidden polite atomic status for thinking and complete; Claude: a feed of articles, a streaming label that becomes "Message n of n", a separate status region, focus left in the input', url: 'https://azukiazusa.dev/en/blog/accessible-streaming-chat-ui', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'Conversation puts role="log" on the whole scroll container, so the streamed reply sits inside an implicit live region; its scroll-to-bottom button has no accessible name in the source as read', url: 'https://github.com/vercel/ai-elements', checked: '2026-11-02' },
  ],
  anatomy: [
    'Transcript as div role="feed" aria-label="Conversation" with aria-busy while a reply streams',
    'One article per message with aria-posinset, aria-setsize and a visually hidden heading ("You said", "Assistant replied")',
    'A single persistent div role="status" aria-live="polite" aria-atomic="true", visually hidden, outside the feed',
    'The streaming body, plain text that updates with no live attributes',
    'A New messages button when the user has scrolled up',
    'In this demo, a visible readout box logging each announcement with a timestamp',
  ],
  states: [
    'Idle: status empty',
    'Generating: status "Responding", feed aria-busy="true"',
    'Tool step: a throttled label at most every 500ms',
    'Complete: status "Reply complete", cleared after about 1s',
    'Failed: status "Reply failed"',
    'Scrolled up while content arrives: New messages button visible',
  ],
  behavior: [
    'Focus stays in the composer after send; nothing calls focus() on arrival',
    'Tokens are written into the article body, which is not a live region, so the screen reader is not interrupted per token',
    'The status region is cleared about 1s after the final message so a repeat announcement is not swallowed as a no-change',
    'Arrow-key navigation between articles is optional but documented (Web Chat uses aria-activedescendant)',
  ],
  microcopy: [
    { text: 'The AI has finished their reply.', source: 'LibreChat live announcer' },
    { text: 'Rovo Expert is thinking', source: 'Atlassian Rovo status text' },
  ],
  variants: [
    'Web Chat: feed plus a 1s twin live region per message',
    'LibreChat: two polite regions, events only',
    'ChatGPT: sections plus a hidden role="status"',
    'AI Elements: role="log" on the whole container, the risky default',
  ],
  pitfalls: [
    'Streaming the body inside role="log" or aria-live: announcements stutter and overlap (Rovo, Web Chat)',
    'Several live regions updating at once interrupt each other; consolidate to one status region',
    'Moving focus when a message arrives interrupts the screen reader mid-sentence',
    'Icon-only controls with no name (the AI Elements scroll button)',
    'A viewport meta with maximum-scale=1 or user-scalable=no (HF chat-ui, Open WebUI) blocks zoom and fails WCAG 1.4.4 before any live-region work matters',
  ],
  refs: [
    { label: 'Web Chat: ACCESSIBILITY.md', url: 'https://github.com/microsoft/BotFramework-WebChat' },
    { label: 'APG: feed pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/feed/' },
    { label: 'MDN: log role', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/log_role' },
  ],
  spec: 'Render the transcript as div role="feed" aria-label="Conversation" aria-busy="false" with one article per message carrying aria-posinset, aria-setsize and a visually hidden h3 ("You said" or "Assistant replied"). Keep a single div role="status" aria-live="polite" aria-atomic="true" with a visually hidden class outside the feed. On send set it to "Responding" and aria-busy to true; write tokens into the article body with no live attributes; at most every 500ms set a tool-step label; at the end set "Reply complete" or "Reply failed", aria-busy false, and clear the status about 1s later. Never call focus() on arrival, leave focus in the textarea, show a labelled New messages button when scrolled up, and keep the viewport meta free of zoom limits.',
  html: `<div class="pl pl-stream-announcer">
  <div class="pl-stream-announcer__chat">
    <div class="pl-stream-announcer__feed" role="feed" aria-label="Conversation" aria-busy="false">
      <article aria-posinset="1" aria-setsize="-1" aria-labelledby="pl-stream-announcer-h1"><h3 id="pl-stream-announcer-h1" class="pl-sr">You said</h3><p>Why does the retry test pass locally but fail on CI?</p></article>
      <article aria-posinset="2" aria-setsize="-1" aria-labelledby="pl-stream-announcer-h2" data-role="assistant"><h3 id="pl-stream-announcer-h2" class="pl-sr">Assistant replied</h3><p class="pl-stream-announcer__body"></p></article>
    </div>
    <div class="pl-sr" role="status" aria-live="polite" aria-atomic="true"></div>
    <form class="pl-stream-announcer__composer"><input type="text" aria-label="Message" placeholder="Ask a follow-up"><button type="submit" class="pl-stream-announcer__run">Run stream</button></form>
  </div>
  <aside class="pl-stream-announcer__readout" aria-label="Announcement readout">
    <h4>What the status region said</h4>
    <ol class="pl-stream-announcer__list"><li class="pl-stream-announcer__none">Nothing yet. Tokens below are never announced; only the events are.</li></ol>
  </aside>
</div>`,
  css: `.pl-stream-announcer { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-stream-announcer__chat { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.pl-stream-announcer__feed { display: flex; flex-direction: column; gap: 8px; min-height: 200px; padding: 12px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); }
.pl-stream-announcer__feed[aria-busy="true"] { border-color: var(--pl-accent); }
.pl-stream-announcer__feed article { max-width: 88%; padding: 8px 12px; border-radius: var(--pl-radius-sm); background: var(--pl-user); font-size: 14px; line-height: 1.5; }
.pl-stream-announcer__feed article[data-role="assistant"] { align-self: flex-start; background: var(--pl-bg); border: 1px solid var(--pl-border); }
.pl-stream-announcer__feed article:not([data-role]) { align-self: flex-end; }
.pl-stream-announcer__feed p { margin: 0; min-height: 21px; }
.pl-stream-announcer__body:empty::before { content: 'Press Run stream'; color: var(--pl-muted); }
.pl-stream-announcer__composer { display: flex; gap: 6px; }
.pl-stream-announcer__composer input { flex: 1; min-width: 0; min-height: 40px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: 20px; background: var(--pl-surface); font-size: 14px; }
.pl-stream-announcer__composer input:focus { outline: none; border-color: var(--pl-accent); }
.pl-stream-announcer__run { min-height: 40px; padding: 0 14px; border: 0; border-radius: 20px; background: var(--pl-accent); color: var(--pl-on-accent); font-size: 14px; font-weight: 600; white-space: nowrap; }
.pl-stream-announcer__run:disabled { opacity: 0.6; cursor: wait; }
.pl-stream-announcer__readout { padding: 12px 14px; border: 1px dashed var(--pl-border); border-radius: var(--pl-radius); font-size: 13px; }
.pl-stream-announcer__readout h4 { margin: 0 0 8px; font-size: 12px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--pl-muted); }
.pl-stream-announcer__list { margin: 0; padding: 0; list-style: none; font-family: var(--pl-mono); font-size: 12px; }
.pl-stream-announcer__list li { display: flex; gap: 10px; padding: 4px 0; border-top: 1px solid var(--pl-border); }
.pl-stream-announcer__list li:first-child { border-top: 0; }
.pl-stream-announcer__list time { flex: none; color: var(--pl-muted); font-variant-numeric: tabular-nums; }
.pl-stream-announcer__none { font-family: var(--pl-font); color: var(--pl-muted); }
.pl-stream-announcer__list li[data-cleared] { color: var(--pl-muted); }`,
  mount: function (root) {
    var feed = root.querySelector('.pl-stream-announcer__feed');
    var body = root.querySelector('.pl-stream-announcer__body');
    var status = root.querySelector('[role="status"]');
    var list = root.querySelector('.pl-stream-announcer__list');
    var run = root.querySelector('.pl-stream-announcer__run');
    var input = root.querySelector('input');
    var timers = [];
    var text = 'CI runs the suite with a cold cache, so the first request to the mock server times out at 2s and the retry wrapper only catches 502, not a timeout. Locally the server is warm. Catch the timeout too, or warm the mock in a setup step.';
    function announce(msg, cleared) {
      status.textContent = msg;
      var none = list.querySelector('.pl-stream-announcer__none');
      if (none) none.remove();
      var li = document.createElement('li');
      if (cleared) li.dataset.cleared = 'true';
      var t = document.createElement('time'); t.textContent = new Date().toLocaleTimeString(undefined, { hour12: false });
      li.appendChild(t); li.appendChild(document.createTextNode(msg || '(cleared, no announcement)'));
      list.appendChild(li);
    }
    function stream() {
      if (run.disabled) return;
      run.disabled = true; body.textContent = ''; input.value = '';
      feed.setAttribute('aria-busy', 'true');
      announce('Responding');
      var words = text.split(' '), i = 0;
      var tick = setInterval(function () {
        body.textContent += (i ? ' ' : '') + words[i]; i += 1;
        if (i >= words.length) {
          clearInterval(tick);
          feed.setAttribute('aria-busy', 'false');
          announce('Reply complete. Message 2 of 2.');
          timers.push(setTimeout(function () { announce('', true); run.disabled = false; input.focus(); }, 1000));
        }
      }, 70);
      timers.push(tick);
    }
    root.querySelector('.pl-stream-announcer__composer').addEventListener('submit', function (e) { e.preventDefault(); stream(); });
    return function () { timers.forEach(function (t) { clearTimeout(t); clearInterval(t); }); };
  },
};
