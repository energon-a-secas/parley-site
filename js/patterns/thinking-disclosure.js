export default {
  id: 'thinking-disclosure',
  name: 'Reasoning disclosure above a reply',
  category: 'Streaming & thinking',
  description: 'A collapsed "Thinking" row that shimmers while the model reasons, then settles into "Thought for 6s" and expands to show the summary.',
  tags: ['reasoning', 'disclosure', 'streaming', 'details'],
  added: '2026-11-02',
  seenIn: [
    { product: 'Claude.ai', note: 'An expandable Thinking section above the reply holds a summary of the reasoning, not the raw trace; it can stop early with a notice when safety systems flag it', url: 'https://support.claude.com/en/articles/8664678', checked: '2026-11-02' },
    { product: 'ChatGPT', note: 'A collapsed "Thought for 5s" row above the answer; opening it shows an Activity panel with planning steps and a duration header (third-party teardown, updated 2026-06-15)', url: 'https://www.aiuxplayground.com/teardowns/chatgpt/output', checked: '2026-11-02' },
    { product: 'Perplexity', note: 'A collapsed "Completed 2 steps" summary that expands to plain-language entries such as "Searching the web" (third-party teardown)', url: 'https://www.aiuxplayground.com/teardowns/perplexity/citations', checked: '2026-11-02' },
    { product: 'VS Code Copilot Chat', note: 'With persistent progress on, reasoning appears in separate collapsible previews above the response', url: 'https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'Reasoning opens while it streams, auto-closes one second after it ends unless defaultOpen is false, and computes the duration itself', url: 'https://ai-sdk.dev/elements/components/reasoning', checked: '2026-11-02' },
    { product: 'LibreChat', note: 'Labels the block "Thoughts" and has a distinct "Reasoning (encrypted)" state when the provider returns reasoning that cannot be shown', url: 'https://github.com/danny-avila/LibreChat', checked: '2026-11-02' },
  ],
  anatomy: [
    'A disclosure row (summary) with a brain or sparkle glyph, a label, and a chevron',
    'Shimmering label text while reasoning is in progress',
    'Elapsed time stamped into the label when reasoning ends',
    'Expanded panel with the reasoning summary in muted type and a left rule',
    'The answer body below, which streams only after the row settles',
  ],
  states: [
    'Running: label "Thinking", shimmer animation, body carries aria-busy, user may open it to read along',
    'Done, collapsed: label "Thought for Ns", chevron pointing down; auto-collapse happens once and never if the user toggled it',
    'Done, expanded: panel open, chevron rotated',
    'Truncated or hidden: a notice replaces the body when reasoning was cut short (Claude) or is encrypted (LibreChat)',
    'Reduced motion: shimmer replaced by a static muted label',
  ],
  behavior: [
    'Native details/summary gives keyboard toggling (Enter, Space) and aria-expanded for free',
    'Collapsed by default once the answer begins, so the answer is the first thing read; Cloudscape allows expanded-by-default only in editors and dashboards',
    'A data-user-toggled flag stops the auto-collapse from closing a block the reader opened',
    'Elapsed seconds are computed from timestamps, not a counter that drifts on background tabs',
    'The state change ("Thought for 6s") goes to the page status region; the body is never a live region',
  ],
  microcopy: [
    { text: 'Thinking', source: 'Claude.ai' },
    { text: 'Thought for 5s', source: 'ChatGPT, teardown' },
    { text: 'Completed 2 steps', source: 'Perplexity, teardown' },
    { text: 'Skip thinking', source: 'Cloudscape gen-AI patterns' },
  ],
  variants: [
    'Inline collapsible above the answer: Claude.ai, AI Elements, VS Code, Perplexity',
    'Opens a side Activity panel instead of expanding in place: ChatGPT (teardown)',
    'Auto-open during the stream, then auto-collapse once: AI Elements',
    'Steps rather than prose: Perplexity lists "Searching the web" style entries; Claude shows a prose summary',
  ],
  pitfalls: [
    'Auto-collapsing while the user is reading it; guard with a user-toggled flag and collapse only once',
    'Presenting a summary as if it were the literal reasoning; Claude says it is a summary, most kits do not',
    'Layout jump when the block collapses above content the reader is viewing',
    'A shimmer that never stops when the request fails looks like progress; always settle the row on error',
    'A custom button instead of details/summary forgets aria-expanded and keyboard toggling',
  ],
  refs: [
    { label: 'Vercel AI Elements: Reasoning (Apache-2.0)', url: 'https://ai-sdk.dev/elements/components/reasoning' },
    { label: 'assistant-ui: chain-of-thought primitive (MIT)', url: 'https://www.assistant-ui.com/docs' },
    { label: 'Claude: extended thinking in the API returns summarized thinking', url: 'https://docs.claude.com/en/docs/build-with-claude/extended-thinking' },
    { label: 'MDN: details element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details' },
  ],
  spec: 'Render a details element before the assistant message. While reasoning tokens arrive, set data-phase="thinking" on it, show a shimmering "Thinking" label, set aria-busy on the body, and let the user open it. Record a data-user-toggled flag on any manual toggle. When the reasoning ends, compute the elapsed seconds from the start timestamp, write "Thought for Ns" into the summary, set data-phase="done", and close it once unless the user toggled it. Put the reasoning summary in muted, smaller type with a left border, and label it as a summary if that is what the provider returns. Start streaming the answer below only after the phase flips to done. Respect prefers-reduced-motion by disabling the shimmer.',
  html: `<article class="pl pl-thinking-disclosure" aria-label="Assistant message">
  <details class="pl-thinking-disclosure__details" data-phase="thinking">
    <summary class="pl-thinking-disclosure__summary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a4 4 0 0 0-4 4v1a4 4 0 0 0-3 6 4 4 0 0 0 3 6h8a4 4 0 0 0 3-6 4 4 0 0 0-3-6V7a4 4 0 0 0-4-4Z"/><path d="M12 3v17"/></svg>
      <span class="pl-thinking-disclosure__label">Thinking</span>
      <svg class="pl-thinking-disclosure__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </summary>
    <div class="pl-thinking-disclosure__body" aria-busy="true">
      <p>The user wants the fastest route that avoids the 7:40 ferry. Two candidates: the coast road, longer but no transfer, or the bridge with one transfer at Vila. Transfer adds a 12 minute wait, so the coast road wins unless they leave after 9.</p>
    </div>
  </details>
  <div class="pl-thinking-disclosure__answer">
    <p>Take the coast road. It is 14 minutes longer on paper, but skipping the Vila transfer saves the 12 minute wait and the risk of missing it. If you leave after 9, switch to the bridge.</p>
  </div>
</article>`,
  css: `.pl-thinking-disclosure { max-width: 680px; padding: 20px; }
.pl-thinking-disclosure__details { margin: 0 0 12px; }
.pl-thinking-disclosure__summary { display: inline-flex; align-items: center; gap: 8px; padding: 6px 10px 6px 8px; margin-left: -8px; border-radius: 999px; list-style: none; cursor: pointer; font-size: 14px; color: var(--pl-muted); user-select: none; }
.pl-thinking-disclosure__summary::-webkit-details-marker { display: none; }
.pl-thinking-disclosure__summary:hover { background: var(--pl-surface); color: var(--pl-text); }
.pl-thinking-disclosure__chevron { transition: transform 160ms ease-out; }
.pl-thinking-disclosure__details[open] .pl-thinking-disclosure__chevron { transform: rotate(180deg); }
.pl-thinking-disclosure__details[data-phase="thinking"] .pl-thinking-disclosure__label { background: linear-gradient(90deg, var(--pl-muted) 0%, var(--pl-text) 50%, var(--pl-muted) 100%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: pl-thinking-disclosure-shimmer 1.6s linear infinite; }
@keyframes pl-thinking-disclosure-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
.pl-thinking-disclosure__body { margin: 6px 0 0 4px; padding: 2px 0 2px 14px; border-left: 2px solid var(--pl-border); font-size: 14px; line-height: 1.55; color: var(--pl-muted); max-width: 60ch; }
.pl-thinking-disclosure__answer { line-height: 1.6; max-width: 65ch; min-height: 24px; }
.pl-thinking-disclosure__details[data-phase="thinking"] + .pl-thinking-disclosure__answer { opacity: 0; }
.pl-thinking-disclosure__answer { transition: opacity 240ms ease-out; }`,
  mount: function (root) {
    var details = root.querySelector('.pl-thinking-disclosure__details');
    var label = root.querySelector('.pl-thinking-disclosure__label');
    var body = root.querySelector('.pl-thinking-disclosure__body');
    var started = Date.now();
    var timer = null;
    var settling = false;
    details.addEventListener('toggle', function () {
      if (!settling) details.dataset.userToggled = 'true';
    });
    function finish() {
      var seconds = Math.max(1, Math.round((Date.now() - started) / 1000));
      details.dataset.phase = 'done';
      body.removeAttribute('aria-busy');
      label.textContent = 'Thought for ' + seconds + 's';
      if (!details.dataset.userToggled) { settling = true; details.open = false; settling = false; }
    }
    started = Date.now();
    details.dataset.phase = 'thinking';
    delete details.dataset.userToggled;
    label.textContent = 'Thinking';
    timer = setTimeout(finish, 2600);
    return function () { clearTimeout(timer); };
  },
};
