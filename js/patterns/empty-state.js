export default {
  id: 'empty-state',
  name: 'Welcome screen that hands off to the conversation',
  category: 'Shell',
  description: 'A greeting, a centred composer and four suggestion cards; on the first send the welcome fades and the composer slides to the bottom with a transform, not a layout animation.',
  tags: ['empty state', 'welcome', 'suggestions', 'composer', 'motion'],
  added: '2026-11-03',
  seenIn: [
    { product: 'assistant-ui', note: 'While a thread is new the viewport uses justify-center so the welcome and composer sit mid-screen; once messages exist the composer footer becomes sticky bottom-0 with mt-auto; suggestions show only while the chat is new and the composer is empty', url: 'https://github.com/assistant-ui/assistant-ui', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'ConversationEmptyState is a centred column with an icon, title and description; Suggestions is a horizontally scrolling row of rounded-full pill buttons', url: 'https://github.com/vercel/ai-elements', checked: '2026-11-02' },
    { product: 'Hugging Face chat-ui', note: 'A caveat line under the composer shows only while there are no messages, and is hidden below the sm breakpoint', url: 'https://github.com/huggingface/chat-ui', checked: '2026-11-02' },
    { product: 'Microsoft 365 Copilot', note: 'After you pick an agent, suggested prompts are offered above the message box', url: 'https://support.microsoft.com/en-gb/topic/get-started-with-agents-for-microsoft-365-copilot-169469d7-328d-4d37-9090-bfc2058a39bd', checked: '2026-11-02' },
  ],
  anatomy: [
    'Greeting heading, optionally with the person\'s name',
    'Identity line naming the assistant and what it is for',
    'Composer, centred while the chat is empty',
    'Suggestion cards in a wrapping grid (not a horizontal scroller)',
    'Caveat line under the composer',
    'Transcript region that is empty until the first send',
  ],
  states: [
    'Fresh: welcome and composer centred, suggestions visible',
    'Typing: suggestions hidden while the composer has text',
    'First send: welcome fades out, composer moves to the bottom, first turn appears',
    'Loading an existing thread: a skeleton with an sr-only status, never the welcome',
    'Reduced motion: the layout switches with no transition',
  ],
  behavior: [
    'A suggestion either sends at once (assistant-ui) or fills the composer (AI Elements leaves it to the app); here it fills and sends',
    'The composer takes focus on a new chat (assistant-ui autoFocus defaults to true)',
    'The move is a FLIP: switch the layout, measure the delta, apply the inverse transform, then transition transform to none',
    'Thread column is capped at 44rem (assistant-ui)',
  ],
  microcopy: [
    { text: 'How can I help you today?', source: 'assistant-ui welcome' },
    { text: 'No messages yet', source: 'Vercel AI Elements default title' },
    { text: 'Generated content may be inaccurate or false.', source: 'Hugging Face chat-ui caveat' },
  ],
  variants: [
    'assistant-ui: a vertical list of suggestion buttons',
    'AI Elements: horizontal pills in a scroller',
    'Copilot: suggested prompts per selected agent',
    'HF chat-ui: the caveat appears only on the empty view',
  ],
  pitfalls: [
    'Flashing the welcome while an existing thread loads; assistant-ui guards against this explicitly',
    'Animating height or top when the composer moves causes layout thrash; animate transform and opacity only, and drop it under prefers-reduced-motion',
    'A horizontally scrolling suggestion row hides chips off-screen on mobile with no cue',
    'A bare "Ask me anything" box teaches nothing; a worked example and a stated limit do more',
  ],
  refs: [
    { label: 'assistant-ui: thread.aui.tsx', url: 'https://github.com/assistant-ui/assistant-ui' },
    { label: 'Vercel AI Elements: conversation.tsx and suggestion.tsx', url: 'https://github.com/vercel/ai-elements' },
  ],
  spec: 'Wrap the view in main data-empty="true" containing a column with display:flex, flex-direction:column, justify-content:center, max-width:44rem and margin-inline:auto, holding the welcome block, the composer and a wrapping grid of button suggestions. On first send, record the composer\'s top, set data-empty="false" (which hides the welcome, shows the transcript and pins the composer at the bottom with margin-top:auto), measure the new top, set transform:translateY(oldTop - newTop) with no transition, then on the next frame transition transform to none over about 320ms while the welcome fades through opacity. Hide suggestions whenever the textarea has text, focus the textarea aria-label="Message" enterkeyhint="send" on load, and skip the transition when prefers-reduced-motion matches.',
  html: `<main class="pl pl-empty-state" data-empty="true">
  <div class="pl-empty-state__col">
    <div class="pl-empty-state__welcome">
      <h2>Good evening, Marta.</h2>
      <p>Plan a trip, debug a test, or draft a reply. Start with a card or type.</p>
    </div>
    <div class="pl-empty-state__transcript" role="log" aria-label="Conversation"></div>
    <form class="pl-empty-state__composer" aria-label="Message composer">
      <textarea rows="1" placeholder="Ask anything" aria-label="Message" enterkeyhint="send"></textarea>
      <button type="submit" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
    </form>
    <div class="pl-empty-state__cards">
      <button type="button" class="pl-empty-state__card"><strong>Plan a weekend</strong><span>Two days in Porto on a tight budget</span></button>
      <button type="button" class="pl-empty-state__card"><strong>Fix a flaky test</strong><span>Retries pass, first run fails on CI only</span></button>
      <button type="button" class="pl-empty-state__card"><strong>Adapt a recipe</strong><span>Sourdough for a cold kitchen</span></button>
      <button type="button" class="pl-empty-state__card"><strong>Check a clause</strong><span>Is this non-compete enforceable?</span></button>
    </div>
    <p class="pl-empty-state__caveat">Replies can be wrong. Check anything that matters.</p>
  </div>
</main>`,
  css: `.pl-empty-state { max-width: 720px; height: 480px; padding: 16px; background: var(--pl-bg); border: 1px solid var(--pl-border); border-radius: var(--pl-radius); overflow: hidden; }
.pl-empty-state__col { display: flex; flex-direction: column; justify-content: center; gap: 14px; height: 100%; max-width: 44rem; margin-inline: auto; }
.pl-empty-state__welcome { text-align: center; transition: opacity 240ms ease-out; }
.pl-empty-state__welcome h2 { margin: 0 0 6px; font-size: 24px; font-weight: 600; letter-spacing: -0.01em; }
.pl-empty-state__welcome p { margin: 0; font-size: 14px; color: var(--pl-muted); }
.pl-empty-state__transcript { display: none; flex: 1; min-height: 0; overflow-y: auto; }
.pl-empty-state__turn { max-width: 80%; margin: 0 0 10px; padding: 10px 14px; border-radius: var(--pl-radius); font-size: 14px; line-height: 1.5; }
.pl-empty-state__turn[data-role="user"] { margin-left: auto; background: var(--pl-user); }
.pl-empty-state__turn[data-role="assistant"] { background: var(--pl-surface); border: 1px solid var(--pl-border); }
.pl-empty-state__composer { display: flex; align-items: flex-end; gap: 8px; padding: 8px 8px 8px 14px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 24px; will-change: transform; }
.pl-empty-state__composer:focus-within { border-color: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 20%, transparent); }
.pl-empty-state__composer textarea { flex: 1; min-width: 0; min-height: 36px; max-height: 120px; padding: 7px 0; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; }
.pl-empty-state__composer button { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-empty-state__composer button:hover { filter: brightness(1.08); }
.pl-empty-state__cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; transition: opacity 200ms ease-out; }
.pl-empty-state__card { display: flex; flex-direction: column; gap: 2px; padding: 12px 14px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); text-align: left; font-size: 13px; }
.pl-empty-state__card strong { font-weight: 600; }
.pl-empty-state__card span { color: var(--pl-muted); }
.pl-empty-state__card:hover { border-color: var(--pl-accent); background: var(--pl-surface-2); }
.pl-empty-state__caveat { margin: 0; text-align: center; font-size: 12px; color: var(--pl-muted); }
.pl-empty-state[data-typing="true"] .pl-empty-state__cards { opacity: 0; pointer-events: none; }
.pl-empty-state[data-empty="false"] .pl-empty-state__col { justify-content: flex-start; }
.pl-empty-state[data-empty="false"] .pl-empty-state__welcome, .pl-empty-state[data-empty="false"] .pl-empty-state__cards { display: none; }
.pl-empty-state[data-empty="false"] .pl-empty-state__transcript { display: block; }
.pl-empty-state[data-empty="false"] .pl-empty-state__composer { margin-top: auto; }
.pl-empty-state[data-leaving="true"] .pl-empty-state__welcome, .pl-empty-state[data-leaving="true"] .pl-empty-state__cards { opacity: 0; }
.pl-empty-state__composer[data-flip="run"] { transition: transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1); }`,
  mount: function (root) {
    var form = root.querySelector('.pl-empty-state__composer');
    var input = form.querySelector('textarea');
    var transcript = root.querySelector('.pl-empty-state__transcript');
    var timers = [];
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function turn(role, text) {
      var p = document.createElement('p');
      p.className = 'pl-empty-state__turn'; p.dataset.role = role; p.textContent = text;
      transcript.appendChild(p); transcript.scrollTop = transcript.scrollHeight;
    }
    function send(text) {
      if (!text.trim()) return;
      input.value = ''; root.dataset.typing = 'false';
      if (root.dataset.empty === 'false') { turn('user', text); return; }
      var before = form.getBoundingClientRect().top;
      root.dataset.leaving = 'true';
      timers.push(setTimeout(function () {
        root.dataset.empty = 'false';
        turn('user', text);
        var delta = before - form.getBoundingClientRect().top;
        if (!reduce && delta) {
          form.style.transform = 'translateY(' + delta + 'px)';
          requestAnimationFrame(function () { requestAnimationFrame(function () {
            form.dataset.flip = 'run'; form.style.transform = '';
          }); });
        }
        timers.push(setTimeout(function () { turn('assistant', 'On it. Give me the dates and I will start with the cheapest nights.'); }, 900));
      }, reduce ? 0 : 160));
    }
    input.addEventListener('input', function () { root.dataset.typing = String(input.value.trim().length > 0); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input.value); } });
    form.addEventListener('submit', function (e) { e.preventDefault(); send(input.value); });
    root.addEventListener('click', function (e) {
      var card = e.target.closest('.pl-empty-state__card');
      if (card) send(card.querySelector('span').textContent);
    });
    form.addEventListener('transitionend', function () { delete form.dataset.flip; });
    return function () { timers.forEach(clearTimeout); };
  },
};
