export default {
  id: 'message-actions',
  name: 'Per-message action bar with a version pager',
  category: 'Messages',
  description: 'The icon row under each reply (copy, thumbs, regenerate, share, read aloud) that shows on hover and focus on desktop and stays visible on touch, plus a "2/3" version pager on an edited user turn.',
  tags: ['actions', 'toolbar', 'hover', 'pager', 'a11y'],
  added: '2026-11-02',
  seenIn: [
    { product: 'ChatGPT', note: 'Copy, thumbs up and down, share and regenerate in the row after the answer completes; overflow holds View sources, Branch in new chat and Read aloud', url: 'https://www.aiuxplayground.com/teardowns/chatgpt/output', checked: '2026-11-02' },
    { product: 'Claude.ai', note: 'Copy, read aloud, thumbs up, thumbs down and "Try again" with version paging', url: 'https://www.aiuxplayground.com/teardowns/claude/output', checked: '2026-11-02' },
    { product: 'Open WebUI', note: 'Always visible on the last message and in high-contrast mode, hover-revealed on older ones', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'assistant-ui', note: 'autohide is never, not-last or always; a hover-revealed bar gets data-floating; buttons are disabled by message state', url: 'https://www.assistant-ui.com/docs/primitives/action-bar', checked: '2026-11-02' },
    { product: 'Cloudscape', note: 'Keep action groups always visible, never hover-only; about five frequent actions, the rest in a dropdown', url: 'https://cloudscape.design/gen-ai/patterns/generative-ai-chat/', checked: '2026-11-02' },
  ],
  anatomy: [
    'role="toolbar" row with icon buttons, each with an aria-label and a tooltip',
    'Copy, thumbs up, thumbs down, regenerate, share, read aloud',
    'Version pager: previous, "2/3", next, on whichever turn has siblings',
    'Overflow button for rarer actions',
    'Optional model and timing label',
  ],
  states: [
    'Hidden while streaming',
    'Visible on the last turn',
    'Older turns: revealed on hover and focus-within',
    'Touch (hover: none): always visible',
    'Pressed thumb (aria-pressed), copied confirmation',
  ],
  behavior: [
    'Reveal on :focus-within as well as :hover, so keyboard users find the bar',
    'Arrow keys move focus inside the toolbar with roving tabindex; Tab leaves it',
    'The pager announces "Showing version 2 of 3" and disables at the bounds',
    'Thumbs are mutually exclusive toggles; copy confirms for two seconds',
  ],
  microcopy: [
    { text: 'Try again', source: 'Claude.ai' },
    { text: 'Branch in new chat', source: 'ChatGPT' },
    { text: 'Continue Response', source: 'Open WebUI' },
  ],
  variants: [
    'Always visible: Cloudscape guidance, Open WebUI on the last message',
    'Hover reveal except last: Open WebUI, assistant-ui not-last',
    'Document-insertion actions instead of chat actions: Notion AI',
  ],
  pitfalls: [
    'Hover-only bars are invisible to touch and harder for keyboard users',
    '"Try again" and edit with equal weight confuse users about which one forks the thread',
    'Too many top-level icons; Cloudscape caps at about five',
  ],
  refs: [
    { label: 'assistant-ui: Action bar', url: 'https://www.assistant-ui.com/docs/primitives/action-bar' },
    { label: 'Vercel AI Elements: MessageActions', url: 'https://github.com/vercel/ai-elements' },
  ],
  spec: 'Render div[role="toolbar"][aria-label="Message actions"] after each assistant turn once it completes. Mark the newest turn with data-last. CSS: .turn:not([data-last]) .actions { opacity: 0 } and .turn:hover .actions, .turn:focus-within .actions { opacity: 1 }; under @media (hover: none) keep them all visible. Give every button an aria-label and draw the tooltip from it with ::after. Implement roving tabindex: only one button has tabindex="0", ArrowLeft and ArrowRight move it. For the pager, render nav[aria-label="Versions"] with prev, "n/N" text and next, disable at the bounds and write "Showing version n of N" to a polite status region on change.',
  html: `<div class="pl pl-message-actions" role="log" aria-label="Conversation">
  <article class="pl-message-actions__turn" data-role="user">
    <h3 class="pl-sr">You said</h3>
    <div class="pl-message-actions__bubble">Make the release note shorter and keep the dates.</div>
    <nav class="pl-message-actions__pager" aria-label="Versions">
      <button type="button" class="pl-message-actions__prev" aria-label="Previous version"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <span class="pl-message-actions__count">2/3</span>
      <button type="button" class="pl-message-actions__next" aria-label="Next version"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
    </nav>
  </article>
  <article class="pl-message-actions__turn" data-role="assistant">
    <h3 class="pl-sr">Assistant said</h3>
    <div class="pl-message-actions__body"><p>Shipped 24 Oct: faster sync on large folders, and a fix for the 12 Oct regression that duplicated shared links. Rollout finishes 28 Oct.</p></div>
    <div class="pl-message-actions__bar" role="toolbar" aria-label="Message actions">
      <button type="button" aria-label="Copy" tabindex="0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>
      <button type="button" aria-label="Good response" aria-pressed="false" tabindex="-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg></button>
      <button type="button" aria-label="Bad response" aria-pressed="false" tabindex="-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g transform="rotate(180 12 12)"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></g></svg></button>
      <button type="button" aria-label="Try again" tabindex="-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/></svg></button>
      <button type="button" aria-label="Share" tabindex="-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/></svg></button>
      <button type="button" aria-label="Read aloud" tabindex="-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg></button>
      <span class="pl-message-actions__model">Sonnet 4.5</span>
    </div>
  </article>
  <p class="pl-message-actions__hint">Hover or Tab into the reply above to reveal its bar. The last reply in a real thread carries data-last and keeps it visible.</p>
  <p class="pl-sr" role="status" aria-live="polite"></p>
</div>`,
  css: `.pl-message-actions { max-width: 680px; padding: 20px; display: flex; flex-direction: column; gap: 16px; font-size: 15px; }
.pl-message-actions__turn { display: flex; flex-direction: column; gap: 6px; }
.pl-message-actions__turn[data-role="user"] { align-items: flex-end; }
.pl-message-actions__bubble { max-width: min(80%, 40rem); padding: 10px 14px; border-radius: var(--pl-radius); border-end-end-radius: 4px; background: var(--pl-user); }
.pl-message-actions__body { line-height: 1.6; }
.pl-message-actions__body p { margin: 0; }
.pl-message-actions__pager { display: inline-flex; align-items: center; gap: 2px; font-size: 12px; color: var(--pl-muted); font-variant-numeric: tabular-nums; }
.pl-message-actions__pager button, .pl-message-actions__bar button { display: grid; place-items: center; width: 32px; height: 32px; border: 0; border-radius: var(--pl-radius-sm); background: transparent; color: var(--pl-muted); transition: background 160ms ease-out, color 160ms ease-out; }
.pl-message-actions__pager button:hover, .pl-message-actions__bar button:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-message-actions__pager button:disabled { opacity: 0.35; cursor: default; background: transparent; }
.pl-message-actions__bar { position: relative; display: flex; align-items: center; gap: 2px; margin-inline-start: -8px; transition: opacity 160ms ease-out; }
.pl-message-actions__turn:not([data-last]) .pl-message-actions__bar { opacity: 0; }
.pl-message-actions__turn:hover .pl-message-actions__bar, .pl-message-actions__turn:focus-within .pl-message-actions__bar { opacity: 1; }
.pl-message-actions__bar button[aria-pressed="true"] { color: var(--pl-accent); background: color-mix(in srgb, var(--pl-accent) 14%, transparent); }
.pl-message-actions__bar button.is-copied { color: var(--pl-success); }
.pl-message-actions__bar button::after { content: attr(aria-label); position: absolute; bottom: calc(100% + 6px); padding: 4px 8px; border-radius: 6px; background: var(--pl-text); color: var(--pl-bg); font-size: 12px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 120ms ease-out; }
.pl-message-actions__bar button:hover::after, .pl-message-actions__bar button:focus-visible::after { opacity: 1; }
.pl-message-actions__model { margin-inline-start: 8px; font-size: 12px; color: var(--pl-muted); }
.pl-message-actions__hint { margin: 0; font-size: 13px; color: var(--pl-muted); }
@media (hover: none) { .pl-message-actions__turn:not([data-last]) .pl-message-actions__bar { opacity: 1; } }`,
  mount: function (root) {
    var versions = ['Make the release note shorter.', 'Make the release note shorter and keep the dates.', 'Shorter, keep the dates, no bullet points.'];
    var bubble = root.querySelector('.pl-message-actions__bubble');
    var prev = root.querySelector('.pl-message-actions__prev');
    var next = root.querySelector('.pl-message-actions__next');
    var count = root.querySelector('.pl-message-actions__count');
    var bar = root.querySelector('.pl-message-actions__bar');
    var status = root.querySelector('[role="status"]');
    var index = 1, timer = null;
    function show(i) {
      index = i;
      bubble.textContent = versions[i];
      count.textContent = (i + 1) + '/' + versions.length;
      prev.disabled = i === 0;
      next.disabled = i === versions.length - 1;
      status.textContent = 'Showing version ' + (i + 1) + ' of ' + versions.length;
    }
    prev.addEventListener('click', function () { if (index > 0) show(index - 1); });
    next.addEventListener('click', function () { if (index < versions.length - 1) show(index + 1); });
    var buttons = Array.prototype.slice.call(bar.querySelectorAll('button'));
    bar.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var i = buttons.indexOf(document.activeElement);
      if (i < 0) return;
      var n = (i + (e.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length;
      buttons.forEach(function (b, k) { b.tabIndex = k === n ? 0 : -1; });
      buttons[n].focus();
      e.preventDefault();
    });
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.hasAttribute('aria-pressed')) {
        var on = b.getAttribute('aria-pressed') !== 'true';
        buttons.forEach(function (o) { if (o.hasAttribute('aria-pressed')) o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', String(on));
        status.textContent = on ? b.getAttribute('aria-label') + ' recorded' : 'Rating removed';
      } else if (b.getAttribute('aria-label') === 'Copy' || b.classList.contains('is-copied')) {
        b.classList.add('is-copied');
        b.setAttribute('aria-label', 'Copied');
        status.textContent = 'Copied to clipboard';
        clearTimeout(timer);
        timer = setTimeout(function () { b.classList.remove('is-copied'); b.setAttribute('aria-label', 'Copy'); }, 2000);
      }
    });
    show(1);
    return function () { clearTimeout(timer); };
  },
};
