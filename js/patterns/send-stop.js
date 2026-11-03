export default {
  id: 'send-stop',
  name: 'Composer with a send button that becomes Stop',
  category: 'Composer',
  description: 'An auto-growing textarea whose send arrow turns into a stop square while the reply streams, with Enter to send and Shift+Enter for a newline.',
  tags: ['composer', 'button', 'states', 'keyboard'],
  added: '2026-11-02',
  seenIn: [
    { product: 'Vercel AI Elements', note: 'PromptInputSubmit swaps arrow, spinner, square and X by status and flips its aria-label between Submit and Stop', url: 'https://ai-sdk.dev/elements/components/prompt-input', checked: '2026-11-02' },
    { product: 'Vercel AI SDK', note: 'useChat exposes submitted, streaming, ready and error; the docs show Stop only in the first two, calling stop() to abort the fetch', url: 'https://ai-sdk.dev/docs/ai-sdk-ui/chatbot', checked: '2026-11-02' },
    { product: 'assistant-ui', note: 'Cancel replaces Send in the Thread whenever the composer can cancel, except in a voice session with nothing pending', url: 'https://www.assistant-ui.com/docs/ui/Thread', checked: '2026-11-02' },
    { product: 'Chatbot UI', note: 'A filled stop icon replaces the send icon while generating; send is dimmed when the input is empty', url: 'https://github.com/mckaywrigley/chatbot-ui', checked: '2026-11-02' },
    { product: 'LlamaIndex chat-ui', note: 'Send is disabled when loading or blank and a Stop control renders while loading', url: 'https://github.com/run-llama/chat-ui', checked: '2026-11-02' },
    { product: 'Cursor', note: 'Agentic variant: Enter queues a message while the agent works and Cmd+Enter sends it now; Stop is a separate control', url: 'https://cursor.com/docs/agent/overview', checked: '2026-11-02' },
  ],
  anatomy: [
    'Rounded container with a 1px border that brightens on focus-within',
    'Textarea that grows from one line to a max height, then scrolls',
    'Leading plus button for attachments',
    'Trailing send button, circular, filled with the accent when ready',
    'Status line under the box for keyboard hints or errors',
  ],
  states: [
    'Empty: send button rendered but disabled, muted fill',
    'Ready: accent fill, arrow icon, enabled',
    'Submitted: request sent, nothing streamed yet; AI Elements shows a spinner here, most kits skip straight to Stop',
    'Generating: same slot shows a square stop icon, neutral fill, label "Stop", type="button" so Enter cannot double-submit',
    'Error: status line turns to the danger color, the draft stays, button returns to Ready',
  ],
  behavior: [
    'Enter sends; Shift+Enter inserts a newline; while generating Enter is ignored',
    'The button keeps one DOM node and swaps icon and aria-label, so focus is not lost mid-stream',
    'Escape while generating also stops (mirrors the button)',
    'A polite live region announces "Generating" and "Stopped"',
  ],
  microcopy: [
    { text: 'Stop', source: 'AI Elements aria-label while streaming' },
    { text: 'Submit', source: 'AI Elements aria-label when ready' },
    { text: 'Send now', source: 'Cursor, steer the running agent' },
  ],
  variants: [
    'Chat products: one button morphs from Send to Stop, which is what this demo shows',
    'Agentic tools: Enter queues the next message instead of stopping; Stop moves to Esc (Claude Code) or to Enter on an empty composer (CopilotKit). See the agent-queue-composer pattern',
    'Submitted vs streaming: AI Elements shows a spinner for the wait and a square for the stream; most kits collapse the two',
  ],
  pitfalls: [
    'Replacing the button node on state change drops keyboard focus and screen reader context',
    'Rendering send and stop as clickable SVGs inside a div, as Chatbot UI does, gives them no focus and no name',
    'Routing Enter to Stop while the user types a follow-up aborts the run; CopilotKit documents this bug and its fix in source',
    'Disabling the whole input on error strands a half-typed message; the AI SDK guide does this and ChatGPT community threads describe the dead end',
    'Growing the textarea with no max height pushes the whole conversation up on long pastes',
  ],
  refs: [
    { label: 'Vercel AI Elements: PromptInput (Apache-2.0)', url: 'https://ai-sdk.dev/elements/components/prompt-input' },
    { label: 'Vercel AI SDK: chatbot status and stop()', url: 'https://ai-sdk.dev/docs/ai-sdk-ui/chatbot' },
    { label: 'assistant-ui: Thread (MIT)', url: 'https://www.assistant-ui.com/docs/ui/Thread' },
    { label: 'CopilotKit: CopilotChatInput source (MIT)', url: 'https://github.com/CopilotKit/CopilotKit' },
    { label: 'Claude Code: interactive mode, Enter queues and Esc interrupts', url: 'https://code.claude.com/docs/en/interactive-mode' },
  ],
  spec: 'Build a form with a textarea and one submit button. Auto-size the textarea by resetting its height to auto on input and setting it to scrollHeight, capped at about eight lines with overflow-y auto past that. Keep a single state variable (empty, ready, generating) and reflect it on the root with a data attribute; the button swaps its inner SVG and aria-label on each change but is never re-created. Enter submits unless Shift is held; during generating, submit is a no-op and the button and Escape both call the abort controller. Announce state changes in a visually hidden aria-live="polite" element. On error keep the textarea enabled and the draft intact; put Retry in the transcript, not on the input.',
  html: `<form class="pl pl-send-stop" data-state="empty" aria-label="Message composer">
  <div class="pl-send-stop__box">
    <button type="button" class="pl-send-stop__attach" aria-label="Add files">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
    </button>
    <textarea class="pl-send-stop__input" rows="1" placeholder="Ask anything" aria-label="Message"></textarea>
    <button type="submit" class="pl-send-stop__send" aria-label="Send message" disabled>
      <svg class="pl-send-stop__icon-send" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      <svg class="pl-send-stop__icon-stop" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
    </button>
  </div>
  <p class="pl-send-stop__hint"><span class="pl-send-stop__hint-text">Enter to send, Shift+Enter for a new line</span></p>
  <p class="pl-sr" aria-live="polite"></p>
</form>`,
  css: `.pl-send-stop { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-send-stop__box { display: flex; align-items: flex-end; gap: 8px; padding: 8px 8px 8px 10px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 24px; transition: border-color 160ms ease-out, box-shadow 160ms ease-out; }
.pl-send-stop__box:focus-within { border-color: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 20%, transparent); }
.pl-send-stop__attach, .pl-send-stop__send { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: transparent; color: var(--pl-muted); transition: background 160ms ease-out, color 160ms ease-out; }
.pl-send-stop__attach:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-send-stop__input { flex: 1; min-width: 0; min-height: 36px; max-height: 192px; padding: 7px 4px; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; overflow-y: auto; }
.pl-send-stop__input::placeholder { color: var(--pl-muted); }
.pl-send-stop__send { background: var(--pl-surface-2); }
.pl-send-stop__send:disabled { cursor: not-allowed; opacity: 0.55; }
.pl-send-stop[data-state="ready"] .pl-send-stop__send { background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-send-stop[data-state="ready"] .pl-send-stop__send:hover { filter: brightness(1.08); }
.pl-send-stop[data-state="generating"] .pl-send-stop__send { background: var(--pl-text); color: var(--pl-bg); }
.pl-send-stop__icon-stop { display: none; }
.pl-send-stop[data-state="generating"] .pl-send-stop__icon-send { display: none; }
.pl-send-stop[data-state="generating"] .pl-send-stop__icon-stop { display: block; }
.pl-send-stop__hint { margin: 8px 12px 0; font-size: 12px; color: var(--pl-muted); min-height: 18px; }
.pl-send-stop[data-state="generating"] .pl-send-stop__hint { color: var(--pl-text); }`,
  mount: function (root) {
    var input = root.querySelector('.pl-send-stop__input');
    var send = root.querySelector('.pl-send-stop__send');
    var hint = root.querySelector('.pl-send-stop__hint-text');
    var live = root.querySelector('[aria-live]');
    var timer = null;
    function setState(state) {
      root.dataset.state = state;
      send.disabled = state === 'empty';
      send.setAttribute('aria-label', state === 'generating' ? 'Stop generating' : 'Send message');
      hint.textContent = state === 'generating' ? 'Generating. Press Stop or Escape to interrupt.' : 'Enter to send, Shift+Enter for a new line';
      if (state === 'generating') live.textContent = 'Generating';
    }
    function grow() {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 192) + 'px';
    }
    function stop(reason) {
      if (root.dataset.state !== 'generating') return;
      clearTimeout(timer);
      setState(input.value.trim() ? 'ready' : 'empty');
      live.textContent = reason === 'done' ? 'Response complete' : 'Stopped';
    }
    function submit() {
      if (root.dataset.state === 'generating' || !input.value.trim()) return;
      input.value = '';
      grow();
      setState('generating');
      timer = setTimeout(function () { stop('done'); }, 2800);
    }
    input.addEventListener('input', function () {
      grow();
      if (root.dataset.state !== 'generating') setState(input.value.trim() ? 'ready' : 'empty');
    });
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit(); }
      if (event.key === 'Escape') stop('user');
    });
    root.addEventListener('submit', function (event) {
      event.preventDefault();
      if (root.dataset.state === 'generating') stop('user'); else submit();
    });
    return function () { clearTimeout(timer); };
  },
};
