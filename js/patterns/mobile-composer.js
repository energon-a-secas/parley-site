export default {
  id: 'mobile-composer',
  name: 'Mobile sticky composer with safe area and keyboard',
  category: 'Composer',
  description: 'A 360px phone frame with the composer pinned to the bottom of a 100dvh column, home-indicator safe-area padding, 44px plus and send targets, and a toggle that shows the keyboard-open state.',
  tags: ['composer', 'mobile', 'keyboard', 'safe-area', 'layout'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Hugging Face chat-ui', note: 'isVirtualKeyboard() disables Enter-to-send and changes blur handling on touch devices; the textarea caps at 4lh on small screens', url: 'https://github.com/huggingface/chat-ui', checked: '2026-11-02' },
    { product: 'Apple HIG', note: 'Use the keyboard layout guide so the keyboard feels integrated and important UI stays visible; June 2025 adds guidance on controls above the keyboard', url: 'https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards', checked: '2026-11-02' },
    { product: 'MDN viewport meta', note: 'interactive-widget=resizes-visual (default), resizes-content or overlays-content; viewport-fit=cover exposes the safe-area insets', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport', checked: '2026-11-02' },
    { product: 'Chatwoot', note: 'At 667px and below the widget panel becomes width 100%, height 100%, top 0', url: 'https://github.com/chatwoot/chatwoot', checked: '2026-11-02' },
    { product: 'CopilotKit', note: 'The popup goes full screen below the md breakpoint and caps at calc(100dvh - 7.5rem) above it', url: 'https://github.com/CopilotKit/CopilotKit', checked: '2026-11-02' },
  ],
  anatomy: [
    'Full-height flex column: header, transcript with flex 1 and overflow-y auto, composer last',
    'Composer with padding-bottom max(12px, env(safe-area-inset-bottom))',
    'Plus on the left and send on the right, both 44px touch targets',
    'Textarea capped at 4 lines on phones, then scrolling',
    'Scroll-to-bottom button floating above the composer',
    'Keyboard region that shrinks the column when open (resizes-content) rather than overlaying it',
  ],
  states: [
    'Keyboard closed: safe-area padding visible under the composer',
    'Keyboard open: column shrinks, composer sits on the keyboard, safe-area padding collapses',
    'Composer expanded to its 4-line cap',
    'Landscape: same layout with a shorter transcript',
  ],
  behavior: [
    'On touch keyboards Return inserts a newline; only the send button sends',
    'Autofocus is desktop only, so the keyboard never opens unasked on a phone',
    'Keyboard avoidance uses interactive-widget=resizes-content, with a visualViewport resize fallback that sets a CSS variable',
    'The transcript keeps its scroll position at the bottom when the keyboard opens',
  ],
  microcopy: [
    { text: 'keep important parts of your interface visible', source: 'Apple HIG, Virtual keyboards' },
  ],
  variants: [
    'Native apps use the platform keyboard layout guide; web apps rely on dvh and interactive-widget',
    'Widgets switch to full screen on phones (Chatwoot, CopilotKit)',
    'Gemini moved its mobile bar from a pill to a rounded rectangle with a button row below (snippet only)',
  ],
  pitfalls: [
    '100vh ignores the on-screen keyboard and browser chrome; use 100dvh',
    'Forgetting the home-indicator safe area hides the send button edge on iPhones',
    'Enter-to-send on a phone makes multi-line messages impossible',
    'Intercom documents that its padding options do not apply on mobile; test the real device, not the desktop emulator alone',
  ],
  refs: [
    { label: 'MDN: viewport meta and interactive-widget', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport' },
    { label: 'Apple HIG: Virtual keyboards', url: 'https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards' },
  ],
  spec: 'Use meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content" and a body of height 100dvh, display flex, flex-direction column, with the transcript flex 1 and overflow-y auto and the composer last with padding-bottom max(12px, env(safe-area-inset-bottom)). Make the plus and send buttons 44px and cap the textarea at 4lh. Use matchMedia("(pointer: coarse)") to disable Enter-to-send and autofocus on touch devices. As a fallback for browsers that ignore interactive-widget, listen to visualViewport resize and write the keyboard height into a CSS variable the composer uses as bottom padding. Pair with the send-stop pattern for the button states.',
  html: `<div class="pl pl-mobile-composer" data-keyboard="closed">
  <div class="pl-mobile-composer__controls">
    <button type="button" class="pl-mobile-composer__toggle" aria-pressed="false">Keyboard: closed</button>
    <span class="pl-mobile-composer__meta">360 x 640, interactive-widget=resizes-content</span>
  </div>
  <div class="pl-mobile-composer__phone">
    <header class="pl-mobile-composer__header"><span>Trip planner</span><span class="pl-mobile-composer__time">9:41</span></header>
    <div class="pl-mobile-composer__transcript">
      <p class="pl-mobile-composer__msg pl-mobile-composer__msg--user">Two days in Lisbon, we like food and walking.</p>
      <p class="pl-mobile-composer__msg">Saturday Alfama and the castle, Sunday Belém by tram 15. Want a rainy-day option?</p>
      <p class="pl-mobile-composer__msg pl-mobile-composer__msg--user">Yes, and somewhere for dinner Saturday.</p>
      <p class="pl-mobile-composer__msg">Rain: the Gulbenkian museum, then the Time Out market. Dinner: a tasca on Rua dos Remédios, book ahead.</p>
    </div>
    <form class="pl-mobile-composer__composer" aria-label="Message composer">
      <button type="button" class="pl-mobile-composer__btn" aria-label="Add files"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button>
      <textarea class="pl-mobile-composer__input" rows="1" aria-label="Message" placeholder="Message"></textarea>
      <button type="submit" class="pl-mobile-composer__btn pl-mobile-composer__send" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
    </form>
    <div class="pl-mobile-composer__keyboard" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span class="pl-mobile-composer__space"></span></div>
    <div class="pl-mobile-composer__home" aria-hidden="true"></div>
  </div>
</div>`,
  css: `.pl-mobile-composer { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-mobile-composer__controls { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 12px; }
.pl-mobile-composer__toggle { height: 32px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; font-size: 13px; color: var(--pl-text); }
.pl-mobile-composer__toggle:hover { background: var(--pl-surface); }
.pl-mobile-composer__toggle[aria-pressed="true"] { border-color: var(--pl-accent); background: color-mix(in srgb, var(--pl-accent) 14%, var(--pl-surface)); }
.pl-mobile-composer__meta { font-size: 12px; color: var(--pl-muted); font-family: var(--pl-mono); }
.pl-mobile-composer__phone { --kb: 0px; --safe: 34px; position: relative; display: flex; flex-direction: column; width: 360px; max-width: 100%; height: 640px; margin: 0 auto; overflow: hidden; border: 1px solid var(--pl-border); border-radius: 36px; background: var(--pl-bg); box-shadow: var(--pl-shadow); }
.pl-mobile-composer[data-keyboard="open"] .pl-mobile-composer__phone { --kb: 260px; --safe: 0px; }
.pl-mobile-composer__header { display: flex; justify-content: space-between; align-items: center; flex: none; padding: 18px 20px 10px; font-size: 14px; font-weight: 600; border-bottom: 1px solid var(--pl-border); }
.pl-mobile-composer__time { font-variant-numeric: tabular-nums; color: var(--pl-muted); }
.pl-mobile-composer__transcript { flex: 1; min-height: 0; overflow-y: auto; padding: 12px 14px; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; }
.pl-mobile-composer__msg { margin: 0; max-width: 82%; padding: 8px 12px; border-radius: 18px 18px 18px 4px; background: var(--pl-surface); font-size: 14px; line-height: 1.4; }
.pl-mobile-composer__msg--user { align-self: flex-end; border-radius: 18px 18px 4px 18px; background: var(--pl-user); }
.pl-mobile-composer__composer { flex: none; display: flex; align-items: flex-end; gap: 6px; padding: 8px 10px max(12px, var(--safe)); border-top: 1px solid var(--pl-border); background: var(--pl-surface); transition: padding 200ms ease-out; }
.pl-mobile-composer__input { flex: 1; min-width: 0; min-height: 44px; max-height: 4lh; padding: 11px 14px; border: 1px solid var(--pl-border); border-radius: 22px; background: var(--pl-bg); resize: none; outline: none; line-height: 22px; font-size: 15px; }
.pl-mobile-composer__input:focus { border-color: var(--pl-accent); }
.pl-mobile-composer__btn { flex: none; display: grid; place-items: center; width: 44px; height: 44px; border: 0; border-radius: 50%; background: transparent; color: var(--pl-muted); }
.pl-mobile-composer__send { background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-mobile-composer__keyboard { flex: none; display: grid; grid-template-columns: repeat(12, 1fr); gap: 5px; height: var(--kb); padding: 0 6px; overflow: hidden; background: var(--pl-surface-2); transition: height 200ms ease-out; }
.pl-mobile-composer__keyboard span { height: 36px; margin-top: 8px; border-radius: 6px; background: var(--pl-surface); }
.pl-mobile-composer__space { grid-column: 3 / 11; }
.pl-mobile-composer__home { position: absolute; left: 50%; bottom: 8px; width: 120px; height: 5px; border-radius: 3px; background: var(--pl-muted); transform: translateX(-50%); opacity: 0.6; }`,
  mount: function (root) {
    var toggle = root.querySelector('.pl-mobile-composer__toggle');
    var input = root.querySelector('.pl-mobile-composer__input');
    var transcript = root.querySelector('.pl-mobile-composer__transcript');
    var form = root.querySelector('.pl-mobile-composer__composer');
    function setKeyboard(open) {
      root.dataset.keyboard = open ? 'open' : 'closed';
      toggle.setAttribute('aria-pressed', String(open));
      toggle.textContent = 'Keyboard: ' + (open ? 'open' : 'closed');
      transcript.scrollTop = transcript.scrollHeight;
    }
    toggle.addEventListener('click', function () { setKeyboard(root.dataset.keyboard !== 'open'); });
    input.addEventListener('focus', function () { setKeyboard(true); });
    input.addEventListener('input', function () { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 22 * 4 + 24) + 'px'; });
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!input.value.trim()) return;
      var p = document.createElement('p');
      p.className = 'pl-mobile-composer__msg pl-mobile-composer__msg--user';
      p.textContent = input.value.trim();
      transcript.appendChild(p);
      input.value = '';
      input.style.height = '';
      transcript.scrollTop = transcript.scrollHeight;
    });
  },
};
