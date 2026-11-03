export default {
  id: 'feedback-flow',
  name: 'Thumbs down with reasons',
  category: 'Messages',
  description: 'A thumbs-down press that records the rating at once, opens an inline panel with reason chips, an optional note and a data-use line, then settles into a thank-you under the message.',
  tags: ['feedback', 'rating', 'form', 'chips', 'a11y'],
  added: '2026-11-02',
  seenIn: [
    { product: 'Claude.ai', note: 'Thumbs down opens a form with an issue-type dropdown and optional details, plus a disclosure that the conversation may be sent to Anthropic', url: 'https://www.guideflow.com/tutorial/how-to-give-negative-feedback-on-a-response-in-claudeai', checked: '2026-11-02' },
    { product: 'Gemini', note: 'Thumbs down opens a modal with categorized issue chips for safety, accuracy, instruction-following and personalization', url: 'https://www.aiuxplayground.com/teardowns/gemini/output', checked: '2026-11-02' },
    { product: 'Perplexity', note: 'Thumbs-down options include "Wrong sources", separate from Inaccurate and Out of date', url: 'https://www.aiuxplayground.com/teardowns/perplexity/citations', checked: '2026-11-02' },
    { product: 'Open WebUI', note: 'Rating then reason chips such as "Not factually correct", "Too verbose", "Refused when it shouldn\'t have", optional comment, "Thanks for your feedback!" toast', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'Cloudscape', note: 'Optional dismissible dialog, short form, confirmation as a stacked bubble below the response, thumbs then disabled with a reason', url: 'https://cloudscape.design/gen-ai/patterns/generative-ai-chat/', checked: '2026-11-02' },
  ],
  anatomy: [
    'Thumb buttons as toggles with aria-pressed',
    'Inline panel anchored under the message, labelled as a group',
    'Reason chips that are real checkboxes',
    'Optional free-text field',
    'One-line data-use disclosure',
    'Submit and Skip, then a confirmation line in the turn',
  ],
  states: [
    'None selected',
    'Pressed: rating recorded immediately, panel open',
    'Submitting, then submitted: panel replaced by a thank-you, thumbs locked with a reason',
    'Skipped: rating kept, reasons not sent',
  ],
  behavior: [
    'The rating is sent on press; the panel is optional enrichment',
    'Focus moves to the first chip on open and returns to the thumb on close',
    'Escape closes the panel like Skip',
    'The thank-you is announced once through a polite status region',
  ],
  microcopy: [
    { text: 'Wrong sources', source: 'Perplexity' },
    { text: 'Refused without reason', source: 'LibreChat' },
    { text: 'Thanks for your feedback!', source: 'Open WebUI' },
  ],
  variants: [
    'Dropdown plus text: Claude.ai',
    'Category chips: Gemini, Perplexity, LibreChat, Open WebUI',
    'Numeric scale before reasons: Open WebUI',
  ],
  pitfalls: [
    'Forcing the form before recording the rating loses most feedback',
    'No reason that fits search-specific failures; "Wrong sources" is the counterexample',
    'Silent submission with no confirmation',
  ],
  refs: [
    { label: 'Open WebUI: RateComment.svelte', url: 'https://github.com/open-webui/open-webui' },
    { label: 'Cloudscape: generative AI chat', url: 'https://cloudscape.design/gen-ai/patterns/generative-ai-chat/' },
  ],
  spec: 'Make both thumbs button[aria-pressed]. On a thumbs-down press, set aria-pressed, send the rating at once and reveal a non-modal panel under the message with 4 to 6 checkbox chips, an optional textarea, a one-line data-use note and Submit / Skip; move focus to the first chip. On Submit or Skip, hide the panel, return focus to the thumb and show a one-line confirmation in the turn; after Submit disable both thumbs with a title explaining why. Escape behaves like Skip. Write the confirmation to a polite status region once.',
  html: `<article class="pl pl-feedback-flow" aria-label="Assistant message">
  <div class="pl-feedback-flow__body"><p>Your lease says notice must be given 60 days before the end of term, so for a 31 March end date the letter has to arrive by 30 January.</p></div>
  <div class="pl-feedback-flow__bar" role="toolbar" aria-label="Rate this response">
    <button type="button" class="pl-feedback-flow__thumb" data-rating="up" aria-label="Good response" aria-pressed="false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg></button>
    <button type="button" class="pl-feedback-flow__thumb" data-rating="down" aria-label="Bad response" aria-pressed="false" aria-expanded="false" aria-controls="pl-feedback-flow-panel"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g transform="rotate(180 12 12)"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></g></svg></button>
    <span class="pl-feedback-flow__done" hidden></span>
  </div>
  <form id="pl-feedback-flow-panel" class="pl-feedback-flow__panel" aria-label="Tell us what went wrong" hidden>
    <p class="pl-feedback-flow__q">What went wrong?</p>
    <div class="pl-feedback-flow__chips">
      <label><input type="checkbox" name="reason" value="inaccurate"><span>Inaccurate</span></label>
      <label><input type="checkbox" name="reason" value="wrong-sources"><span>Wrong sources</span></label>
      <label><input type="checkbox" name="reason" value="mismatch"><span>Didn't match my request</span></label>
      <label><input type="checkbox" name="reason" value="verbose"><span>Too verbose</span></label>
      <label><input type="checkbox" name="reason" value="refused"><span>Refused without reason</span></label>
      <label><input type="checkbox" name="reason" value="other"><span>Other</span></label>
    </div>
    <textarea name="note" rows="2" placeholder="Anything else? (optional)" aria-label="Details, optional"></textarea>
    <p class="pl-feedback-flow__note">Your rating and this conversation may be shared with the team that trains the model.</p>
    <div class="pl-feedback-flow__row"><button type="button" class="pl-feedback-flow__skip">Skip</button><button type="submit" class="pl-feedback-flow__submit">Submit</button></div>
  </form>
  <p class="pl-sr" role="status" aria-live="polite"></p>
</article>`,
  css: `.pl-feedback-flow { max-width: 640px; padding: 20px; font-size: 15px; }
.pl-feedback-flow__body { line-height: 1.6; max-width: 65ch; }
.pl-feedback-flow__body p { margin: 0 0 8px; }
.pl-feedback-flow__bar { display: flex; align-items: center; gap: 2px; margin-inline-start: -8px; }
.pl-feedback-flow__thumb { display: grid; place-items: center; width: 32px; height: 32px; border: 0; border-radius: var(--pl-radius-sm); background: transparent; color: var(--pl-muted); transition: background 160ms ease-out, color 160ms ease-out; }
.pl-feedback-flow__thumb:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-feedback-flow__thumb[aria-pressed="true"] { color: var(--pl-accent); background: color-mix(in srgb, var(--pl-accent) 14%, transparent); }
.pl-feedback-flow__thumb:disabled { opacity: 0.45; cursor: not-allowed; }
.pl-feedback-flow__done { margin-inline-start: 8px; font-size: 13px; color: var(--pl-success); }
.pl-feedback-flow__panel { margin-top: 10px; padding: 14px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); }
.pl-feedback-flow__q { margin: 0 0 10px; font-weight: 600; font-size: 14px; }
.pl-feedback-flow__chips { display: flex; flex-wrap: wrap; gap: 8px; }
.pl-feedback-flow__chips label { position: relative; display: inline-flex; align-items: center; min-height: 32px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: 999px; font-size: 13px; cursor: pointer; transition: border-color 160ms ease-out, background 160ms ease-out; }
.pl-feedback-flow__chips label:hover { background: var(--pl-surface-2); }
.pl-feedback-flow__chips input { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
.pl-feedback-flow__chips label:has(input:checked) { border-color: var(--pl-accent); background: color-mix(in srgb, var(--pl-accent) 14%, transparent); }
.pl-feedback-flow__chips label:has(input:focus-visible) { outline: 2px solid var(--pl-accent); outline-offset: 2px; }
.pl-feedback-flow__panel textarea { width: 100%; margin-top: 12px; padding: 8px 10px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-bg); resize: vertical; font-size: 14px; }
.pl-feedback-flow__panel textarea:focus { outline: none; border-color: var(--pl-accent); }
.pl-feedback-flow__note { margin: 10px 0 0; font-size: 12px; color: var(--pl-muted); }
.pl-feedback-flow__row { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }
.pl-feedback-flow__row button { min-height: 32px; padding: 0 14px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; font-size: 13px; }
.pl-feedback-flow__row button:hover { background: var(--pl-surface-2); }
.pl-feedback-flow__row .pl-feedback-flow__submit { background: var(--pl-accent); color: var(--pl-on-accent); border-color: transparent; }`,
  mount: function (root) {
    var thumbs = root.querySelectorAll('.pl-feedback-flow__thumb');
    var down = root.querySelector('[data-rating="down"]');
    var panel = root.querySelector('.pl-feedback-flow__panel');
    var done = root.querySelector('.pl-feedback-flow__done');
    var status = root.querySelector('[role="status"]');
    var timer = null;
    function announce(text) { status.textContent = text; }
    function open() { panel.hidden = false; down.setAttribute('aria-expanded', 'true'); panel.querySelector('input').focus(); }
    function close(text) {
      panel.hidden = true; down.setAttribute('aria-expanded', 'false');
      done.hidden = false; done.textContent = text; announce(text);
      down.focus();
    }
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        var on = t.getAttribute('aria-pressed') !== 'true';
        thumbs.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        t.setAttribute('aria-pressed', String(on));
        done.hidden = true;
        if (!on) { panel.hidden = true; down.setAttribute('aria-expanded', 'false'); announce('Rating removed'); return; }
        announce(t.dataset.rating === 'down' ? 'Rating recorded. Tell us what went wrong, or skip.' : 'Rating recorded');
        if (t.dataset.rating === 'down') open(); else panel.hidden = true;
      });
    });
    panel.querySelector('.pl-feedback-flow__skip').addEventListener('click', function () { close('Rating saved'); });
    panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); close('Rating saved'); } });
    panel.addEventListener('submit', function (e) {
      e.preventDefault();
      var picked = panel.querySelectorAll('input:checked').length;
      close('Sending...');
      timer = setTimeout(function () {
        done.textContent = 'Thanks for your feedback!' + (picked ? ' (' + picked + ' reason' + (picked > 1 ? 's' : '') + ')' : '');
        announce('Thanks for your feedback!');
        thumbs.forEach(function (t) { t.disabled = true; t.title = 'Feedback already sent for this response'; });
      }, 700);
    });
    return function () { clearTimeout(timer); };
  },
};
