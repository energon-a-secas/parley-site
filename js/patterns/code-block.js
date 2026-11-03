export default {
  id: 'code-block',
  name: 'Code block with copy, wrap and a diff view',
  category: 'Messages',
  description: 'A fenced code block inside a reply with a language label, a Copy button that confirms, a wrap toggle, and a second block rendered as a diff with added and removed lines.',
  tags: ['code', 'copy', 'diff', 'clipboard', 'keyboard'],
  added: '2026-11-02',
  seenIn: [
    { product: 'Open WebUI', note: 'Code block header with language and Copy/Copied, Collapse/Expand, Run with "Running...", Save and Preview; a separate DiffBlock component', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'Hugging Face chat-ui', note: 'Artifact panel with a word-wrap toggle, version pager, "Jump to first change" and download', url: 'https://github.com/huggingface/chat-ui', checked: '2026-11-02' },
    { product: 'Cursor', note: 'Agent edits shown as diffs with Keep and Undo; staff confirmed the changes are already applied when the buttons appear (2025-12-03)', url: 'https://forum.cursor.com/t/why-does-cursor-apply-diffs-immediately-before-the-user-accepts-them/145070', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'Shiki-highlighted block with optional line numbers and a cached highlighter per language (code-block.tsx)', url: 'https://github.com/vercel/ai-elements', checked: '2026-11-02' },
  ],
  anatomy: [
    'Header bar: language label, file name if known, actions on the trailing edge',
    'Copy button with a transient "Copied" confirmation',
    'Wrap toggle (aria-pressed) that switches pre-wrap on and off',
    'pre with tabindex="0" so keyboard users can scroll wide lines',
    'Diff variant: a gutter sign per line, ins and del semantics, tinted rows',
    'Optional collapse for long blocks and a run or preview action',
  ],
  states: [
    'Streaming: fence still open, plain text, no highlighting yet',
    'Complete: highlighted once',
    'Copied: label swaps for about 2 s and the status region announces it',
    'Wrapped or unwrapped; diff pending, kept or reverted',
  ],
  behavior: [
    'Copy writes the code text, never the gutter signs, to the clipboard',
    'Highlight once the fence closes, or use a tolerant parser; never re-highlight per token',
    'Diff actions say whether the change is already applied ("Revert" rather than "Reject")',
    'Horizontal scroll stays inside the block; the message column never widens',
  ],
  microcopy: [
    { text: 'Copy', source: 'Open WebUI' },
    { text: 'Copied', source: 'Open WebUI' },
    { text: 'Jump to first change', source: 'Hugging Face chat-ui' },
    { text: 'the changes apply immediately', source: 'Cursor staff, forum 2025-12-03' },
  ],
  variants: [
    'Read-only snippet with copy: every kit',
    'Runnable with an output area: Open WebUI Run, Gemini canvas preview',
    'Inline diff with per-change accept and revert: Cursor, VS Code',
  ],
  pitfalls: [
    'Keep/Undo buttons that look like a pending decision when the edit is already on disk',
    'Continue-generation resuming outside the open fence and breaking the block',
    'A heavy highlighter run on every streamed token',
  ],
  refs: [
    { label: 'Open WebUI: CodeBlock.svelte', url: 'https://github.com/open-webui/open-webui' },
    { label: 'Vercel Streamdown: unterminated blocks', url: 'https://github.com/vercel/streamdown' },
  ],
  spec: 'Render each fenced block as figure.code with a figcaption holding the language, file name and action buttons, then pre tabindex="0" containing code. Copy calls navigator.clipboard.writeText with the code text, swaps its label to "Copied" for 2 s and writes "Copied to clipboard" into a polite status region. The wrap toggle is a button with aria-pressed that adds a class setting white-space: pre-wrap. For diffs, wrap each changed line in ins or del with text-decoration removed, draw the + or - sign with a ::before in the gutter, and label actions by what has already happened. Highlight only after the closing fence, with at most a few token classes.',
  html: `<article class="pl pl-code-block" aria-label="Assistant message">
  <p>The retry helper never backs off because the sleep uses the attempt index before it is incremented. Here is the fixed version, then the diff against your file.</p>
  <figure class="pl-code-block__fig">
    <figcaption class="pl-code-block__head">
      <span class="pl-code-block__lang">python</span>
      <span class="pl-code-block__file">retry.py</span>
      <button type="button" class="pl-code-block__wrap" aria-pressed="false">Wrap</button>
      <button type="button" class="pl-code-block__copy">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <span>Copy</span>
      </button>
    </figcaption>
    <pre class="pl-code-block__pre" tabindex="0"><code><span class="pl-code-block__k">def</span> fetch_with_retry(url, attempts=4):
    <span class="pl-code-block__k">for</span> attempt <span class="pl-code-block__k">in</span> range(attempts):
        <span class="pl-code-block__k">try</span>:
            <span class="pl-code-block__k">return</span> client.get(url, timeout=8)
        <span class="pl-code-block__k">except</span> TransientError:
            <span class="pl-code-block__c"># back off 0.5s, 1s, 2s, then give up</span>
            time.sleep(0.5 * 2 ** attempt)
    <span class="pl-code-block__k">raise</span> RetryExhausted(<span class="pl-code-block__s">f"gave up after {attempts} tries on {url}"</span>)</code></pre>
  </figure>
  <figure class="pl-code-block__fig">
    <figcaption class="pl-code-block__head">
      <span class="pl-code-block__lang">diff</span>
      <span class="pl-code-block__file">retry.py</span>
      <span class="pl-code-block__applied">Applied to disk</span>
      <button type="button" class="pl-code-block__revert">Revert</button>
    </figcaption>
    <pre class="pl-code-block__pre pl-code-block__pre--diff" tabindex="0"><code>        except TransientError:
<del>            time.sleep(0.5 * attempt)
</del><ins>            # back off 0.5s, 1s, 2s, then give up
            time.sleep(0.5 * 2 ** attempt)
</ins>    raise RetryExhausted(...)</code></pre>
  </figure>
  <p class="pl-sr" role="status" aria-live="polite"></p>
</article>`,
  css: `.pl-code-block { max-width: 680px; padding: 20px; line-height: 1.6; }
.pl-code-block > p { margin: 0 0 14px; max-width: 65ch; }
.pl-code-block__fig { margin: 0 0 16px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); overflow: hidden; }
.pl-code-block__head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 6px 8px 6px 14px; border-bottom: 1px solid var(--pl-border); font-size: 12px; color: var(--pl-muted); }
.pl-code-block__lang { text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
.pl-code-block__file { font-family: var(--pl-mono); }
.pl-code-block__applied { margin-inline-start: auto; color: var(--pl-success); }
.pl-code-block__wrap, .pl-code-block__copy, .pl-code-block__revert { display: inline-flex; align-items: center; gap: 6px; min-height: 32px; padding: 0 10px; border: 1px solid transparent; border-radius: var(--pl-radius-sm); background: transparent; color: var(--pl-muted); font-size: 13px; transition: background 160ms ease-out, color 160ms ease-out; }
.pl-code-block__wrap { margin-inline-start: auto; }
.pl-code-block__wrap:hover, .pl-code-block__copy:hover, .pl-code-block__revert:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-code-block__wrap[aria-pressed="true"] { border-color: var(--pl-border); color: var(--pl-text); }
.pl-code-block__copy.is-copied { color: var(--pl-success); }
.pl-code-block__pre { margin: 0; padding: 14px 16px; overflow-x: auto; font-family: var(--pl-mono); font-size: 13px; line-height: 1.55; tab-size: 4; }
.pl-code-block__fig.is-wrapped .pl-code-block__pre { white-space: pre-wrap; overflow-wrap: anywhere; }
.pl-code-block__k { color: var(--pl-accent); }
.pl-code-block__s { color: var(--pl-success); }
.pl-code-block__c { color: var(--pl-muted); font-style: italic; }
.pl-code-block__pre--diff { padding-inline-start: 0; }
.pl-code-block__pre--diff code { display: block; }
.pl-code-block__pre--diff ins, .pl-code-block__pre--diff del { display: block; text-decoration: none; margin-inline-start: -16px; padding-inline-start: 0; }
.pl-code-block__pre--diff ins { background: color-mix(in srgb, var(--pl-success) 14%, transparent); color: var(--pl-success); }
.pl-code-block__pre--diff del { background: color-mix(in srgb, var(--pl-danger) 14%, transparent); color: var(--pl-danger); }
.pl-code-block__pre--diff ins::before { content: "+"; display: inline-block; width: 16px; text-align: center; }
.pl-code-block__pre--diff del::before { content: "-"; display: inline-block; width: 16px; text-align: center; }
.pl-code-block__pre--diff code { padding-inline-start: 16px; }`,
  mount: function (root) {
    var copy = root.querySelector('.pl-code-block__copy');
    var copyLabel = copy.querySelector('span');
    var wrap = root.querySelector('.pl-code-block__wrap');
    var fig = wrap.closest('.pl-code-block__fig');
    var code = fig.querySelector('code');
    var revert = root.querySelector('.pl-code-block__revert');
    var applied = root.querySelector('.pl-code-block__applied');
    var status = root.querySelector('[role="status"]');
    var timer = null;
    copy.addEventListener('click', function () {
      var text = code.textContent;
      try { if (window.navigator.clipboard) window.navigator.clipboard.writeText(text); } catch (e) {}
      copy.classList.add('is-copied');
      copyLabel.textContent = 'Copied';
      status.textContent = 'Copied to clipboard';
      clearTimeout(timer);
      timer = setTimeout(function () { copy.classList.remove('is-copied'); copyLabel.textContent = 'Copy'; }, 2000);
    });
    wrap.addEventListener('click', function () {
      var on = wrap.getAttribute('aria-pressed') !== 'true';
      wrap.setAttribute('aria-pressed', String(on));
      fig.classList.toggle('is-wrapped', on);
    });
    revert.addEventListener('click', function () {
      var reverted = revert.textContent === 'Revert';
      revert.textContent = reverted ? 'Re-apply' : 'Revert';
      applied.textContent = reverted ? 'Reverted on disk' : 'Applied to disk';
      status.textContent = applied.textContent;
    });
    return function () { clearTimeout(timer); };
  },
};
