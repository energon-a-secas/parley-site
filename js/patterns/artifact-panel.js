export default {
  id: 'artifact-panel',
  name: 'Artifact card that opens a side panel',
  category: 'Agents & sources',
  description: 'A reply that ends in an artifact card; opening it splits the view into chat plus a side panel with Preview and Code tabs, Copy, Download and Close, and becomes a full-screen sheet on narrow screens.',
  tags: ['artifacts', 'canvas', 'panel', 'tabs', 'layout'],
  added: '2026-11-02',
  seenIn: [
    { product: 'Claude.ai', note: 'Artifacts open in their own window beside the conversation with view-code, copy and download controls; on iOS and Android you can view and edit them', url: 'https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them', checked: '2026-11-02' },
    { product: 'Gemini', note: 'Canvas is chosen from the prompt bar; code renders as a working app; canvas projects are available on mobile, formatting is desktop web only', url: 'https://gemini.google/overview/canvas/?hl=en', checked: '2026-11-02' },
    { product: 'Cursor', note: 'Canvases render next to the chat, opened from a card at the end of the response and reopenable from a canvas list', url: 'https://cursor.com/docs/agent/tools/canvas.md', checked: '2026-11-02' },
    { product: 'Hugging Face chat-ui', note: 'ArtifactCard in the message plus ArtifactPanel with versions, wrap toggle, fullscreen and "Close panel (Esc)"', url: 'https://github.com/huggingface/chat-ui', checked: '2026-11-02' },
    { product: 'Cloudscape', note: 'Inline preview for small artifacts; a card that expands into an adjacent panel when the artifact becomes the primary focus', url: 'https://cloudscape.design/gen-ai/patterns/artifact-previews/', checked: '2026-11-02' },
  ],
  anatomy: [
    'Artifact card in the stream: icon, title, type, short description, Open',
    'Split layout: chat column plus panel',
    'Panel header: title, Copy, Download, Close with its shortcut in the name',
    'Tabs: Preview and Code, with aria-selected',
    'Sandboxed preview area for HTML output',
    'Mobile: the panel becomes a full-screen sheet',
  ],
  states: [
    'Card only, panel closed',
    'Panel open, Preview tab',
    'Panel open, Code tab',
    'Streaming into the panel while the chat keeps going',
    'Narrow viewport: full-screen sheet over the chat',
  ],
  behavior: [
    'Esc closes the panel and returns focus to the card',
    'Refinement continues in the chat while the panel is open',
    'Arrow keys move between the tabs; the panel is an aside labelled with the artifact title',
    'Generated HTML renders in an iframe with sandbox="allow-scripts", never allow-same-origin as well',
  ],
  microcopy: [
    { text: 'Close panel (Esc)', source: 'Hugging Face chat-ui' },
    { text: 'Try fixing with Claude', source: 'Claude.ai' },
    { text: 'Yes, you can still access your Canvas projects in your mobile app.', source: 'Google, Gemini Canvas overview' },
  ],
  variants: [
    'Model decides when to open: Claude, Cursor',
    'User opts in from the composer: Gemini Canvas',
    'In-thread editable block that can expand: ChatGPT writing blocks',
  ],
  pitfalls: [
    'Feature drift between platforms (sharing or formatting desktop-only)',
    'Running generated code unsandboxed',
    'Opening a panel for trivial output that should stay inline',
  ],
  refs: [
    { label: 'HF chat-ui: ArtifactPanel.svelte', url: 'https://github.com/huggingface/chat-ui' },
    { label: 'Vercel AI Elements: Artifact', url: 'https://github.com/vercel/ai-elements' },
  ],
  spec: 'Render the artifact as a button card at the end of the reply. Clicking it sets data-open on the layout root, whose grid becomes minmax(16rem, 1fr) minmax(18rem, 1.2fr), and reveals aside[aria-label="Artifact: title"] with a header (title, Copy, Download, Close labelled "Close panel (Esc)") and a tablist with Preview and Code. Put HTML output in iframe[sandbox="allow-scripts"][srcdoc]; the demo shows a static preview instead. Under 700 px position the panel over the chat as a full-screen sheet (position: fixed; inset: 0 in the product, absolute inside the demo box). Bind Esc to close and refocus the card, and move focus to the Close button on open.',
  html: `<div class="pl pl-artifact-panel">
  <section class="pl-artifact-panel__chat" aria-label="Conversation">
    <article class="pl-artifact-panel__turn" data-role="user"><h3 class="pl-sr">You said</h3><div class="pl-artifact-panel__bubble">Make me a budget splitter for the Porto trip, four of us.</div></article>
    <article class="pl-artifact-panel__turn" data-role="assistant">
      <h3 class="pl-sr">Assistant said</h3>
      <p>Here is a splitter that takes shared costs and shows what each person owes. Add the train tickets first; the hotel is already in.</p>
      <button type="button" class="pl-artifact-panel__card" aria-expanded="false">
        <span class="pl-artifact-panel__icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg></span>
        <span class="pl-artifact-panel__card-text"><strong>Porto trip splitter</strong><span>Interactive HTML <span aria-hidden="true">·</span> v1</span></span>
        <span class="pl-artifact-panel__open">Open</span>
      </button>
    </article>
  </section>
  <aside class="pl-artifact-panel__panel" aria-label="Artifact: Porto trip splitter" hidden>
    <header class="pl-artifact-panel__head">
      <strong>Porto trip splitter</strong>
      <div class="pl-artifact-panel__tabs" role="tablist" aria-label="View">
        <button type="button" role="tab" aria-selected="true" data-view="preview" tabindex="0">Preview</button>
        <button type="button" role="tab" aria-selected="false" data-view="code" tabindex="-1">Code</button>
      </div>
      <button type="button" class="pl-artifact-panel__copy">Copy</button>
      <button type="button" class="pl-artifact-panel__dl" aria-label="Download"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg></button>
      <button type="button" class="pl-artifact-panel__close" aria-label="Close panel (Esc)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    </header>
    <div class="pl-artifact-panel__view" role="tabpanel" data-view="preview">
      <div class="pl-artifact-panel__demo">
        <label>Hotel, 2 nights <input type="text" value="312" aria-label="Hotel cost in euros" readonly></label>
        <label>Train tickets <input type="text" value="0" aria-label="Train cost in euros" readonly></label>
        <p>Each of 4 owes <strong>78 €</strong></p>
      </div>
    </div>
    <pre class="pl-artifact-panel__view" role="tabpanel" data-view="code" hidden><code>const people = 4;
const costs = { hotel: 312, train: 0 };
const total = Object.values(costs).reduce((a, b) => a + b, 0);
out.textContent = (total / people).toFixed(0) + ' €';</code></pre>
  </aside>
  <p class="pl-sr" role="status" aria-live="polite"></p>
</div>`,
  css: `.pl-artifact-panel { position: relative; max-width: 720px; min-height: 320px; padding: 16px; display: grid; grid-template-columns: 1fr; gap: 12px; font-size: 14px; }
.pl-artifact-panel[data-open] { grid-template-columns: minmax(16rem, 1fr) minmax(18rem, 1.2fr); }
.pl-artifact-panel__chat { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.pl-artifact-panel__turn[data-role="user"] { display: flex; justify-content: flex-end; }
.pl-artifact-panel__turn p { margin: 0 0 10px; line-height: 1.6; }
.pl-artifact-panel__bubble { max-width: 85%; padding: 8px 12px; border-radius: var(--pl-radius); border-end-end-radius: 4px; background: var(--pl-user); }
.pl-artifact-panel__card { display: flex; align-items: center; gap: 12px; width: 100%; max-width: 360px; padding: 10px 12px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); color: inherit; text-align: start; transition: border-color 160ms ease-out, background 160ms ease-out; }
.pl-artifact-panel__card:hover, .pl-artifact-panel__card[aria-expanded="true"] { border-color: var(--pl-accent); background: var(--pl-surface-2); }
.pl-artifact-panel__icon { flex: none; display: grid; place-items: center; width: 40px; height: 40px; border-radius: var(--pl-radius-sm); background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-artifact-panel__card-text { display: flex; flex-direction: column; min-width: 0; line-height: 1.35; }
.pl-artifact-panel__card-text span { font-size: 12px; color: var(--pl-muted); }
.pl-artifact-panel__open { margin-inline-start: auto; font-size: 13px; color: var(--pl-accent); }
.pl-artifact-panel__panel { display: flex; flex-direction: column; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); overflow: hidden; min-width: 0; }
.pl-artifact-panel__head { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; padding: 8px 8px 8px 14px; border-bottom: 1px solid var(--pl-border); }
.pl-artifact-panel__head strong { margin-inline-end: auto; font-size: 14px; }
.pl-artifact-panel__tabs { display: inline-flex; padding: 2px; border-radius: 999px; background: var(--pl-surface-2); }
.pl-artifact-panel__tabs button { min-height: 28px; padding: 0 10px; border: 0; border-radius: 999px; background: transparent; color: var(--pl-muted); font-size: 13px; }
.pl-artifact-panel__tabs button[aria-selected="true"] { background: var(--pl-bg); color: var(--pl-text); }
.pl-artifact-panel__copy, .pl-artifact-panel__dl, .pl-artifact-panel__close { display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 8px; border: 0; border-radius: var(--pl-radius-sm); background: transparent; color: var(--pl-muted); font-size: 13px; }
.pl-artifact-panel__copy:hover, .pl-artifact-panel__dl:hover, .pl-artifact-panel__close:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-artifact-panel__view { flex: 1; margin: 0; padding: 14px; font-size: 13px; overflow: auto; }
.pl-artifact-panel__demo { display: flex; flex-direction: column; gap: 10px; max-width: 320px; }
.pl-artifact-panel__demo label { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.pl-artifact-panel__demo input { width: 80px; padding: 6px 8px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-bg); text-align: end; }
.pl-artifact-panel__demo p { margin: 4px 0 0; padding-top: 10px; border-top: 1px solid var(--pl-border); }
.pl-artifact-panel__view code { font-family: var(--pl-mono); }
@media (max-width: 700px) { .pl-artifact-panel[data-open] { grid-template-columns: 1fr; } .pl-artifact-panel__panel { position: absolute; inset: 0; z-index: 3; border-radius: 0; } }`,
  mount: function (root) {
    var card = root.querySelector('.pl-artifact-panel__card');
    var panel = root.querySelector('.pl-artifact-panel__panel');
    var close = root.querySelector('.pl-artifact-panel__close');
    var copy = root.querySelector('.pl-artifact-panel__copy');
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var views = root.querySelectorAll('.pl-artifact-panel__view');
    var status = root.querySelector('[role="status"]');
    var timer = null;
    function setOpen(open) {
      panel.hidden = !open;
      card.setAttribute('aria-expanded', String(open));
      if (open) { root.dataset.open = ''; close.focus({ preventScroll: true }); status.textContent = 'Artifact panel opened'; }
      else { delete root.dataset.open; card.focus({ preventScroll: true }); status.textContent = 'Artifact panel closed'; }
    }
    function select(tab) {
      tabs.forEach(function (t) { var on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      views.forEach(function (v) { v.hidden = v.dataset.view !== tab.dataset.view; });
      tab.focus();
    }
    card.addEventListener('click', function () { setOpen(panel.hidden); });
    close.addEventListener('click', function () { setOpen(false); });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { e.preventDefault(); setOpen(false); } });
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); select(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]); }
      });
    });
    copy.addEventListener('click', function () {
      var code = root.querySelector('[data-view="code"] code').textContent;
      try { if (window.navigator.clipboard) window.navigator.clipboard.writeText(code); } catch (e) {}
      copy.textContent = 'Copied'; status.textContent = 'Copied to clipboard';
      clearTimeout(timer); timer = setTimeout(function () { copy.textContent = 'Copy'; }, 2000);
    });
    return function () { clearTimeout(timer); };
  },
};
