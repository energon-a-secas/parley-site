export default {
  id: 'disclaimer-line',
  name: 'Disclaimer line under the composer',
  category: 'Trust & errors',
  description: 'The one-line "can make mistakes" note directly under the composer, centred, small but readable, with an optional "Learn more" link and a high-contrast variant.',
  tags: ['trust', 'disclaimer', 'composer', 'copy'],
  added: '2026-11-03',
  seenIn: [
    { product: 'ChatGPT', note: 'Small centred text at the bottom of the page under the composer (described in a mailing list thread; help center returned 403)', url: 'https://www.elpassion.com/glossary/chatgpt-can-make-mistakes.-check-important-info', checked: '2026-11-02' },
    { product: 'Gemini', note: 'Landing-page disclaimer captured in Microsoft HAX Toolkit as an example of guideline G2, make clear how well the system can do what it can do', url: 'https://www.microsoft.com/en-us/haxtoolkit/example/google-gemini-g2-make-clear-how-well-the-system-can-do-what-it-can-do/', checked: '2026-11-02' },
    { product: 'OpenAI ChatKit', note: 'disclaimer.text is markdown displayed below the composer, with a highContrast option to raise its contrast', url: 'https://github.com/openai/chatkit-js', checked: '2026-11-02' },
    { product: 'Open WebUI', note: 'The string exists in the locale file but the line in Chat.svelte is commented out in current main', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'Intercom Fin', note: 'A per-message "AI Agent" label beside the agent name instead of a footer line; Intercom makes the deployer responsible for disclosure (search snippet only)', url: 'https://www.intercom.com/help/en/articles/11712008-ai-agent-disclosure', checked: '2026-11-02' },
  ],
  anatomy: [
    'A p element immediately after the composer form, outside it',
    'One sentence: a product-neutral claim plus an action verb',
    'Optional inline link to a fuller policy, underlined so it reads as a link at this size',
    'A high-contrast toggle or data attribute for deployments that need AA on busy backgrounds',
    'Per-message AI label as the alternative placement',
  ],
  states: [
    'Default: muted color that still passes 4.5:1 against the page background',
    'High contrast: body text color',
    'Narrow viewport: same line, wraps to two rows, never hidden',
  ],
  behavior: [
    'Static text; the only interactive part is the link, which opens the policy',
    'Not inside the form, so screen readers do not read it as part of the composer',
    'If the line is hidden on small screens the same text must appear elsewhere, such as the first message',
  ],
  microcopy: [
    { text: 'ChatGPT can make mistakes. Check important info.', source: 'ChatGPT' },
    { text: 'Gemini can make mistakes, so double-check it.', source: 'Gemini' },
    { text: 'LLMs can make mistakes. Verify important information.', source: 'Open WebUI locale string' },
  ],
  variants: [
    'Product-named claim plus action verb (ChatGPT, Gemini)',
    'Vendor-neutral wording for self-hosted deployments (Open WebUI)',
    'Configurable markdown with a contrast switch (ChatKit, LibreChat customFooter)',
    'Per-message "AI Agent" label instead of a footer (Intercom)',
  ],
  pitfalls: [
    'Too small and too faint to read; ChatKit added highContrast because the default is muted',
    'Treating the footer line as the whole disclosure; Intercom puts legal responsibility on the deployer',
    'Shipping the string but not the line (Open WebUI) so docs and UI disagree',
  ],
  refs: [
    { label: 'Microsoft HAX Toolkit: Gemini G2 example', url: 'https://www.microsoft.com/en-us/haxtoolkit/example/google-gemini-g2-make-clear-how-well-the-system-can-do-what-it-can-do/' },
    { label: 'openai/chatkit-js disclaimer option', url: 'https://github.com/openai/chatkit-js' },
  ],
  spec: 'Render a p with class composer-disclaimer immediately after the composer form, centred, at 12px, in a muted color that still passes WCAG AA 4.5:1 against the page background. Keep it to one sentence with a product-neutral claim and an action ("Check important info"), optionally followed by an underlined link to the policy. Expose a data-contrast="high" attribute that switches the color to the body text color. Do not hide it on small screens without moving the same text elsewhere. Pair with the send-stop pattern for the composer above it.',
  html: `<div class="pl pl-disclaimer-line">
  <form class="pl-disclaimer-line__composer" aria-label="Message composer">
    <textarea class="pl-disclaimer-line__input" rows="1" aria-label="Message" placeholder="Is this clause in my lease enforceable?"></textarea>
    <button type="submit" class="pl-disclaimer-line__send" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
  </form>
  <p class="pl-disclaimer-line__note" data-contrast="default"><span class="pl-disclaimer-line__text">AI can make mistakes. Check important info.</span> <a class="pl-disclaimer-line__link" href="#policy">Learn more</a></p>
  <div class="pl-disclaimer-line__variants" role="group" aria-label="Wording variants">
    <button type="button" aria-pressed="true" data-text="AI can make mistakes. Check important info." data-contrast="default">Neutral</button>
    <button type="button" aria-pressed="false" data-text="Lark can make mistakes, so double-check it." data-contrast="default">Product-named</button>
    <button type="button" aria-pressed="false" data-text="AI can make mistakes. Check important info." data-contrast="high">High contrast</button>
  </div>
</div>`,
  css: `.pl-disclaimer-line { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-disclaimer-line__composer { display: flex; align-items: flex-end; gap: 8px; padding: 8px 8px 8px 16px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 24px; transition: border-color 160ms ease-out, box-shadow 160ms ease-out; }
.pl-disclaimer-line__composer:focus-within { border-color: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 20%, transparent); }
.pl-disclaimer-line__input { flex: 1; min-width: 0; min-height: 36px; max-height: 176px; padding: 7px 0; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; }
.pl-disclaimer-line__input::placeholder { color: var(--pl-muted); }
.pl-disclaimer-line__send { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-disclaimer-line__send:hover { filter: brightness(1.08); }
.pl-disclaimer-line__note { margin: 10px 12px 0; text-align: center; font-size: 12px; line-height: 1.5; color: var(--pl-muted); }
.pl-disclaimer-line__note[data-contrast="high"] { color: var(--pl-text); }
.pl-disclaimer-line__link { color: inherit; text-decoration: underline; text-underline-offset: 2px; }
.pl-disclaimer-line__link:hover { color: var(--pl-text); }
.pl-disclaimer-line__variants { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-top: 18px; padding-top: 14px; border-top: 1px dashed var(--pl-border); }
.pl-disclaimer-line__variants button { height: 28px; padding: 0 10px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; font-size: 12px; color: var(--pl-muted); }
.pl-disclaimer-line__variants button:hover { color: var(--pl-text); background: var(--pl-surface); }
.pl-disclaimer-line__variants button[aria-pressed="true"] { border-color: var(--pl-accent); color: var(--pl-text); background: color-mix(in srgb, var(--pl-accent) 14%, var(--pl-surface)); }`,
  mount: function (root) {
    var note = root.querySelector('.pl-disclaimer-line__note');
    var text = root.querySelector('.pl-disclaimer-line__text');
    var buttons = Array.prototype.slice.call(root.querySelectorAll('.pl-disclaimer-line__variants button'));
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        text.textContent = btn.dataset.text;
        note.dataset.contrast = btn.dataset.contrast;
      });
    });
    root.querySelector('.pl-disclaimer-line__link').addEventListener('click', function (ev) { ev.preventDefault(); });
    root.querySelector('.pl-disclaimer-line__composer').addEventListener('submit', function (ev) { ev.preventDefault(); });
  },
};
