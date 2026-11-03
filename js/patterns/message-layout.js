export default {
  id: 'message-layout',
  name: 'User bubble, assistant document',
  category: 'Messages',
  description: 'The user turn sits in a bounded right-aligned bubble while the assistant turn runs full width as plain document text, so code and tables get the whole column.',
  tags: ['layout', 'bubble', 'turns', 'rtl', 'a11y'],
  added: '2026-11-02',
  seenIn: [
    { product: 'Vercel AI Elements', note: 'User turn gets ml-auto, a secondary background and rounded corners; assistant turn is plain text with no bubble; rows capped at 95% width (message.tsx)', url: 'https://github.com/vercel/ai-elements', checked: '2026-11-02' },
    { product: 'Open WebUI', note: 'A chatBubble setting (default on) puts the user message in a right-justified bubble capped at 90%; with bubbles off both sides align left with avatar and name', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'Cloudscape', note: 'Outgoing aligns to the inline end and incoming to the inline start with constrained width; dense surfaces align everything to one side and rely on avatar or name', url: 'https://cloudscape.design/gen-ai/patterns/generative-ai-chat/', checked: '2026-11-02' },
    { product: 'ChatGPT and Claude.ai', note: 'Each turn carries a visually hidden heading naming the sender, so authorship does not depend on alignment (markup observed by a practitioner, 2026-08-11)', url: 'https://azukiazusa.dev/en/blog/accessible-streaming-chat-ui', checked: '2026-11-02' },
  ],
  anatomy: [
    'Turn container, one per message, carrying a visually hidden heading that names the sender',
    'User bubble: end-aligned, 70 to 95% max width, tinted background, tighter corner on the trailing edge',
    'Assistant body: full column width, no box, prose typography with room for wide blocks',
    'Optional small avatar beside the assistant turn',
    'Optional meta line with model name and time',
    'Slot under each turn for the action bar',
  ],
  states: [
    'Default: both turns settled',
    'Hover: older turns reveal their action bar',
    'Streaming: the assistant body grows in place',
    'Editing: the user bubble becomes a textarea (see regenerate-branching)',
  ],
  behavior: [
    'Sender identity is programmatic (hidden heading or aria-label), never only positional',
    'Only logical properties are used, so the layout mirrors itself for right-to-left languages with no overrides',
    'The user bubble shrinks to its content; the assistant body always takes the column',
  ],
  microcopy: [
    { text: 'Chat Bubble UI', source: 'Open WebUI interface setting' },
  ],
  variants: [
    'Asymmetric, user bubble and assistant document: AI Elements, Open WebUI default',
    'Symmetric bubbles capped at 70%: shadcn-chatbot-kit, Cloudscape chat bubble',
    'One-sided with avatar and name, no alignment cue: Cloudscape dense surfaces, Open WebUI with bubbles off',
  ],
  pitfalls: [
    'Bubbling the assistant reply squeezes code blocks and tables into a narrow box',
    'Authorship by alignment alone fails screen-reader users and narrow side panels',
    'Physical margin-left: auto breaks the mirrored layout in RTL; use margin-inline-start',
  ],
  refs: [
    { label: 'Vercel AI Elements: Message', url: 'https://github.com/vercel/ai-elements' },
    { label: 'Cloudscape: chat bubble component', url: 'https://cloudscape.design/components/chat-bubble/' },
  ],
  spec: 'Render each turn as an article with a visually hidden h3 naming the sender. Style the user body with margin-inline-start: auto, max-width: min(80%, 40rem), a tinted background and a large radius with a 4px trailing corner. Leave the assistant body unboxed at full column width with prose line height, optionally preceded by a 24px avatar in a two-column grid. Use only logical properties (inline-start, inline-end) so RTL works without overrides, and keep an empty slot under each turn for the action bar.',
  html: `<div class="pl pl-message-layout" role="log" aria-label="Conversation">
  <article class="pl-message-layout__turn" data-role="user">
    <h3 class="pl-sr">You said</h3>
    <div class="pl-message-layout__body">Can I do Lisbon to Porto and back in one day and still get four hours in the city?</div>
  </article>
  <article class="pl-message-layout__turn" data-role="assistant">
    <h3 class="pl-sr">Assistant said</h3>
    <span class="pl-message-layout__avatar" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 8.5 5v10L12 22l-8.5-5V7Z"/></svg>
    </span>
    <div class="pl-message-layout__body">
      <p>Yes, comfortably. The Alfa Pendular takes about 2h50 each way, so the day works if you take the first fast train out and one of the last two back.</p>
      <ul>
        <li>Out: 07:09 from Lisboa Oriente, arrives Porto Campanhã 09:58</li>
        <li>Back: 18:12 or 19:12 from Campanhã, home by 21:05 or 22:05</li>
      </ul>
      <p>That leaves eight hours in Porto, double what you asked for. Book the outbound now; the 07:09 sells out on Fridays.</p>
      <p class="pl-message-layout__meta">14:02 <span aria-hidden="true">·</span> 2.4s</p>
    </div>
  </article>
  <article class="pl-message-layout__turn" data-role="user">
    <h3 class="pl-sr">You said</h3>
    <div class="pl-message-layout__body">Book the 07:09 and the 19:12 then.</div>
  </article>
</div>`,
  css: `.pl-message-layout { max-width: 720px; padding: 20px; display: flex; flex-direction: column; gap: 18px; }
.pl-message-layout__turn { display: flex; gap: 12px; align-items: flex-start; }
.pl-message-layout__turn[data-role="user"] { justify-content: flex-end; }
.pl-message-layout__turn[data-role="user"] .pl-message-layout__body { margin-inline-start: auto; max-width: min(80%, 40rem); padding: 10px 14px; background: var(--pl-user); border-radius: var(--pl-radius); border-end-end-radius: 4px; line-height: 1.5; }
.pl-message-layout__turn[data-role="assistant"] .pl-message-layout__body { flex: 1; min-width: 0; max-width: 100%; line-height: 1.6; }
.pl-message-layout__body > p { margin: 0 0 10px; }
.pl-message-layout__body > ul { margin: 0 0 10px; padding-inline-start: 20px; }
.pl-message-layout__body > :last-child { margin-bottom: 0; }
.pl-message-layout__avatar { flex: none; display: grid; place-items: center; width: 24px; height: 24px; margin-top: 2px; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-message-layout__meta { font-size: 12px; color: var(--pl-muted); }
@media (max-width: 420px) { .pl-message-layout__avatar { display: none; } .pl-message-layout__turn[data-role="user"] .pl-message-layout__body { max-width: 92%; } }`,
};
