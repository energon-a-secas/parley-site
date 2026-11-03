export default {
  id: 'starter-chips',
  name: 'Starter prompts and follow-up chips',
  category: 'Composer',
  description: 'Starter cards above the composer on an empty thread, follow-up chips under the first reply; a click fills the composer and focuses it instead of sending.',
  tags: ['composer', 'empty-state', 'suggestions', 'chips'],
  added: '2026-11-03',
  seenIn: [
    { product: 'OpenAI ChatKit', note: 'startScreen.greeting plus startScreen.prompts shown above the composer in a new thread', url: 'https://github.com/openai/chatkit-js', checked: '2026-11-02' },
    { product: 'assistant-ui', note: 'Welcome Suggestions render only while the composer is empty in a new chat; ThreadFollowupSuggestions sit in the viewport footer after a reply', url: 'https://www.assistant-ui.com/docs/ui/Thread', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'Suggestions is a horizontal scroll row of buttons above the input; a click calls sendMessage with the text', url: 'https://elements.ai-sdk.dev/components/suggestion', checked: '2026-11-02' },
    { product: 'Claude Code', note: 'A greyed example prompt on a new session and a next-prompt suggestion after each reply that Tab or Right arrow places in the input; dismissed as soon as the user types', url: 'https://code.claude.com/docs/en/interactive-mode', checked: '2026-11-02' },
    { product: 'Perplexity', note: 'Follow-up chips below the answer, one tap into the composer (third-party teardown, June 2026)', url: 'https://aiuxplayground.com/teardowns/perplexity/output', checked: '2026-11-02' },
  ],
  anatomy: [
    'Greeting heading on the empty thread',
    'role="group" aria-label="Suggestions" holding 3 to 6 starter buttons with a title and a one-line description',
    'Thread area that replaces the starters once the first message is sent',
    'Follow-up chip row under the latest reply, single line, horizontally scrollable',
    'Composer textarea that receives the chip text, focus and the caret at the end',
    'Start over control to return to the empty state',
  ],
  states: [
    'Empty thread: greeting and starters visible, follow-ups hidden',
    'Typing: starters hide on the first keystroke and return if the draft is cleared',
    'After reply: thread visible, follow-up chips under the reply',
    'Suggestion accepted: text inserted, nothing sent until the user presses send',
  ],
  behavior: [
    'A starter or follow-up click sets the textarea value, focuses it and places the caret at the end',
    'Starters hide when the textarea has content and the thread is still empty',
    'Enter in the textarea sends; the demo answers with a fixed reply and shows follow-ups',
    'Follow-up rows never wrap past one line; overflow scrolls horizontally',
    'A polite live region reads the inserted suggestion so screen reader users know the draft changed',
  ],
  microcopy: [
    { text: 'What can I help with today?', source: 'OpenAI ChatKit default greeting' },
  ],
  variants: [
    'Above the composer (ChatKit, AI Elements) versus below the reply (Perplexity)',
    'Cards with title and description (assistant-ui) versus single-line pills (ChatGPT, Claude)',
    'Insert then send (Claude Code, Perplexity) versus send immediately on click (AI Elements)',
    'Generated per conversation at a token cost (Claude Code) versus a static list (ChatKit)',
  ],
  pitfalls: [
    'Starters and the plus menu compete as two unrelated discovery paths',
    'Long follow-up rows push the composer down; cap at one scrolling line',
    'Auto-sending on click removes the chance to edit; insert-then-send is safer for anything costly',
    'Generated suggestions cost tokens; Claude Code documents when it skips them',
  ],
  refs: [
    { label: 'assistant-ui Thread: Suggestions and FollowupSuggestions', url: 'https://www.assistant-ui.com/docs/ui/Thread' },
    { label: 'Vercel AI Elements: Suggestion', url: 'https://elements.ai-sdk.dev/components/suggestion' },
  ],
  spec: 'When the thread is empty, render a heading and a div role="group" aria-label="Suggestions" of 3 to 6 buttons above the composer; hide the group as soon as the textarea has content. Each button sets textarea.value to its prompt, focuses the textarea and calls setSelectionRange at the end, without sending. After an assistant reply, render follow-up buttons under it in a single row with overflow-x auto and the same insert behavior. Announce the insertion in a polite live region. Pair with the send-stop pattern for the send control.',
  html: `<section class="pl pl-starter-chips" data-stage="empty" aria-label="New chat">
  <header class="pl-starter-chips__top">
    <h2 class="pl-starter-chips__greeting">What can I help with today?</h2>
    <button type="button" class="pl-starter-chips__reset">Start over</button>
  </header>
  <div class="pl-starter-chips__starters" role="group" aria-label="Suggestions">
    <button type="button" class="pl-starter-chips__card" data-prompt="Plan a two-day weekend in Lisbon for two people who like food and walking, staying near Alfama."><strong>Plan a weekend in Lisbon</strong><span>Two days, one hill at a time</span></button>
    <button type="button" class="pl-starter-chips__card" data-prompt="This Jest test passes alone and fails in the suite. Here is the output:"><strong>Fix a flaky test</strong><span>Paste the failing output</span></button>
    <button type="button" class="pl-starter-chips__card" data-prompt="Review this freelance contract for payment terms, IP ownership and termination."><strong>Review a freelance contract</strong><span>Payment terms and IP</span></button>
    <button type="button" class="pl-starter-chips__card" data-prompt="I have eggs, spinach, feta and half a baguette. Dinner for two in 20 minutes?"><strong>Cook from the fridge</strong><span>List what you have</span></button>
  </div>
  <div class="pl-starter-chips__thread">
    <p class="pl-starter-chips__user"></p>
    <div class="pl-starter-chips__reply">
      <p>Saturday: coffee at Graça, walk down through Alfama to the cathedral, lunch at a tasca near Santa Luzia, the castle late afternoon when the light is good. Sunday: tram 15 to Belém for the monastery and pastéis, back along the river for a sunset at Cais do Sodré.</p>
      <div class="pl-starter-chips__followups" role="group" aria-label="Follow-up suggestions">
        <button type="button" class="pl-starter-chips__chip" data-prompt="Add a rainy-day option for Sunday.">Add a rainy-day option</button>
        <button type="button" class="pl-starter-chips__chip" data-prompt="Swap Belém for a half day in Sintra.">Swap Belém for Sintra</button>
        <button type="button" class="pl-starter-chips__chip" data-prompt="Where should we eat near Alfama on Saturday night?">Where to eat near Alfama</button>
        <button type="button" class="pl-starter-chips__chip" data-prompt="Make this a one-day plan instead.">Make it one day</button>
      </div>
    </div>
  </div>
  <form class="pl-starter-chips__composer" aria-label="Message composer">
    <textarea class="pl-starter-chips__input" rows="1" aria-label="Message" placeholder="Ask anything"></textarea>
    <button type="submit" class="pl-starter-chips__send" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
  </form>
  <p class="pl-sr" aria-live="polite"></p>
</section>`,
  css: `.pl-starter-chips { max-width: 720px; padding: 20px 16px 16px; background: var(--pl-bg); }
.pl-starter-chips__top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
.pl-starter-chips__greeting { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.01em; }
.pl-starter-chips__reset { padding: 4px 10px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; font-size: 12px; color: var(--pl-muted); }
.pl-starter-chips__reset:hover { color: var(--pl-text); background: var(--pl-surface); }
.pl-starter-chips[data-stage="empty"] .pl-starter-chips__reset { display: none; }
.pl-starter-chips__starters { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; margin-bottom: 14px; }
.pl-starter-chips__card { display: flex; flex-direction: column; gap: 2px; padding: 12px 14px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); text-align: left; font-size: 13.5px; line-height: 1.35; color: var(--pl-text); transition: border-color 160ms ease-out, background 160ms ease-out; }
.pl-starter-chips__card:hover { border-color: var(--pl-accent); background: var(--pl-surface-2); }
.pl-starter-chips__card span { color: var(--pl-muted); font-size: 12.5px; }
.pl-starter-chips__thread { display: none; margin-bottom: 14px; }
.pl-starter-chips[data-stage="replied"] .pl-starter-chips__thread { display: block; }
.pl-starter-chips[data-stage="replied"] .pl-starter-chips__starters, .pl-starter-chips[data-stage="typing"] .pl-starter-chips__starters, .pl-starter-chips[data-stage="replied"] .pl-starter-chips__greeting { display: none; }
.pl-starter-chips__user { width: fit-content; max-width: 85%; margin: 0 0 12px auto; padding: 9px 14px; border-radius: 18px 18px 4px 18px; background: var(--pl-user); font-size: 14px; line-height: 1.45; }
.pl-starter-chips__reply p { margin: 0 0 10px; max-width: 62ch; font-size: 14.5px; line-height: 1.55; }
.pl-starter-chips__followups { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: thin; }
.pl-starter-chips__chip { flex: none; height: 32px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; font-size: 13px; color: var(--pl-text); white-space: nowrap; transition: border-color 160ms ease-out, background 160ms ease-out; }
.pl-starter-chips__chip:hover { border-color: var(--pl-accent); background: var(--pl-surface); }
.pl-starter-chips__composer { display: flex; align-items: flex-end; gap: 8px; padding: 8px 8px 8px 16px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 24px; transition: border-color 160ms ease-out, box-shadow 160ms ease-out; }
.pl-starter-chips__composer:focus-within { border-color: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 20%, transparent); }
.pl-starter-chips__input { flex: 1; min-width: 0; min-height: 36px; max-height: 176px; padding: 7px 0; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; }
.pl-starter-chips__input::placeholder { color: var(--pl-muted); }
.pl-starter-chips__send { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-starter-chips__send:hover { filter: brightness(1.08); }`,
  mount: function (root) {
    var input = root.querySelector('.pl-starter-chips__input');
    var form = root.querySelector('.pl-starter-chips__composer');
    var user = root.querySelector('.pl-starter-chips__user');
    var reset = root.querySelector('.pl-starter-chips__reset');
    var live = root.querySelector('[aria-live]');
    var replied = false;
    function grow() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 176) + 'px'; }
    function stage() { root.dataset.stage = replied ? 'replied' : (input.value.trim() ? 'typing' : 'empty'); }
    function insert(text) {
      input.value = text;
      grow();
      input.focus();
      input.setSelectionRange(text.length, text.length);
      live.textContent = 'Draft filled: ' + text;
      stage();
    }
    root.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-prompt]');
      if (btn) insert(btn.dataset.prompt);
    });
    input.addEventListener('input', function () { grow(); stage(); });
    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); form.requestSubmit(); }
    });
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!input.value.trim()) return;
      user.textContent = input.value.trim();
      input.value = '';
      grow();
      replied = true;
      stage();
      live.textContent = 'Reply received. Four follow-up suggestions available.';
    });
    reset.addEventListener('click', function () {
      replied = false;
      input.value = '';
      grow();
      stage();
      live.textContent = 'New chat';
    });
  },
};
